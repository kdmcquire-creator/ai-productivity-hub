import { NextResponse } from "next/server";
import { tools } from "@/lib/tools";
import { logAffiliateClick } from "@/lib/analytics";

// Static affiliate links (for partners not in the tools database)
const staticAffiliateLinks: Record<string, string> = {
  freshbooks: "https://freshbooks.pxf.io/c/1234567/1064077/13524",
  cloudways: "https://www.cloudways.com/en/?id=2102009",
  bluehost: "https://bluehost.sjv.io/c/7045929/1376228/11352",
  amazon: "https://amzn.to/4bzyqmW",
};

function resolveDestination(slug: string): string | undefined {
  // Check static links first
  if (staticAffiliateLinks[slug]) return staticAffiliateLinks[slug];

  // Then check tool database for affiliate URLs
  const tool = tools.find((t) => t.slug === slug);
  if (tool?.affiliateUrl) return tool.affiliateUrl;

  // Fall back to tool website URL
  if (tool?.websiteUrl) return tool.websiteUrl;

  return undefined;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const destination = resolveDestination(slug);

  // Log the click with structured data
  logAffiliateClick({
    slug,
    destination: destination || "not_found",
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    timestamp: new Date().toISOString(),
    ip: request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for"),
  });

  if (destination) {
    return NextResponse.redirect(destination, 302);
  }

  // Unknown slug — redirect to tools directory
  return NextResponse.redirect(new URL("/tools/", request.url), 302);
}
