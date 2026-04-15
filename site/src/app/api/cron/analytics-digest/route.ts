import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";
import { tools } from "@/lib/tools";
import { getAllNewsletters } from "@/lib/newsletters";
import {
  getGscAccessToken,
  queryGscPerformance,
  queryGscIndexing,
} from "@/lib/gsc-client";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SiteHealthResult {
  name: string;
  url: string;
  httpStatus: number | null;
  responseTimeMs: number | null;
  sitemapPageCount: number | null;
  robotsAccessible: boolean | null;
  error?: string;
}

interface NewsletterSummary {
  total: number;
  queued: number;
  sent: number;
  draft: number;
}

interface AffiliateSummary {
  totalTools: number;
  withAffiliateUrl: number;
  withoutAffiliateUrl: number;
}

interface WorkerTraffic {
  name: string;
  requests7d: number;
  errors7d: number;
  errorRate: string;
  requestsDelta: string; // vs prior 7 days
}

interface TrafficSummary {
  period: string;
  workers: WorkerTraffic[];
  totalRequests: number;
  totalErrors: number;
  available: boolean;
  error?: string;
}

interface GscSitePerformance {
  siteUrl: string;
  siteName: string;
  clicks: number;
  impressions: number;
  ctr: string;
  avgPosition: string;
  topQueries: Array<{ query: string; clicks: number; impressions: number }>;
}

interface GscSummary {
  period: string;
  sites: GscSitePerformance[];
  totalClicks: number;
  totalImpressions: number;
  available: boolean;
  error?: string;
}

