import { NextResponse } from "next/server";

const affiliateLinks: Record<string, string> = {
  descript: "https://www.descript.com/?lmref=Of999g",
  jasper: "https://jasper.ai?special=kdmcquire",
  surferseo: "https://surferseo.com/?fpr=kevin76",
  freshbooks: "https://freshbooks.pxf.io/c/1234567/1064077/13524",
  cloudways: "https://www.cloudways.com/en/?id=2102009",
  bluehost: "https://bluehost.sjv.io/c/7045929/1376228/11352",
  amazon: "https://amzn.to/4bzyqmW",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const destination = affiliateLinks[slug];

  if (destination) {
    console.log(`[affiliate-click] slug=${slug} destination=${destination}`);
    return NextResponse.redirect(destination, 302);
  }

  console.log(`[affiliate-click] slug=${slug} not found, redirecting to /tools/`);
  return NextResponse.redirect(new URL("/tools/", _request.url), 302);
}
