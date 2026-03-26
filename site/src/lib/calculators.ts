export interface Calculator {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  category: string;
  keywords: string[];
}

export const calculators: Calculator[] = [
  {
    slug: "ai-roi-calculator",
    name: "AI ROI Calculator",
    description:
      "Calculate the return on investment of adopting AI tools for your workflow. Estimate hours saved, money saved, annual ROI, and payback period based on your specific situation.",
    shortDescription:
      "Estimate your ROI from adopting AI tools — hours saved, money saved, and payback period.",
    icon: "chart-bar",
    color: "from-blue-500 to-indigo-600",
    category: "Financial",
    keywords: [
      "AI ROI",
      "return on investment",
      "AI savings",
      "productivity ROI",
      "AI cost benefit",
    ],
  },
  {
    slug: "token-cost-estimator",
    name: "Token Cost Estimator",
    description:
      "Estimate your monthly costs for using AI language models like GPT-4, Claude, and Gemini. Compare pricing across models with separate input and output token costs.",
    shortDescription:
      "Compare token costs across GPT-4, Claude, and Gemini for your usage pattern.",
    icon: "currency-dollar",
    color: "from-emerald-500 to-teal-600",
    category: "Financial",
    keywords: [
      "token cost",
      "API pricing",
      "GPT-4 cost",
      "Claude pricing",
      "Gemini cost",
      "LLM pricing",
    ],
  },
  {
    slug: "ai-tool-comparison-scorecard",
    name: "AI Tool Comparison Scorecard",
    description:
      "Compare up to 4 AI tools side-by-side with weighted scoring across features, pricing, ease of use, support, and integrations. Find the best tool for your needs.",
    shortDescription:
      "Score and compare up to 4 AI tools with customizable weighted criteria.",
    icon: "scale",
    color: "from-purple-500 to-violet-600",
    category: "Comparison",
    keywords: [
      "tool comparison",
      "AI scorecard",
      "weighted comparison",
      "tool evaluation",
    ],
  },
  {
    slug: "meeting-cost-calculator",
    name: "Meeting Cost Calculator",
    description:
      "Calculate the true cost of meetings in your organization. See weekly, monthly, and annual costs based on attendees, hourly rates, and frequency.",
    shortDescription:
      "Discover the true cost of meetings and how AI tools can help recover lost time.",
    icon: "users",
    color: "from-amber-500 to-orange-600",
    category: "Productivity",
    keywords: [
      "meeting cost",
      "meeting ROI",
      "meeting productivity",
      "time wasted in meetings",
    ],
  },
  {
    slug: "content-production-calculator",
    name: "Content Production Calculator",
    description:
      "Compare the cost of content production with and without AI tools. Calculate potential savings and how many more articles you could produce with the same budget.",
    shortDescription:
      "See how much you can save on content production by integrating AI writing tools.",
    icon: "document-text",
    color: "from-rose-500 to-pink-600",
    category: "Content",
    keywords: [
      "content cost",
      "AI writing",
      "content production",
      "writing cost",
      "content ROI",
    ],
  },
  {
    slug: "automation-savings-calculator",
    name: "Automation Savings Calculator",
    description:
      "Add your repetitive tasks, their frequency and duration, and see exactly how much time and money you could save with automation. Tasks are ranked by savings potential.",
    shortDescription:
      "Identify which repetitive tasks to automate first for maximum savings.",
    icon: "cog",
    color: "from-cyan-500 to-blue-600",
    category: "Productivity",
    keywords: [
      "automation ROI",
      "task automation",
      "time savings",
      "workflow automation",
    ],
  },
  {
    slug: "team-productivity-score",
    name: "Team Productivity Score",
    description:
      "Measure your team's productivity ratio by analyzing how time is split between deep work, meetings, admin, and email. Get personalized AI tool recommendations.",
    shortDescription:
      "Analyze your team's time allocation and get AI tool recommendations to boost productivity.",
    icon: "user-group",
    color: "from-indigo-500 to-blue-600",
    category: "Productivity",
    keywords: [
      "team productivity",
      "productivity score",
      "deep work ratio",
      "time management",
    ],
  },
  {
    slug: "saas-spend-analyzer",
    name: "SaaS Spend Analyzer",
    description:
      "Track your SaaS subscriptions, identify rarely used tools you could cut, and discover AI-powered alternatives that could consolidate your tech stack and reduce costs.",
    shortDescription:
      "Audit your SaaS subscriptions to find savings and smarter AI alternatives.",
    icon: "credit-card",
    color: "from-slate-500 to-gray-600",
    category: "Financial",
    keywords: [
      "SaaS spend",
      "subscription audit",
      "SaaS optimization",
      "tool consolidation",
    ],
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}
