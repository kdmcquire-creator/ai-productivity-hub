/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Legacy "-2" legal duplicates -> canonical
      { source: "/affiliate-disclosure-2/", destination: "/affiliate-disclosure/", permanent: true },
      { source: "/disclaimer-2/", destination: "/disclaimer/", permanent: true },
      { source: "/privacy-policy-2/", destination: "/privacy/", permanent: true },
      { source: "/terms-2/", destination: "/terms/", permanent: true },
      // /privacy-policy -> /privacy (canonical)
      { source: "/privacy-policy/", destination: "/privacy/", permanent: true },
      // /terms-and-conditions -> /terms (canonical)
      { source: "/terms-and-conditions/", destination: "/terms/", permanent: true },
      { source: "/terms-and-conditions-2/", destination: "/terms/", permanent: true },
      // /comparisons -> /compare (canonical)
      { source: "/comparisons/", destination: "/compare/", permanent: true },
      { source: "/comparisons/:slug/", destination: "/compare/:slug/", permanent: true },
      // Old blog post slugs that Google crawled but no longer exist
      // Redirect to closest matching content to preserve link equity
      { source: "/blog/grammarly-vs-chatgpt-email-replies/", destination: "/blog/grammarly-vs-jasper-vs-copy-ai/", permanent: true },
      { source: "/blog/email-follow-up-templates-ai/", destination: "/blog/ai-write-better-emails-half-the-time/", permanent: true },
      { source: "/blog/jasper-ai-review/", destination: "/blog/jasper-ai-vs-copy-ai-vs-grammarly-writing-tools/", permanent: true },
      { source: "/blog/gmail-ai-triage/", destination: "/blog/ai-write-better-emails-half-the-time/", permanent: true },
      { source: "/blog/instantly-ai-review/", destination: "/blog/", permanent: true },
    ];
  },
};

module.exports = nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
