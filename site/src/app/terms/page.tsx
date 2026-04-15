import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: {
    canonical: "https://aiproductivityhub.co/terms/",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-500 mb-10">Last updated: March 17, 2026</p>

      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          1. Agreement to Terms
        </h2>
        <p className="mb-6">
          By accessing and using AI Productivity Hub (aiproductivityhub.co), you
          agree to be bound by these Terms of Service. If you do not agree with
          any part of these terms, you should not use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Use of Site</h2>
        <p className="mb-4">
          You may use our site for lawful purposes only. You agree not to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            Use the site in any way that violates applicable local, state,
            national, or international law.
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the site, its
            servers, or any connected systems.
          </li>
          <li>
            Reproduce, duplicate, copy, sell, or exploit any portion of the site
            without express written permission.
          </li>
          <li>
            Use automated systems, bots, or scrapers to access the site without
            our prior consent.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          3. Intellectual Property
        </h2>
        <p className="mb-6">
          All content on AI Productivity Hub, including text, graphics, logos,
          images, and software, is the property of AI Productivity Hub or its
          content suppliers and is protected by intellectual property laws. You
          may not reproduce, distribute, or create derivative works from our
          content without prior written consent.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          4. Affiliate Links &amp; Third-Party Content
        </h2>
        <p className="mb-6">
          Our site contains affiliate links to third-party products and
          services. When you click on these links and make a purchase, we may
          earn a commission at no additional cost to you. We are not responsible
          for the content, accuracy, or practices of third-party websites linked
          from our site. Your interactions with third-party sites are governed by
          their own terms and policies.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Disclaimer</h2>
        <p className="mb-6">
          The information provided on AI Productivity Hub is for general
          informational purposes only. While we strive to keep the information
          accurate and up to date, we make no representations or warranties of
          any kind, express or implied, about the completeness, accuracy,
          reliability, or suitability of the information, products, services, or
          related graphics contained on the site. Any reliance you place on such
          information is strictly at your own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          6. Limitation of Liability
        </h2>
        <p className="mb-6">
          To the fullest extent permitted by law, AI Productivity Hub and its
          owners, operators, and contributors shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages
          arising from your use of the site, including but not limited to loss of
          profits, data, or other intangible losses, even if we have been advised
          of the possibility of such damages.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          7. Changes to Terms
        </h2>
        <p className="mb-6">
          We reserve the right to modify these Terms of Service at any time.
          Changes will be effective immediately upon posting to this page. Your
          continued use of the site after any changes constitutes your acceptance
          of the new terms. We encourage you to review this page periodically.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">8. Contact</h2>
        <p className="mb-6">
          If you have any questions about these Terms of Service, please contact
          us at{" "}
          <a
            href="mailto:contact@aiproductivityhub.co"
            className="text-blue-600 hover:underline"
          >
            contact@aiproductivityhub.co
          </a>
          .
        </p>
      </div>
    </div>
  );
}
