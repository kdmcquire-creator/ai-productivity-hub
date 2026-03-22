export type LinkStatus = "ok" | "broken" | "redirect" | "unknown";
export type ReviewStatus = "current" | "stale" | "needs_review" | "draft";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  color: string;
  tagline: string;
  pricing: { tier: string; price: string; note?: string }[];
  useCases: string[];
  pros: string[];
  cons: string[];
  websiteUrl: string;
  affiliateUrl?: string;
  isFree?: boolean;
  bestFor: string;
  overview: string;
  // Health & review tracking (populated by automation crons)
  lastReviewedAt?: string;
  reviewStatus?: ReviewStatus;
  linkStatus?: LinkStatus;
  linkError?: string;
  lastCheckedAt?: string;
  rating?: number;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
}

export const categories: Category[] = [
  { name: "Writing", slug: "writing", icon: "\u270F\uFE0F" },
  { name: "Design", slug: "design", icon: "\uD83C\uDFA8" },
  { name: "Marketing", slug: "marketing", icon: "\uD83D\uDCE3" },
  { name: "Development", slug: "development", icon: "\uD83D\uDCBB" },
  { name: "Project Management", slug: "project-management", icon: "\uD83D\uDCCB" },
  { name: "Research", slug: "research", icon: "\uD83D\uDD0D" },
  { name: "Video Editing", slug: "video-editing", icon: "\uD83C\uDFAC" },
  { name: "Customer Support", slug: "customer-support", icon: "\uD83C\uDFA7" },
  { name: "Audio", slug: "audio", icon: "\uD83C\uDFB5" },
  { name: "Meeting Assistants", slug: "meeting-assistants", icon: "\uD83D\uDCC5" },
  { name: "Code", slug: "code", icon: "\uD83D\uDCBB" },
  { name: "Hosting", slug: "hosting", icon: "\u2601\uFE0F" },
];

