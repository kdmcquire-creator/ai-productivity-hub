# AI Productivity Hub — Production Roadmap Design

## Summary
Incremental enhancement of aiproductivityhub.co from current state (partially-built Next.js 15 + Cloudflare Workers site with hardcoded content) to full production: revenue-generating, SEO-optimized, analytics-instrumented, with automated content pipelines and newsletter system.

## Decisions
- **Content management:** Flat-file TypeScript (no CMS vendor)
- **Automation runtime:** Cloudflare Workers cron triggers (wrangler.jsonc)
- **AI content:** Full pipeline — Claude Sonnet for tool reviews, comparisons, newsletter digests
- **Email:** Full newsletter system — SendGrid, FIFO queue, multiple formats
- **Architecture model:** Legaltech-AI-Hub pattern (flat-file JSON, cron endpoints, admin overrides, rate limiting)

## Phase 1: Foundation & Parity Fixes (Days 1-2)
- Extract blog posts to `blog-posts.ts` data file (mirrors `tools.ts` pattern)
- Add `authors.ts` data file
- Shared `Header`, `Footer` components (currently inline)
- Legacy `-2` redirects in next.config.js
- `/privacy-policy/` route
- Trailing slash normalization
- Per-page `generateMetadata` exports
- Security headers

## Phase 2: Analytics, AdSense & Monetization (Days 3-4)
- GA4 via GTM (`<GoogleTagManager>` component)
- Strategic AdUnit placements (tool detail sidebar, blog mid-article, directory between sections)
- `/go/[slug]` click logging (flat-file JSON)
- GA4 custom events: affiliate_click, tool_view, category_browse, newsletter_signup
- AdSense auto-ads + manual high-value positions

## Phase 3: Content Data Architecture & SEO Hardening (Days 5-7)
- Extend Tool interface: lastReviewedAt, reviewStatus, linkStatus, lastCheckedAt, rating
- JSON-LD: Product, Article, BreadcrumbList, WebSite schemas
- Dynamic OG image generation (/api/og via Satori)
- Enhanced sitemap with lastmod, changefreq, priority
- Internal linking: Related Tools, Tools Mentioned, category cross-links
- Refined robots.ts

## Phase 4: Automation Crons (Days 8-11)
- wrangler.jsonc cron trigger
- /api/cron/check-links — link health checker (6h)
- /api/cron/stale-queue — stale content report (daily)
- /api/cron/content-pipeline — RSS crawl + Claude Sonnet generation (daily)
- Rate limiting + CRON_SECRET auth
- Admin override endpoints

## Phase 5: Newsletter System (Days 12-14)
- Newsletter signup component (homepage, tool pages, blog)
- subscribers.ts flat-file management
- newsletters.ts — data model, 3-4 curated formats
- FIFO queue, SendGrid dual-API
- /api/cron/send-newsletter
- Admin CRUD endpoints
- CAN-SPAM compliance

## Phase 6: Polish & Launch Hardening (Days 15-17)
- Core Web Vitals optimization
- Error boundaries, 404/500 pages
- Accessibility audit
- Mobile responsiveness
- AdSense policy compliance
- SEO audit + Search Console submission
- CI/CD build verification workflow

## Reference Architecture
- **Legaltech AI Hub:** Cloudflare Workers + Next.js 14 + flat-file JSON + cron orchestration + SendGrid + GA4/GTM + AdSense + rate limiting + admin endpoints
- **Workspace Vault Plans:** docs/plan.md, parity-checklist.md, implementation-scaffold.md (March 5-6, 2026)
