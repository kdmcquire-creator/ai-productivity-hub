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
    ];
  },
};

module.exports = nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
