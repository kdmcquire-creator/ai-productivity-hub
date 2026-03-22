export interface ComparisonRow {
  feature: string;
  tool1: string;
  tool2: string;
  winner?: "tool1" | "tool2" | "tie";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Comparison {
  slug: string;
  tool1Slug: string;
  tool2Slug: string;
  tool1Name: string;
  tool2Name: string;
  title: string;
  excerpt: string;
  dateISO: string;
  verdict: string;
  verdictWinner: "tool1" | "tool2" | "tie";
  rows: ComparisonRow[];
  faqs?: FAQItem[];
}

export const comparisons: Comparison[] = [
  {
    slug: "jasper-ai-vs-grammarly",
    tool1Slug: "jasper-ai",
    tool2Slug: "grammarly",
    tool1Name: "Jasper AI",
    tool2Name: "Grammarly",
    title: "Jasper AI vs Grammarly: Which is Better?",
    excerpt:
      "Jasper AI and Grammarly both help you write better, but they serve very different purposes. Jasper generates long-form content from scratch while Grammarly polishes what you already have.",
    dateISO: "2025-10-15",
    verdict:
      "Grammarly wins for editing and grammar correction — it's unmatched for polishing existing copy. But if you need to generate large volumes of original marketing content, Jasper AI's brand voice controls and templates make it the clear choice for content teams.",
    verdictWinner: "tie",
    rows: [
      {
        feature: "Pricing (entry)",
        tool1: "$49/mo (Creator)",
        tool2: "$12/mo (Pro)",
        winner: "tool2",
      },
      {
        feature: "Free Tier",
        tool1: "No free plan",
        tool2: "Free plan available",
        winner: "tool2",
      },
      {
        feature: "Best For",
        tool1: "Content generation at scale",
        tool2: "Grammar, tone & style editing",
        winner: "tie",
      },
      {
        feature: "Ease of Use",
        tool1: "Moderate learning curve",
        tool2: "Very easy, browser extension",
        winner: "tool2",
      },
      {
        feature: "Key Strength",
        tool1: "50+ templates, brand voice",
        tool2: "Real-time grammar & clarity",
        winner: "tie",
      },
      {
        feature: "Long-form Writing",
        tool1: "Excellent — built for it",
        tool2: "Limited generation capability",
        winner: "tool1",
      },
      {
        feature: "Integration",
        tool1: "SurferSEO, Zapier, HubSpot",
        tool2: "Google Docs, Word, browser",
        winner: "tool2",
      },
      {
        feature: "Team Collaboration",
        tool1: "Full workflow & approvals",
        tool2: "Style guides (Business plan)",
        winner: "tool1",
      },
    ],
    faqs: [
      {
        question: "Is Jasper AI better than Grammarly for content creation?",
        answer: "Jasper AI is better for generating original content from scratch, while Grammarly excels at editing and polishing existing text. They serve different purposes and many content teams use both together.",
      },
      {
        question: "Can I use Jasper AI and Grammarly together?",
        answer: "Yes, this is a popular workflow. Use Jasper AI to generate drafts and Grammarly to refine grammar, tone, and clarity. They complement each other well.",
      },
      {
        question: "Which is cheaper, Jasper AI or Grammarly?",
        answer: "Grammarly is significantly cheaper, starting at $12/month with a free tier. Jasper AI starts at $49/month with no free plan. However, Jasper generates content while Grammarly only edits.",
      },
    ],
  },
  {
    slug: "chatgpt-vs-claude",
    tool1Slug: "chatgpt",
    tool2Slug: "claude-ai",
    tool1Name: "ChatGPT",
    tool2Name: "Claude",
    title: "ChatGPT vs Claude: Which AI Assistant is Better?",
    excerpt:
      "ChatGPT and Claude are the two leading AI assistants in 2025. Both handle writing, coding, and analysis — but each has a distinct personality, context window, and set of strengths.",
    dateISO: "2025-11-01",
    verdict:
      "ChatGPT edges ahead for most users thanks to its massive plugin ecosystem, image generation via DALL-E, and broadest integrations. Claude is the better pick for long-document analysis, nuanced writing tasks, and users who prefer a more conversational, honest AI.",
    verdictWinner: "tool1",
    rows: [
      {
        feature: "Pricing (entry)",
        tool1: "$20/mo (Plus)",
        tool2: "$20/mo (Pro)",
        winner: "tie",
      },
      {
        feature: "Free Tier",
        tool1: "Yes — GPT-3.5 free",
        tool2: "Yes — limited Claude 3 free",
        winner: "tie",
      },
      {
        feature: "Best For",
        tool1: "Versatile everyday tasks",
        tool2: "Long-form analysis & writing",
        winner: "tie",
      },
      {
        feature: "Context Window",
        tool1: "128k tokens (GPT-4o)",
        tool2: "200k tokens (Claude 3.5)",
        winner: "tool2",
      },
      {
        feature: "Image Generation",
        tool1: "Yes — DALL-E 3 built-in",
        tool2: "No image generation",
        winner: "tool1",
      },
      {
        feature: "Coding Ability",
        tool1: "Excellent, Code Interpreter",
        tool2: "Excellent, strong reasoning",
        winner: "tie",
      },
      {
        feature: "Integration & Plugins",
        tool1: "GPT store, 1000+ plugins",
        tool2: "API available, fewer plugins",
        winner: "tool1",
      },
      {
        feature: "Safety & Honesty",
        tool1: "Strong guardrails",
        tool2: "Constitutional AI, very honest",
        winner: "tool2",
      },
    ],
    faqs: [
      {
        question: "Is ChatGPT or Claude better for writing?",
        answer: "Claude is generally considered better for long-form writing, nuanced analysis, and following complex instructions. ChatGPT is stronger for creative tasks, image generation, and has a larger plugin ecosystem.",
      },
      {
        question: "Which AI assistant has a better free tier?",
        answer: "ChatGPT offers a free tier with GPT-4o mini access. Claude also offers a free tier with limited usage of Claude Sonnet. Both are generous for casual use.",
      },
      {
        question: "Can ChatGPT and Claude handle coding tasks?",
        answer: "Both are excellent at coding. ChatGPT has a built-in Code Interpreter for running Python. Claude excels at reasoning through complex codebases and providing detailed explanations.",
      },
    ],
  },
  {
    slug: "fireflies-ai-vs-otter-ai",
    tool1Slug: "fireflies-ai",
    tool2Slug: "otter-ai",
    tool1Name: "Fireflies AI",
    tool2Name: "Otter.ai",
    title: "Fireflies AI vs Otter.ai: Best Meeting Transcription Tool?",
    excerpt:
      "Both Fireflies AI and Otter.ai automatically transcribe your meetings — but they differ sharply on integrations, AI summaries, and pricing. Here's how they compare in 2025.",
    dateISO: "2025-10-28",
    verdict:
      "Fireflies AI wins for teams that need deep CRM integrations and AI-driven action items across many meeting platforms. Otter.ai is better suited for individuals or small teams who want a simple, affordable transcription tool with a generous free tier.",
    verdictWinner: "tool1",
    rows: [
      {
        feature: "Pricing (entry paid)",
        tool1: "$10/mo (Pro)",
        tool2: "$8.33/mo (Pro)",
        winner: "tool2",
      },
      {
        feature: "Free Tier",
        tool1: "800 mins/mo free",
        tool2: "600 mins/mo free",
        winner: "tool1",
      },
      {
        feature: "Best For",
        tool1: "Sales & ops teams",
        tool2: "Individuals & small teams",
        winner: "tie",
      },
      {
        feature: "AI Summaries",
        tool1: "Full AI notes & action items",
        tool2: "AI chapters & highlights",
        winner: "tool1",
      },
      {
        feature: "CRM Integration",
        tool1: "Salesforce, HubSpot, Pipedrive",
        tool2: "Limited CRM integrations",
        winner: "tool1",
      },
      {
        feature: "Meeting Platforms",
        tool1: "Zoom, Teams, Meet, Webex+",
        tool2: "Zoom, Teams, Meet",
        winner: "tool1",
      },
      {
        feature: "Ease of Use",
        tool1: "Easy, auto-join bot",
        tool2: "Very easy, real-time display",
        winner: "tool2",
      },
      {
        feature: "Collaboration",
        tool1: "Team workspaces, soundbites",
        tool2: "Shared folders, comments",
        winner: "tie",
      },
    ],
    faqs: [
      {
        question: "Is Fireflies.ai or Otter.ai better for meeting transcription?",
        answer: "Fireflies.ai is better for teams that need CRM integration and automated action items. Otter.ai is better for real-time transcription during meetings and individual use.",
      },
      {
        question: "Do Fireflies.ai and Otter.ai work with Zoom?",
        answer: "Yes, both integrate with Zoom, Google Meet, and Microsoft Teams. Fireflies uses a bot that joins the call, while Otter provides real-time captions during the meeting.",
      },
      {
        question: "Which meeting transcription tool has a better free tier?",
        answer: "Both offer free tiers. Otter.ai gives 300 minutes per month with real-time transcription. Fireflies.ai offers limited transcriptions with AI summaries on the free plan.",
      },
    ],
  },
  {
    slug: "canva-ai-vs-midjourney",
    tool1Slug: "canva",
    tool2Slug: "midjourney",
    tool1Name: "Canva AI",
    tool2Name: "Midjourney",
    title: "Canva AI vs Midjourney: Best AI Design Tool?",
    excerpt:
      "Canva AI and Midjourney both use AI to help you create stunning visuals — but they target completely different users. Canva is an all-in-one design platform; Midjourney is a pure AI image generator.",
    dateISO: "2025-11-10",
    verdict:
      "Canva AI is the clear winner for business users and marketers who need to produce polished, branded graphics quickly without a design background. Midjourney wins for artists, illustrators, and creatives who want the absolute best AI image quality with full prompt control.",
    verdictWinner: "tie",
    rows: [
      {
        feature: "Pricing (entry paid)",
        tool1: "$15/mo (Pro)",
        tool2: "$10/mo (Basic)",
        winner: "tool2",
      },
      {
        feature: "Free Tier",
        tool1: "Generous free plan",
        tool2: "No free plan (trial ended)",
        winner: "tool1",
      },
      {
        feature: "Best For",
        tool1: "Marketing & business graphics",
        tool2: "Artistic AI image generation",
        winner: "tie",
      },
      {
        feature: "Ease of Use",
        tool1: "Very easy, drag-and-drop",
        tool2: "Steep prompt learning curve",
        winner: "tool1",
      },
      {
        feature: "Image Quality",
        tool1: "Good for templates/graphics",
        tool2: "Best-in-class photorealism",
        winner: "tool2",
      },
      {
        feature: "Templates",
        tool1: "100,000+ templates",
        tool2: "No templates — prompts only",
        winner: "tool1",
      },
      {
        feature: "Brand Kit",
        tool1: "Full brand kit & fonts",
        tool2: "Style references via --sref",
        winner: "tool1",
      },
      {
        feature: "Output Control",
        tool1: "Pixel-perfect editing",
        tool2: "Deep prompt & parameter control",
        winner: "tie",
      },
    ],
    faqs: [
      {
        question: "Is Canva AI or Midjourney better for beginners?",
        answer: "Canva AI is much easier for beginners with its drag-and-drop editor and templates. Midjourney requires learning prompt engineering and uses Discord, which has a steeper learning curve.",
      },
      {
        question: "Can Canva AI generate images like Midjourney?",
        answer: "Canva has AI image generation (Magic Media), but Midjourney produces significantly higher quality artistic images. Canva is better for practical design work like presentations and social posts.",
      },
      {
        question: "Which is cheaper for AI design, Canva or Midjourney?",
        answer: "Canva offers a free tier with limited AI features and Pro at $13/month. Midjourney has no free tier and starts at $10/month for basic access. Canva provides more overall design value for the price.",
      },
    ],
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
