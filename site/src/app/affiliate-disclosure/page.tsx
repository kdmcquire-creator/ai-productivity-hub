import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  alternates: {
    canonical: "https://aiproductivityhub.co/affiliate-disclosure/",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Affiliate Disclosure</h1>
      <p className="text-gray-500 mb-10">Last updated: March 17, 2026</p>

      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          AI Productivity Hub (aiproductivityhub.co) is a participant in various
          affiliate marketing programs. This means that when you click on
          certain links on our site and make a purchase, we may earn a
          commission at no additional cost to you.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          How Affiliate Links Work
        </h2>
        <p className="mb-6">
          Throughout our site, you will find links to products and services that
          we review, recommend, or reference. Some of these links are affiliate
          links. When you click an affiliate link and complete a purchase on the
          linked site, the merchant pays us a small referral fee. This is a
          standard practice across the internet and helps us keep this site
          running and continue producing free, high-quality content.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Editorial Integrity
        </h2>
        <p className="mb-6">
          Earning affiliate commissions does not influence our editorial content,
          opinions, or recommendations. We are committed to providing honest,
          unbiased reviews and advice. Our recommendations are based on real
          evaluation, hands-on testing, and thorough research. We only recommend
          products and services that we genuinely believe will provide value to
          our readers.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Types of Compensation
        </h2>
        <p className="mb-4">
          We may receive compensation through the following channels:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Affiliate Links</strong> &mdash; We earn a commission when
            you purchase a product or service through our referral links.
          </li>
          <li>
            <strong>Sponsored Content</strong> &mdash; Occasionally, we publish
            content in partnership with brands. Sponsored posts are always
            clearly labeled.
          </li>
          <li>
            <strong>Display Advertising</strong> &mdash; We display
            advertisements through ad networks such as Google AdSense. These ads
            help support the operation of our site.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Our Promise to You
        </h2>
        <p className="mb-6">
          Every review, comparison, and recommendation on AI Productivity Hub is
          based on honest assessment and real evaluation. We test the tools we
          write about, and we are transparent about the strengths and weaknesses
          of each product. If a tool does not meet our standards, we will say so
          regardless of any affiliate relationship.
        </p>

        <p className="mb-6">
          If you have any questions about our affiliate relationships, please
          feel free to{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
