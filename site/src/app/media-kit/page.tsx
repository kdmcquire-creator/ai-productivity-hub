import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Kit — Moonsmoke Network",
  description:
    "Partnership and advertising information for Moonsmoke Network — an independent AI content publisher operating four niche sites across productivity, SEO, finance, and legal tech.",
};

const sites = [
  {
    color: "bg-blue-500",
    name: "AI Productivity Hub",
    url: "aiproductivityhub.co",
    niche: "AI tools for work & teams",
    audience:
      "Knowledge workers, team leads, and solopreneurs adopting AI for daily workflows. US-based professionals aged 28–45.",
  },
  {
    color: "bg-emerald-500",
    name: "Clarity Engine",
    url: "clarity-engine.ai",
    niche: "Free SEO tools & strategy guides",
    audience:
      "Freelance SEOs, in-house marketers, content creators, and early-stage founders managing their own organic growth.",
  },
  {
    color: "bg-amber-500",
    name: "AI Finance Hub",
    url: "aifinancehub.ai",
    niche: "Personal finance & investing",
    audience:
      "Individuals and small business owners using AI to manage budgets, investments, and bookkeeping.",
  },
  {
    color: "bg-rose-500",
    name: "LegalTech AI Hub",
    url: "legaltech-ai-hub.com",
    niche: "Legal tech for attorneys & small firms",
    audience:
      "Solo practitioners and small firm attorneys evaluating AI for contract drafting, research, and practice management.",
  },
];

const contentTypes = [
  {
    type: "Tool Review",
    description:
      "Hands-on evaluation of a single product with pros, cons, pricing analysis, and a clear verdict.",
  },
  {
    type: "Comparison Guide",
    description:
      "Side-by-side analysis of 2–5 competing tools for readers choosing between options.",
  },
  {
    type: "How-To Guide",
    description:
      "Step-by-step instructions for using AI tools to accomplish a specific professional task.",
  },
  {
    type: "Buyer's Guide",
    description:
      "Category-level overview for readers new to a niche — e.g., \"Best AI Budgeting Apps.\"",
  },
];

const networks = [
  { network: "Awin", id: "Publisher ID: 2805304" },
  { network: "Impact", id: "Publisher: Moonsmoke LLC" },
  { network: "PartnerStack", id: "Moonsmoke Network" },
  { network: "ShareASale", id: "On request" },
];

export default function MediaKitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 border-b pb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
          Moonsmoke Network · Media Kit
        </p>
        <h1 className="text-4xl font-bold mb-4">Partner With Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Moonsmoke Network is an independent AI content publisher operating
          four niche sites. We write in-depth tool reviews, comparison guides,
          and practical tutorials for professionals actively evaluating AI
          software.
        </p>
        <p className="mt-4 text-sm text-gray-500">Last updated: March 2026</p>
      </div>

      {/* Our Properties */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Properties</h2>
        <div className="grid gap-4">
          {sites.map((site) => (
            <div
              key={site.url}
              className="flex gap-4 items-start border rounded-lg p-5"
            >
              <div
                className={`${site.color} rounded-full w-3 h-3 mt-2 flex-shrink-0`}
              />
              <div>
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="font-semibold text-lg">{site.name}</span>
                  <a
                    href={`https://${site.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {site.url}
                  </a>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {site.niche}
                </p>
                <p className="text-sm text-gray-500">{site.audience}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Audience Overview</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            Our combined readership consists of professionals in the United
            States, Canada, and the United Kingdom who are actively researching
            AI tools for work, finance, or legal practice.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Primary Geography", value: "US · CA · UK" },
            { label: "Age Range", value: "28–50" },
            { label: "Reader Type", value: "Decision-makers" },
            { label: "Top Device", value: "~60% Desktop" },
          ].map(({ label, value }) => (
            <div key={label} className="border rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {label}
              </p>
              <p className="font-semibold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Traffic data available on request via Google Search Console or GA4
          export.
        </p>
      </section>

      {/* Content Formats */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Content Formats</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {contentTypes.map(({ type, description }) => (
            <div key={type} className="border rounded-lg p-5">
              <p className="font-semibold mb-1">{type}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Options */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Partnership Options</h2>
        <div className="prose prose-gray max-w-none space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">
              Affiliate Program Inclusion
            </h3>
            <p className="text-gray-700 text-sm">
              We apply to and actively manage affiliate programs through major
              networks. If your product fits one of our four niches, we want to
              hear from you. Commission structure, cookie window, and available
              creative assets help us prioritize placements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Editorial Review</h3>
            <p className="text-gray-700 text-sm">
              We review products we believe our audience will benefit from.
              Editorial coverage is not contingent on affiliate status and is
              never for sale. Product access and an affiliate relationship help
              us prioritize.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Featured Placement</h3>
            <p className="text-gray-700 text-sm">
              For strong-fit products, we can discuss featured placement within
              comparison guides, &ldquo;best of&rdquo; roundups, and category
              landing pages.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 border rounded-lg p-5">
          <p className="text-sm font-semibold mb-2">
            What helps us prioritize your program:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Commission rate and structure (% revenue share, flat CPA, or hybrid)</li>
            <li>Cookie duration</li>
            <li>Creative assets — banners, dedicated landing pages, custom tracking links</li>
            <li>Dedicated affiliate manager contact</li>
          </ul>
        </div>
      </section>

      {/* Affiliate Networks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Affiliate Network Profiles</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 font-semibold text-gray-700 pr-8">Network</th>
                <th className="pb-2 font-semibold text-gray-700">Publisher Profile</th>
              </tr>
            </thead>
            <tbody>
              {networks.map(({ network, id }) => (
                <tr key={network} className="border-b last:border-0">
                  <td className="py-3 pr-8 font-medium text-gray-900">{network}</td>
                  <td className="py-3 text-gray-600">{id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Editorial Policy */}
      <section className="mb-12 bg-gray-50 border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3">Editorial Policy</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Moonsmoke Network is independently owned and operated. We earn
          affiliate commissions on some recommendations — we disclose this on
          every page where it applies. Our editorial positions are never for
          sale. A product&rsquo;s affiliate status does not guarantee positive
          coverage, inclusion in a roundup, or any particular ranking. We
          recommend what we believe genuinely serves our readers.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-2">
          Partnership inquiries, program applications, and press contact:
        </p>
        <a
          href="mailto:partnerships@aiproductivityhub.co"
          className="text-blue-600 font-medium hover:underline text-lg"
        >
          partnerships@aiproductivityhub.co
        </a>
        <p className="text-sm text-gray-500 mt-4">
          We respond to all partnership inquiries within 3 business days.
        </p>
      </section>
    </div>
  );
}