export const tools: Tool[] = [
  {
    slug: "jasper-ai",
    name: "Jasper AI",
    description:
      "Jasper AI is an enterprise-grade AI copywriting platform that helps marketing teams create high-quality content at scale. It offers brand voice customization, campaign workflows, and integrations with popular marketing tools.",
    category: "Writing",
    features: [
      "Brand voice and tone customization",
      "50+ content templates for ads, emails, and blogs",
      "Campaign and workflow management",
      "SEO mode with SurferSEO integration",
      "Team collaboration and approval workflows",
    ],
    color: "from-red-500 to-orange-600",
    tagline: "AI-powered content creation for marketing teams",
    pricing: [
      { tier: "Creator", price: "$49/mo", note: "1 seat, 1 brand voice" },
      { tier: "Pro", price: "$69/mo", note: "1 seat, 3 brand voices" },
      { tier: "Business", price: "Custom", note: "Unlimited brand voices, API access" },
    ],
    useCases: [
      "Writing long-form blog posts and articles",
      "Generating ad copy for Google and Facebook campaigns",
      "Creating email marketing sequences",
      "Producing social media content at scale",
    ],
    pros: [
      "Excellent brand voice consistency across content",
      "Wide range of templates for different content types",
      "Strong team collaboration features",
      "Integrates with SurferSEO for optimized content",
    ],
    cons: [
      "Higher price point compared to alternatives",
      "Output quality still requires human editing",
      "Learning curve for advanced campaign features",
    ],
    websiteUrl: "https://jasper.ai",
    affiliateUrl: "https://jasper.ai?ref=aiphub",
    bestFor: "Marketing teams and content agencies needing consistent brand messaging at scale",
    overview:
      "Jasper AI has established itself as one of the leading AI writing platforms for businesses and marketing professionals. Built on large language models, Jasper goes beyond simple text generation by offering brand voice training, campaign-level content planning, and team collaboration features. The platform excels at helping teams maintain consistent messaging across channels while dramatically reducing content production time. With templates spanning blog posts, ad copy, emails, product descriptions, and social media, Jasper covers the full spectrum of marketing content needs.",
  },
  {
    slug: "descript",
    name: "Descript",
    description:
      "Descript is an all-in-one video and podcast editing platform that lets you edit media by editing text. Its AI-powered tools include transcription, filler word removal, and studio-quality voice cloning.",
    category: "Video Editing",
    features: [
      "Edit video and audio by editing a text transcript",
      "AI-powered filler word and silence removal",
      "Studio Sound for automatic audio enhancement",
      "AI voice cloning for overdubs and corrections",
      "Screen recording and live collaboration",
    ],
    color: "from-green-500 to-teal-600",
    tagline: "Edit video and podcasts like editing a document",
    pricing: [
      { tier: "Free", price: "$0", note: "1 hour of transcription, watermark on exports" },
      { tier: "Hobbyist", price: "$24/mo", note: "10 hours transcription, no watermark" },
      { tier: "Business", price: "$33/mo", note: "30 hours transcription, team features" },
    ],
    useCases: [
      "Editing podcast episodes quickly with text-based editing",
      "Creating social media clips from long-form video content",
      "Recording and polishing product demos and tutorials",
      "Removing filler words and awkward pauses from recordings",
    ],
    pros: [
      "Revolutionary text-based editing paradigm",
      "High-quality automatic transcription",
      "Excellent filler word and silence removal",
      "Voice cloning enables easy corrections without re-recording",
    ],
    cons: [
      "Not suited for advanced cinematic video editing",
      "Transcription accuracy drops with heavy accents or jargon",
      "Free tier is quite limited with watermark and time caps",
    ],
    websiteUrl: "https://www.descript.com",
    affiliateUrl: "https://descript.com?ref=aiphub",
    bestFor: "Podcasters, YouTubers, and content creators who want fast, intuitive media editing",
    overview:
      "Descript reinvents the video and podcast editing workflow by treating media like a text document. Instead of wrestling with timelines and waveforms, you simply edit the transcript and the underlying media follows. The platform layers on powerful AI features like automatic filler word removal, studio-quality audio enhancement, and voice cloning for seamless overdubs. Whether you are producing a weekly podcast or cutting social clips from long videos, Descript dramatically reduces the time and technical skill needed to produce polished content.",
  },
  {
    slug: "fireflies-ai",
    name: "Fireflies.ai",
    description:
      "Fireflies.ai is an AI meeting assistant that automatically records, transcribes, and summarizes meetings across video conferencing platforms. It helps teams capture action items and search past conversations effortlessly.",
    category: "Meeting Assistants",
    features: [
      "Automatic meeting recording and transcription",
      "AI-generated meeting summaries and action items",
      "Searchable transcript database across all meetings",
      "Integrations with Zoom, Teams, Google Meet, and more",
      "Conversation intelligence and speaker analytics",
    ],
    color: "from-violet-500 to-purple-600",
    tagline: "Never miss a detail from your meetings again",
    pricing: [
      { tier: "Free", price: "$0", note: "Limited transcription credits" },
      { tier: "Pro", price: "$10/mo", note: "Unlimited transcription, AI summaries" },
      { tier: "Business", price: "$19/mo", note: "Conversation intelligence, CRM integration" },
      { tier: "Enterprise", price: "Custom", note: "SSO, custom data retention" },
    ],
    useCases: [
      "Automating meeting notes for remote and hybrid teams",
      "Creating a searchable knowledge base of past conversations",
      "Tracking action items and follow-ups from client calls",
      "Onboarding new team members with recorded meeting archives",
    ],
    pros: [
      "Excellent transcription accuracy across accents",
      "Seamless integration with all major video platforms",
      "Powerful search across your entire meeting history",
      "Generous free tier for individuals",
    ],
    cons: [
      "Meeting bot joining can feel intrusive to some participants",
      "Summaries occasionally miss nuanced context",
      "Advanced analytics locked behind higher tiers",
    ],
    websiteUrl: "https://fireflies.ai",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    bestFor: "Remote teams and sales professionals who need reliable meeting documentation",
    overview:
      "Fireflies.ai takes the busywork out of meetings by automatically joining your calls, recording the conversation, and producing accurate transcripts with AI-generated summaries. The platform integrates with every major conferencing tool and pushes meeting intelligence into your CRM, project management, and collaboration apps. Its searchable archive means you can find any discussion point from any meeting in seconds. For teams that spend hours in calls, Fireflies transforms meetings from ephemeral conversations into a structured, actionable knowledge base.",
  },
  {
    slug: "surferseo",
    name: "SurferSEO",
    description:
      "SurferSEO is an AI-driven content optimization platform that analyzes top-ranking pages and provides data-backed recommendations to help your content rank higher in search results.",
    category: "Marketing",
    features: [
      "Real-time content editor with SEO scoring",
      "SERP analyzer with competitor content audits",
      "AI-powered article outline and brief generator",
      "Keyword research and clustering tools",
      "Internal linking and content audit capabilities",
    ],
    color: "from-orange-500 to-amber-600",
    tagline: "Data-driven content optimization for higher search rankings",
    pricing: [
      { tier: "Essential", price: "$89/mo", note: "30 articles, content editor, keyword research" },
      { tier: "Scale", price: "$129/mo", note: "100 articles, audit, SERP analyzer" },
      { tier: "Scale AI", price: "$219/mo", note: "100 AI-written articles, all features" },
      { tier: "Enterprise", price: "Custom", note: "Custom article limits, priority support" },
    ],
    useCases: [
      "Optimizing existing blog content for higher Google rankings",
      "Creating SEO-optimized content briefs for writers",
      "Auditing entire websites for content improvement opportunities",
      "Researching and clustering keywords for content strategy",
    ],
    pros: [
      "Highly actionable, data-backed SEO recommendations",
      "Real-time content scoring speeds up the writing process",
      "Integrates with Jasper and Google Docs",
      "Content audit feature identifies quick wins on existing pages",
    ],
    cons: [
      "Pricing is steep for individual bloggers",
      "Recommendations can feel formulaic if followed too rigidly",
      "Keyword research less robust than dedicated SEO suites",
    ],
    websiteUrl: "https://surferseo.com",
    affiliateUrl: "https://surferseo.com?ref=aiphub",
    bestFor: "SEO professionals and content marketers optimizing for organic search traffic",
    overview:
      "SurferSEO bridges the gap between content creation and search engine optimization by analyzing hundreds of ranking factors across top-performing pages and translating them into clear, actionable writing guidelines. The content editor scores your draft in real time, suggesting keyword usage, headings, paragraph structure, and content length based on what is actually working in search results. Combined with its keyword clustering and site audit tools, SurferSEO gives content teams a systematic approach to climbing search rankings instead of relying on guesswork.",
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    description:
      "Notion AI enhances the popular all-in-one workspace with built-in AI capabilities for writing, summarizing, brainstorming, and organizing information directly within your Notion pages and databases.",
    category: "Project Management",
    features: [
      "AI writing assistant embedded in Notion pages",
      "Automatic summarization of long documents and databases",
      "Q&A across your entire Notion workspace",
      "AI-powered autofill for database properties",
      "Translation and tone adjustment tools",
    ],
    color: "from-gray-600 to-gray-800",
    tagline: "AI superpowers built into your workspace",
    pricing: [
      { tier: "Free", price: "$0", note: "Limited AI queries" },
      { tier: "AI Add-on", price: "$10/member/mo", note: "Unlimited AI features on any plan" },
    ],
    useCases: [
      "Summarizing lengthy project documents and meeting notes",
      "Drafting content and brainstorming ideas within your workspace",
      "Asking questions about information stored across Notion pages",
      "Autofilling database properties from page content",
    ],
    pros: [
      "Seamlessly integrated into an already powerful workspace",
      "Q&A feature is excellent for finding information fast",
      "Works within your existing workflows without context switching",
      "Simple per-member pricing with no usage caps",
    ],
    cons: [
      "Only useful if your team already uses Notion",
      "AI writing quality is solid but not best-in-class",
      "Cost adds up quickly on large teams",
    ],
    websiteUrl: "https://www.notion.so/product/ai",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    bestFor: "Teams already using Notion who want AI assistance without leaving their workspace",
    overview:
      "Notion AI brings artificial intelligence directly into the workspace millions of teams already use for wikis, project management, and documentation. Rather than switching to a separate AI tool, you can highlight text, ask a question, or generate content right where you work. The standout feature is the Q&A capability, which lets you ask natural language questions about information scattered across your entire Notion workspace and get instant, cited answers. For teams that live in Notion, the AI add-on is a natural productivity multiplier that eliminates context switching.",
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    description:
      "GitHub Copilot is an AI pair programmer that provides real-time code suggestions, completions, and entire function implementations directly in your editor, powered by OpenAI Codex models.",
    category: "Code",
    features: [
      "Real-time code autocompletion in your IDE",
      "Whole-function and multi-line code generation",
      "Chat interface for code explanations and debugging",
      "Support for dozens of programming languages",
      "Context-aware suggestions based on your codebase",
    ],
    color: "from-blue-600 to-indigo-700",
    tagline: "Your AI pair programmer",
    pricing: [
      { tier: "Individual", price: "$10/mo", note: "Unlimited completions, chat" },
      { tier: "Business", price: "$19/user/mo", note: "Organization management, policy controls" },
      { tier: "Enterprise", price: "$39/user/mo", note: "Fine-tuned models, advanced security" },
    ],
    useCases: [
      "Accelerating day-to-day coding with smart autocompletions",
      "Generating boilerplate code and repetitive patterns",
      "Learning unfamiliar APIs and frameworks through suggestions",
      "Writing unit tests based on existing code",
    ],
    pros: [
      "Dramatically speeds up routine coding tasks",
      "Excellent support for popular languages and frameworks",
      "Chat mode is great for debugging and explanations",
      "Deep integration with VS Code, JetBrains, and Neovim",
    ],
    cons: [
      "Suggestions occasionally include subtle bugs",
      "Can encourage over-reliance on generated code",
      "Requires internet connection for suggestions",
    ],
    websiteUrl: "https://github.com/features/copilot",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    bestFor: "Software developers looking to accelerate coding workflows and reduce boilerplate",
    overview:
      "GitHub Copilot has quickly become one of the most widely adopted AI developer tools, integrating directly into popular code editors to provide intelligent code completions as you type. Powered by large language models trained on vast code repositories, Copilot understands context from your current file, open tabs, and comments to suggest relevant code. Beyond simple autocompletion, the chat interface lets you ask questions about your codebase, get debugging help, and generate entire functions from natural language descriptions. For professional developers, Copilot typically saves hours per week on routine coding tasks.",
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    description:
      "Synthesia is an AI video generation platform that creates professional videos with realistic AI avatars and voiceovers, eliminating the need for cameras, studios, or actors.",
    category: "Video Editing",
    features: [
      "150+ realistic AI avatars in diverse appearances",
      "Text-to-video generation in 130+ languages",
      "Custom avatar creation from a short recording",
      "Built-in video editor with templates and media library",
      "Brand kit for consistent company video styling",
    ],
    color: "from-purple-500 to-pink-600",
    tagline: "Create professional videos with AI avatars",
    pricing: [
      { tier: "Starter", price: "$22/mo", note: "120 minutes/year, 9 scenes per video" },
      { tier: "Creator", price: "$67/mo", note: "360 minutes/year, unlimited scenes" },
      { tier: "Enterprise", price: "Custom", note: "Unlimited minutes, custom avatars, SSO" },
    ],
    useCases: [
      "Creating employee training and onboarding videos",
      "Producing product explainer and demo videos",
      "Generating multilingual video content at scale",
      "Building personalized sales outreach videos",
    ],
    pros: [
      "Drastically reduces video production cost and time",
      "Avatars look increasingly realistic and natural",
      "Excellent multilingual support for global teams",
      "No filming equipment or video editing skills required",
    ],
    cons: [
      "Avatars still lack the warmth of real human presenters",
      "Limited creative flexibility compared to traditional editing",
      "Starter plan has restrictive minute and scene limits",
    ],
    websiteUrl: "https://www.synthesia.io",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    bestFor: "L&D teams and businesses creating training, explainer, and marketing videos at scale",
    overview:
      "Synthesia removes the traditional barriers of video production by letting anyone create professional-looking videos with AI-generated presenters. You simply type or paste a script, choose an avatar, and the platform renders a polished video complete with lip-synced speech and natural gestures. The technology is particularly powerful for organizations that need to produce training content, product tutorials, or multilingual marketing videos without the logistics of filming. With custom avatar options and a growing template library, Synthesia has become the go-to platform for scalable video content creation.",
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    description:
      "ElevenLabs is a leading AI voice technology company offering ultra-realistic text-to-speech, voice cloning, and audio generation tools for creators, developers, and businesses.",
    category: "Audio",
    features: [
      "Ultra-realistic text-to-speech in 29+ languages",
      "Instant voice cloning from short audio samples",
      "Voice design for creating entirely new AI voices",
      "API access for integrating speech into applications",
      "Projects feature for long-form audiobook production",
    ],
    color: "from-indigo-500 to-blue-600",
    tagline: "The most realistic AI voice generator",
    pricing: [
      { tier: "Free", price: "$0", note: "10,000 characters/mo, 3 custom voices" },
      { tier: "Starter", price: "$5/mo", note: "30,000 characters/mo, 10 custom voices" },
      { tier: "Creator", price: "$11/mo", note: "100,000 characters/mo, 30 custom voices" },
      { tier: "Pro", price: "$99/mo", note: "500,000 characters/mo, 160 custom voices" },
    ],
    useCases: [
      "Producing voiceovers for videos and presentations",
      "Converting written content into engaging audiobooks",
      "Adding voice interfaces to apps and products",
      "Creating multilingual audio content from a single script",
    ],
    pros: [
      "Industry-leading voice quality and naturalness",
      "Voice cloning is impressively accurate from short samples",
      "Generous free tier for experimentation",
      "Excellent API documentation and developer support",
    ],
    cons: [
      "High-volume usage gets expensive quickly",
      "Voice cloning raises ethical considerations",
      "Some languages are noticeably lower quality than English",
    ],
    websiteUrl: "https://elevenlabs.io",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    bestFor: "Content creators, developers, and publishers needing high-quality AI-generated speech",
    overview:
      "ElevenLabs has set a new standard for AI-generated speech with voices that are often indistinguishable from human recordings. The platform combines state-of-the-art text-to-speech with powerful voice cloning that can replicate a voice from just a few minutes of audio. For content creators, this means producing professional voiceovers without booking talent. For developers, the robust API makes it straightforward to add natural-sounding speech to any application. The Projects feature is particularly well-suited for long-form content like audiobooks, handling pacing, emphasis, and emotion across extended narration.",
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    description:
      "Grammarly is an AI-powered writing assistant that checks grammar, spelling, punctuation, clarity, and tone across virtually every platform where you write, from emails to documents to social media.",
    category: "Writing",
    features: [
      "Real-time grammar, spelling, and punctuation checking",
      "Tone detection and adjustment suggestions",
      "Generative AI writing assistance and rewriting",
      "Plagiarism detection against billions of web pages",
      "Works across browsers, desktop apps, and mobile",
    ],
    color: "from-emerald-500 to-green-600",
    tagline: "Confident writing, everywhere you work",
    pricing: [
      { tier: "Free", price: "$0", note: "Basic grammar and spelling checks" },
      { tier: "Premium", price: "$12/mo", note: "Advanced suggestions, tone, generative AI" },
      { tier: "Business", price: "$15/member/mo", note: "Brand tones, style guides, analytics" },
    ],
    useCases: [
      "Polishing professional emails and business communications",
      "Ensuring consistency and clarity in long-form documents",
      "Checking academic papers for grammar and plagiarism",
      "Adjusting writing tone for different audiences",
    ],
    pros: [
      "Works everywhere you type with browser and desktop integrations",
      "Free tier is genuinely useful for everyday writing",
      "Tone detection helps match communication to context",
      "Generative AI features are well-integrated and practical",
    ],
    cons: [
      "Premium features are needed for most advanced suggestions",
      "Occasional false positives on style suggestions",
      "Can be overly prescriptive with creative writing",
    ],
    websiteUrl: "https://www.grammarly.com",
    affiliateUrl: "https://www.grammarly.com/?utm_source=aiproductivityhub",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Professionals and students who want polished, error-free writing across all platforms",
    overview:
      "Grammarly has grown from a simple grammar checker into a comprehensive AI writing companion used by over 30 million people daily. Its strength lies in ubiquity: the tool works in your browser, email client, word processor, and mobile keyboard, catching errors and suggesting improvements wherever you write. Beyond surface-level corrections, Grammarly analyzes tone, clarity, and engagement to help you communicate more effectively. The addition of generative AI features lets you draft, rewrite, and brainstorm directly within the tool, making it a true writing partner rather than just a proofreader.",
  },
  {
    slug: "canva-ai",
    name: "Canva AI",
    description:
      "Canva AI integrates artificial intelligence throughout Canva's popular design platform, offering features like Magic Design, text-to-image generation, background removal, and AI-powered layout suggestions.",
    category: "Design",
    features: [
      "Magic Design for instant template generation from prompts",
      "AI text-to-image generation built into the editor",
      "One-click background removal and object eraser",
      "Magic Write for generating copy within designs",
      "AI-powered resize and layout suggestions",
    ],
    color: "from-cyan-500 to-blue-600",
    tagline: "Design anything with the power of AI",
    pricing: [
      { tier: "Free", price: "$0", note: "Limited AI features and templates" },
      { tier: "Pro", price: "$13/mo", note: "Full AI suite, premium templates, brand kit" },
      { tier: "Teams", price: "$10/person/mo", note: "Collaboration, brand controls, 5+ people" },
    ],
    useCases: [
      "Creating social media graphics and marketing materials quickly",
      "Generating unique images and illustrations for content",
      "Removing and replacing backgrounds in product photos",
      "Designing presentations and documents with AI-assisted layouts",
    ],
    pros: [
      "Extremely accessible for non-designers",
      "AI features are well-integrated into the familiar Canva editor",
      "Generous free tier with useful AI capabilities",
      "Massive template library enhanced by AI suggestions",
    ],
    cons: [
      "AI-generated images lag behind dedicated tools like Midjourney",
      "Advanced designers may find the platform limiting",
      "Some AI features consume credits that run out quickly",
    ],
    websiteUrl: "https://www.canva.com",
    affiliateUrl: "https://www.canva.com/?utm_source=aiproductivityhub",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Non-designers and small teams who need professional-quality visuals without design expertise",
    overview:
      "Canva has democratized design for millions of users, and its AI features push that accessibility even further. Magic Design lets you describe what you need and instantly generates customized templates, while the built-in text-to-image generator creates unique visuals without leaving the editor. Practical AI tools like background removal, Magic Eraser, and Magic Write for in-design copywriting round out a suite that handles the entire creative process. For small businesses and marketers who need to produce a high volume of on-brand visuals, Canva AI eliminates the need for specialized design skills or expensive software.",
  },
  {
    slug: "intercom-fin",
    name: "Intercom Fin",
    description:
      "Intercom Fin is an AI-powered customer support agent that resolves customer inquiries instantly by learning from your help center, documentation, and past conversations, reducing support volume while maintaining quality.",
    category: "Customer Support",
    features: [
      "AI agent that resolves customer queries autonomously",
      "Learns from your help center and knowledge base",
      "Seamless handoff to human agents when needed",
      "Multilingual support across 40+ languages",
      "Customizable tone and behavior guardrails",
    ],
    color: "from-blue-500 to-violet-600",
    tagline: "AI-first customer support that actually resolves issues",
    pricing: [
      { tier: "Per Resolution", price: "$0.99/resolution", note: "Pay only when Fin resolves an issue" },
    ],
    useCases: [
      "Deflecting common support questions automatically",
      "Providing instant 24/7 customer support coverage",
      "Scaling support operations without proportionally growing headcount",
      "Handling multilingual support from a single knowledge base",
    ],
    pros: [
      "Pay-per-resolution model aligns cost with value",
      "High resolution rate when knowledge base is well-maintained",
      "Clean handoff to humans preserves customer experience",
      "Easy to set up with existing Intercom help content",
    ],
    cons: [
      "Requires Intercom platform subscription as a prerequisite",
      "Resolution quality depends heavily on knowledge base quality",
      "Costs can scale unexpectedly with high volume",
    ],
    websiteUrl: "https://www.intercom.com/fin",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    bestFor: "SaaS companies and online businesses looking to scale support with AI while keeping quality high",
    overview:
      "Intercom Fin represents a new generation of AI customer support, moving beyond simple chatbots to an agent that genuinely resolves customer issues. Trained on your help center, documentation, and conversation history, Fin provides accurate, contextual answers and can guide customers through multi-step processes. Its pay-per-resolution pricing means you only pay when Fin actually solves a problem, making ROI straightforward to measure. When queries are too complex, Fin hands off seamlessly to human agents with full conversation context, ensuring customers never feel stuck in an unhelpful loop.",
  },
  {
    slug: "perplexity-ai",
    name: "Perplexity AI",
    description:
      "Perplexity AI is an AI-powered search engine that provides direct, cited answers to complex questions by synthesizing information from across the web in real time.",
    category: "Research",
    features: [
      "AI-powered conversational search with cited sources",
      "Pro Search for multi-step research and analysis",
      "File upload for document analysis and Q&A",
      "Collection system for organizing research threads",
      "API access for building search-powered applications",
    ],
    color: "from-teal-500 to-cyan-600",
    tagline: "The AI-powered answer engine",
    pricing: [
      { tier: "Free", price: "$0", note: "Unlimited Quick Search, limited Pro Search" },
      { tier: "Pro", price: "$20/mo", note: "600+ Pro searches/day, file upload, advanced models" },
    ],
    useCases: [
      "Researching complex topics with instant cited answers",
      "Analyzing and summarizing uploaded documents and PDFs",
      "Getting up-to-date information on current events",
      "Comparing products, services, or technical solutions",
    ],
    pros: [
      "Answers are always backed by cited, verifiable sources",
      "Pro Search handles complex multi-step research questions",
      "Free tier is surprisingly capable for everyday research",
      "Clean, distraction-free interface focused on answers",
    ],
    cons: [
      "Source quality varies and requires user verification",
      "Less effective for subjective or opinion-based questions",
      "Pro Search has a daily query limit even on paid plans",
    ],
    websiteUrl: "https://www.perplexity.ai",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Researchers, analysts, and knowledge workers who need fast, reliable answers with sources",
    overview:
      "Perplexity AI reimagines web search as a conversation with a knowledgeable assistant that always shows its sources. Instead of returning a list of links, Perplexity synthesizes information from multiple web pages into a coherent, cited answer. The Pro Search feature takes this further by breaking complex questions into sub-queries, conducting multi-step research, and presenting a comprehensive analysis. For professionals who spend significant time researching topics, comparing options, or staying current with industry developments, Perplexity offers a dramatically faster path from question to reliable answer.",
  },
  {
    slug: "cloudways",
    name: "Cloudways",
    description:
      "Cloudways is a managed cloud hosting platform that simplifies server management for agencies, e-commerce stores, and growing businesses. It offers one-click deployments on top cloud providers like AWS, Google Cloud, DigitalOcean, and Vultr.",
    category: "Hosting",
    features: [
      "Managed hosting on AWS, Google Cloud, DigitalOcean, Vultr, and Linode",
      "One-click application deployment for WordPress, Magento, Laravel, and more",
      "Built-in CDN, free SSL certificates, and advanced caching",
      "Automated backups with one-click restore",
      "Server cloning, staging environments, and team collaboration",
    ],
    color: "from-indigo-600 to-purple-700",
    tagline: "Managed cloud hosting without the complexity",
    pricing: [
      { tier: "DigitalOcean", price: "From $14/mo", note: "1GB RAM, 25GB storage" },
      { tier: "AWS", price: "From $38/mo", note: "2GB RAM, 20GB storage" },
      { tier: "Google Cloud", price: "From $37/mo", note: "1.7GB RAM, 20GB storage" },
      { tier: "Vultr", price: "From $16/mo", note: "1GB RAM, 25GB storage" },
    ],
    useCases: [
      "Hosting high-traffic WordPress and WooCommerce sites",
      "Running multiple client sites for agencies on one platform",
      "Deploying PHP, Laravel, and Magento applications with zero DevOps",
      "Scaling e-commerce stores with auto-scaling cloud infrastructure",
    ],
    pros: [
      "Choice of multiple cloud providers under one dashboard",
      "Excellent performance with built-in caching and CDN",
      "No lock-in — migrate away anytime with full server access",
      "24/7 expert support with fast response times",
    ],
    cons: [
      "No email hosting included — need a separate service",
      "Pricing increases quickly when scaling to higher-tier servers",
      "Less suited for static sites or serverless architectures",
    ],
    websiteUrl: "https://www.cloudways.com",
    affiliateUrl: "https://www.cloudways.com/en/?id=2102009",
    bestFor: "Agencies, e-commerce businesses, and developers who want managed cloud hosting without server administration headaches",
    overview:
      "Cloudways bridges the gap between cheap shared hosting and complex self-managed cloud servers. Instead of wrestling with server configuration, security patches, and performance tuning, you get a clean dashboard that deploys applications on world-class infrastructure from AWS, Google Cloud, DigitalOcean, Vultr, or Linode. The platform handles the heavy lifting of server management — automated backups, OS-level security, built-in caching with Varnish and Redis, and free SSL — while still giving you SSH access and full control when you need it. For agencies managing multiple client sites or e-commerce stores that need reliable performance, Cloudways delivers enterprise-grade hosting without requiring a dedicated DevOps team.",
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    description:
      "ChatGPT is OpenAI's flagship conversational AI, capable of reasoning, writing, analysis, coding, math, and image generation. It is one of the most widely used AI tools in the world, with versions ranging from the free GPT-4o to the advanced o1 reasoning model.",
    category: "Research",
    features: [
      "Conversational AI with GPT-4o and o1 reasoning models",
      "Web browsing for real-time information retrieval",
      "Advanced data analysis with code execution and chart generation",
      "Image generation with DALL-E 3 integration",
      "Custom GPTs for specialized, repeatable workflows",
      "Memory across conversations for personalized assistance",
    ],
    color: "from-green-400 to-teal-500",
    tagline: "The world's most capable conversational AI assistant",
    pricing: [
      { tier: "Free", price: "$0", note: "GPT-4o access with usage limits, basic features" },
      { tier: "Plus", price: "$20/mo", note: "Priority GPT-4o access, o1 model, DALL-E, Advanced Data Analysis" },
      { tier: "Pro", price: "$200/mo", note: "Unlimited o1 access, o1 pro mode, extended limits" },
      { tier: "Team", price: "$25/user/mo", note: "Business features, admin console, data privacy" },
    ],
    useCases: [
      "Deep research and literature synthesis on complex topics",
      "Drafting, editing, and improving written content of all kinds",
      "Analyzing data, writing code, and debugging software",
      "Brainstorming and ideation for creative or strategic projects",
    ],
    pros: [
      "Extremely versatile — capable across writing, coding, math, and analysis",
      "Advanced reasoning with o1 model handles multi-step complex problems",
      "Custom GPTs allow specialized, repeatable workflow automation",
      "Free tier provides genuine value without a credit card",
    ],
    cons: [
      "Knowledge cutoff means it lacks the very latest information without web browsing",
      "Pro plan pricing is steep for individual users",
      "Responses can occasionally be overly verbose or confidently incorrect",
    ],
    websiteUrl: "https://chatgpt.com",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Knowledge workers, researchers, developers, and anyone who wants a capable all-purpose AI assistant",
    overview:
      "ChatGPT by OpenAI is the AI tool that brought large language models to mainstream awareness and remains the benchmark against which most competitors are measured. With access to GPT-4o for everyday tasks and the o1 reasoning model for complex analytical and logical challenges, ChatGPT covers an extraordinary range of use cases: research, writing, coding, data analysis, image generation, and more. The Custom GPTs ecosystem allows users to build and share specialized AI assistants tailored to specific domains without any coding. Memory features let ChatGPT learn your preferences and context over time, making it increasingly useful the more you use it. For anyone looking to integrate AI into their daily workflow, ChatGPT is the natural starting point.",
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    description:
      "Midjourney is a leading AI image generation tool known for producing strikingly artistic, high-quality visuals from text prompts. Operating through Discord and its own web interface, it is the tool of choice for designers, artists, and creative professionals.",
    category: "Design",
    features: [
      "State-of-the-art text-to-image generation with V6 model",
      "Style tuning and reference image weighting for precise control",
      "Vary and remix tools for iterating on generated images",
      "Upscaling to high-resolution outputs suitable for print",
      "Pan, zoom, and inpaint tools for extending and editing images",
      "Community feed and prompt discovery for inspiration",
    ],
    color: "from-slate-700 to-indigo-900",
    tagline: "Create breathtaking AI art and visuals from text",
    pricing: [
      { tier: "Basic", price: "$10/mo", note: "200 image generations per month, 3.3 GPU hours" },
      { tier: "Standard", price: "$30/mo", note: "15 GPU hours/mo, unlimited relaxed generations" },
      { tier: "Pro", price: "$60/mo", note: "30 GPU hours/mo, stealth mode, 12 concurrent jobs" },
      { tier: "Mega", price: "$120/mo", note: "60 GPU hours/mo, maximum concurrency" },
    ],
    useCases: [
      "Generating concept art and mood boards for design projects",
      "Creating unique editorial illustrations and blog imagery",
      "Producing marketing visuals and campaign assets",
      "Exploring visual directions quickly before committing to production",
    ],
    pros: [
      "Produces the most visually stunning and artistic outputs among AI image tools",
      "Highly active community with extensive prompt-sharing resources",
      "Regular model updates consistently push quality higher",
      "Relaxed mode offers unlimited generation on Standard and above plans",
    ],
    cons: [
      "Prompt engineering has a learning curve to get consistent results",
      "Less control over exact compositions compared to traditional design tools",
      "No free tier — requires a paid subscription to generate images",
    ],
    websiteUrl: "https://www.midjourney.com",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    bestFor: "Creative professionals, designers, and marketers who need world-class AI-generated visuals",
    overview:
      "Midjourney has redefined what is possible with AI-generated imagery, consistently delivering outputs that rival professional illustration and photography in artistic quality. The tool is especially prized for its aesthetic sensibility — images have a distinctive richness and detail that sets Midjourney apart from competing tools. The latest V6 model handles photorealism, stylized art, and abstract concepts with equal competence. While mastering prompting takes time, the payoff is extraordinary creative control. Whether producing concept art for a game, unique visuals for a marketing campaign, or editorial illustrations, Midjourney has become an indispensable tool in the modern designer's workflow.",
  },
  {
    slug: "zapier",
    name: "Zapier",
    description:
      "Zapier is the leading no-code automation platform that connects over 7,000 apps, allowing teams to automate repetitive workflows without writing a single line of code. Its AI features help build and optimize automations using natural language.",
    category: "Project Management",
    features: [
      "Connect and automate workflows across 7,000+ apps",
      "Multi-step Zaps with conditional logic, filters, and formatters",
      "AI-powered Zap builder from natural language descriptions",
      "Tables, Interfaces, and Canvas for building internal tools",
      "Zapier Agents for AI-driven automated workflows",
      "Real-time monitoring, error handling, and replay",
    ],
    color: "from-orange-500 to-red-600",
    tagline: "Automate your work across 7,000+ apps — no code required",
    pricing: [
      { tier: "Free", price: "$0", note: "100 tasks/mo, 5 Zaps, single-step automations" },
      { tier: "Professional", price: "$19.99/mo", note: "750 tasks/mo, unlimited Zaps, multi-step, filters" },
      { tier: "Team", price: "$69/mo", note: "2,000 tasks/mo, shared workspace, premier support" },
      { tier: "Enterprise", price: "Custom", note: "Unlimited users, advanced admin, SSO, SLA" },
    ],
    useCases: [
      "Automatically syncing leads from web forms to CRM and email marketing tools",
      "Triggering Slack notifications when deals move in a pipeline",
      "Routing support tickets between email, helpdesk, and project management tools",
      "Automating data entry and report generation across business systems",
    ],
    pros: [
      "Largest app ecosystem by far with 7,000+ integrations",
      "No-code interface is genuinely accessible for non-technical users",
      "AI Zap builder dramatically reduces setup time for common automations",
      "Reliable with strong error handling and automatic retries",
    ],
    cons: [
      "Task-based pricing gets expensive as automation volume grows",
      "Complex multi-step workflows can be difficult to debug",
      "Some integrations are shallower than native integrations",
    ],
    websiteUrl: "https://zapier.com",
    affiliateUrl: "https://zapier.com/?utm_source=aiproductivityhub",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Small businesses, marketing teams, and operations managers who want to automate workflows without engineering resources",
    overview:
      "Zapier has built the definitive no-code automation platform by connecting virtually every web application businesses use. The concept is elegantly simple: when something happens in one app, trigger an action in another — and chain as many steps as you need. With over 7,000 integrations covering CRMs, email, project management, finance, and everything in between, Zapier can automate nearly any repetitive process. The AI-powered Zap builder lets you describe your workflow in plain English and watch it get built automatically. For teams looking to save hours every week on manual data transfer, notifications, and cross-tool updates, Zapier delivers an immediate and measurable return on investment.",
  },
  {
    slug: "slack-ai",
    name: "Slack AI",
    description:
      "Slack AI brings native artificial intelligence features directly into Slack, enabling teams to instantly search conversations, summarize channels and threads, and recap their personal highlights from a busy workday.",
    category: "Project Management",
    features: [
      "AI-powered channel and thread summarization",
      "Daily digest recaps of missed messages and highlights",
      "Conversational search across the entire Slack workspace",
      "AI writing assistance for drafts and message composition",
      "Workflow Builder with AI automation steps",
      "Huddle notes with automatic transcription and summaries",
    ],
    color: "from-purple-600 to-fuchsia-700",
    tagline: "Work smarter with AI built into your team's home base",
    pricing: [
      { tier: "Pro", price: "$7.25/user/mo", note: "Slack AI included, 90-day message history" },
      { tier: "Business+", price: "$12.50/user/mo", note: "Unlimited message history, SAML SSO" },
      { tier: "Enterprise Grid", price: "Custom", note: "Enterprise security, data residency, advanced AI" },
    ],
    useCases: [
      "Catching up on a busy channel after time away without reading every message",
      "Getting a summary of a long threaded discussion before joining",
      "Searching institutional knowledge buried in past conversations",
      "Generating automated daily briefings for distributed teams",
    ],
    pros: [
      "Seamlessly integrated — no external tool or context switch required",
      "Channel summaries save significant time in high-volume workspaces",
      "AI search finds relevant conversations that keyword search would miss",
      "Huddle transcription makes async follow-up effortless",
    ],
    cons: [
      "Only useful if your team already communicates in Slack",
      "AI features require a paid plan and add cost on top of base subscription",
      "Summarization quality varies for highly technical or nuanced discussions",
    ],
    websiteUrl: "https://slack.com/features/ai",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    bestFor: "Teams that run on Slack and want to reduce information overload without leaving their primary communication tool",
    overview:
      "Slack AI solves one of the most persistent challenges of modern work: keeping up with the relentless flow of team communication. By embedding AI natively into Slack, the platform lets you get concise summaries of channels, threads, and your personal feed with a single click, turning hours of scrolling into a two-minute briefing. The AI search feature understands intent and context, surfacing relevant conversations even when you cannot remember the exact keywords. For distributed teams across time zones and hybrid workers managing multiple channels, Slack AI transforms the platform from a communication firehose into a structured, searchable knowledge system.",
  },
  {
    slug: "loom",
    name: "Loom",
    description:
      "Loom is an asynchronous video messaging platform that lets you quickly record screen and camera videos to communicate ideas, give feedback, and share knowledge — without scheduling meetings. Its AI features automatically transcribe, title, and summarize your recordings.",
    category: "Video Editing",
    features: [
      "One-click screen and webcam recording from browser or desktop app",
      "AI-generated video titles, summaries, and chapters",
      "Automatic transcript with full-text search across recordings",
      "Viewer engagement analytics and emoji reactions",
      "Filler word removal and silence trimming with AI",
      "Workspace library for organizing and sharing team recordings",
    ],
    color: "from-violet-500 to-purple-700",
    tagline: "Say it with video — communicate more in less time",
    pricing: [
      { tier: "Starter", price: "$0", note: "25 videos, 5 min per video, basic features" },
      { tier: "Business", price: "$12.50/user/mo", note: "Unlimited videos, AI features, custom branding" },
      { tier: "Enterprise", price: "Custom", note: "SSO, advanced security, dedicated support" },
    ],
    useCases: [
      "Giving detailed feedback on designs or documents asynchronously",
      "Walking new team members through processes with recorded tutorials",
      "Replacing status update meetings with quick video check-ins",
      "Explaining complex technical concepts to clients or stakeholders",
    ],
    pros: [
      "Dramatically faster than writing lengthy Slack messages or emails",
      "AI summaries mean viewers can decide to watch or just read the gist",
      "Viewer analytics show who watched and how far they got",
      "Works cross-platform with no account required for viewers",
    ],
    cons: [
      "Starter plan is limited to 25 videos and 5 minutes per recording",
      "Not a replacement for collaborative or real-time video editing",
      "Storage costs can add up for teams with heavy recording usage",
    ],
    websiteUrl: "https://www.loom.com",
    affiliateUrl: "https://www.loom.com/?utm_source=aiproductivityhub",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Remote and hybrid teams who want to reduce meeting load and communicate with context through async video",
    overview:
      "Loom has redefined team communication for the async era by making it faster to record a short video than to type a long explanation. The tool sits in your browser toolbar or desktop app, ready to capture your screen, camera, or both in seconds. The AI layer transforms recordings into a full communications package: automatic transcripts, AI-generated titles and chapter markers, and a summary that lets time-pressed viewers get the key points without watching the whole thing. For remote teams, Loom eliminates the need for dozens of small status meetings while ensuring complex ideas are communicated with the richness and nuance that text often loses.",
  },
  {
    slug: "calendly",
    name: "Calendly",
    description:
      "Calendly is the leading scheduling automation platform that eliminates the back-and-forth of finding meeting times. It lets people book time on your calendar based on your real-time availability, with automated reminders and seamless integrations.",
    category: "Meeting Assistants",
    features: [
      "Shareable scheduling links synced with your calendar",
      "Buffer times, daily limits, and advanced availability rules",
      "Automated email and SMS reminders and follow-ups",
      "Round-robin and collective scheduling for teams",
      "Integrations with Salesforce, HubSpot, Zoom, and 100+ apps",
      "Routing forms for directing prospects to the right team member",
    ],
    color: "from-blue-500 to-cyan-600",
    tagline: "Schedule meetings without the back-and-forth",
    pricing: [
      { tier: "Free", price: "$0", note: "1 event type, basic calendar sync" },
      { tier: "Standard", price: "$10/user/mo", note: "Unlimited event types, group meetings, integrations" },
      { tier: "Teams", price: "$16/user/mo", note: "Round-robin, routing, Salesforce integration" },
      { tier: "Enterprise", price: "Custom", note: "SSO, advanced security, dedicated success manager" },
    ],
    useCases: [
      "Letting prospects self-schedule sales discovery calls",
      "Coordinating interview scheduling across recruiting teams",
      "Managing client onboarding appointments for service businesses",
      "Automating reminder and follow-up sequences around meetings",
    ],
    pros: [
      "Eliminates scheduling friction and saves significant time weekly",
      "Works across time zones automatically with accurate conversion",
      "Routing forms ensure prospects reach the right representative",
      "Excellent integrations with CRM, video conferencing, and calendar tools",
    ],
    cons: [
      "Free plan is restrictive with only one event type",
      "Heavy customization of branding requires paid plans",
      "Some users find the interface for advanced routing logic complex",
    ],
    websiteUrl: "https://calendly.com",
    affiliateUrl: "https://calendly.com/?utm_source=aiproductivityhub",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Sales teams, consultants, and any professional who schedules a high volume of external meetings",
    overview:
      "Calendly has become the standard tool for eliminating the email chains that plague meeting scheduling. By sharing a single link, you invite others to pick a time that works from your actual available slots, with all time zone math handled automatically. The platform's strength extends well beyond basic scheduling: buffer rules prevent back-to-back exhaustion, daily booking limits protect focus time, and team routing forms direct incoming requests to the right person based on their answers. Automated reminders reduce no-show rates, while deep CRM and video conferencing integrations make Calendly the central nervous system of client-facing workflows.",
  },
  {
    slug: "otter-ai",
    name: "Otter.ai",
    description:
      "Otter.ai is an AI-powered meeting transcription and notes platform that automatically joins your video calls, records the audio, produces accurate transcripts in real time, and generates AI summaries with action items.",
    category: "Meeting Assistants",
    features: [
      "Real-time live transcription during meetings",
      "AI meeting summary with action items and key topics",
      "Automatic joining of Zoom, Teams, and Google Meet calls",
      "Speaker identification and diarization",
      "OtterPilot AI that answers questions and writes follow-up emails",
      "Shared workspace for team-wide meeting notes",
    ],
    color: "from-sky-500 to-blue-700",
    tagline: "AI meeting notes that capture every word",
    pricing: [
      { tier: "Basic", price: "$0", note: "300 monthly transcription minutes, 3 AI summaries" },
      { tier: "Pro", price: "$16.99/mo", note: "1,200 minutes/mo, unlimited AI summaries, import audio" },
      { tier: "Business", price: "$30/user/mo", note: "6,000 minutes/mo, admin panel, CRM sync" },
      { tier: "Enterprise", price: "Custom", note: "Custom retention, SSO, compliance features" },
    ],
    useCases: [
      "Capturing meeting notes without a designated notetaker",
      "Building a searchable archive of client calls and discussions",
      "Sharing meeting summaries and action items with absent stakeholders",
      "Transcribing recorded webinars, interviews, and audio files",
    ],
    pros: [
      "Live transcription is impressively accurate in real time",
      "OtterPilot proactively surfaces action items and key decisions",
      "Shared workspaces keep team meeting notes organized and accessible",
      "Free tier is generous for light individual use",
    ],
    cons: [
      "Accuracy drops noticeably with heavy accents or technical jargon",
      "Meeting bot attendance can be a surprise to unfamiliar participants",
      "Business plan is expensive compared to some alternatives",
    ],
    websiteUrl: "https://otter.ai",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Professionals and teams who need reliable, searchable records of meetings and conversations",
    overview:
      "Otter.ai has established itself as one of the most reliable AI meeting transcription platforms available, combining accurate real-time transcription with increasingly sophisticated AI analysis. The OtterPilot feature goes beyond passive recording — it actively tracks action items, identifies key topics, and can even generate follow-up email drafts based on the meeting content. The shared workspace feature makes it ideal for teams, allowing everyone to access, annotate, and search past meeting notes from a central hub. For organizations where meeting documentation is critical — sales calls, client services, research interviews — Otter.ai provides both the raw transcript and the intelligent summary that saves hours of post-meeting work.",
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    description:
      "Copy.ai is an AI-powered go-to-market platform that helps sales and marketing teams automate content workflows, generate personalized outreach, and accelerate the creation of marketing copy at scale.",
    category: "Writing",
    features: [
      "GTM AI platform with automated sales and marketing workflows",
      "90+ content templates for ads, emails, landing pages, and social",
      "AI chat interface with brand voice and company context",
      "Automated outbound email and LinkedIn personalization at scale",
      "Workflow builder for multi-step content automation pipelines",
      "Infobase for storing company knowledge, positioning, and personas",
    ],
    color: "from-fuchsia-500 to-pink-600",
    tagline: "The GTM AI platform for sales and marketing teams",
    pricing: [
      { tier: "Free", price: "$0", note: "2,000 words/mo, 1 user, basic templates" },
      { tier: "Starter", price: "$49/mo", note: "Unlimited words, 1 seat, all templates, workflows" },
      { tier: "Advanced", price: "$249/mo", note: "5 seats, Infobase, API access, workflow automation" },
      { tier: "Enterprise", price: "Custom", note: "Unlimited seats, custom models, SSO, dedicated support" },
    ],
    useCases: [
      "Generating personalized cold email sequences for sales outreach",
      "Creating marketing copy variations for A/B testing at scale",
      "Producing product descriptions and landing page content quickly",
      "Automating go-to-market content pipelines for new campaigns",
    ],
    pros: [
      "Excellent template library covering every major marketing content type",
      "Workflow automation significantly reduces manual content production",
      "Infobase keeps AI outputs consistent with brand voice and positioning",
      "Free plan provides meaningful access for solo content creators",
    ],
    cons: [
      "Output quality requires editing for nuanced or highly technical topics",
      "Advanced workflow features have a learning curve",
      "Starter plan limits you to a single seat, which can be restrictive",
    ],
    websiteUrl: "https://www.copy.ai",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Sales and marketing teams that need to produce high volumes of personalized, on-brand content efficiently",
    overview:
      "Copy.ai has evolved from a simple AI writing tool into a full GTM AI platform designed to align sales and marketing content workflows. The platform's core strength is breadth and automation: with over 90 templates and a powerful workflow builder, teams can go from brief to finished content across dozens of formats without starting from scratch every time. The Infobase feature is particularly valuable for teams with complex positioning — it stores your company's messaging, personas, and competitive differentiators, ensuring every piece of AI-generated content reflects your actual brand. For go-to-market teams under pressure to produce more content with the same headcount, Copy.ai delivers systematic efficiency gains.",
  },
  {
    slug: "runway-ml",
    name: "Runway ML",
    description:
      "Runway ML is a professional AI creative platform specializing in video generation, editing, and visual effects. It offers groundbreaking text-to-video and image-to-video generation alongside a powerful suite of AI tools for video post-production.",
    category: "Video Editing",
    features: [
      "Gen-3 Alpha text-to-video and image-to-video generation",
      "AI-powered motion brush for adding movement to static images",
      "Background removal and scene composition tools",
      "Inpainting and outpainting for video frame editing",
      "AI training for custom style and subject generation",
      "Frame interpolation for smooth slow-motion effects",
    ],
    color: "from-rose-600 to-orange-700",
    tagline: "The future of storytelling with generative AI video",
    pricing: [
      { tier: "Basic", price: "$0", note: "125 credits, watermarked outputs, basic tools" },
      { tier: "Standard", price: "$15/mo", note: "625 credits/mo, no watermark, all Gen-3 features" },
      { tier: "Pro", price: "$35/mo", note: "2,250 credits/mo, priority generation, upscaling" },
      { tier: "Unlimited", price: "$95/mo", note: "Unlimited standard generations, all features" },
    ],
    useCases: [
      "Generating B-roll footage and visual effects for video productions",
      "Creating cinematic concept videos for pitches and pre-visualization",
      "Animating still product images for social media and advertising",
      "Rapid visual prototyping for film, advertising, and media projects",
    ],
    pros: [
      "Gen-3 Alpha produces the most cinematic AI video quality available",
      "Motion brush gives unprecedented control over where movement occurs",
      "Excellent for creative professionals pushing visual boundaries",
      "Active development means rapid improvement with regular model updates",
    ],
    cons: [
      "Credit system makes costs unpredictable for high-volume usage",
      "Video generation is still imperfect with occasional artifacts",
      "Steeper learning curve than simpler AI video tools",
    ],
    websiteUrl: "https://runwayml.com",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Creative professionals, filmmakers, and agencies exploring the frontier of AI-powered video production",
    overview:
      "Runway ML is at the cutting edge of generative AI for video, offering tools that are transforming how creative professionals approach production and post-production. The Gen-3 Alpha model sets a new quality bar for AI-generated video, capable of producing cinematic footage from text descriptions or reference images with impressive temporal consistency. Beyond generation, Runway's suite of video editing AI tools — background removal, inpainting, motion brush, and frame interpolation — accelerates traditional post-production workflows. For filmmakers, advertising creatives, and studios exploring what AI can bring to visual storytelling, Runway ML is the most capable and actively developed platform in the space.",
  },
  {
    slug: "tidio",
    name: "Tidio",
    description:
      "Tidio is an AI-powered customer service platform combining live chat, AI chatbots, and the Lyro AI agent to help e-commerce and small businesses deliver fast, automated support while keeping human agents in the loop.",
    category: "Customer Support",
    features: [
      "Lyro AI conversational agent for autonomous support resolution",
      "Live chat widget with real-time visitor tracking",
      "Visual chatbot builder with pre-built e-commerce templates",
      "Email, Messenger, and Instagram integration in one inbox",
      "Automated cart abandonment and sales recovery flows",
      "Analytics dashboard with agent performance metrics",
    ],
    color: "from-blue-400 to-indigo-600",
    tagline: "AI customer service that grows with your business",
    pricing: [
      { tier: "Free", price: "$0", note: "50 conversations/mo, live chat, basic chatbots" },
      { tier: "Starter", price: "$29/mo", note: "100 Lyro conversations, unlimited live chat" },
      { tier: "Growth", price: "$59/mo", note: "250 Lyro conversations, automation, analytics" },
      { tier: "Plus", price: "$749/mo", note: "Custom Lyro limit, priority support, dedicated success manager" },
    ],
    useCases: [
      "Automating common customer queries for e-commerce stores",
      "Reducing cart abandonment with proactive chat triggers",
      "Providing 24/7 instant support without overnight staffing",
      "Routing complex issues from AI to human agents seamlessly",
    ],
    pros: [
      "Lyro AI resolves the majority of common support queries without human intervention",
      "Easy setup with no-code chatbot builder and Shopify/WordPress plugins",
      "Generous free plan is suitable for small businesses getting started",
      "Multi-channel inbox consolidates email, chat, and social in one view",
    ],
    cons: [
      "Lyro conversation limits can feel restrictive on lower plans during busy periods",
      "Lyro AI knowledge is limited to your uploaded content and website",
      "Interface can feel dated compared to newer support platforms",
    ],
    websiteUrl: "https://www.tidio.com",
    affiliateUrl: "https://www.tidio.com/?utm_source=aiproductivityhub",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "E-commerce stores and small businesses that want affordable AI-powered customer support with live chat fallback",
    overview:
      "Tidio has become a go-to customer service platform for e-commerce businesses and small teams that need capable AI support without enterprise pricing. The Lyro AI agent is the platform's centerpiece — trained on your business's knowledge base, it handles common questions about orders, shipping, returns, and product information autonomously, typically resolving over 70% of incoming queries without human intervention. The visual chatbot builder lets non-technical users create sophisticated conversation flows for sales, support, and lead capture. With native integrations for Shopify, WooCommerce, and major CMS platforms, Tidio slots into existing e-commerce stacks in minutes and delivers immediate reductions in support workload.",
  },
  {
    slug: "claude",
    name: "Claude",
    description:
      "Claude is Anthropic's AI assistant, renowned for its nuanced reasoning, long document analysis, thoughtful writing, and safety-focused design. Available via claude.ai and the API, Claude excels at complex tasks requiring careful judgment and extended context.",
    category: "Research",
    features: [
      "Industry-leading 200K token context window for processing entire codebases and documents",
      "Claude 3.5 Sonnet and Opus for state-of-the-art reasoning and analysis",
      "Extended thinking mode for transparent, step-by-step complex reasoning",
      "Artifacts feature for generating and iterating on code, documents, and interactive content",
      "Projects for persistent memory and context across conversations",
      "API with tool use, vision, and computer use capabilities",
    ],
    color: "from-amber-500 to-orange-600",
    tagline: "The thoughtful AI assistant built for depth and nuance",
    pricing: [
      { tier: "Free", price: "$0", note: "Claude 3.5 Sonnet with usage limits" },
      { tier: "Pro", price: "$20/mo", note: "5x more usage, Projects, priority access to new models" },
      { tier: "Team", price: "$25/user/mo", note: "Higher limits, admin console, no training on data" },
      { tier: "Enterprise", price: "Custom", note: "Expanded context, SSO, advanced security, dedicated support" },
    ],
    useCases: [
      "Analyzing and synthesizing lengthy research papers, legal documents, and reports",
      "Writing nuanced long-form content with complex arguments and precise language",
      "Working through multi-step technical problems requiring careful reasoning",
      "Processing and understanding entire codebases for architecture review or debugging",
    ],
    pros: [
      "Best-in-class performance on tasks requiring careful, nuanced reasoning",
      "Extraordinary long-context handling — processes entire books and large codebases",
      "Extended thinking mode provides transparency into complex reasoning chains",
      "Safety-focused design with strong refusal calibration and reduced hallucination",
    ],
    cons: [
      "Usage limits on free and Pro plans can be frustrating during intensive sessions",
      "Does not browse the web in standard mode without tool integrations",
      "Fewer third-party integrations compared to ChatGPT's plugin ecosystem",
    ],
    websiteUrl: "https://claude.ai",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Researchers, writers, lawyers, engineers, and analysts who need an AI that handles complex, nuanced tasks with precision",
    overview:
      "Claude by Anthropic is the AI assistant that professionals reach for when a task demands genuine depth of understanding rather than surface-level generation. With a 200,000-token context window, Claude can ingest and reason over entire legal contracts, research papers, and software repositories in a single conversation. The extended thinking capability exposes Claude's reasoning process, making it invaluable for tasks where you need to understand not just the answer but the logic behind it. Claude's writing is consistently praised for its clarity, precision, and intellectual engagement — it does not just generate content but engages thoughtfully with the task. For knowledge workers dealing with complex, high-stakes documents and decisions, Claude is the AI assistant that earns trust through consistent quality.",
  },
  {
    slug: "cursor",
    name: "Cursor",
    description:
      "Cursor is an AI-first code editor built on VS Code that deeply integrates large language models into the development workflow. It offers codebase-aware chat, multi-file edits, and predictive code generation to dramatically accelerate software development.",
    category: "Code",
    features: [
      "Codebase-wide AI chat with full repository context",
      "Composer mode for multi-file, multi-step code generation and refactoring",
      "Tab autocomplete with predictive next-edit suggestions",
      "Inline code generation and editing with natural language instructions",
      "Automatic bug fixing with explanation of what was changed and why",
      "Support for Claude, GPT-4, and Cursor's own fine-tuned models",
    ],
    color: "from-gray-800 to-slate-950",
    tagline: "The AI-first code editor that understands your entire codebase",
    pricing: [
      { tier: "Hobby", price: "$0", note: "2,000 completions, 50 slow premium requests/mo" },
      { tier: "Pro", price: "$20/mo", note: "Unlimited completions, 500 fast premium requests, unlimited slow" },
      { tier: "Business", price: "$40/user/mo", note: "All Pro features, centralized billing, SSO, admin controls" },
    ],
    useCases: [
      "Implementing new features across multiple files with natural language instructions",
      "Onboarding to unfamiliar codebases by asking questions about the architecture",
      "Refactoring and modernizing legacy code with AI-guided multi-file edits",
      "Debugging complex issues with AI that understands the full project context",
    ],
    pros: [
      "Codebase context awareness makes suggestions dramatically more relevant than generic copilots",
      "Composer mode handles complex multi-file changes that competitors cannot",
      "Familiar VS Code base means zero learning curve for existing VS Code users",
      "Flexible model selection lets you use the best model for each type of task",
    ],
    cons: [
      "Pro plan's fast request limits can be depleted quickly during intensive sessions",
      "Privacy-conscious teams should review data handling before adopting",
      "Heavier resource usage compared to a standard VS Code installation",
    ],
    websiteUrl: "https://www.cursor.com",
    lastReviewedAt: "2026-03-21",
    reviewStatus: "current" as ReviewStatus,
    isFree: true,
    bestFor: "Software engineers who want the deepest AI integration into their coding workflow with full codebase context",
    overview:
      "Cursor represents the next generation of AI-assisted development, going far beyond the autocomplete suggestions of tools like GitHub Copilot. By indexing your entire codebase, Cursor can answer questions about architecture, find bugs across multiple files, and execute complex refactors that touch dozens of files simultaneously through its Composer mode. The editor is a fork of VS Code, meaning every extension, keybinding, and workflow you have built carries over instantly. The combination of deep contextual understanding, multi-file editing capability, and support for the most capable frontier models makes Cursor the preferred development environment for engineers who want AI assistance that genuinely understands what they are building.",
  },
];
