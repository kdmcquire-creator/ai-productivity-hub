import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "https://aiproductivityhub.co/about/",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About AI Productivity Hub</h1>
      <section className="prose prose-lg max-w-none">
        <p className="mb-6">
          We test AI productivity tools so you don&apos;t waste money on ones that
          don&apos;t deliver. Every tool on this site has been put through real work
          tasks &mdash; not hypothetical demos &mdash; before we write about it.
        </p>
        <p className="mb-6">
          There are hundreds of AI tools launching every month. Most of them are
          mediocre. A few are genuinely useful. The problem is that every
          tool&apos;s marketing page makes the same promises, and you can&apos;t tell the
          difference until you&apos;ve burned $49 on a monthly subscription and three
          hours setting it up. We do that part for you.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">What We Actually Do</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Honest Tool Reviews</strong> &mdash; We test tools on real
            tasks (not the cherry-picked demos vendors show you) and tell you
            exactly where each tool excels and where it falls short.
          </li>
          <li>
            <strong>Head-to-Head Comparisons</strong> &mdash; When two tools
            claim to do the same thing, we run them side by side and pick a
            winner. We don&apos;t hedge with &ldquo;it depends on your needs&rdquo; when one
            tool is clearly better.
          </li>
          <li>
            <strong>Practical Guides</strong> &mdash; Step-by-step walkthroughs
            for automating specific tasks, from meeting notes to content creation
            to project management.
          </li>
          <li>
            <strong>Curated Recommendations</strong> &mdash; Organized by what
            you actually need to get done, not by marketing category.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Who This Is For</h2>
        <p className="mb-4">
          If you spend your workday in documents, meetings, emails, and project
          tools, and you suspect AI could save you time but don&apos;t know where to
          start &mdash; that&apos;s exactly who we built this for.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Freelancers</strong> who need to move fast and can&apos;t afford
            to waste time on tools that don&apos;t work.
          </li>
          <li>
            <strong>Small teams</strong> looking for AI tools that actually
            justify their subscription cost.
          </li>
          <li>
            <strong>Anyone drowning in meetings</strong> &mdash; we have strong
            opinions about which AI meeting tools are worth paying for.
          </li>
        </ul>
        <p>
          We fund this site through affiliate partnerships and advertising. That
          means some links earn us a commission &mdash; but we recommend tools based
          on quality, not payout. If a tool is mediocre, we say so, even if it
          has a generous affiliate program.
        </p>
      </section>
    </div>
  );
}
