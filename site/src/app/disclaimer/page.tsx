import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
      <p className="text-gray-500 mb-10">Last updated: March 17, 2026</p>

      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          The information provided on AI Productivity Hub
          (aiproductivityhub.co) is for general informational and educational
          purposes only. It is not intended as, and should not be construed as,
          professional advice of any kind.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          No Guarantees
        </h2>
        <p className="mb-6">
          While we make every effort to ensure that the information on this site
          is accurate, complete, and up to date, we make no representations or
          warranties of any kind, express or implied, about the completeness,
          accuracy, reliability, suitability, or availability of the
          information, products, services, or related graphics contained on the
          site. Any reliance you place on such information is strictly at your
          own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Product Reviews &amp; Comparisons
        </h2>
        <p className="mb-6">
          Our reviews, comparisons, and recommendations are based on our own
          research, testing, and opinions at the time of writing. Software
          products change frequently, and features, pricing, and availability
          may differ from what is described on our site. We encourage you to
          verify current details directly with the product provider before
          making any purchasing decisions.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Third-Party Links
        </h2>
        <p className="mb-6">
          Our site may contain links to third-party websites and services. We
          have no control over the content, privacy policies, or practices of
          these external sites and accept no responsibility for them. Visiting
          third-party sites is at your own risk, and we encourage you to read
          their terms and policies.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Not Professional Advice
        </h2>
        <p className="mb-6">
          Nothing on this site constitutes financial, legal, medical, or other
          professional advice. You should consult appropriate professionals
          before making decisions based on information found on this site.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Limitation of Liability
        </h2>
        <p className="mb-6">
          In no event shall AI Productivity Hub, its owners, operators, or
          contributors be liable for any loss or damage, including without
          limitation, indirect or consequential loss or damage, arising from the
          use of this website or reliance on any information provided herein.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Contact</h2>
        <p className="mb-6">
          If you have any questions about this disclaimer, please{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
