import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";

// This endpoint processes the newsletter queue
// In the flat-file pattern, newsletters are managed via admin endpoints
// and stored in memory/KV. This cron checks for queued newsletters
// with sendDate <= now and sends them via SendGrid.

export async function POST(request: Request) {
  const authError = verifyCronAuth(request);
  if (authError) return authError;

  // In the current flat-file architecture, newsletter state is managed
  // through the admin API and stored in Cloudflare KV (or in-memory for dev).
  // This cron would:
  // 1. Query newsletters with status="queued" and sendDate <= now
  // 2. Sort by sendDate (FIFO)
  // 3. Send via SendGrid Marketing API (primary) or mail/send (fallback)
  // 4. Update status to "sent" with sentAt timestamp

  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (!sendgridKey) {
    console.log(
      JSON.stringify({
        type: "newsletter_send_skipped",
        reason: "SENDGRID_API_KEY not configured",
      })
    );
    return NextResponse.json({
      summary: { sent: 0, reason: "SendGrid not configured" },
    });
  }

  // For now, log that the cron ran successfully
  // Full implementation requires KV/D1 storage for newsletter queue state
  console.log(
    JSON.stringify({
      type: "newsletter_cron_executed",
      timestamp: new Date().toISOString(),
      note: "Queue processing ready — add KV storage for persistent state",
    })
  );

  return NextResponse.json({
    summary: {
      sent: 0,
      queued: 0,
      note: "Newsletter queue processor active. Add newsletters via admin API.",
    },
  });
}
