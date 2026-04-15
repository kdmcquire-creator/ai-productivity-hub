import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Kit 2026 — Moonsmoke Network",
  description:
    "Partnership and media information for Moonsmoke Network, an independent AI content publisher operating four niche sites across productivity, SEO, personal finance, and legal technology.",
  alternates: {
    canonical: "https://aiproductivityhub.co/media-kit/",
  },
  openGraph: {
    title: "Media Kit 2026 — Moonsmoke Network",
    description:
      "Partnership and media information for Moonsmoke Network, an independent AI content publisher operating four niche sites across productivity, SEO, personal finance, and legal technology.",
  },
};

const properties = [
  {
    name: "AI Productivity Hub",
    domain: "aiproductivityhub.co",
    tagline: "AI tools for work & teams",
    color: "border-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "Clarity Engine",
    domain: "clarity-engine.ai",
    tagline: "SEO tools & strategy",
    color: "border-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    name: "AI Finance Hub",
    domain: "aifinancehub.ai",
    tagline: "Personal finance & investing",
    color: "border-amber-500",
    bg: "bg-amber-50",
  },
  {
    name: "LegalTech AI Hub",
    domain: "legaltech-ai-hub.com",
    tagline: "Legal tech for attorneys",
    color: "border-rose-500",
    bg: "bg-rose-50",
  },
];

const contentFormats = [
  {
    label: "Tool Review",
    description: "Hands-on evaluation with pros, cons, verdict",
  },
  {
    label: "Comparison Guide",
    description: "Side-by-side analysis of 2-5 competing tools",
  },
  {
    label: "How-To Guide",
    description: "Step-by-step instructions for specific tasks",
  },
  {
    label: "Buyer's Guide",
    description: "Category-level overview for readers new to a niche",
  },
];

const audienceStats = [
  { label: "Geography", value: "US, Canada, UK" },
  { label: "Demographic", value: "Professionals 28-50" },
  { label: "Intent", value: "Active tool research" },
  { label: "Device Split", value: "~60% desktop" },
];

const affiliateNetworks = [
  { network: "Awin", detail: "Publisher ID 2805304" },
  { network: "CJ", detail: "Publisher ID 7916287" },
  { network: "Impact", detail: "Active" },
  { network: "PartnerStack", detail: "Moonsmoke Network" },
];

export default function MediaKitPage() {
  return (
    <>
      {/* Hero / Navy Header */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Media Kit 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Moonsmoke Network
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Independent AI content publisher. Four niche sites. In-depth reviews,
            comparisons, and tutorials for professionals actively evaluating
            software.
          </p>
          <p className="mt-8 text-sm text-slate-400">
            Contact:{" "}
            <a
              href="mailto:partnerships@aiproductivityhub.co"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
            >
              partnerships@aiproductivityhub.co
            </a>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Who We Are */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">
            Who We Are
          </h2>
          <div className="max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Moonsmoke Network is an independent AI content publisher operating
              four niche sites across productivity, SEO, personal finance, and
              legal technology. Each site delivers in-depth tool reviews,
              comparison guides, and practical tutorials for professionals actively
              evaluating AI software. We are affiliate-first and editorially
              independent.
            </p>
          </div>
        </section>

        {/* Our Properties */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6">
            Our Properties
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {properties.map((site) => (
              <div
                key={site.domain}
                className={`border-l-4 ${site.color} ${site.bg} rounded-r-lg p-5`}
              >
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {site.name}
                </h3>
                <a
                  href={`https://${site.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {site.domain}
                </a>
                <p className="text-sm text-gray-600 mt-2">{site.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Audience */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6">
            Audience
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {audienceStats.map(({ label, value }) => (
              <div
                key={label}
                className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
                  {label}
                </p>
                <p className="font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 max-w-2xl">
            Decision-makers and self-directed buyers. Readers land on comparison
            and review content with high purchase intent.
          </p>
        </section>

        {/* Content Formats */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6">
            Content Format
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {contentFormats.map(({ label, description }) => (
              <div
                key={label}
                className="border border-gray-200 rounded-lg p-5"
              >
                <p className="font-semibold text-gray-900 mb-1">{label}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership Options */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6">
            Partnership Options
          </h2>
          <div className="space-y-6">
            <div className="border-l-2 border-slate-300 pl-5">
              <h3 className="font-semibold text-gray-900 mb-1">
                1. Affiliate Program Inclusion
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We apply to and manage affiliate programs through Awin,
                PartnerStack, Impact, CJ, and direct partnerships.
              </p>
            </div>
            <div className="border-l-2 border-slate-300 pl-5">
              <h3 className="font-semibold text-gray-900 mb-1">
                2. Editorial Review
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We review products we believe our audience will benefit from.
                Editorial coverage requires genuine product access.
              </p>
            </div>
            <div className="border-l-2 border-slate-300 pl-5">
              <h3 className="font-semibold text-gray-900 mb-1">
                3. Featured Placement
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                For strong-fit products, we can discuss featured placement within
                comparison guides and &ldquo;best of&rdquo; roundups.
              </p>
            </div>
          </div>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-800 mb-3">
              What we look for from partners:
            </p>
            <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
              <li>Commission rate / structure</li>
              <li>Cookie duration</li>
              <li>Available creative assets</li>
              <li>Dedicated affiliate manager contact</li>
            </ul>
          </div>
        </section>

        {/* Affiliate Network Profiles */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6">
            Affiliate Network Profiles
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 font-semibold text-gray-700 pr-12">
                    Network
                  </th>
                  <th className="pb-3 font-semibold text-gray-700">
                    Publisher Profile
                  </th>
                </tr>
              </thead>
              <tbody>
                {affiliateNetworks.map(({ network, detail }) => (
                  <tr
                    key={network}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-3 pr-12 font-medium text-gray-900">
                      {network}
                    </td>
                    <td className="py-3 text-gray-600">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* A Note on Traffic */}
        <section className="mb-16 bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            A Note on Traffic
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed max-w-3xl">
            <p>
              Moonsmoke Network launched in early 2026 and is in active growth
              phase. We do not inflate traffic numbers. We are happy to share
              Google Search Console data or GA4 dashboards on request.
            </p>
            <p>
              Our pitch is not volume &mdash; it is intent. Readers who land on a
              comparison page are further down the funnel than most display ad
              impressions.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-8 border-t border-slate-200 pt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-4">
            Contact
          </h2>
          <a
            href="mailto:partnerships@aiproductivityhub.co"
            className="text-xl font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
          >
            partnerships@aiproductivityhub.co
          </a>
          <p className="text-sm text-gray-500 mt-3">
            We respond to all partnership inquiries within 3 business days.
          </p>
        </section>

        {/* Footer timestamp */}
        <p className="text-xs text-gray-400 border-t border-slate-100 pt-6">
          Last updated March 2026
        </p>
      </div>
    </>
  );
}
