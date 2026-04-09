import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";
import { socialPosts, type SocialPost } from "@/lib/social-calendar";
import { queuePost, getProfiles } from "@/lib/buffer-client";

export const dynamic = "force-dynamic";

// In-memory set tracking post IDs that have already been queued during the
// lifetime of this worker instance.  For a durable solution swap this with a
// KV store or D1 database.
const sentPostIds = new Set<string>();

function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>
): void {
  const entry = {
    timestamp: new Date().toISOString(),
    service: "cron-social-post",
    level,
    message,
    ...data,
  };
  if (level === "error") {
    console.error(JSON.stringify(entry));
  } else if (level === "warn") {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

/**
 * Pick the next unposted social calendar entry.
 * Prefers drafts that haven't been sent yet.
 */
function pickNextPost(): SocialPost | null {
  for (const post of socialPosts) {
    if (post.status === "draft" && !sentPostIds.has(post.id)) {
      return post;
    }
  }
  return null;
}

/**
 * Build the post text for a given platform, appending the link and hashtags.
 */
function buildPostText(
  post: SocialPost,
  platform: "twitter" | "linkedin"
): string {
  let text = post.content[platform];

  if (post.link) {
    text += `\n\n${post.link}`;
  }

  if (post.hashtags.length > 0) {
    const tags = post.hashtags.map((h) => `#${h}`).join(" ");
    text += `\n\n${tags}`;
  }

  return text;
}

export async function POST(request: Request) {
  const authError = verifyCronAuth(request);
  if (authError) return authError;

  // Check for Buffer token — skip gracefully if missing
  if (!process.env.BUFFER_ACCESS_TOKEN) {
    log("warn", "BUFFER_ACCESS_TOKEN not configured — skipping social post cron");
    return NextResponse.json({
      skipped: true,
      reason: "BUFFER_ACCESS_TOKEN not configured",
    });
  }

  // Pick the next unposted entry
  const nextPost = pickNextPost();
  if (!nextPost) {
    log("info", "No unposted social calendar entries remaining");
    return NextResponse.json({
      skipped: true,
      reason: "No unposted entries in the social calendar",
    });
  }

  // Fetch Buffer profiles to map platforms → profile IDs
  const profiles = await getProfiles();
  if (profiles.length === 0) {
    log("warn", "No Buffer profiles found — cannot queue post");
    return NextResponse.json({
      skipped: true,
      reason: "No Buffer profiles available",
    });
  }

  // Map platform names to Buffer profile IDs
  const profileMap = new Map<string, string>();
  for (const profile of profiles) {
    // Buffer service names: "twitter", "linkedin", "facebook", etc.
    profileMap.set(profile.service, profile.id);
  }

  const results: Array<{
    platform: string;
    success: boolean;
    message: string;
    mock?: boolean;
  }> = [];

  for (const platform of nextPost.platforms) {
    const profileId = profileMap.get(platform);
    if (!profileId) {
      log("warn", `No Buffer profile for platform: ${platform}`);
      results.push({
        platform,
        success: false,
        message: `No Buffer profile found for ${platform}`,
      });
      continue;
    }

    const text = buildPostText(nextPost, platform);
    const bufferResult = await queuePost(
      text,
      [profileId],
      nextPost.scheduledFor
    );

    results.push({
      platform,
      success: bufferResult.success,
      message: bufferResult.message,
      mock: bufferResult.mock,
    });
  }

  // Mark the post as sent if at least one platform succeeded
  const anySuccess = results.some((r) => r.success);
  if (anySuccess) {
    sentPostIds.add(nextPost.id);
  }

  log("info", "Social post cron completed", {
    postId: nextPost.id,
    postType: nextPost.type,
    results,
  });

  return NextResponse.json({
    posted: anySuccess,
    postId: nextPost.id,
    postType: nextPost.type,
    results,
    completedAt: new Date().toISOString(),
  });
}
