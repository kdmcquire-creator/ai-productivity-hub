import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The AI Productivity Hub Editorial Team",
  description:
    "AI Productivity Hub is published by Moonsmoke LLC — a small, operator-led editorial team reviewing AI productivity tools we actually use to run our day-to-day workflow.",
  alternates: {
    canonical: "https://aiproductivityhub.co/about/editorial-team/",
  },
  openGraph: {
    title: "The AI Productivity Hub Editorial Team",
    description:
      "Published by Moonsmoke LLC. Small, operator-led editorial team reviewing AI productivity tools we use daily.",
    type: "website",
    url: "https://aiproductivityhub.co/about/editorial-team/",
  },
};

export default function EditorialTeamPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        The AI Productivity Hub Editorial Team
      </h1>

      <section className="prose prose-lg max-w-none">
        <p className="mb-6">
          AI Productivity Hub is part of the Moonsmoke Network &mdash; a small,
          operator-led editorial team running a handful of sites on topics we
          use daily in our own business. We review AI productivity tools we
          actually use to run our day-to-day workflow.
        </p>

        {/* Brand block */}
        <div className="not-prose bg-gray-50 border border-gray-200 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="flex-shrink-0">
            <Image
              src="/moonsmoke/logo.png"
              alt="Moonsmoke LLC logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-semibold text-gray-900 text-lg mb-1">
              Moonsmoke LLC &bull; Austin, Texas
            </p>
            <p className="text-sm text-gray-600 mb-3">
              Publisher of the Moonsmoke Network
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Our other sites: </span>
              <a
                href="https://aifinancehub.ai/"
                className="text-blue-600 hover:underline"
              >
                AI Finance Hub
              </a>
              {" \u00b7 "}
              <a
                href="https://clarity-engine.ai/"
                className="text-blue-600 hover:underline"
              >
                Clarity Engine
              </a>
              {" \u00b7 "}
              <a
                href="https://legaltech-ai-hub.com/"
                className="text-blue-600 hover:underline"
              >
                LegalTech AI Hub
              </a>
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">How We Work</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            We use AI tools to help research and draft content. Every article
            is reviewed and edited by a human before publication. We never
            publish raw AI output.
          </li>
          <li>
            We only recommend tools we&apos;ve actually used. If we haven&apos;t
            used it, we say so.
          </li>
          <li>
            Affiliate disclosures appear on every review. Recommendations are
            never paid placements.
          </li>
          <li>
            We update posts when tools change pricing, features, or
            positioning.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Find Us Elsewhere</h2>
        <div className="not-prose flex flex-wrap gap-3 mb-10">
          <a
            href="https://www.linkedin.com/company/moonsmoke/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-medium px-4 py-2 rounded-lg transition"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/MoonsmokeNetwrk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-medium px-4 py-2 rounded-lg transition"
          >
            X (Twitter)
          </a>
          <a
            href="https://www.pinterest.com/moonsmokecontent/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-medium px-4 py-2 rounded-lg transition"
          >
            Pinterest
          </a>
        </div>

        {/* Footer links */}
        <div className="not-prose border-t border-gray-200 pt-6 mt-10 flex flex-wrap gap-6 text-sm">
          <Link
            href="/about/editorial-standards/"
            className="text-blue-600 hover:underline font-medium"
          >
            Editorial Standards &rarr;
          </Link>
          <Link
            href="/contact/"
            className="text-blue-600 hover:underline font-medium"
          >
            Contact Us &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
