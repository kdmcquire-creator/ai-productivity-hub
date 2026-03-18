export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorSlug: string;
  readTime: string;
  category: string;
  color: string;
  toolSlugs: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "automating-office-fireflies-vs-signwell",
    title: "Stop the Admin Burnout: Why Fireflies.ai and SignWell are the Ultimate Business Duo",
    excerpt:
      "Discover how pairing Fireflies.ai for automated meeting notes with SignWell for streamlined document signing can eliminate hours of tedious admin work and free your team to focus on what matters.",
    date: "March 10, 2026",
    author: "Kyle McQuire",
    authorSlug: "kyle-mcquire",
    readTime: "8 min read",
    category: "Automation",
    color: "from-blue-500 to-indigo-600",
    toolSlugs: ["fireflies-ai"],
  },
  {
    slug: "synthesia-vs-elevenlabs-vs-speechify",
    title: "Synthesia vs. ElevenLabs vs. Speechify: Which AI Video/Audio Tool is Right for You?",
    excerpt:
      "A detailed comparison of three leading AI media tools. We break down features, pricing, and ideal use cases to help you decide whether Synthesia, ElevenLabs, or Speechify best fits your content creation needs.",
    date: "March 8, 2026",
    author: "Kyle McQuire",
    authorSlug: "kyle-mcquire",
    readTime: "10 min read",
    category: "Comparison",
    color: "from-purple-500 to-violet-600",
    toolSlugs: ["synthesia", "elevenlabs"],
  },
];
