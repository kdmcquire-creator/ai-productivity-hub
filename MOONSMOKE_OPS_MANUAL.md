# Moonsmoke Network — Operating Manual
> How to use your Claude Code agent system to manage, grow, and monetize the 4-site network.
>
> Owner: Kyle McQuire | Last updated: 2026-03-31

---

## 1. What You Have

### The Network
| Site | Domain | Niche | Deployer |
|------|--------|-------|----------|
| AI Productivity Hub (PH) | aiproductivityhub.co | AI tools, workflow, automation | Cloudflare Workers |
| Clarity Engine (CE) | clarity-engine.ai | SEO, digital marketing tools | Cloudflare Workers |
| AI Finance Hub (FH) | aifinancehub.ai | Fintech, accounting, personal finance | Cloudflare Workers |
| LegalTech AI Hub (LT) | legaltech-ai-hub.com | Legal technology, compliance | Cloudflare Workers |

### The Agent System
Your Claude Code session operates as a **primary agent** with access to:

| MCP Server | What It Does | Key Operations |
|------------|-------------|----------------|
| **Cloudflare** | Worker management, D1 databases, R2 storage, KV | Verify deploys (`workers_list`), query analytics DBs, manage DNS |
| **Notion** | Content planning, task tracking | Create/query databases, manage editorial calendar |
| **Gmail** | Email monitoring (affiliate approvals, notifications) | Search for affiliate program emails, draft responses |
| **Google Calendar** | Scheduling content drops, review cadences | Create events, find free time |
| **Google Drive** | Shared docs, media kit assets | Search/fetch documents |
| **Vercel** | Legacy (LT had a stale integration, now disconnected) | Ignore for deployments |
| **Chrome/Browser** | Affiliate network management | Navigate dashboards, fill forms, apply to programs |
| **Linear** | Issue tracking (if configured) | Track bugs, feature requests |

**Subagents** are dispatched automatically by the primary agent for parallel work:
- Code changes across multiple repos simultaneously
- Codebase exploration while other tasks run
- Build verification while content work continues

---

## 2. Daily Operations

### Morning Routine (ask the agent)
> "Check all 4 sites. Any deploy failures? Any affiliate emails? What's on the content calendar for today?"

The agent will:
1. Call `workers_list` to verify all 4 Cloudflare Workers are healthy
2. Search Gmail for affiliate network notifications (approvals, rejections, payments)
3. Check Notion for scheduled content tasks
4. Report a unified status

### Deploying Changes
**You never deploy manually.** The pipeline is:

```
You describe the change
  -> Agent writes code across 1-4 repos
    -> Agent runs: git add + commit + push
      -> GitHub Actions auto-triggers
        -> opennextjs-cloudflare build
          -> wrangler deploy to Cloudflare Workers
            -> Agent calls workers_list to verify modified_on timestamps
```

**Your role:** Describe what you want. Review the diff if needed. Say "yes" to commit.

**Agent's role:** Write code, commit, push, verify deploy, report status.

### Common Commands

| What You Want | What to Say |
|---------------|-------------|
| Check deploy health | "Check all 4 workers" |
| Add a new affiliate link | "Wire [program] on [site] — here's the tracking URL: [url]" |
| Add a blog post | "Add a new blog post to CE about [topic]" |
| Update affiliate tracker | "Update the affiliate tracker with [changes]" |
| Fix a bug across all sites | "Fix [bug] — check all 4 repos for the same pattern" |
| Check affiliate emails | "Any new affiliate program emails?" |
| Apply to a program | "Apply to [program] on [network] for [sites]" (have Chrome open to the network dashboard) |
| Build a new page | "Build a /[page] on [site] with [description]" |
| Run a code review | "Review recent changes on [repo]" |

---

## 3. Affiliate Management

### How Affiliate Links Work
Every site has a `/go/[slug]/route.ts` file mapping slugs to tracking URLs:

```
yoursite.com/go/nordvpn -> awin1.com/cread.php?awinmid=15132&awinaffid=2805304
yoursite.com/go/moz     -> moz.pxf.io/WOOLbM
yoursite.com/go/amazon   -> amazon.com/?tag=yoursite-20
```

All clicks are logged via `logAffiliateClick()` in Cloudflare Workers runtime logs.

### Adding a New Affiliate Program

