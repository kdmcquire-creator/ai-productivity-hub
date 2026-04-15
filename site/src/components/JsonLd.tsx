import type { Tool } from "@/lib/tools";
import type { BlogPost } from "@/lib/blog";
import type { Comparison, FAQItem } from "@/lib/comparisons";

const BASE_URL = "https://aiproductivityhub.co";

// Generic JSON-LD script injector
// Safe: only serializes our own static data objects, never user input
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Website schema — used on homepage
export function WebSiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "AI Productivity Hub",
        url: BASE_URL,
        description:
          "Discover, compare, and choose the best AI productivity tools for writing, design, marketing, development, and more.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/tools/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

// Organization schema
export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "AI Productivity Hub",
        url: BASE_URL,
        sameAs: [],
      }}
    />
  );
}

// Breadcrumb schema
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

// SoftwareApplication schema for tool pages
export function ToolJsonLd({ tool }: { tool: Tool }) {
  const offers = tool.pricing.map((p) => ({
    "@type": "Offer",
    name: p.tier,
    price: p.price === "Free" ? "0" : p.price.replace(/[^0-9.]/g, "") || "0",
    priceCurrency: "USD",
    description: p.note || p.tier,
  }));

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        url: `${BASE_URL}/tools/${tool.slug}/`,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web",
        offers: offers.length === 1 ? offers[0] : offers,
        featureList: tool.features,
      }}
    />
  );
}

// Article schema for blog posts
export function ArticleJsonLd({ post }: { post: BlogPost }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.dateISO,
        author: {
          "@type": "Person",
          name: post.author,
          url: `${BASE_URL}/author/${post.authorSlug}/`,
        },
        publisher: {
          "@type": "Organization",
          name: "AI Productivity Hub",
          url: BASE_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/blog/${post.slug}/`,
        },
      }}
    />
  );
}

// Article schema for comparison pages
export function ComparisonJsonLd({ comparison }: { comparison: Comparison }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: comparison.title,
        description: comparison.excerpt,
        datePublished: comparison.dateISO,
        publisher: {
          "@type": "Organization",
          name: "AI Productivity Hub",
          url: BASE_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/compare/${comparison.slug}/`,
        },
      }}
    />
  );
}

// FAQ schema for comparison pages (rich snippets in Google)
export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  if (faqs.length === 0) return null;
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

// ItemList schema for directory pages
export function ToolDirectoryJsonLd({
  tools,
}: {
  tools: { name: string; slug: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AI Productivity Tools Directory",
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: tool.name,
          url: `${BASE_URL}/tools/${tool.slug}/`,
        })),
      }}
    />
  );
}
