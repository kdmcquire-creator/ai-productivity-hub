import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/cron-auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimitError = rateLimit(request, {
    maxRequests: 5,
    windowMs: 300_000,
  });
  if (rateLimitError) return rateLimitError;

  const adminError = verifyAdminAuth(request);
  if (adminError) return adminError;

  // Forward to the content pipeline cron endpoint with cron auth
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  const baseUrl = new URL(request.url).origin;
  const response = await fetch(`${baseUrl}/api/cron/content-pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cronSecret}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
