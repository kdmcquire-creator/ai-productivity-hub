import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description:
    "How AI Productivity Hub researches, produces, and updates reviews. Our methodology, affiliate disclosures, corrections policy, and update cadence.",
  alternates: {
    canonical: "https://aiproductivityhub.co/about/editorial-standards/",
  },
  openGraph: {
    title: "Editorial Standards | AI Productivity Hub",
    description:
      "How we research, review, and update AI productivity tool coverage.",
    type: "website",
    url: "https://aiproductivityhub.co/about/editorial-standards/",
  },
};

export default function EditorialStandardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Editorial Standards</h1>
      <section className="prose prose-lg max-w-none">
        <p className="mb-6">
          AI Productivity Hub is published by the{" "}
          <Link href="/about/editorial-team/" className="text-blue-600 hover:underline">
            AI Productivity Hub Editorial Team
          </Link>
          , part of the Moonsmoke Network. Here&apos;s how we work.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Research Process</h2>
        <p className="mb-4">
          Hands-on use first. Documentation and vendor claims second. Public
          user reviews third. We sign up for the tools we cover and run real
          productivity tasks through them &mdash; writing, scheduling, meeting
          notes, project tracking &mdash; before we form an opinion. We only
          fall back to documentation or marketing claims when hands-on testing
          isn&apos;t possible, and we say so when that&apos;s the case.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Content Production
        </h2>
        <p className="mb-4">
          AI-assisted research and drafting. Human review and editing before
          publication. Fact-checking against primary sources. We use AI as a
          research and drafting aid, but every article passes through a human
          editor. We verify pricing, feature lists, and vendor claims against
          the tool&apos;s own documentation and our hands-on testing before
          publishing.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Review Methodology
        </h2>
        <p className="mb-4">
          We evaluate AI productivity tools on five dimensions: actual
          usefulness on real tasks, pricing transparency, ease of setup,
          integration with the tools you probably already use, and how well
          marketing promises line up with what the product actually does. We
          don&apos;t use a proprietary scoring system &mdash; we just tell you
          where each tool wins and where it falls short.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Affiliate Disclosure
        </h2>
        <p className="mb-4">
          We earn commissions on some links. See our{" "}
          <Link
            href="/affiliate-disclosure/"
            className="text-blue-600 hover:underline"
          >
            affiliate disclosure
          </Link>{" "}
          for details. We only link to products we recommend. Affiliate
          relationships never influence a recommendation &mdash; if a tool is
          mediocre, we say so, even when it has a generous payout.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Update Cadence</h2>
        <p className="mb-4">
          We re-review tools on a 90-day rolling schedule. Pricing and feature
          changes trigger immediate updates. When a vendor kills a feature,
          raises a price, or pivots the product, we update the relevant posts
          as soon as we notice &mdash; we don&apos;t wait for the next review
          cycle.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Corrections Policy
        </h2>
        <p className="mb-4">
          Found an error?{" "}
          <Link href="/contact/" className="text-blue-600 hover:underline">
            Contact us
          </Link>
          . We correct errors and note the update date at the top of any edited
          post. Material corrections are flagged; minor copy edits are not.
        </p>
      </section>
    </div>
  );
}
