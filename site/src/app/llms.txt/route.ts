import { NextResponse } from "next/server";

export async function GET() {
  const content = `# AI Productivity Hub
> Independent reviews and guides for AI productivity tools, grounded in daily firsthand use.

## About
AI Productivity Hub covers AI tools for writing, design, development, project management, meeting notes and transcription, knowledge management, and workplace automation. We write about tools we actually use to run our own small business.

## Sections
- /tools — Directory of 100+ AI productivity tools with reviews
- /blog — In-depth guides and analysis
- /compare — Side-by-side tool comparisons (ChatGPT vs Claude, Notion AI vs Mem, etc.)
- /tools/calculators — Free productivity calculators

## Editorial Approach
- Hands-on testing: recommendations come from firsthand daily use, not press releases.
- Affiliate relationships are disclosed on every review. Recommendations are not paid placements.
- Content is AI-assisted in research and drafting; every article is reviewed and edited by a human (Kyle McQuire, Founder of Moonsmoke LLC) before publication.
- We update posts when tools change pricing, features, or positioning.

## Contact
https://aiproductivityhub.co/contact/
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
