export interface BlogSection {
  heading: string;
  headingColor?: string;
  subtitle?: string;
  body: string;
  listItems?: string[];
  orderedList?: string[];
  calloutStyle?: "green" | "blue" | "yellow";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  author: string;
  authorSlug: string;
  readTime: string;
  category: string;
  color: string;
  toolSlugs: string[];
  sections: BlogSection[];
  verdict?: BlogSection;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "automating-office-fireflies-vs-signwell",
    title:
      "Stop the Admin Burnout: Why Fireflies.ai and SignWell are the Ultimate Business Duo",
    excerpt:
      "Discover how pairing Fireflies.ai for automated meeting notes with SignWell for streamlined document signing can eliminate hours of tedious admin work and free your team to focus on what matters.",
    date: "March 10, 2026",
    dateISO: "2026-03-10",
    author: "Kyle McQuire",
    authorSlug: "kyle-mcquire",
    readTime: "8 min read",
    category: "Automation",
    color: "from-blue-500 to-indigo-600",
    toolSlugs: ["fireflies-ai"],
    sections: [
      {
        heading: "Overview",
        body: "In 2026, the biggest drain on business productivity is the crushing weight of administrative tasks. Two of the most time-consuming areas are meeting management and document execution. This guide explores how Fireflies.ai and SignWell work together to reclaim hours of your work week.",
      },
      {
        heading: "1. Fireflies.ai: The AI Meeting Assistant",
        headingColor: "text-blue-700",
        subtitle:
          "Best For: Automating meeting notes, transcriptions, and action items.",
        body: "Fireflies.ai joins your calls (Zoom, Google Meet, Teams) and automatically records, transcribes, and summarizes the entire conversation. It identifies key decisions and assigns action items so you don't have to.",
        listItems: [
          "Pros: High transcription accuracy, seamless CRM integration, searchable meeting history, automated summaries.",
          "Cons: Can be intrusive for some clients, free tier has limits on storage and AI features.",
          "Pricing: Free version available; Pro plans start at ~$10/mo.",
        ],
      },
      {
        heading: "2. SignWell: The Streamlined E-Signature Tool",
        headingColor: "text-blue-700",
        subtitle:
          "Best For: Legally-binding electronic signatures and document tracking.",
        body: "SignWell is the modern, user-friendly alternative to bloated e-signature platforms. It's built for speed, making it incredibly easy to get contracts, NDAs, and agreements signed in minutes.",
        listItems: [
          "Pros: Extremely simple interface, legally binding, automated reminders, reusable templates.",
          "Cons: Focused purely on signing, not a full document management system like DocuSign.",
          "Pricing: Free tier available; Paid plans start at ~$8/mo.",
        ],
      },
    ],
    verdict: {
      heading: "How they work together:",
      calloutStyle: "green",
      body: "Imagine this workflow:",
      orderedList: [
        "You have a project kickoff call. Fireflies.ai records the agreement.",
        'Fireflies identifies the action item: "Send NDA and contract."',
        "You use a SignWell template to send the documents in two clicks.",
        "Both administrative tasks are finished before you've even hung up the phone.",
      ],
    },
  },
  {
    slug: "synthesia-vs-elevenlabs-vs-speechify",
    title:
      "Synthesia vs. ElevenLabs vs. Speechify: Which AI Video/Audio Tool is Right for You?",
    excerpt:
      "A detailed comparison of three leading AI media tools. We break down features, pricing, and ideal use cases to help you decide whether Synthesia, ElevenLabs, or Speechify best fits your content creation needs.",
    date: "March 8, 2026",
    dateISO: "2026-03-08",
    author: "Kyle McQuire",
    authorSlug: "kyle-mcquire",
    readTime: "10 min read",
    category: "Comparison",
    color: "from-purple-500 to-violet-600",
    toolSlugs: ["synthesia", "elevenlabs"],
    sections: [
      {
        heading: "Overview",
        body: 'As AI audio and video technology matures, three giants have emerged as leaders in the "Generative Media" space. However, they serve very different primary use cases. This guide helps you choose the right tool for your specific productivity or business workflow.',
      },
      {
        heading: "1. Synthesia: The King of AI Video Avatars",
        subtitle:
          "Best For: Professional training videos, corporate communications, and localized marketing.",
        body: "Synthesia replaces the need for a camera, studio, and actors. You type a script, and a photorealistic AI avatar speaks it with human-like expressions.",
        listItems: [
          "Pros: 150+ diverse avatars, 120+ languages, built-in video editor, easy localization.",
          'Cons: High cost for individuals, strict content moderation, best for "talking head" styles only.',
          "Pricing: Starts at ~$22/mo (Starter).",
        ],
      },
      {
        heading: "2. ElevenLabs: The Gold Standard for AI Voice",
        subtitle:
          "Best For: Voiceovers, audiobook narration, gaming, and high-fidelity voice cloning.",
        body: 'ElevenLabs is arguably the most realistic speech synthesis tool on the market. Its "Speech-to-Speech" and "Instant Voice Cloning" are industry-leading for emotional depth and clarity.',
        listItems: [
          "Pros: Most realistic vocal range, low latency API, superior voice cloning, generous free tier.",
          "Cons: No video features, focus is purely on audio, high-tier plans can get expensive for heavy throughput.",
          "Pricing: Free tier available; Creator plan starts at ~$11/mo.",
        ],
      },
      {
        heading: "3. Speechify: The Productivity Powerhouse",
        subtitle:
          'Best For: Students, professionals with dyslexia, and power-readers who want to "listen" to the web.',
        body: "Unlike the others, Speechify is primarily a consumption tool. It's designed to read PDFs, emails, and articles aloud at high speeds (up to 4.5x) using high-quality AI voices.",
        listItems: [
          'Pros: Incredible browser extensions and mobile apps, "celebrity" voices, focus on accessibility.',
          "Cons: Limited creation tools compared to ElevenLabs, subscription-based only for premium voices.",
          "Pricing: Free version available; Premium at ~$139/year.",
        ],
      },
    ],
    verdict: {
      heading: "Verdict: Which should you choose?",
      calloutStyle: "blue",
      body: "",
      listItems: [
        "Choose Synthesia if you need to create videos for your business without filming.",
        "Choose ElevenLabs if you are a creator or developer needing the highest quality audio/voiceover.",
        "Choose Speechify if you want to consume content faster and boost your reading productivity.",
      ],
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