interface DigestPayload {
  generatedAt: string;
  sites: SiteHealthResult[];
  traffic: TrafficSummary;
  gsc: GscSummary;
  newsletters: NewsletterSummary;
  affiliates: AffiliateSummary;
  actionItems: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SITES = [
  { name: "AI Productivity Hub", url: "https://aiproductivityhub.co", worker: "ai-productivity-hub" },
  { name: "Clarity Engine AI", url: "https://clarity-engine.ai", worker: "clarity-engine-ai" },
  { name: "AI Finance Hub", url: "https://aifinancehub.ai", worker: "ai-finance-hub" },
  { name: "LegalTech AI Hub", url: "https://legaltech-ai-hub.com", worker: "legaltech-ai-hub" },
];

const FETCH_TIMEOUT_MS = 10_000;
const SLOW_THRESHOLD_MS = 3_000;
const CF_GQL_URL = "https://api.cloudflare.com/client/v4/graphql";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fetch with an AbortController timeout. */
async function fetchWithTimeout(
  url: string,
  init?: RequestInit & { timeout?: number }
): Promise<Response> {
  const timeout = init?.timeout ?? FETCH_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** HEAD request to homepage — returns status + response time. */
async function checkHomepage(
  url: string
): Promise<{ status: number; timeMs: number }> {
  const start = Date.now();
  const res = await fetchWithTimeout(url, { method: "HEAD" });
  return { status: res.status, timeMs: Date.now() - start };
}

/** Fetch sitemap.xml and count <loc> entries. */
async function countSitemapUrls(baseUrl: string): Promise<number> {
  const res = await fetchWithTimeout(`${baseUrl}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap responded ${res.status}`);
  const text = await res.text();
  // Count <loc> tags — works for both sitemap index and urlset
  const matches = text.match(/<loc>/gi);
  return matches ? matches.length : 0;
}

/** HEAD request to robots.txt. */
async function checkRobots(baseUrl: string): Promise<boolean> {
  const res = await fetchWithTimeout(`${baseUrl}/robots.txt`, {
    method: "HEAD",
  });
  return res.ok;
}

/** Run all checks for a single site. */
async function checkSite(site: {
  name: string;
  url: string;
}, selfOrigin?: string): Promise<SiteHealthResult> {
  const result: SiteHealthResult = {
    name: site.name,
    url: site.url,
    httpStatus: null,
    responseTimeMs: null,
    sitemapPageCount: null,
    robotsAccessible: null,
  };

  // If this is the same worker (self-check), use the internal origin to avoid
  // Cloudflare's 522 error on self-referential Worker fetch.
  const isSelf = selfOrigin && new URL(site.url).origin === new URL(selfOrigin).origin;
  const checkUrl = isSelf ? selfOrigin : site.url;

  // Run homepage, sitemap, and robots checks in parallel
  const [homepageResult, sitemapResult, robotsResult] =
    await Promise.allSettled([
      checkHomepage(checkUrl),
      countSitemapUrls(checkUrl),
      checkRobots(checkUrl),
    ]);

  if (homepageResult.status === "fulfilled") {
    result.httpStatus = homepageResult.value.status;
    result.responseTimeMs = homepageResult.value.timeMs;
  } else {
    result.error = `Homepage: ${homepageResult.reason instanceof Error ? homepageResult.reason.message : "Unknown error"}`;
  }

  if (sitemapResult.status === "fulfilled") {
    result.sitemapPageCount = sitemapResult.value;
  }
  // Sitemap failure is non-critical; we just leave null

  if (robotsResult.status === "fulfilled") {
    result.robotsAccessible = robotsResult.value;
  }

  return result;
}

/** Fetch 7-day traffic data from Cloudflare Workers Analytics GraphQL API. */
async function getTrafficSummary(): Promise<TrafficSummary> {
  const cfToken = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "3582b6bec8f0d717e1d4a926447647b6";

  if (!cfToken) {
    return { period: "7d", workers: [], totalRequests: 0, totalErrors: 0, available: false, error: "CLOUDFLARE_API_TOKEN not configured" };
  }

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const query = `query {
    viewer {
      accounts(filter: { accountTag: "${accountId}" }) {
        current: workersInvocationsAdaptive(
          filter: { datetime_geq: "${sevenDaysAgo.toISOString()}", datetime_leq: "${now.toISOString()}" }
          limit: 10
          orderBy: [sum_requests_DESC]
        ) {
          dimensions { scriptName }
          sum { requests errors }
        }
        previous: workersInvocationsAdaptive(
          filter: { datetime_geq: "${fourteenDaysAgo.toISOString()}", datetime_leq: "${sevenDaysAgo.toISOString()}" }
          limit: 10
          orderBy: [sum_requests_DESC]
        ) {
          dimensions { scriptName }
          sum { requests errors }
        }
      }
    }
  }`;

  try {
    const res = await fetchWithTimeout(CF_GQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      return { period: "7d", workers: [], totalRequests: 0, totalErrors: 0, available: false, error: `CF API ${res.status}` };
    }

    const json = (await res.json()) as {
      data?: {
        viewer?: {
          accounts?: Array<{
            current?: Array<{ dimensions: { scriptName: string }; sum: { requests: number; errors: number } }>;
            previous?: Array<{ dimensions: { scriptName: string }; sum: { requests: number; errors: number } }>;
          }>;
        };
      };
    };

    const account = json.data?.viewer?.accounts?.[0];
    const current = account?.current ?? [];
    const previous = account?.previous ?? [];

    // Build lookup for previous period
    const prevMap = new Map<string, number>();
    for (const entry of previous) {
      prevMap.set(entry.dimensions.scriptName, entry.sum.requests);
    }

    // Map to our site names
    const siteWorkerNames = SITES.map((s) => s.worker);
    const workers: WorkerTraffic[] = current
      .filter((e) => siteWorkerNames.includes(e.dimensions.scriptName))
      .map((e) => {
        const site = SITES.find((s) => s.worker === e.dimensions.scriptName);
        const prevReqs = prevMap.get(e.dimensions.scriptName) ?? 0;
        const delta = prevReqs > 0
          ? ((e.sum.requests - prevReqs) / prevReqs * 100).toFixed(1) + "%"
          : "N/A";
        const errRate = e.sum.requests > 0
          ? ((e.sum.errors / e.sum.requests) * 100).toFixed(2) + "%"
          : "0%";

        return {
          name: site?.name ?? e.dimensions.scriptName,
          requests7d: e.sum.requests,
          errors7d: e.sum.errors,
          errorRate: errRate,
          requestsDelta: delta,
        };
      });

    const totalRequests = workers.reduce((acc, w) => acc + w.requests7d, 0);
    const totalErrors = workers.reduce((acc, w) => acc + w.errors7d, 0);

    return { period: "7d", workers, totalRequests, totalErrors, available: true };
  } catch (err) {
    return {
      period: "7d", workers: [], totalRequests: 0, totalErrors: 0, available: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/** Compile newsletter queue stats. */
async function getNewsletterSummary(): Promise<NewsletterSummary> {
  try {
    const all = await getAllNewsletters();
    return {
      total: all.length,
      queued: all.filter((n) => n.status === "queued").length,
      sent: all.filter((n) => n.status === "sent").length,
      draft: all.filter((n) => n.status === "draft").length,
    };
  } catch {
    return { total: 0, queued: 0, sent: 0, draft: 0 };
  }
}

/** Compile affiliate link stats from tools. */
function getAffiliateSummary(): AffiliateSummary {
  const withUrl = tools.filter((t) => t.affiliateUrl);
  return {
    totalTools: tools.length,
    withAffiliateUrl: withUrl.length,
    withoutAffiliateUrl: tools.length - withUrl.length,
  };
}

/** GSC site properties for all 4 Moonsmoke sites. */
const GSC_PROPERTIES = [
  { siteUrl: "sc-domain:aiproductivityhub.co", siteName: "AI Productivity Hub" },
  { siteUrl: "sc-domain:clarity-engine.ai", siteName: "Clarity Engine AI" },
  { siteUrl: "sc-domain:aifinancehub.ai", siteName: "AI Finance Hub" },
  { siteUrl: "sc-domain:legaltech-ai-hub.com", siteName: "LegalTech AI Hub" },
];

/** Fetch GSC search performance data for all 4 sites. */
async function getGscSummary(): Promise<GscSummary> {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return {
      period: "7d",
      sites: [],
      totalClicks: 0,
      totalImpressions: 0,
      available: false,
      error: "GOOGLE_SERVICE_ACCOUNT_JSON not configured",
    };
  }

  try {
    const accessToken = await getGscAccessToken();

    // Date range: 10 days ago to 3 days ago (GSC has 2-3 day data lag)
    const now = new Date();
    const endDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const startDate = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    // Query all 4 sites in parallel
    const results = await Promise.allSettled(
      GSC_PROPERTIES.map(async (prop) => {
        const perf = await queryGscPerformance(
          accessToken,
          prop.siteUrl,
          startStr,
          endStr,
        );
        return {
          siteUrl: prop.siteUrl,
          siteName: prop.siteName,
          clicks: perf.clicks,
          impressions: perf.impressions,
          ctr: (perf.ctr * 100).toFixed(1) + "%",
          avgPosition: perf.position.toFixed(1),
          topQueries: perf.topQueries.map((q) => ({
            query: q.query,
            clicks: q.clicks,
            impressions: q.impressions,
          })),
        } satisfies GscSitePerformance;
      }),
    );

    const sites: GscSitePerformance[] = results
      .filter(
        (r): r is PromiseFulfilledResult<GscSitePerformance> =>
          r.status === "fulfilled",
      )
      .map((r) => r.value);

    const totalClicks = sites.reduce((acc, s) => acc + s.clicks, 0);
    const totalImpressions = sites.reduce((acc, s) => acc + s.impressions, 0);

    return {
      period: `${startStr} to ${endStr}`,
      sites,
      totalClicks,
      totalImpressions,
      available: true,
    };
  } catch (err) {
    return {
      period: "7d",
      sites: [],
      totalClicks: 0,
      totalImpressions: 0,
      available: false,
      error: err instanceof Error ? err.message : "Unknown GSC error",
    };
  }
}

/** Derive actionable items from the digest data. */
function deriveActionItems(
  sites: SiteHealthResult[],
  traffic: TrafficSummary,
  gsc: GscSummary,
  newsletters: NewsletterSummary,
  affiliates: AffiliateSummary,
): string[] {
  const items: string[] = [];

  // GSC alerts
  if (gsc.available) {
    for (const site of gsc.sites) {
      if (site.clicks === 0) {
        items.push(`${site.siteName}: 0 clicks in GSC over the last 7 days — check indexing`);
      }
    }
    if (gsc.totalImpressions < 100 && gsc.sites.length > 0) {
      items.push(
        `Very low total impressions across all sites (${gsc.totalImpressions}) — review search visibility`,
      );
    }
  } else if (gsc.error) {
    items.push(`GSC data unavailable: ${gsc.error}`);
  }

  // Traffic alerts
  if (traffic.available) {
    for (const w of traffic.workers) {
      if (parseFloat(w.errorRate) > 5) {
        items.push(`${w.name}: high error rate (${w.errorRate}) over 7 days`);
      }
      if (w.requestsDelta !== "N/A" && parseFloat(w.requestsDelta) < -30) {
        items.push(`${w.name}: traffic dropped ${w.requestsDelta} vs prior week`);
      }
    }
  } else if (traffic.error) {
    items.push(`Traffic data unavailable: ${traffic.error}`);
  }

  for (const site of sites) {
    if (site.error) {
      items.push(`${site.name}: unreachable - ${site.error}`);
    } else if (site.httpStatus && site.httpStatus >= 400) {
      items.push(
        `${site.name}: HTTP ${site.httpStatus} error on homepage`
      );
    }
    if (
      site.responseTimeMs !== null &&
      site.responseTimeMs > SLOW_THRESHOLD_MS
    ) {
      items.push(
        `${site.name}: slow response (${site.responseTimeMs}ms > ${SLOW_THRESHOLD_MS}ms threshold)`
      );
    }
    if (site.robotsAccessible === false) {
      items.push(`${site.name}: robots.txt is not accessible`);
    }
    if (site.sitemapPageCount === null) {
      items.push(`${site.name}: sitemap.xml could not be fetched`);
    } else if (site.sitemapPageCount === 0) {
      items.push(`${site.name}: sitemap.xml contains 0 URLs`);
    }
  }

  if (newsletters.queued > 5) {
    items.push(
      `Newsletter queue backlog: ${newsletters.queued} newsletters waiting to send`
    );
  }

  if (affiliates.withoutAffiliateUrl > affiliates.withAffiliateUrl) {
    items.push(
      `${affiliates.withoutAffiliateUrl} of ${affiliates.totalTools} tools have no affiliate URL`
    );
  }

  return items;
}

// ---------------------------------------------------------------------------
// Email HTML builder
// ---------------------------------------------------------------------------

function buildDigestHtml(digest: DigestPayload): string {
  const dateStr = new Date(digest.generatedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusDot = (site: SiteHealthResult) => {
    if (site.error || (site.httpStatus && site.httpStatus >= 400))
      return '<span style="color:#ef4444;">&#9679;</span>';
    if (
      site.responseTimeMs !== null &&
      site.responseTimeMs > SLOW_THRESHOLD_MS
    )
      return '<span style="color:#f59e0b;">&#9679;</span>';
    return '<span style="color:#22c55e;">&#9679;</span>';
  };

  const siteRows = digest.sites
    .map(
      (s) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">
          ${statusDot(s)} ${s.name}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">
          ${s.httpStatus ?? "N/A"}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">
          ${s.responseTimeMs !== null ? `${s.responseTimeMs}ms` : "N/A"}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">
          ${s.sitemapPageCount !== null ? s.sitemapPageCount : "N/A"}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">
          ${s.robotsAccessible === true ? "OK" : s.robotsAccessible === false ? "Missing" : "N/A"}
        </td>
      </tr>`
    )
    .join("");

  const actionItemsHtml =
    digest.actionItems.length > 0
      ? digest.actionItems
          .map(
            (item) =>
              `<li style="margin-bottom:6px;color:#b91c1c;">${item}</li>`
          )
          .join("")
      : '<li style="color:#16a34a;">No issues detected this week.</li>';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f3f4f6;">
  <div style="max-width:680px;margin:0 auto;background:#ffffff;">

    <!-- Header -->
    <div style="background:#1a1a2e;padding:32px 24px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">
        Moonsmoke Network
      </h1>
      <p style="margin:8px 0 0;color:#a5b4fc;font-size:14px;">
        Weekly Analytics Digest &mdash; ${dateStr}
      </p>
    </div>

    <!-- Site Health -->
    <div style="padding:24px;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#1a1a2e;">Site Health</h2>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f9fafb;">
              <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Site</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Status</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Response</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Sitemap URLs</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">robots.txt</th>
            </tr>
          </thead>
          <tbody>
            ${siteRows}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Traffic (7-Day) -->
    <div style="padding:0 24px 24px;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#1a1a2e;">Traffic (Last 7 Days)</h2>
      ${digest.traffic.available ? `
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f9fafb;">
              <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Site</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Requests</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">vs Prior Week</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Errors</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Error Rate</th>
            </tr>
          </thead>
          <tbody>
            ${digest.traffic.workers.map((w) => {
              const deltaColor = w.requestsDelta.startsWith("-") ? "#ef4444" : "#16a34a";
              const errColor = parseFloat(w.errorRate) > 2 ? "#ef4444" : "#16a34a";
              return `<tr>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:500;">${w.name}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:600;">${w.requests7d.toLocaleString()}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;color:${deltaColor};font-weight:600;">${w.requestsDelta === "N/A" ? "New" : w.requestsDelta}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${w.errors7d.toLocaleString()}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;color:${errColor};">${w.errorRate}</td>
              </tr>`;
            }).join("")}
            <tr style="background:#f9fafb;font-weight:600;">
              <td style="padding:10px 12px;">Total</td>
              <td style="padding:10px 12px;text-align:center;">${digest.traffic.totalRequests.toLocaleString()}</td>
              <td style="padding:10px 12px;text-align:center;">—</td>
              <td style="padding:10px 12px;text-align:center;">${digest.traffic.totalErrors.toLocaleString()}</td>
              <td style="padding:10px 12px;text-align:center;">${digest.traffic.totalRequests > 0 ? ((digest.traffic.totalErrors / digest.traffic.totalRequests) * 100).toFixed(2) + "%" : "0%"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      ` : `<p style="color:#9ca3af;font-size:14px;">${digest.traffic.error || "Traffic data not available. Add CLOUDFLARE_API_TOKEN to the PH worker."}</p>`}
    </div>

    <!-- Search Performance (GSC) -->
    <div style="padding:0 24px 24px;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#1a1a2e;">Search Performance (7 Days)</h2>
      ${digest.gsc.available ? `
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f9fafb;">
              <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Site</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Clicks</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Impressions</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">CTR</th>
              <th style="padding:10px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#6b7280;font-weight:600;">Avg Position</th>
            </tr>
          </thead>
          <tbody>
            ${digest.gsc.sites.map((s) => {
              const clickColor = s.clicks === 0 ? "#ef4444" : "#111827";
              return `<tr>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:500;">${s.siteName}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:600;color:${clickColor};">${s.clicks.toLocaleString()}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${s.impressions.toLocaleString()}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${s.ctr}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${s.avgPosition}</td>
              </tr>`;
            }).join("")}
            <tr style="background:#f9fafb;font-weight:600;">
              <td style="padding:10px 12px;">Total</td>
              <td style="padding:10px 12px;text-align:center;">${digest.gsc.totalClicks.toLocaleString()}</td>
              <td style="padding:10px 12px;text-align:center;">${digest.gsc.totalImpressions.toLocaleString()}</td>
              <td style="padding:10px 12px;text-align:center;" colspan="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
      ${(() => {
        // Collect top queries across all sites, dedupe, sort by clicks
        const allQueries = digest.gsc.sites.flatMap((s) => s.topQueries);
        const queryMap = new Map<string, { clicks: number; impressions: number }>();
        for (const q of allQueries) {
          const existing = queryMap.get(q.query);
          if (existing) {
            existing.clicks += q.clicks;
            existing.impressions += q.impressions;
          } else {
            queryMap.set(q.query, { clicks: q.clicks, impressions: q.impressions });
          }
        }
        const topFive = Array.from(queryMap.entries())
          .sort((a, b) => b[1].clicks - a[1].clicks)
          .slice(0, 5);

        if (topFive.length === 0) return "";

        return `
        <div style="margin-top:12px;">
          <h3 style="margin:0 0 8px;font-size:14px;color:#6b7280;font-weight:600;">Top Queries</h3>
          <ol style="margin:0;padding:0 0 0 20px;font-size:14px;">
            ${topFive.map(([query, data]) =>
              `<li style="margin-bottom:4px;"><strong>${query}</strong> &mdash; ${data.clicks} click${data.clicks !== 1 ? "s" : ""}, ${data.impressions.toLocaleString()} impressions</li>`
            ).join("")}
          </ol>
        </div>`;
      })()}
      ` : `<p style="color:#9ca3af;font-size:14px;">${digest.gsc.error || "GSC data not available. Add GOOGLE_SERVICE_ACCOUNT_JSON to the PH worker."}</p>`}
    </div>

    <!-- Newsletter Queue -->
    <div style="padding:0 24px 24px;">
      <h2 style="margin:0 0 12px;font-size:18px;color:#1a1a2e;">Newsletter Queue (PH)</h2>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <div style="flex:1;min-width:120px;background:#f0fdf4;border-radius:8px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#16a34a;">${digest.newsletters.queued}</div>
          <div style="font-size:12px;color:#6b7280;margin-top:4px;">Queued</div>
        </div>
        <div style="flex:1;min-width:120px;background:#eff6ff;border-radius:8px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#2563eb;">${digest.newsletters.sent}</div>
          <div style="font-size:12px;color:#6b7280;margin-top:4px;">Sent</div>
        </div>
        <div style="flex:1;min-width:120px;background:#fefce8;border-radius:8px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#ca8a04;">${digest.newsletters.draft}</div>
          <div style="font-size:12px;color:#6b7280;margin-top:4px;">Drafts</div>
        </div>
        <div style="flex:1;min-width:120px;background:#f3f4f6;border-radius:8px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#374151;">${digest.newsletters.total}</div>
          <div style="font-size:12px;color:#6b7280;margin-top:4px;">Total</div>
        </div>
      </div>
    </div>

    <!-- Affiliate Links -->
    <div style="padding:0 24px 24px;">
      <h2 style="margin:0 0 12px;font-size:18px;color:#1a1a2e;">Affiliate Links (PH)</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">Total tools listed</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;">${digest.affiliates.totalTools}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">With affiliate URL</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#16a34a;">${digest.affiliates.withAffiliateUrl}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">Without affiliate URL</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#dc2626;">${digest.affiliates.withoutAffiliateUrl}</td>
        </tr>
      </table>
    </div>

    <!-- Action Items -->
    <div style="padding:0 24px 32px;">
      <h2 style="margin:0 0 12px;font-size:18px;color:#1a1a2e;">Action Items</h2>
      <div style="background:#fef2f2;border-left:4px solid #ef4444;border-radius:4px;padding:16px;">
        <ul style="margin:0;padding:0 0 0 20px;font-size:14px;">
          ${actionItemsHtml}
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:16px 24px;text-align:center;font-size:12px;color:#9ca3af;">
      Generated at ${digest.generatedAt} by AI Productivity Hub cron system
    </div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// SendGrid via fetch (Cloudflare Workers compatible)
// ---------------------------------------------------------------------------

async function sendDigestEmail(
  htmlContent: string,
  dateStr: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return { success: false, error: "SENDGRID_API_KEY not configured" };
  }

  const fromEmail =
    process.env.SENDGRID_FROM_EMAIL || "noreply@aiproductivityhub.co";
  const toEmail =
    process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com";

  const res = await fetchWithTimeout("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: toEmail }] }],
      from: { email: fromEmail, name: "Moonsmoke Network" },
      subject: `[Moonsmoke Network] Weekly Digest \u2014 ${dateStr}`,
      content: [{ type: "text/html", value: htmlContent }],
    }),
    timeout: FETCH_TIMEOUT_MS,
  });

  if (!res.ok) {
    const errBody = await res.text();
    return { success: false, error: `SendGrid ${res.status}: ${errBody}` };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  // Accept both CRON_SECRET (via verifyCronAuth) and ADMIN_API_KEY (via x-api-key)
  // so the admin dashboard can trigger this endpoint manually.
  const cronAuth = verifyCronAuth(request);
  if (cronAuth) {
    // Cron auth failed — try admin key as fallback
    const adminKey = process.env.ADMIN_API_KEY;
    const providedKey = request.headers.get("x-api-key") ||
      request.headers.get("authorization")?.replace("Bearer ", "");
    if (!adminKey || providedKey !== adminKey) {
      return cronAuth; // Neither auth method worked
    }
  }

  // ------- Day-of-week gate -------
  // The dispatcher calls this every 6 hours, but we only run on Monday mornings.
  // Pass ?force=true to bypass day/hour check (for manual testing via admin dashboard).
  const reqUrl = new URL(request.url);
  const force = reqUrl.searchParams.get("force") === "true";
  const now = new Date();

  if (!force && now.getUTCDay() !== 1) {
    // 1 = Monday
    console.log(
      JSON.stringify({
        type: "analytics_digest_skipped",
        reason: "Not Monday",
        dayOfWeek: now.getUTCDay(),
      })
    );
    return NextResponse.json({ skipped: true, reason: "Not Monday" });
  }

  if (!force && now.getUTCHours() > 6) {
    console.log(
      JSON.stringify({
        type: "analytics_digest_skipped",
        reason: "Not morning run",
        utcHour: now.getUTCHours(),
      })
    );
    return NextResponse.json({ skipped: true, reason: "Not morning run" });
  }

  console.log(
    JSON.stringify({ type: "analytics_digest_started", time: now.toISOString() })
  );

  // ------- Gather data in parallel -------
  const selfOrigin = reqUrl.origin;
  const [siteResults, traffic, gsc, newsletters, affiliates] = await Promise.all([
    Promise.allSettled(SITES.map((s) => checkSite(s, selfOrigin))),
    getTrafficSummary(),
    getGscSummary(),
    getNewsletterSummary(),
    Promise.resolve(getAffiliateSummary()),
  ]);

  const sites: SiteHealthResult[] = siteResults.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : {
          name: SITES[i].name,
          url: SITES[i].url,
          httpStatus: null,
          responseTimeMs: null,
          sitemapPageCount: null,
          robotsAccessible: null,
          error:
            r.reason instanceof Error ? r.reason.message : "Check failed",
        }
  );

  const actionItems = deriveActionItems(sites, traffic, gsc, newsletters, affiliates);

  const digest: DigestPayload = {
    generatedAt: now.toISOString(),
    sites,
    traffic,
    gsc,
    newsletters,
    affiliates,
    actionItems,
  };

  console.log(
    JSON.stringify({
      type: "analytics_digest_compiled",
      siteCount: sites.length,
      actionItemCount: actionItems.length,
    })
  );

  // ------- Build and send email -------
  const dateStr = now.toISOString().split("T")[0]; // e.g. 2026-04-06
  const htmlContent = buildDigestHtml(digest);
  const emailResult = await sendDigestEmail(htmlContent, dateStr);

  if (emailResult.success) {
    console.log(
      JSON.stringify({
        type: "analytics_digest_email_sent",
        to: process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com",
      })
    );
  } else {
    console.error(
      JSON.stringify({
        type: "analytics_digest_email_error",
        error: emailResult.error,
      })
    );
  }

  return NextResponse.json({
    digest,
    emailSent: emailResult.success,
    emailError: emailResult.error ?? null,
  });
}
