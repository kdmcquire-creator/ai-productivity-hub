import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "AI Tool Comparisons — Head-to-Head Reviews",
  description:
    "Side-by-side comparisons of the best AI productivity tools. Find out which tool wins on pricing, features, and ease of use before you buy.",
  alternates: {
    canonical: "https://aiproductivityhub.co/compare/",
  },
  openGraph: {
    title: "AI Tool Comparisons — Head-to-Head Reviews",
    description:
      "Side-by-side comparisons of the best AI productivity tools. Find out which tool wins on pricing, features, and ease of use before you buy.",
  },
};

export default function ComparePage() {
  return (
    <>
      {/* Gradient Hero Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
            AI Tool Comparisons
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Head-to-head breakdowns of the top AI tools. We compare pricing,
            features, and real-world performance so you can choose with
            confidence.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            {comparisons.length} Comparisons
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((comparison) => {
              const formattedDate = new Date(
                comparison.dateISO
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}/`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all flex flex-col"
                >
                  {/* Accent bar */}
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 to-indigo-700" />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        Compare
                      </span>
                      <span className="text-xs text-gray-400">
                        {comparison.rows.length} features compared
                      </span>
                    </div>

                    {/* VS display */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-lg font-extrabold text-gray-900 leading-tight">
                        {comparison.tool1Name}
                      </span>
                      <span className="shrink-0 text-xs font-black text-gray-400 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                        VS
                      </span>
                      <span className="text-lg font-extrabold text-gray-900 leading-tight">
                        {comparison.tool2Name}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 line-clamp-3 mb-5 flex-1 leading-relaxed">
                      {comparison.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <time
                        dateTime={comparison.dateISO}
                        className="text-xs text-gray-400"
                      >
                        {formattedDate}
                      </time>
                      <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                        Compare &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {comparisons.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No comparisons yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
