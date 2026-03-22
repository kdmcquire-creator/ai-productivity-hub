export interface Author {
  slug: string;
  name: string;
  bio: string;
  role: string;
  avatarUrl?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const authors: Author[] = [
  {
    slug: "editorial-team",
    name: "AI Productivity Hub Editorial Team",
    bio: "Our editorial team researches, tests, and reviews AI productivity tools to help you make informed decisions. Every review is based on hands-on testing and real-world use cases.",
    role: "Editorial",
    socialLinks: {
      website: "https://aiproductivityhub.co",
    },
  },
  {
    slug: "tools-team",
    name: "AI Productivity Hub Tools Team",
    bio: "The Tools Team specializes in hands-on testing and comparison of AI software across writing, design, development, and business categories.",
    role: "Tool Reviews",
  },
  {
    slug: "research-team",
    name: "AI Productivity Hub Research Team",
    bio: "Our Research Team dives deep into AI trends, emerging tools, and market comparisons to bring you data-driven insights.",
    role: "Research & Analysis",
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
