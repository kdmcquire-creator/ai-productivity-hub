// Newsletter data model — flat-file TypeScript pattern
// Mirrors the legaltech-hub architecture

export type NewsletterFormat =
  | "ai-roundup"        // Weekly tool discoveries + news
  | "deep-dive"         // Single tool in-depth review
  | "head-to-head"      // Comparison format
  | "productivity-hack" // Workflow tips and automation guides

export type NewsletterStatus = "draft" | "queued" | "sent";

export interface Newsletter {
  id: string;
  format: NewsletterFormat;
  subject: string;
  preheader: string;
  htmlContent: string;
  textContent: string;
  status: NewsletterStatus;
  sendDate: string; // ISO date — FIFO ordering
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const newsletterFormats: Record<
  NewsletterFormat,
  { name: string; description: string }
> = {
  "ai-roundup": {
    name: "The AI Roundup",
    description: "Weekly tool discoveries, launches, and news from the AI productivity space.",
  },
  "deep-dive": {
    name: "Deep Dive",
    description: "An in-depth review of a single AI tool — features, pricing, pros/cons, and verdict.",
  },
  "head-to-head": {
    name: "Head to Head",
    description: "Side-by-side comparison of competing tools in the same category.",
  },
  "productivity-hack": {
    name: "Productivity Hack",
    description: "Actionable tips for automating workflows and getting more done with AI.",
  },
};

// Validate newsletter format
export function isValidFormat(format: string): format is NewsletterFormat {
  return format in newsletterFormats;
}
