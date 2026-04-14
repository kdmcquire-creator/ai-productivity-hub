import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";
import { tools } from "@/lib/tools";
import { getAllNewsletters } from "@/lib/newsletters";

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

interface DigestPayload {
  generatedAt: string;
  sites: SiteHealthResult[];
  newsletters: NewsletterSummary;
  affiliates: AffiliateSummary;
  actionItems: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SITES = [
  { name: "AI Productivity Hub", url: "https://aiproductivityhub.co" },
  { name: "Clarity Engine AI", url: "https://clarity-engine.ai" },
  { name: "AI Finance Hub", url: "https://aifinancehub.ai" },
  { name: "LegalTech AI Hub", url: "https://legaltech-ai-hub.com" },
];

const FETCH_TIMEOUT_MS = 10_000;
const SLOW_THRESHOLD_MS = 3_000;

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
}): Promise<SiteHealthResult> {
  const result: SiteHealthResult = {
    name: site.name,
    url: site.url,
    httpStatus: null,
    responseTimeMs: null,
    sitemapPageCount: null,
    robotsAccessible: null,
  };

  // Run homepage, sitemap, and robots checks in parallel
  const [homepageResult, sitemapResult, robotsResult] =
    await Promise.allSettled([
      checkHomepage(site.url),
      countSitemapUrls(site.url),
      checkRobots(site.url),
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

/** Derive actionable items from the digest data. */
function deriveActionItems(
  sites: SiteHealthResult[],
  newsletters: NewsletterSummary,
  affiliates: AffiliateSummary
): string[] {
  const items: string[] = [];

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
  const authError = verifyCronAuth(request);
  if (authError) return authError;

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
  const [siteResults, newsletters, affiliates] = await Promise.all([
    Promise.allSettled(SITES.map(checkSite)),
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

  const actionItems = deriveActionItems(sites, newsletters, affiliates);

  const digest: DigestPayload = {
    generatedAt: now.toISOString(),
    sites,
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