1. **Apply** on the network (Awin, Impact, CJ, PartnerStack, or direct)
2. **Get approved** — you'll receive a tracking URL or affiliate ID
3. **Tell the agent**: "Wire [program] on [site(s)] with tracking URL [url]"
4. Agent updates `/go/[slug]/route.ts`, commits, pushes, verifies deploy
5. Agent updates `AFFILIATE_TRACKER.md` across all 4 repos

### When an Application is Rejected
- Agent updates tracker status to DECLINED with reason
- Agent recommends alternative (e.g., Semrush Impact rejected -> BeRush direct)
- You decide whether to reapply later or pivot

### Tracker Sync
`AFFILIATE_TRACKER.md` is the **single source of truth**. It lives at the root of all 4 repos. The master copy is in `ai-productivity-hub/`. After every change, the agent mirrors it to the other 3 repos automatically.

### Active Networks

| Network | Account | Dashboard | Primary Use |
|---------|---------|-----------|-------------|
| Awin | Publisher 2805304 | awin.com | NordVPN, CyberSuite, ViralCanvas, Resso |
| Impact.com | Moonsmoke LLC | impact.com | Bluehost, Moz, (future: Notion, Grammarly, Jasper) |
| CJ Affiliate | ID 7916287 | cj.com | GoDaddy, QuickBooks, McAfee, Norton, TurboTax (all pending) |
| PartnerStack | Moonsmoke Network | partnerstack.com | monday.com, Pipedrive, Brevo, PandaDoc, Leadpages, Unbounce (all pending) |
| Amazon Associates | 4 tracking IDs | affiliate-program.amazon.com | Product links on all sites |
| Direct | Various | Per-program dashboards | SiteGround, SE Ranking, Mangools, Cloudways |

---

## 4. Content Operations

### Content Types per Site

| Site | Primary Content | Format |
|------|----------------|--------|
| PH | AI tool reviews, productivity guides, workflow automation | Blog posts, tool pages |
| CE | SEO tool comparisons, ranking guides, algorithm analysis | Blog posts, tool pages, benchmarks |
| FH | Fintech reviews, accounting comparisons, tax guides | Blog posts, tool pages |
| LT | Legal tech reviews, compliance guides, contract automation | Reviews, guides, tool pages |

### Publishing a Blog Post
> "Add a blog post to [site] about [topic]. Include affiliate links for [programs]."

The agent will:
1. Create the blog post file in the site's blog directory
2. Wire relevant `/go/` slugs into the content
3. Add proper metadata (title, description, date, author)
4. Commit, push, verify deploy

### Content That Drives Affiliate Revenue
Prioritize these content types (highest conversion first):
1. **"Best [tool type] for [use case]"** — comparison posts with affiliate CTAs
2. **"[Tool] Review 2026"** — in-depth reviews with pros/cons and affiliate link
3. **"[Tool A] vs [Tool B]"** — head-to-head comparisons
4. **"How to [achieve goal] with [tool]"** — tutorial content with affiliate link

### SEO Considerations
- Every page needs proper `metadata` exports (title, description)
- Blog posts should target long-tail keywords
- Internal linking between related tool pages and blog posts
- SiteGround banner placements are already configured (see tracker)

---

## 5. Social Media & Traffic Growth

### The Traffic Problem
Affiliate networks evaluate traffic + social reach. Semrush rejected on "low reach."
Target: 5K+ monthly uniques across the portfolio within 60 days.

### Platform Strategy

| Platform | Purpose | Posting Cadence | Tool |
|----------|---------|----------------|------|
| LinkedIn (Moonsmoke Network page) | B2B authority, SaaS audience | 3-4x/week | Manual or Buffer |
| X/Twitter | Tech audience, fast content velocity | 1-2x/day | Buffer |
| Pinterest | Long-tail "best tools" traffic | 5-10 pins/week | Buffer |
| Medium/Hashnode | SEO backlinks, syndicated content | 1-2x/week | Manual |

### Buffer Setup
- Free plan: 3 channels, 10 scheduled posts per queue
- Connect: LinkedIn + X + Pinterest
- Upgrade to Essentials ($6/mo/channel) if you need more queue slots

### Content Repurposing Pipeline
```
1. Write blog post on site (e.g., "Best SEO Tools 2026" on CE)
2. Create LinkedIn post summarizing key insights + link to full article
3. Create X thread with 3-5 highlights + link
4. Create 2-3 Pinterest pins with tool comparison graphics
5. Syndicate to Medium with canonical URL pointing back to site
```

### What to Ask the Agent
> "Draft 10 social media posts for [platform] promoting content from [site]"

> "Write a LinkedIn post about [topic] linking to [page]"

