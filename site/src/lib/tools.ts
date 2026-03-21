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
];
