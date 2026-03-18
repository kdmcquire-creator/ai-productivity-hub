/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  async redirects() {
    return [
      // Legacy "-2" legal duplicates -> canonical
      { source: "/affiliate-disclosure-2/", destination: "/affiliate-disclosure/", permanent: true },
      { source: "/disclaimer-2/", destination: "/disclaimer/", permanent: true },
      { source: "/privacy-policy-2/", destination: "/privacy-policy/", permanent: true },
      { source: "/terms-2/", destination: "/terms/", permanent: true },
    ];
  },
};

module.exports = nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
