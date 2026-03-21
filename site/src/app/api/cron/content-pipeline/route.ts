import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";
import { feedSources, relevanceKeywords, scoringWeights } from "@/lib/crawler-config";
import { tools } from "@/lib/tools";

interface CrawledItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  relevanceScore: number;
  recencyScore: number;
  noveltyScore: number;
  totalScore: number;
}

interface ContentDraft {
  type: "tool_review" | "comparison" | "news_digest";
  title: string;
  content: string;
  sources: string[];
  generatedAt: string;
  status: "draft";
}

function calculateRelevanceScore(title: string, description?: string): number {
  const text = `${title} ${description || ""}`.toLowerCase();
  let matches = 0;
  for (const keyword of relevanceKeywords) {
    if (text.includes(keyword)) matches++;
  }
  return Math.min(matches / 5, 1);
}

function calculateRecencyScore(pubDate: string): number {
  const age = Date.now() - new Date(pubDate).getTime();
  const hours = age / (1000 * 60 * 60);
  if (hours < 24) return 1;
  if (hours < 72) return 0.8;
  if (hours < 168) return 0.5;
  return 0.2;
}

function calculateNoveltyScore(title: string): number {
  const titleLower = title.toLowerCase();
  const existingTool = tools.find(
    (t) =>
      titleLower.includes(t.name.toLowerCase()) ||
      titleLower.includes(t.slug.replace(/-/g, " "))
  );
  return existingTool ? 0.3 : 1;
}

function parseRssItems(
  xml: string
): { title: string; link: string; pubDate: string; description?: string }[] {
  const items: {
    title: string;
    link: string;
    pubDate: string;
    description?: string;
  }[] = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title =
      itemXml.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1] ||
      "";
    const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || "";
    const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
    const description =
      itemXml.match(
        /<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/
      )?.[1] || "";

    if (title && link) {
      items.push({ title, link, pubDate, description });
    }
  }

  return items;
}

async function crawlFeeds(): Promise<CrawledItem[]> {
  const allItems: CrawledItem[] = [];

  for (const source of feedSources) {
    try {
      const response = await fetch(source.url, {
        headers: {
          "User-Agent":
            "AIProductivityHub-Crawler/1.0 (+https://aiproductivityhub.co)",
        },
      });

      if (!response.ok) {
        console.warn(
          JSON.stringify({
            type: "feed_fetch_error",
            source: source.name,
            status: response.status,
          })
        );
        continue;
      }

      const xml = await response.text();
      const items = parseRssItems(xml);

      for (const item of items.slice(0, 10)) {
        const relevanceScore = calculateRelevanceScore(
          item.title,
          item.description
        );
        const recencyScore = calculateRecencyScore(
          item.pubDate || new Date().toISOString()
        );
        const noveltyScore = calculateNoveltyScore(item.title);

        const totalScore =
          relevanceScore * scoringWeights.relevance +
          recencyScore * scoringWeights.recency +
          noveltyScore * scoringWeights.novelty;

        allItems.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
          source: source.name,
          category: source.category,
          relevanceScore,
          recencyScore,
          noveltyScore,
          totalScore,
        });
      }
    } catch (err) {
      console.error(
        JSON.stringify({
          type: "feed_crawl_error",
          source: source.name,
          error: err instanceof Error ? err.message : "Unknown",
        })
      );
    }
  }

  allItems.sort((a, b) => b.totalScore - a.totalScore);
  return allItems;
}

async function generateContentDrafts(
  topItems: CrawledItem[]
): Promise<ContentDraft[]> {
  const drafts: ContentDraft[] = [];
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!anthropicKey || topItems.length === 0) {
    console.log(
      JSON.stringify({
        type: "content_generation_skipped",
        reason: !anthropicKey ? "No API key" : "No items to process",
      })
    );
    return drafts;
  }

  const digestItems = topItems.slice(0, 8);
  const digestPrompt = `You are an editor for AI Productivity Hub (aiproductivityhub.co), a site that reviews AI productivity tools. Write a concise weekly digest newsletter section covering these AI tool news items:

${digestItems.map((item, i) => `${i + 1}. "${item.title}" (Source: ${item.source}, Score: ${item.totalScore.toFixed(2)})`).join("\n")}

Write in a professional but approachable tone. Include:
- A 2-sentence intro
- A brief summary of each item (1-2 sentences) explaining why it matters for productivity
- A closing line encouraging readers to explore the tools directory

Keep it under 500 words total.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: digestPrompt }],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content =
        data.content?.[0]?.type === "text" ? data.content[0].text : "";

      if (content) {
        drafts.push({
          type: "news_digest",
          title: `AI Tools Weekly Digest - ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
          content,
          sources: digestItems.map((item) => item.link),
          generatedAt: new Date().toISOString(),
          status: "draft",
        });
      }
    } else {
      console.error(
        JSON.stringify({
          type: "ai_generation_error",
          status: response.status,
          body: await response.text(),
        })
      );
    }
  } catch (err) {
    console.error(
      JSON.stringify({
        type: "ai_generation_error",
        error: err instanceof Error ? err.message : "Unknown",
      })
    );
  }

  return drafts;
}

export async function POST(request: Request) {
  const authError = verifyCronAuth(request);
  if (authError) return authError;

  const crawledItems = await crawlFeeds();

  console.log(
    JSON.stringify({
      type: "crawl_complete",
      totalItems: crawledItems.length,
      topScore: crawledItems[0]?.totalScore ?? 0,
    })
  );

  const drafts = await generateContentDrafts(crawledItems);

  console.log(
    JSON.stringify({
      type: "content_pipeline_complete",
      crawledItems: crawledItems.length,
      draftsGenerated: drafts.length,
    })
  );

  return NextResponse.json({
    summary: {
      crawledItems: crawledItems.length,
      draftsGenerated: drafts.length,
      topItems: crawledItems.slice(0, 5).map((item) => ({
        title: item.title,
        source: item.source,
        score: item.totalScore.toFixed(2),
      })),
      generatedAt: new Date().toISOString(),
    },
    drafts,
  });
}
