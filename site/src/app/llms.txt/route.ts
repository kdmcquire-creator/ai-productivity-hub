import { NextResponse } from "next/server";

export async function GET() {
  const content = `# AI Productivity Hub
> Independent reviews and guides for AI productivity tools.

## About
AI Productivity Hub covers AI tools for writing, design, development, project management, and workplace automation. We help professionals and teams find the right AI tools for their workflows.

## Sections
- /tools — Directory of 100+ AI productivity tools with reviews
- /blog — In-depth guides and analysis
- /compare — Side-by-side tool comparisons
- /tools/calculators — Free productivity calculators

## Contact
https://aiproductivityhub.co/contact/
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
