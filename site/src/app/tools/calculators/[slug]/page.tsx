import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { calculators, getCalculatorBySlug } from "@/lib/calculators";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import AiRoiCalculator from "@/components/calculators/AiRoiCalculator";
import TokenCostCalculator from "@/components/calculators/TokenCostCalculator";
import ToolScorecardCalculator from "@/components/calculators/ToolScorecardCalculator";
import MeetingCostCalculator from "@/components/calculators/MeetingCostCalculator";
import ContentProductionCalculator from "@/components/calculators/ContentProductionCalculator";
import AutomationSavingsCalculator from "@/components/calculators/AutomationSavingsCalculator";
import TeamProductivityCalculator from "@/components/calculators/TeamProductivityCalculator";
import SaasSpendCalculator from "@/components/calculators/SaasSpendCalculator";
import { CalculatorJsonLd } from "@/components/calculators/CalculatorJsonLd";

const BASE_URL = "https://aiproductivityhub.co";

const CALCULATOR_COMPONENTS: Record<string, React.ComponentType> = {
  "ai-roi-calculator": AiRoiCalculator,
  "token-cost-estimator": TokenCostCalculator,
  "ai-tool-comparison-scorecard": ToolScorecardCalculator,
  "meeting-cost-calculator": MeetingCostCalculator,
  "content-production-calculator": ContentProductionCalculator,
  "automation-savings-calculator": AutomationSavingsCalculator,
  "team-productivity-score": TeamProductivityCalculator,
  "saas-spend-analyzer": SaasSpendCalculator,
};

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return { title: "Calculator Not Found" };

  return {
    title: `${calc.name} - Free Online Tool`,
    description: calc.description,
    keywords: calc.keywords,
    openGraph: {
      title: `${calc.name} | AI Productivity Hub`,
      description: calc.description,
      url: `${BASE_URL}/tools/calculators/${calc.slug}/`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(calc.name)}&type=tools`,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/tools/calculators/${calc.slug}/`,
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();

  const Component = CALCULATOR_COMPONENTS[slug];
  if (!Component) notFound();

  const relatedCalcs = calculators
    .filter((c) => c.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Tools", url: `${BASE_URL}/tools/` },
          { name: "Calculators", url: `${BASE_URL}/tools/calculators/` },
          {
            name: calc.name,
            url: `${BASE_URL}/tools/calculators/${calc.slug}/`,
          },
        ]}
      />
      <CalculatorJsonLd
        name={calc.name}
        description={calc.description}
        slug={calc.slug}
      />

      {/* Hero */}
      <div className={`bg-gradient-to-r ${calc.color}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/tools/" className="hover:text-white transition">
              Tools
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/tools/calculators/"
              className="hover:text-white transition"
            >
              Calculators
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{calc.name}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {calc.name}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed">
            {calc.description}
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <Component />
        </div>

        {/* Email CTA */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <p className="font-semibold text-gray-900 mb-1">
            Want to save your results?
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Sign up for our newsletter and get calculator results plus weekly AI
            tool insights.
          </p>
          <a
            href="/tools/"
            className="inline-block bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            Get Weekly AI Insights
          </a>
        </div>

        {/* Related calculators */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            More Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCalcs.map((rc) => (
              <Link
                key={rc.slug}
                href={`/tools/calculators/${rc.slug}/`}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-300 transition-all"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                  {rc.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {rc.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
