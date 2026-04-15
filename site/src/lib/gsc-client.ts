/**
 * Google Search Console API client using service account JWT bearer flow.
 * Compatible with Cloudflare Workers (uses Web Crypto API, no Node crypto).
 */

const GSC_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const GSC_API_BASE = "https://www.googleapis.com/webmasters/v3/sites";
const FETCH_TIMEOUT_MS = 15_000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fetch with an AbortController timeout. */
async function fetchWithTimeout(
  url: string,
  init?: RequestInit & { timeout?: number },
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

/** Base64url encode a Uint8Array or string. */
function base64url(input: Uint8Array | string): string {
  const bytes =
    typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Import a PKCS#8 PEM private key for RSASSA-PKCS1-v1_5 signing.
 * The key in Google service account JSON is PEM-encoded PKCS#8.
 */
async function importPrivateKey(pem: string): Promise<CryptoKey> {
  // Strip PEM headers/footers and whitespace
  const stripped = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/[\r\n\s]/g, "");

  // Decode base64 to binary
  const binaryString = atob(stripped);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return crypto.subtle.importKey(
    "pkcs8",
    bytes.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

/**
 * Create a signed JWT for Google service account authentication.
 */
async function createSignedJwt(
  clientEmail: string,
  privateKey: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: GSC_SCOPE,
    aud: GSC_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const key = await importPrivateKey(privateKey);
  const signatureBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput),
  );

  const encodedSignature = base64url(new Uint8Array(signatureBuffer));
  return `${signingInput}.${encodedSignature}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Exchange a service account JWT for an OAuth2 access token.
 * Reads GOOGLE_SERVICE_ACCOUNT_JSON from env.
 */
export async function getGscAccessToken(): Promise<string> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not configured");
  }

  const sa = JSON.parse(raw) as {
    client_email: string;
    private_key: string;
  };

  if (!sa.client_email || !sa.private_key) {
    throw new Error("Service account JSON missing client_email or private_key");
  }

  const jwt = await createSignedJwt(sa.client_email, sa.private_key);

  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: jwt,
  });

  const res = await fetchWithTimeout(GSC_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google token exchange failed (${res.status}): ${errText}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** Shape returned by queryGscPerformance. */
export interface GscPerformanceResult {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
}

/**
 * Query Search Console Search Analytics for a site over a date range.
 * Returns aggregated totals plus top 5 queries by clicks.
 */
export async function queryGscPerformance(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string,
): Promise<GscPerformanceResult> {
  const encoded = encodeURIComponent(siteUrl);
  const url = `${GSC_API_BASE}/${encoded}/searchAnalytics/query`;

  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: 5,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GSC searchAnalytics query failed (${res.status}): ${errText}`);
  }

  const data = (await res.json()) as {
    rows?: Array<{
      keys: string[];
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
    responseAggregationType?: string;
  };

  const rows = data.rows ?? [];

  // Aggregate totals from returned rows (these are the top 5 by default)
  // For accurate totals, make a separate request without dimensions
  const totalsRes = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate, endDate }),
  });

  let totalClicks = 0;
  let totalImpressions = 0;
  let totalCtr = 0;
  let totalPosition = 0;

  if (totalsRes.ok) {
    const totalsData = (await totalsRes.json()) as {
      rows?: Array<{
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
      }>;
    };
    if (totalsData.rows && totalsData.rows.length > 0) {
      totalClicks = totalsData.rows[0].clicks;
      totalImpressions = totalsData.rows[0].impressions;
      totalCtr = totalsData.rows[0].ctr;
      totalPosition = totalsData.rows[0].position;
    }
  }

  return {
    clicks: totalClicks,
    impressions: totalImpressions,
    ctr: totalCtr,
    position: totalPosition,
    topQueries: rows.map((r) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    })),
  };
}

/** Shape returned by queryGscIndexing. */
export interface GscIndexingResult {
  sitemaps: Array<{
    path: string;
    lastSubmitted?: string;
    isPending: boolean;
    isSitemapsIndex: boolean;
    lastDownloaded?: string;
    warnings: number;
    errors: number;
    contents?: Array<{
      type: string;
      submitted: number;
      indexed: number;
    }>;
  }>;
}

/**
 * Query Search Console sitemaps endpoint for a site to get indexing info.
 */
export async function queryGscIndexing(
  accessToken: string,
  siteUrl: string,
): Promise<GscIndexingResult> {
  const encoded = encodeURIComponent(siteUrl);
  const url = `${GSC_API_BASE}/${encoded}/sitemaps`;

  const res = await fetchWithTimeout(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GSC sitemaps query failed (${res.status}): ${errText}`);
  }

  const data = (await res.json()) as {
    sitemap?: Array<{
      path: string;
      lastSubmitted?: string;
      isPending: boolean;
      isSitemapsIndex: boolean;
      lastDownloaded?: string;
      warnings: string;
      errors: string;
      contents?: Array<{
        type: string;
        submitted: string;
        indexed: string;
      }>;
    }>;
  };

  return {
    sitemaps: (data.sitemap ?? []).map((s) => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted,
      isPending: s.isPending,
      isSitemapsIndex: s.isSitemapsIndex,
      lastDownloaded: s.lastDownloaded,
      warnings: parseInt(s.warnings, 10) || 0,
      errors: parseInt(s.errors, 10) || 0,
      contents: s.contents?.map((c) => ({
        type: c.type,
        submitted: parseInt(c.submitted, 10) || 0,
        indexed: parseInt(c.indexed, 10) || 0,
      })),
    })),
  };
}
