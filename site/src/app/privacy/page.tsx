import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: {
    canonical: "https://aiproductivityhub.co/privacy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-500 mb-10">Last updated: March 17, 2026</p>

      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          Welcome to AI Productivity Hub (aiproductivityhub.co). We respect your
          privacy and are committed to protecting the personal data you share
          with us. This Privacy Policy explains how we collect, use, and
          safeguard your information when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect the following types of information:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Personal information</strong> you provide voluntarily, such
            as your name and email address when you submit our contact form or
            subscribe to our newsletter.
          </li>
          <li>
            <strong>Usage data</strong> collected automatically, including your
            IP address, browser type, operating system, referring URLs, pages
            viewed, and time spent on our site.
          </li>
          <li>
            <strong>Device information</strong> such as screen resolution and
            device type, used to optimize your browsing experience.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>To respond to your inquiries and provide customer support.</li>
          <li>
            To send newsletters and updates you have opted in to receive.
          </li>
          <li>
            To analyze website traffic and improve our content, layout, and user
            experience.
          </li>
          <li>To detect and prevent fraud or abuse.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          3. Cookies and Tracking
        </h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to enhance your
          experience on our site. These may include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Essential cookies</strong> required for the site to function
            properly.
          </li>
          <li>
            <strong>Analytics cookies</strong> (such as Google Analytics) to
            understand how visitors interact with our site.
          </li>
          <li>
            <strong>Advertising cookies</strong> used by ad networks to deliver
            relevant advertisements.
          </li>
        </ul>
        <p className="mb-6">
          You can control cookie preferences through your browser settings. Note
          that disabling cookies may affect your experience on our site.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          4. Third-Party Services
        </h2>
        <p className="mb-6">
          We use third-party services that may collect information about you,
          including Google Analytics for traffic analysis, Google AdSense for
          advertising, and email service providers for newsletter delivery. These
          services have their own privacy policies governing how they use your
          data.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          5. Affiliate Links
        </h2>
        <p className="mb-6">
          Our site contains affiliate links to third-party products and
          services. When you click on these links and make a purchase, we may
          earn a commission. These affiliate partners may use cookies to track
          referrals. Please refer to our Affiliate Disclosure page for more
          details.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          6. Data Security
        </h2>
        <p className="mb-6">
          We implement reasonable technical and organizational measures to
          protect your personal data against unauthorized access, alteration,
          disclosure, or destruction. However, no method of transmission over the
          Internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">7. Your Rights</h2>
        <p className="mb-4">
          Depending on your jurisdiction, you may have the following rights
          regarding your personal data:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>The right to access the personal data we hold about you.</li>
          <li>The right to request correction of inaccurate data.</li>
          <li>
            The right to request deletion of your data, subject to legal
            obligations.
          </li>
          <li>
            The right to opt out of marketing communications at any time.
          </li>
          <li>
            The right to lodge a complaint with a data protection authority.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">8. Contact Us</h2>
        <p className="mb-6">
          If you have any questions about this Privacy Policy or wish to exercise
          your rights, please contact us at{" "}
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
