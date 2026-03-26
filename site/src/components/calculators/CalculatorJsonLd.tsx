const BASE_URL = "https://aiproductivityhub.co";

/**
 * JSON-LD SoftwareApplication schema for calculator pages.
 *
 * Security note: This component only serialises our own static data objects
 * derived from the calculators data model (src/lib/calculators.ts). No user
 * input is ever interpolated into the JSON string. This is the same safe
 * pattern used by the existing JsonLd.tsx component in this codebase.
 */
export function CalculatorJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${BASE_URL}/tools/calculators/${slug}/`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // Safe: only serialises our own static data, never user input
  const jsonString = JSON.stringify(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
