import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";
import { tools } from "@/lib/tools";

const STALE_DAYS = parseInt(process.env.STALE_DAYS || "90", 10);

interface StaleToolReport {
  slug: string;
  name: string;
  category: string;
  lastReviewedAt: string | null;
  daysSinceReview: number | null;
  reason: string;
}

export async function POST(request: Request) {
  const authError = verifyCronAuth(request);
  if (authError) return authError;

  const now = new Date();
  const staleTools: StaleToolReport[] = [];

  for (const tool of tools) {
    if (!tool.lastReviewedAt) {
      staleTools.push({
        slug: tool.slug,
        name: tool.name,
        category: tool.category,
        lastReviewedAt: null,
        daysSinceReview: null,
        reason: "Never reviewed",
      });
      continue;
    }

    const reviewDate = new Date(tool.lastReviewedAt);
    const daysSince = Math.floor(
      (now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSince >= STALE_DAYS) {
      staleTools.push({
        slug: tool.slug,
        name: tool.name,
        category: tool.category,
        lastReviewedAt: tool.lastReviewedAt,
        daysSinceReview: daysSince,
        reason: `Not reviewed in ${daysSince} days (threshold: ${STALE_DAYS})`,
      });
    }
  }

  // Sort: never-reviewed first, then by staleness
  staleTools.sort((a, b) => {
    if (a.daysSinceReview === null && b.daysSinceReview === null) return 0;
    if (a.daysSinceReview === null) return -1;
    if (b.daysSinceReview === null) return 1;
    return b.daysSinceReview - a.daysSinceReview;
  });

  const summary = {
    totalTools: tools.length,
    staleCount: staleTools.length,
    neverReviewed: staleTools.filter((t) => t.daysSinceReview === null).length,
    threshold: STALE_DAYS,
    generatedAt: now.toISOString(),
  };

  console.log(JSON.stringify({ type: "stale_queue_complete", summary }));

  // If SendGrid is configured, email the digest
  if (process.env.SENDGRID_API_KEY && staleTools.length > 0) {
    try {
      const sgMail = await import("@sendgrid/mail");
      sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);

      const staleList = staleTools
        .map((t) => `- ${t.name} (${t.category}): ${t.reason}`)
        .join("\n");

      await sgMail.default.send({
        to: process.env.CONTACT_TO_EMAIL || "admin@aiproductivityhub.co",
        from:
          process.env.SENDGRID_FROM_EMAIL || "noreply@aiproductivityhub.co",
        subject: `[AI Productivity Hub] ${staleTools.length} tools need review`,
        text: `Stale Content Queue Report\n\n${summary.staleCount} tools need attention:\n\n${staleList}\n\nGenerated: ${summary.generatedAt}`,
      });

      console.log(
        JSON.stringify({ type: "stale_queue_email_sent", to: process.env.CONTACT_TO_EMAIL })
      );
    } catch (err) {
      console.error(
        JSON.stringify({
          type: "stale_queue_email_error",
          error: err instanceof Error ? err.message : "Unknown",
        })
      );
    }
  }

  return NextResponse.json({ summary, staleTools });
}
