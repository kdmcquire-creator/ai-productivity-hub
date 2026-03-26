// Social media content calendar for AI Productivity Hub
// Used by siteops-agent to auto-schedule posts via Buffer

export type Platform = "twitter" | "linkedin";
export type PostType = "tool_spotlight" | "blog_promo" | "comparison" | "tip" | "engagement";

export interface SocialPost {
  id: string;
  type: PostType;
  platforms: Platform[];
  content: {
    twitter: string; // Max 280 chars
    linkedin: string; // Longer-form professional
  };
  link?: string;
  hashtags: string[];
  scheduledFor?: string; // ISO date
  status: "draft" | "scheduled" | "published";
}

// Pre-written social posts ready to schedule
export const socialPosts: SocialPost[] = [
  // === TOOL SPOTLIGHTS ===
  {
    id: "spot-chatgpt",
    type: "tool_spotlight",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "ChatGPT isn't just for chatting anymore.\n\nWe tested it for writing, coding, research, and data analysis.\n\nOur full review breaks down what it does well (and where it falls short).",
      linkedin: "We spent 2 weeks putting ChatGPT through real-world business tasks: drafting proposals, analyzing data, writing code, and brainstorming strategy.\n\nHere's what we found — the good, the bad, and when you should use Claude instead.\n\nFull review with pricing breakdown and use cases.",
    },
    link: "https://aiproductivityhub.co/tools/chatgpt/",
    hashtags: ["AITools", "ChatGPT", "Productivity"],
    status: "draft",
  },
  {
    id: "spot-grammarly",
    type: "tool_spotlight",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "Grammarly's free tier catches more than typos.\n\nTone detection, clarity suggestions, and full-sentence rewrites.\n\nHere's our honest review after using it daily for 6 months.",
      linkedin: "We've been using Grammarly daily for 6 months across emails, docs, and Slack.\n\nThe free tier alone caught 200+ issues our spell-checker missed. The AI rewrite suggestions saved us hours of editing.\n\nBut it's not perfect. Here's our full honest review.",
    },
    link: "https://aiproductivityhub.co/tools/grammarly/",
    hashtags: ["AIWriting", "Grammarly", "WritingTools"],
    status: "draft",
  },
  {
    id: "spot-fireflies",
    type: "tool_spotlight",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "Stop taking meeting notes.\n\nFireflies.ai joins your calls, transcribes everything, and creates action items automatically.\n\nOur review of the tool that's saving teams 5+ hours/week.",
      linkedin: "If you're still manually taking meeting notes, you're wasting 5+ hours per week.\n\nFireflies.ai joins your Zoom/Meet/Teams calls and automatically:\n- Transcribes the full conversation\n- Identifies key decisions\n- Creates action items\n- Sends summaries to your team\n\nWe tested it for a month. Here's our detailed review.",
    },
    link: "https://aiproductivityhub.co/tools/fireflies-ai/",
    hashtags: ["MeetingNotes", "AIProductivity", "Fireflies"],
    status: "draft",
  },

  // === BLOG PROMOS ===
  {
    id: "blog-chatgpt-vs-claude",
    type: "blog_promo",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "ChatGPT vs Claude: we tested both on 10 real tasks.\n\nThe results surprised us.\n\nOne is better for creative writing. The other wins at analysis. Neither is perfect for everything.",
      linkedin: "We ran a head-to-head test: ChatGPT vs Claude across 10 real business tasks — writing, coding, analysis, brainstorming, and more.\n\nThe results weren't what we expected. Each AI has clear strengths and blind spots.\n\nWe broke down every task with examples so you can pick the right one for YOUR workflow.",
    },
    link: "https://aiproductivityhub.co/blog/chatgpt-vs-claude-which-ai-assistant/",
    hashtags: ["ChatGPT", "Claude", "AIComparison"],
    status: "draft",
  },
  {
    id: "blog-free-tools",
    type: "blog_promo",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "10 free AI tools that actually work.\n\nNo trials. No credit cards. Just free tiers that are genuinely useful.\n\nFor freelancers, small teams, and anyone tired of paying for things they barely use.",
      linkedin: "You don't need a budget to work smarter with AI.\n\nWe compiled 10 AI tools with genuinely useful free tiers — covering writing, design, meetings, project management, and more.\n\nEvery tool on this list is one we've personally tested and would recommend without the paid upgrade.",
    },
    link: "https://aiproductivityhub.co/blog/free-ai-tools-for-freelancers/",
    hashtags: ["FreeAITools", "Freelancer", "Productivity"],
    status: "draft",
  },
  {
    id: "blog-workflow",
    type: "blog_promo",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "Most people use AI tools in isolation.\n\nThe real power is connecting them into workflows.\n\nOur step-by-step guide to building your first AI-powered automation.",
      linkedin: "The biggest mistake people make with AI tools? Using them one at a time.\n\nThe real productivity gains come from connecting tools into automated workflows:\n\n- Meeting transcription auto-creates tasks\n- Content drafts auto-populate social posts\n- Emails auto-generate follow-up reminders\n\nHere's our step-by-step guide to building your first AI workflow.",
    },
    link: "https://aiproductivityhub.co/blog/ai-workflow-automation-guide/",
    hashtags: ["Automation", "AIWorkflow", "Productivity"],
    status: "draft",
  },

  // === COMPARISONS ===
  {
    id: "compare-jasper-grammarly",
    type: "comparison",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "Jasper vs Grammarly: they solve different problems.\n\nOne generates content. The other polishes it.\n\nBut which one should you pay for? We broke it down.",
      linkedin: "Jasper AI and Grammarly both call themselves 'AI writing tools' but they're solving completely different problems.\n\nJasper generates content from scratch. Grammarly refines what you've already written.\n\nWe compared them across 8 dimensions including pricing, quality, and learning curve. Here's the verdict.",
    },
    link: "https://aiproductivityhub.co/compare/jasper-ai-vs-grammarly/",
    hashtags: ["JasperAI", "Grammarly", "AIWriting"],
    status: "draft",
  },

  // === TIPS ===
  {
    id: "tip-prompt-engineering",
    type: "tip",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "Quick AI tip:\n\nInstead of: 'Write me an email'\n\nTry: 'Write a follow-up email to a client who hasn't responded in 5 days. Tone: professional but warm. Length: 3 sentences.'\n\nContext = better output. Every time.",
      linkedin: "The #1 reason people think AI tools 'don't work' is bad prompts.\n\nHere's the difference:\n\nBad: 'Write me an email'\nGood: 'Write a follow-up email to a client who hasn't responded in 5 days. Tone: professional but warm. Length: 3 sentences. Include a soft deadline.'\n\nContext is everything. The more specific you are, the better the output.\n\nWhat's your best prompt tip?",
    },
    hashtags: ["PromptEngineering", "AITips", "Productivity"],
    status: "draft",
  },
  {
    id: "tip-automate-first",
    type: "tip",
    platforms: ["twitter", "linkedin"],
    content: {
      twitter: "Before adding another AI tool to your stack:\n\n1. List your 3 most repetitive tasks\n2. Time how long each takes per week\n3. Automate the biggest time-sink first\n\nDon't collect tools. Solve problems.",
      linkedin: "I see people adding AI tools to their stack like collecting Pokemon cards.\n\nHere's a better approach:\n\n1. List your 3 most repetitive weekly tasks\n2. Time how long each takes\n3. Find the AI tool that solves your biggest time-sink\n4. Master it before adding another\n\nOne well-integrated tool beats five you barely use.\n\nWhat's the one AI tool that actually changed your workflow?",
    },
    hashtags: ["ProductivityTips", "AIStrategy", "WorkSmarter"],
    status: "draft",
  },

  // === ENGAGEMENT ===
  {
    id: "engage-poll",
    type: "engagement",
    platforms: ["twitter"],
    content: {
      twitter: "Which AI tool has saved you the most time this year?\n\n(Reply below -- we'll feature the best answers in our newsletter)",
      linkedin: "Which AI tool has saved you the most time this year?\n\nI'll start: Fireflies.ai eliminated 4+ hours of meeting notes per week for our team.\n\nDrop yours below -- we'll feature the best answers in our next newsletter.",
    },
    hashtags: ["AITools", "Productivity"],
    status: "draft",
  },
];

// Posting schedule: optimal times by platform
export const postingSchedule = {
  twitter: {
    // Best engagement times for B2B/tech content
    weekday: ["09:00", "12:30", "17:00"],
    weekend: ["10:00"],
    postsPerWeek: 5,
  },
  linkedin: {
    weekday: ["08:00", "12:00"],
    weekend: [],
    postsPerWeek: 3,
  },
};

// Content mix (percentage of posts per type per week)
export const contentMix = {
  tool_spotlight: 20,
  blog_promo: 30,
  comparison: 15,
  tip: 25,
  engagement: 10,
};
