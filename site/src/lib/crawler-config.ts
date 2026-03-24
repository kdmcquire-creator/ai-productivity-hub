// RSS feed sources for AI tool news crawling
export interface FeedSource {
  name: string;
  url: string;
  category: "news" | "reviews" | "launches";
}

export const feedSources: FeedSource[] = [
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com/feed",
    category: "launches",
  },
  {
    name: "VentureBeat AI",
    url: "https://venturebeat.com/category/ai/feed/",
    category: "news",
  },
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    category: "news",
  },
  {
    name: "There's An AI For That",
    url: "https://theresanaiforthat.com/rss/",
    category: "launches",
  },
];

// Scoring weights for content relevance
export const scoringWeights = {
  relevance: 0.5, // How relevant is this to AI productivity tools?
  recency: 0.3, // How recent is the content?
  novelty: 0.2, // Is this something we haven't covered?
};

// Keywords that boost relevance score
export const relevanceKeywords = [
  "productivity",
  "ai tool",
  "automation",
  "workflow",
  "writing assistant",
  "code assistant",
  "meeting",
  "transcription",
  "design tool",
  "project management",
  "collaboration",
  "saas",
  "free tier",
  "pricing",
  "comparison",
  "review",
  "alternative",
];
