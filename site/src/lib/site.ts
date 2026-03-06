export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || "https://aiproductivityhub.co";
  return url.replace(/\/$/, "");
}