> "Create a content calendar for next week across all platforms"

---

## 6. Monitoring & Verification

### Deploy Verification (Automatic)
After every `git push`, the agent automatically:
1. Calls Cloudflare `workers_list` MCP
2. Confirms `modified_on` updated for the relevant worker(s)
3. If stale, checks GitHub Actions logs and reports the issue

### Known Build Error Patterns
| Error | Fix |
|-------|-----|
| `border={0}` on `<img>` | Move to `style={{ border: 0 }}` or remove |
| `lucide-react` peer dep conflict | Ensure `^0.469.0+` |
| `npm error ERESOLVE` | Add `.npmrc` with `legacy-peer-deps=true` |
| `Type error` in `.tsx` | Fix the type, never use `@ts-ignore` |

### Revenue Monitoring
- Check affiliate dashboards weekly (Awin, Impact, CJ, Amazon)
- Agent can search Gmail for payment notifications
- Track click-through rates via Cloudflare Workers runtime logs

---

## 7. Multi-Repo Operations

### The 4-Repo Rule
When the agent fixes a bug or makes a pattern change, it scans all 4 repos for the same issue. This prevents drift between sites.

### Shared Files
| File | Location | Sync Rule |
|------|----------|-----------|
| `AFFILIATE_TRACKER.md` | Root of all 4 repos | Master in PH, mirrored to CE/FH/LT after every change |
| `MOONSMOKE_OPS_MANUAL.md` | PH repo root | Reference copy, not mirrored |

### Git Workflow
- All repos use `main` branch only (no feature branches for content/config changes)
- Every commit is auto-deployed via GitHub Actions
- Agent always pushes immediately after committing — never leaves uncommitted changes
- Agent verifies deploys after every push

---

## 8. Email & Communications

### Affiliate Contact
- **partnerships@aiproductivityhub.co** routes to moonsmoke.contact@gmail.com (Cloudflare Email Routing)
- Use this on all affiliate applications and media kit
- Media kit: aiproductivityhub.co/media-kit (CE/FH/LT redirect there)

### Key Contacts
| Person | Role | Email | Context |
|--------|------|-------|---------|
| Andrew Bernato | NordVPN Affiliate Manager | ab@nordvpnmedia.com | Awin program, 40% rev share |

---

## 9. Pending Action Items (as of 2026-03-31)

### Urgent
- [ ] Install Awin Publisher Master Tag on all 4 sites
- [ ] Add paidforadvertising.com affiliate disclosure per Awin/IAB
- [ ] Apply to BeRush direct (semrush.com/lp/affiliate-program/en/) — Impact rejected
- [ ] Fix CE links: Surfer SEO (apply), Ahrefs (remove/replace)
- [ ] FreshBooks — update placeholder ID once approved

### High Priority
- [ ] Create X/Twitter account for Moonsmoke Network
- [ ] Set up Buffer and connect LinkedIn + X + Pinterest
- [ ] Apply to 5 Impact programs (Notion, Grammarly, Jasper, Empower, Rocket Lawyer)
- [ ] Apply to LegalZoom via CJ (account active)
- [ ] Draft first batch of social media content (10 posts per platform)

### Medium Priority
- [ ] Syndicate top blog posts to Medium with canonical URLs
- [ ] Create Pinterest account and first 10 pins
- [ ] Write 3 new "Best [tools] for [use case]" comparison posts per site
- [ ] Check Clio, Spellbook Legal, ConvertKit partner programs

---

## 10. Quick Reference

### Asking the Agent to Do Things
Be specific. The more context you give, the better the result:

**Good:** "Wire Notion affiliate on PH with tracking URL https://notion.pxf.io/ABC123 — add it to the go routes and update the tracker"

**Also good:** "Moz accepted the app" + screenshot of tracking URL

**Less good:** "Add Notion" (which site? what URL? is it approved yet?)

### What the Agent Cannot Do
- Create accounts on your behalf (you must register on Awin, CJ, etc.)
- Enter passwords or sensitive financial data
- Push to production without your approval on the commit
- Accept terms of service or agreements (you must click accept)

### What the Agent Will Always Do
- Verify deploys after every push (Cloudflare workers_list)
- Mirror AFFILIATE_TRACKER.md to all 4 repos after changes
- Scan all 4 repos for the same bug when fixing one
- Update the tracker when any affiliate status changes

---

*This document lives at `C:/Projects/ai-productivity-hub/MOONSMOKE_OPS_MANUAL.md`. Update it as workflows evolve.*
