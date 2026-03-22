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

      {/* Gradient Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl drop-shadow-sm">{category.icon}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Best AI {category.name} Tools
              </h1>
              <p className="text-blue-100 mt-1 text-sm sm:text-base font-medium">
                {categoryTools.length} tool{categoryTools.length !== 1 ? "s" : ""} reviewed
              </p>
            </div>
          </div>
          <p className="text-blue-100 text-base sm:text-lg max-w-3xl mt-4 leading-relaxed">
            Compare the top AI-powered {category.name.toLowerCase()} tools.
            Each tool has been reviewed with detailed features, pricing, pros
            and cons to help you make the right choice.
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tool Grid */}
          {categoryTools.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg font-medium mb-2">
                No tools in this category yet.
              </p>
              <p className="text-gray-400 text-sm mb-6">Check back soon — we&apos;re adding new tools regularly.</p>
              <Link
                href="/tools/"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition"
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
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${tool.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition leading-snug">
                        {tool.name}
                      </h2>
                      {tool.isFree && (
                        <span className="ml-2 shrink-0 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          Free tier
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {tool.tagline}
                    </p>
                    {!tool.isFree && (
                      <p className="text-xs text-gray-400 mb-3">
                        Starting at {tool.pricing[0]?.price}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {tool.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium"
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
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Other Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories
                .filter((c) => c.slug !== slug)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/tools/category/${cat.slug}/`}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
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
