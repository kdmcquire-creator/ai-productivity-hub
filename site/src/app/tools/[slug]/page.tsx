import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, categories } from "@/lib/tools";
import AdUnit from "@/components/AdUnit";
import AffiliateBlock from "@/components/AffiliateBlock";
import SiteGroundHalfPage from "@/components/SiteGroundHalfPage";
import { ToolJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogPosts from "@/components/RelatedBlogPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};
  const ogParams = new URLSearchParams({
    title: `${tool.name} Review`,
    type: "tool",
    subtitle: tool.tagline,
    category: tool.category,
  });

  return {
    title: `${tool.name} Review - Features, Pricing & Alternatives`,
    description: tool.description,
    openGraph: {
      images: [
        {
          url: `/api/og?${ogParams.toString()}`,
          width: 1200,
          height: 630,
          alt: `${tool.name} Review - Features, Pricing & Alternatives`,
        },
      ],
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const category = categories.find((c) => c.name === tool.category);
  const ctaUrl = tool.affiliateUrl || tool.websiteUrl;
  const ctaRel = tool.affiliateUrl ? "nofollow noopener" : "noopener";

  return (
    <article>
      <ToolJsonLd tool={tool} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://aiproductivityhub.co" },
          { name: "Tools", url: "https://aiproductivityhub.co/tools/" },
          {
            name: tool.name,
            url: `https://aiproductivityhub.co/tools/${tool.slug}/`,
          },
        ]}
      />

      {/* Hero Header */}
      <div className={`bg-gradient-to-br ${tool.color} relative overflow-hidden`}>
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools/" className="hover:text-white transition">
              Tools
            </Link>
            <span>/</span>
            {category && (
              <>
                <Link
                  href={`/tools/category/${category.slug}/`}
                  className="hover:text-white transition"
                >
                  {category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-white/90">{tool.name}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {category && (
              <Link
                href={`/tools/category/${category.slug}/`}
                className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1.5 rounded-full hover:bg-white/30 transition"
              >
                {category.icon} {category.name}
              </Link>
            )}
            {tool.isFree && (
              <span className="text-xs font-semibold text-white bg-green-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                Free Tier Available
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            {tool.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-8">
            {tool.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={ctaUrl}
              target="_blank"
              rel={ctaRel}
              className="inline-flex items-center bg-white text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 shadow-lg transition"
            >
              Try {tool.name}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            {tool.affiliateUrl && (
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener"
                className="inline-block text-white font-semibold py-3 px-8 rounded-lg border-2 border-white/40 hover:bg-white/10 transition"
              >
                Official Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Card */}
        <section className="mb-12 bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {tool.overview}
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-700 text-sm leading-relaxed pt-1">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Best For + Use Cases — side by side */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h2 className="text-lg font-bold text-blue-900 mb-3">Best For</h2>
            <p className="text-blue-800 text-sm leading-relaxed">
              {tool.bestFor}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Use Cases</h2>
            <ul className="space-y-2">
              {tool.useCases.map((uc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">
                    &rarr;
                  </span>
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ad unit */}
        <AdUnit slot="SLOT_TOOL_MID" format="horizontal" className="my-8" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Pros &amp; Cons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs">
                  +
                </span>
                Pros
              </h3>
              <ul className="space-y-3">
                {tool.pros.map((pro, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-green-600 mt-0.5 flex-shrink-0">
                      &#10003;
                    </span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-700 text-xs">
                  &minus;
                </span>
                Cons
              </h3>
              <ul className="space-y-3">
                {tool.cons.map((con, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-red-600 mt-0.5 flex-shrink-0">
                      &#10007;
                    </span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tool.pricing.map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border ${
                  i === 0
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {p.tier}
                </p>
                <p
                  className={`text-2xl font-bold mb-2 ${
                    p.price === "Free"
                      ? "text-green-600"
                      : "text-gray-900"
                  }`}
                >
                  {p.price}
                </p>
                {p.note && (
                  <p className="text-sm text-gray-500">{p.note}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href={ctaUrl}
              target="_blank"
              rel={ctaRel}
              className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 shadow-sm transition"
            >
              Get Started with {tool.name}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Affiliate Block */}
        <AffiliateBlock placement="toolPage" />

        {/* Half-page banner */}
        <SiteGroundHalfPage />

        {/* Related Tools */}
        <RelatedTools
          currentSlug={tool.slug}
          category={tool.category}
          allTools={tools}
        />

        {/* Related Blog Posts */}
        <RelatedBlogPosts
          toolSlug={tool.slug}
          toolCategory={tool.category}
        />
      </div>
    </article>
  );
}
