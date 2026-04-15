import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparisonBySlug } from "@/lib/comparisons";
import { ComparisonJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";

const BASE_URL = "https://aiproductivityhub.co";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  const ogParams = new URLSearchParams({
    title: comparison.title,
    type: "blog",
    subtitle: comparison.excerpt,
  });

  return {
    title: comparison.title,
    description: comparison.excerpt,
    alternates: {
      canonical: `${BASE_URL}/compare/${comparison.slug}/`,
    },
    openGraph: {
      title: comparison.title,
      description: comparison.excerpt,
      type: "article",
      publishedTime: comparison.dateISO,
      images: [
        {
          url: `/api/og?${ogParams.toString()}`,
          width: 1200,
          height: 630,
          alt: comparison.title,
        },
      ],
    },
  };
}

const winnerBg: Record<string, string> = {
  tool1: "bg-green-50",
  tool2: "bg-green-50",
  tie: "",
};

const winnerCell1: Record<string, string> = {
  tool1: "bg-green-100 font-semibold text-green-800",
  tool2: "",
  tie: "bg-yellow-50",
};

const winnerCell2: Record<string, string> = {
  tool1: "",
  tool2: "bg-green-100 font-semibold text-green-800",
  tie: "bg-yellow-50",
};

const winnerBadge: Record<string, string> = {
  tool1: "bg-green-100 text-green-700",
  tool2: "bg-green-100 text-green-700",
  tie: "bg-yellow-100 text-yellow-700",
};

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const relatedComparisons = comparisons.filter((c) => c.slug !== slug);

  const formattedDate = new Date(comparison.dateISO).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <ComparisonJsonLd comparison={comparison} />
      {comparison.faqs && <FAQJsonLd faqs={comparison.faqs} />}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Compare", url: `${BASE_URL}/compare/` },
          {
            name: comparison.title,
            url: `${BASE_URL}/compare/${comparison.slug}/`,
          },
        ]}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/compare/" className="hover:text-white transition">
              Compare
            </Link>
            <span>/</span>
            <span className="text-white/90 truncate">{comparison.title}</span>
          </nav>

          {/* Badge */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1.5 rounded-full">
              Head-to-Head Comparison
            </span>
          </div>

          {/* VS display */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-right flex-1">
              {comparison.tool1Name}
            </span>
            <span className="shrink-0 text-xl font-black text-white/50 bg-white/10 rounded-full w-12 h-12 flex items-center justify-center border border-white/20">
              VS
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-left flex-1">
              {comparison.tool2Name}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-white/90 text-center mb-4 leading-snug">
            {comparison.title}
          </h1>

          <p className="text-white/80 text-center max-w-2xl mx-auto leading-relaxed">
            {comparison.excerpt}
          </p>

          <p className="text-xs text-white/50 text-center mt-4">
            Updated {formattedDate}
          </p>
        </div>
      </section>

      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Comparison Table */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Feature Comparison
            </h2>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="px-4 py-4 text-sm font-semibold text-white/80 uppercase tracking-wider">
                  Feature
                </div>
                <div className="px-4 py-4 text-sm font-bold text-white text-center border-l border-white/20">
                  {comparison.tool1Name}
                </div>
                <div className="px-4 py-4 text-sm font-bold text-white text-center border-l border-white/20">
                  {comparison.tool2Name}
                </div>
              </div>

              {/* Table Rows */}
              {comparison.rows.map((row, i) => {
                const winner = row.winner ?? "tie";
                const rowBg =
                  winner !== "tie"
                    ? winnerBg[winner]
                    : i % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50";

                return (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 border-t border-gray-100 ${rowBg}`}
                  >
                    <div className="px-4 py-4 text-sm font-medium text-gray-700 flex items-center gap-2">
                      {row.feature}
                      {winner !== "tie" && (
                        <span
                          className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${winnerBadge[winner]}`}
                        >
                          Winner
                        </span>
                      )}
                    </div>
                    <div
                      className={`px-4 py-4 text-sm text-center border-l border-gray-100 ${winnerCell1[winner]}`}
                    >
                      {row.tool1}
                      {winner === "tool1" && (
                        <span className="ml-1.5 text-green-600">&#10003;</span>
                      )}
                    </div>
                    <div
                      className={`px-4 py-4 text-sm text-center border-l border-gray-100 ${winnerCell2[winner]}`}
                    >
                      {row.tool2}
                      {winner === "tool2" && (
                        <span className="ml-1.5 text-green-600">&#10003;</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Our Verdict */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Verdict
            </h2>
            <div
              className={`rounded-2xl border p-6 sm:p-8 ${
                comparison.verdictWinner === "tie"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-green-200 bg-green-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    comparison.verdictWinner === "tie"
                      ? "bg-yellow-200"
                      : "bg-green-200"
                  }`}
                >
                  {comparison.verdictWinner === "tie" ? "=" : "*"}
                </div>
                <div>
                  <p
                    className={`text-sm font-bold mb-1 ${
                      comparison.verdictWinner === "tie"
                        ? "text-yellow-800"
                        : "text-green-800"
                    }`}
                  >
                    {comparison.verdictWinner === "tie"
                      ? "It depends on your use case"
                      : `Winner: ${
                          comparison.verdictWinner === "tool1"
                            ? comparison.tool1Name
                            : comparison.tool2Name
                        }`}
                  </p>
                  <p
                    className={`text-base leading-relaxed ${
                      comparison.verdictWinner === "tie"
                        ? "text-yellow-900"
                        : "text-green-900"
                    }`}
                  >
                    {comparison.verdict}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTAs */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Try Both Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tool 1 CTA */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {comparison.tool1Name}
                </h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  See full review, pricing details, and features.
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <Link
                    href={`/tools/${comparison.tool1Slug}/`}
                    className="text-sm font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition text-center"
                  >
                    Read {comparison.tool1Name} Review
                  </Link>
                  <Link
                    href={`/go/${comparison.tool1Slug}/`}
                    rel="nofollow noopener"
                    className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition text-center"
                  >
                    Try {comparison.tool1Name} &rarr;
                  </Link>
                </div>
              </div>

              {/* Tool 2 CTA */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all flex flex-col items-center text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {comparison.tool2Name}
                </h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  See full review, pricing details, and features.
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <Link
                    href={`/tools/${comparison.tool2Slug}/`}
                    className="text-sm font-semibold text-indigo-600 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl transition text-center"
                  >
                    Read {comparison.tool2Name} Review
                  </Link>
                  <Link
                    href={`/go/${comparison.tool2Slug}/`}
                    rel="nofollow noopener"
                    className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl transition text-center"
                  >
                    Try {comparison.tool2Name} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          {comparison.faqs && comparison.faqs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {comparison.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-200 p-6"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Comparisons */}
          {relatedComparisons.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                More Comparisons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedComparisons.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/compare/${related.slug}/`}
                    className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all flex flex-col"
                  >
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        Compare
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition">
                      {related.tool1Name}{" "}
                      <span className="text-gray-400 font-normal">vs</span>{" "}
                      {related.tool2Name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1 leading-relaxed">
                      {related.excerpt}
                    </p>
                    <span className="text-xs font-semibold text-blue-600 group-hover:underline mt-auto">
                      Compare &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
