import Link from "next/link";
import type { BlogPost, BlogSection } from "@/lib/blog";
import { tools } from "@/lib/tools";
import { getAuthorBySlug } from "@/lib/authors";
import AdUnit from "@/components/AdUnit";
import SiteGroundBanner from "@/components/SiteGroundBanner";
import SiteGroundLeaderboard from "@/components/SiteGroundLeaderboard";
import { NordVPNLeaderboard } from "@/components/NordVPNLeaderboard";

const calloutColors = {
  green: "bg-green-50 border-green-200 border-l-green-500",
  blue: "bg-blue-50 border-blue-200 border-l-blue-500",
  yellow: "bg-yellow-50 border-yellow-200 border-l-yellow-500",
};

function SectionBlock({ section }: { section: BlogSection }) {
  const isCallout = section.calloutStyle;
  const wrapperClass = isCallout
    ? `p-8 rounded-xl border border-l-4 ${calloutColors[section.calloutStyle!]}`
    : "";

  return (
    <section className={`mb-12 ${wrapperClass}`}>
      <h2
        className={`text-2xl font-semibold mb-4 ${section.headingColor || "text-gray-800"}`}
      >
        {section.heading}
      </h2>
      {section.subtitle && (
        <p className="text-gray-600 mb-4 font-medium italic">
          {section.subtitle}
        </p>
      )}
      {section.body && (
        <p className="text-lg leading-8 text-gray-700 mb-6">{section.body}</p>
      )}
      {section.listItems && (
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2.5">
          {section.listItems.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item.includes(":") ? (
                <>
                  <strong>{item.split(":")[0]}:</strong>
                  {item.split(":").slice(1).join(":")}
                </>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      )}
      {section.orderedList && (
        <ol className="list-decimal pl-6 space-y-2.5 text-gray-700">
          {section.orderedList.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const author = getAuthorBySlug(post.authorSlug);
  const mentionedTools = tools.filter((t) => post.toolSlugs.includes(t.slug));

  return (
    <article>
      {/* Gradient Hero Header */}
      <header
        className={`relative bg-gradient-to-r ${post.color} overflow-hidden`}
      >
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Category + meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-white bg-white/20 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-white/60 text-sm">&middot;</span>
            <span className="text-white/80 text-sm">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author + date */}
          <div className="flex flex-wrap items-center gap-3 text-white/75 text-sm">
            {author ? (
              <Link
                href={`/author/${author.slug}/`}
                className="font-semibold text-white hover:underline underline-offset-2"
              >
                By {author.name}
              </Link>
            ) : (
              <span className="font-semibold text-white">By {post.author}</span>
            )}
            <span>&middot;</span>
            <time dateTime={post.dateISO}>{post.date}</time>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Affiliate Disclosure — subtle inline note */}
        <p className="text-xs text-gray-400 mb-10 italic">
          Disclosure: This post may contain affiliate links. We may earn a
          commission at no extra cost to you.{" "}
          <Link
            href="/affiliate-disclosure/"
            className="text-blue-500 hover:underline"
          >
            Learn more
          </Link>
          .
        </p>

        {/* Leaderboard above article sections */}
        <SiteGroundLeaderboard />

        {/* Content Sections */}
        {post.sections.map((section, i) => (
          <div key={i}>
            <SectionBlock section={section} />
            {i === 0 && post.sections.length > 1 && (
              <hr className="my-12 border-gray-200" />
            )}
            {/* Mid-article ad after 2nd section */}
            {i === 1 && (
              <AdUnit slot="SLOT_BLOG_MID" format="horizontal" className="my-8" />
            )}
          </div>
        ))}

        {/* Verdict */}
        {post.verdict && (
          <>
            <hr className="my-12 border-gray-200" />
            <SectionBlock section={post.verdict} />
          </>
        )}

        {/* Post-article sponsor banner */}
        <NordVPNLeaderboard />

        {/* Tools Mentioned */}
        {mentionedTools.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tools Mentioned in This Article
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentionedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <div
                    className={`h-1.5 bg-gradient-to-r ${tool.color || "from-blue-500 to-indigo-600"}`}
                  />
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {tool.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {tool.isFree ? "Free tier" : tool.pricing[0]?.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SiteGroundBanner />
        </div>
      </div>
    </article>
  );
}
