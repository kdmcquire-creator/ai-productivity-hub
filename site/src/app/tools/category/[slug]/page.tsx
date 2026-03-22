import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, categories } from "@/lib/tools";
import { BreadcrumbJsonLd, ToolDirectoryJsonLd } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  const ogParams = new URLSearchParams({
    title: `Best AI ${category.name} Tools`,
    type: "category",
    subtitle: `Discover and compare the best AI tools for ${category.name.toLowerCase()}.`,
    category: category.name,
  });

  return {
    title: `Best AI ${category.name} Tools`,
    description: `Discover and compare the best AI tools for ${category.name.toLowerCase()}. In-depth reviews, pricing, and recommendations to help you choose the right ${category.name.toLowerCase()} tool.`,
    openGraph: {
      images: [
        {
          url: `/api/og?${ogParams.toString()}`,
          width: 1200,
          height: 630,
          alt: `Best AI ${category.name} Tools`,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryTools = tools.filter((t) => t.category === category.name);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://aiproductivityhub.co" },
          { name: "Tools", url: "https://aiproductivityhub.co/tools/" },
          {
            name: category.name,
            url: `https://aiproductivityhub.co/tools/category/${slug}/`,
          },
        ]}
      />
      <ToolDirectoryJsonLd tools={categoryTools} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Best AI {category.name} Tools
                </h1>
                <p className="text-gray-500 mt-1">
                  {categoryTools.length} tool
                  {categoryTools.length !== 1 ? "s" : ""} reviewed
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl">
              Compare the top AI-powered {category.name.toLowerCase()} tools.
              Each tool has been reviewed with detailed features, pricing, pros
              and cons to help you make the right choice.
            </p>
          </div>

          {/* Tool Grid */}
          {categoryTools.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No tools in this category yet. Check back soon!
              </p>
              <Link
                href="/tools/"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Browse all tools
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <div
                    className={`h-1.5 bg-gradient-to-r ${tool.color}`}
                  />
                  <div className="p-6">
                    <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition">
                      {tool.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-500">
                        {tool.isFree ? "Free tier available" : tool.pricing[0]?.price}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Other Categories */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Other Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories
                .filter((c) => c.slug !== slug)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/tools/category/${cat.slug}/`}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
