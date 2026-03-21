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
    slug: "kyle-mcquire",
    name: "Kyle McQuire",
    bio: "Founder of AI Productivity Hub. Passionate about helping professionals and businesses leverage AI tools to work smarter, automate tedious tasks, and focus on what matters most.",
    role: "Founder & Editor",
    socialLinks: {
      website: "https://aiproductivityhub.co",
    },
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
