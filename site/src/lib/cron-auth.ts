import { NextResponse } from "next/server";

/**
 * Verify that a cron request is authorized.
 * Checks for CRON_SECRET in the Authorization header (Bearer token).
 * Returns null if authorized, or an error response if not.
 */
export function verifyCronAuth(request: Request): NextResponse | null {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[cron-auth] CRON_SECRET not configured");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== cronSecret) {
    console.warn("[cron-auth] Unauthorized cron request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

/**
 * Verify admin API key from x-api-key header.
 * Returns null if authorized, or an error response if not.
 */
export function verifyAdminAuth(request: Request): NextResponse | null {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    console.error("[admin-auth] ADMIN_API_KEY not configured");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const providedKey = request.headers.get("x-api-key");

  if (providedKey !== adminKey) {
    console.warn("[admin-auth] Unauthorized admin request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
