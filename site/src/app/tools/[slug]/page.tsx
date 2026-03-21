import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, categories } from "@/lib/tools";
import AdUnit from "@/components/AdUnit";
import AffiliateBlock from "@/components/AffiliateBlock";
import { ToolJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Review - Features, Pricing & Alternatives`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const category = categories.find((c) => c.name === tool.category);
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  const ctaUrl = tool.affiliateUrl || tool.websiteUrl;
  const ctaRel = tool.affiliateUrl ? "nofollow noopener" : "noopener";

  return (
    <article className="py-12">
      <ToolJsonLd tool={tool} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://aiproductivityhub.co" },
          { name: "Tools", url: "https://aiproductivityhub.co/tools/" },
          { name: tool.name, url: `https://aiproductivityhub.co/tools/${tool.slug}/` },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            {category && (
              <Link
                href={`/tools/?category=${category.slug}`}
                className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition"
              >
                {category.icon} {category.name}
              </Link>
            )}
            {tool.isFree && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Free tier available
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{tool.name}</h1>
          <p className="text-lg text-gray-600">{tool.tagline}</p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-wrap gap-4 mb-12">
          <a
            href={ctaUrl}
            target="_blank"
            rel={ctaRel}
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
          >
            Visit {tool.name}
          </a>
          {tool.affiliateUrl && (
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener"
              className="inline-block bg-white text-gray-700 font-semibold py-3 px-8 rounded-lg border border-gray-300 hover:border-blue-400 hover:text-blue-600 transition"
            >
              Official Website
            </a>
          )}
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{tool.overview}</p>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-3">
            {tool.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  &#10003;
                </span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ad unit */}
        <AdUnit slot="SLOT_TOOL_MID" format="horizontal" className="my-8" />

        {/* Best For */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Best For</h2>
          <p className="text-gray-700">{tool.bestFor}</p>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h2>
          <ul className="space-y-2">
            {tool.useCases.map((uc, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-500 mt-0.5">&bull;</span>
                <span className="text-gray-700">{uc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pros &amp; Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-3">Pros</h3>
              <ul className="space-y-2">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600 mt-0.5">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-red-800 mb-3">Cons</h3>
              <ul className="space-y-2">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-600 mt-0.5">&minus;</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 text-sm font-semibold text-gray-900">Tier</th>
                  <th className="py-3 pr-4 text-sm font-semibold text-gray-900">Price</th>
                  <th className="py-3 text-sm font-semibold text-gray-900">Details</th>
                </tr>
              </thead>
              <tbody>
                {tool.pricing.map((p, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-sm font-medium text-gray-800">{p.tier}</td>
                    <td className="py-3 pr-4 text-sm text-gray-700">{p.price}</td>
                    <td className="py-3 text-sm text-gray-500">{p.note || "\u2014"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Affiliate Block */}
        <AffiliateBlock placement="toolPage" />

        {/* Related Tools */}
        <RelatedTools
          currentSlug={tool.slug}
          category={tool.category}
          allTools={tools}
        />
      </div>
    </article>
  );
}
