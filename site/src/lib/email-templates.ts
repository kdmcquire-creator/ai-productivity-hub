// Email welcome sequence templates
// Sent via SendGrid when a new subscriber joins

export interface EmailTemplate {
  id: string;
  subject: string;
  preheader: string;
  delayDays: number; // Days after signup to send
  htmlContent: string;
  textContent: string;
}

const SITE_URL = "https://aiproductivityhub.co";
const UNSUBSCRIBE_URL = `${SITE_URL}/api/unsubscribe`;

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e5e7eb; }
    .header { text-align: center; margin-bottom: 24px; }
    .logo { font-size: 18px; font-weight: 700; color: #2563eb; }
    h1 { font-size: 24px; color: #111827; margin: 0 0 16px; }
    h2 { font-size: 18px; color: #111827; margin: 24px 0 12px; }
    p { margin: 0 0 16px; color: #4b5563; }
    a { color: #2563eb; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; }
    .tool-card { background: #f0f9ff; border-radius: 8px; padding: 16px; margin: 8px 0; border-left: 3px solid #2563eb; }
    .tool-name { font-weight: 700; color: #111827; font-size: 15px; }
    .tool-desc { font-size: 13px; color: #6b7280; margin-top: 4px; }
    .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #9ca3af; }
    .footer a { color: #9ca3af; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">AI Productivity Hub</div>
      </div>
      ${body}
    </div>
    <div class="footer">
      <p>AI Productivity Hub | <a href="${SITE_URL}">${SITE_URL}</a></p>
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="${SITE_URL}/privacy/">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>`;
}

export const welcomeSequence: EmailTemplate[] = [
  // Email 1: Welcome (sent immediately)
  {
    id: "welcome-1-instant",
    subject: "Welcome to AI Productivity Hub! Here's what's inside.",
    preheader: "Your guide to working smarter with AI starts now.",
    delayDays: 0,
    htmlContent: wrapHtml(`
      <h1>Welcome aboard!</h1>
      <p>Thanks for joining AI Productivity Hub. You've just unlocked access to expert reviews, head-to-head comparisons, and practical guides that help you choose the right AI tools for your workflow.</p>

      <h2>Here's what you'll get:</h2>
      <div class="tool-card">
        <div class="tool-name">Weekly AI Roundup</div>
        <div class="tool-desc">New tool discoveries, product updates, and trending launches in the AI productivity space.</div>
      </div>
      <div class="tool-card">
        <div class="tool-name">Deep Dive Reviews</div>
        <div class="tool-desc">Honest, hands-on reviews of individual tools with pricing breakdowns and real-world use cases.</div>
      </div>
      <div class="tool-card">
        <div class="tool-name">Head-to-Head Comparisons</div>
        <div class="tool-desc">Side-by-side comparisons that help you pick the right tool without the research headache.</div>
      </div>

      <hr class="divider">

      <h2>Start here:</h2>
      <p>Our tools directory has 40+ AI tools across 12 categories. Find the perfect tool for your workflow:</p>
      <p style="text-align: center; margin: 24px 0;">
        <a href="${SITE_URL}/tools/" class="btn">Browse All Tools</a>
      </p>

      <p>Happy automating,<br><strong>The AI Productivity Hub Team</strong></p>
    `),
    textContent: `Welcome to AI Productivity Hub!

Thanks for joining. You've unlocked access to expert reviews, comparisons, and guides for AI productivity tools.

What you'll get:
- Weekly AI Roundup: New tool discoveries and trending launches
- Deep Dive Reviews: Honest reviews with pricing breakdowns
- Head-to-Head Comparisons: Side-by-side tool comparisons

Start here: ${SITE_URL}/tools/

Happy automating,
The AI Productivity Hub Team

Unsubscribe: {{unsubscribe_url}}`,
  },

  // Email 2: Top 5 tools (sent day 2)
  {
    id: "welcome-2-top-tools",
    subject: "5 AI tools our readers can't stop talking about",
    preheader: "These tools consistently rank highest in our reviews.",
    delayDays: 2,
    htmlContent: wrapHtml(`
      <h1>Our readers' top 5 picks</h1>
      <p>After reviewing 40+ AI tools, these five consistently come out on top. Each one solves a real problem and has a free tier so you can try before you commit.</p>

      <div class="tool-card">
        <div class="tool-name">1. ChatGPT (OpenAI)</div>
        <div class="tool-desc">The Swiss Army knife of AI. Writing, brainstorming, coding, analysis. If you're only going to try one tool, make it this one. <a href="${SITE_URL}/tools/chatgpt/">Read our review &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">2. Grammarly</div>
        <div class="tool-desc">AI writing assistant that works everywhere — emails, docs, Slack. The free tier alone catches embarrassing typos. <a href="${SITE_URL}/tools/grammarly/">Read our review &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">3. Notion AI</div>
        <div class="tool-desc">All-in-one workspace with AI baked in. Project management, docs, and databases that actually talk to each other. <a href="${SITE_URL}/tools/notion-ai/">Read our review &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">4. Fireflies.ai</div>
        <div class="tool-desc">Never take meeting notes again. Transcribes, summarizes, and extracts action items from every call. <a href="${SITE_URL}/tools/fireflies-ai/">Read our review &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">5. Canva</div>
        <div class="tool-desc">Design anything without being a designer. AI-powered templates, background removal, and Magic Write. <a href="${SITE_URL}/tools/canva/">Read our review &rarr;</a></div>
      </div>

      <hr class="divider">
      <p>Want to compare these tools side-by-side? Check out our <a href="${SITE_URL}/compare/">comparison pages</a>.</p>

      <p>See you next time,<br><strong>The AI Productivity Hub Team</strong></p>
    `),
    textContent: `Our readers' top 5 AI tools:

1. ChatGPT - The Swiss Army knife of AI: ${SITE_URL}/tools/chatgpt/
2. Grammarly - AI writing assistant that works everywhere: ${SITE_URL}/tools/grammarly/
3. Notion AI - All-in-one workspace with AI: ${SITE_URL}/tools/notion-ai/
4. Fireflies.ai - Automated meeting notes: ${SITE_URL}/tools/fireflies-ai/
5. Canva - Design anything with AI: ${SITE_URL}/tools/canva/

Compare tools side-by-side: ${SITE_URL}/compare/

The AI Productivity Hub Team
Unsubscribe: {{unsubscribe_url}}`,
  },

  // Email 3: Best of the blog (sent day 5)
  {
    id: "welcome-3-blog",
    subject: "The 3 blog posts our readers bookmark most",
    preheader: "Practical guides that save hours every week.",
    delayDays: 5,
    htmlContent: wrapHtml(`
      <h1>Worth bookmarking</h1>
      <p>These three articles are the ones readers come back to again and again. Each one is packed with actionable advice you can use right away.</p>

      <div class="tool-card">
        <div class="tool-name">ChatGPT vs Claude: Which AI Assistant Should You Use?</div>
        <div class="tool-desc">The definitive comparison of the two leading AI assistants. We tested both on real tasks so you don't have to.</div>
        <div style="margin-top: 8px;"><a href="${SITE_URL}/blog/chatgpt-vs-claude-which-ai-assistant/">Read the comparison &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">How to Build an AI-Powered Workflow</div>
        <div class="tool-desc">A step-by-step guide to automating your most repetitive tasks. Includes real examples and tool recommendations.</div>
        <div style="margin-top: 8px;"><a href="${SITE_URL}/blog/ai-workflow-automation-guide/">Read the guide &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">10 Free AI Tools Every Freelancer Should Use</div>
        <div class="tool-desc">You don't need a budget to work smarter. These free tools cover writing, design, meetings, and more.</div>
        <div style="margin-top: 8px;"><a href="${SITE_URL}/blog/free-ai-tools-for-freelancers/">Read the list &rarr;</a></div>
      </div>

      <hr class="divider">
      <p>New articles drop every week. <a href="${SITE_URL}/blog/">See all posts &rarr;</a></p>

      <p>Keep building,<br><strong>The AI Productivity Hub Team</strong></p>
    `),
    textContent: `3 blog posts worth bookmarking:

1. ChatGPT vs Claude: Which AI Assistant Should You Use?
${SITE_URL}/blog/chatgpt-vs-claude-which-ai-assistant/

2. How to Build an AI-Powered Workflow
${SITE_URL}/blog/ai-workflow-automation-guide/

3. 10 Free AI Tools Every Freelancer Should Use
${SITE_URL}/blog/free-ai-tools-for-freelancers/

New articles every week: ${SITE_URL}/blog/

The AI Productivity Hub Team
Unsubscribe: {{unsubscribe_url}}`,
  },

  // Email 4: Category deep dive (sent day 8)
  {
    id: "welcome-4-categories",
    subject: "Find the right AI tool for YOUR workflow",
    preheader: "Browse by category to find exactly what you need.",
    delayDays: 8,
    htmlContent: wrapHtml(`
      <h1>What are you trying to solve?</h1>
      <p>Not sure where to start? We've organized every tool by use case so you can jump straight to what matters most for your workflow.</p>

      <div class="tool-card">
        <div class="tool-name">Writing & Content</div>
        <div class="tool-desc">Blog posts, emails, copywriting, grammar checking. <a href="${SITE_URL}/tools/category/Writing/">Browse writing tools &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">Design & Creative</div>
        <div class="tool-desc">Graphics, presentations, video, UI design. <a href="${SITE_URL}/tools/category/Design/">Browse design tools &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">Project Management</div>
        <div class="tool-desc">Task tracking, team collaboration, roadmaps. <a href="${SITE_URL}/tools/category/Project%20Management/">Browse PM tools &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">Communication</div>
        <div class="tool-desc">Meeting notes, transcription, video calls. <a href="${SITE_URL}/tools/category/Communication/">Browse communication tools &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">Marketing</div>
        <div class="tool-desc">SEO, social media, email campaigns, analytics. <a href="${SITE_URL}/tools/category/Marketing/">Browse marketing tools &rarr;</a></div>
      </div>

      <div class="tool-card">
        <div class="tool-name">Development</div>
        <div class="tool-desc">Code generation, debugging, DevOps, testing. <a href="${SITE_URL}/tools/category/Development/">Browse dev tools &rarr;</a></div>
      </div>

      <hr class="divider">
      <p style="text-align: center;">
        <a href="${SITE_URL}/tools/" class="btn">See All 12 Categories</a>
      </p>

      <p>Find your edge,<br><strong>The AI Productivity Hub Team</strong></p>
    `),
    textContent: `What are you trying to solve?

- Writing & Content: ${SITE_URL}/tools/category/Writing/
- Design & Creative: ${SITE_URL}/tools/category/Design/
- Project Management: ${SITE_URL}/tools/category/Project%20Management/
- Communication: ${SITE_URL}/tools/category/Communication/
- Marketing: ${SITE_URL}/tools/category/Marketing/
- Development: ${SITE_URL}/tools/category/Development/

See all 12 categories: ${SITE_URL}/tools/

The AI Productivity Hub Team
Unsubscribe: {{unsubscribe_url}}`,
  },
];
