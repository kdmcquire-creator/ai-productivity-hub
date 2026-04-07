import { NextResponse, after } from "next/server";
import { tools } from "@/lib/tools";
import { logAffiliateClick, persistAffiliateClick } from "@/lib/analytics";

// Static affiliate links (for partners not in the tools database)
const staticAffiliateLinks: Record<string, string> = {
  freshbooks: "https://freshbooks.pxf.io/c/1234567/1064077/13524",
  cloudways: "https://www.cloudways.com/en/?id=2102009",
  bluehost: "https://bluehost.sjv.io/NG93NP",
  amazon: "https://www.amazon.com/?tag=aiphubsite-20",
  cybersuite: "https://www.awin1.com/cread.php?awinmid=67878&awinaffid=2805304&ued=https%3A%2F%2Fcybersuite.com%2Fdemo-signup%2F",
  viralcanvas: "https://www.awin1.com/cread.php?awinmid=124372&awinaffid=2805304&ued=https%3A%2F%2Fwww.viralcanvas.ai%2F",
  resso: "https://www.awin1.com/cread.php?awinmid=85741&awinaffid=2805304&ued=https%3A%2F%2Fwww.resso.ai%2Fsignup",
  siteground: "https://www.siteground.com/index.htm?afcode=758135cea38bbc354897accd3183d9ff",
  nordvpn: "http://www.awin1.com/cread.php?awinmid=15132&awinaffid=2805304&clickref=",
  railway: "https://railway.com?referralCode=IxgLVt",
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

  const clickEvent = {
    slug,
    destination: destination || "not_found",
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    timestamp: new Date().toISOString(),
    ip: request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for"),
  };

  logAffiliateClick(clickEvent);
  after(() => persistAffiliateClick(clickEvent));

  if (destination) {
    return NextResponse.redirect(destination, 302);
  }

  // Unknown slug — redirect to tools directory
  return NextResponse.redirect(new URL("/tools/", request.url), 302);
}
