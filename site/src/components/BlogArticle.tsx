import Link from "next/link";
import type { BlogPost, BlogSection } from "@/lib/blog";
import { tools } from "@/lib/tools";
import { getAuthorBySlug } from "@/lib/authors";

function SectionBlock({ section }: { section: BlogSection }) {
  const calloutColors = {
    green: "bg-green-50 border-green-100",
    blue: "bg-blue-50 border-blue-100",
    yellow: "bg-yellow-50 border-yellow-100",
  };

  const isCallout = section.calloutStyle;
  const wrapperClass = isCallout
    ? `p-8 rounded-xl border ${calloutColors[section.calloutStyle!]}`
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
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          {section.body}
        </p>
      )}
      {section.listItems && (
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          {section.listItems.map((item, i) => (
            <li key={i}>
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
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          {section.orderedList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const author = getAuthorBySlug(post.authorSlug);
  const mentionedTools = tools.filter((t) =>
    post.toolSlugs.includes(t.slug)
  );

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Article Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime={post.dateISO}>{post.date}</time>
          <span>&middot;</span>
          <span>{post.readTime}</span>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
        {author && (
          <p className="text-gray-600">
            By{" "}
            <Link
              href={`/author/${author.slug}/`}
              className="text-blue-600 hover:underline"
            >
              {author.name}
            </Link>
          </p>
        )}
      </header>

      {/* Affiliate Disclosure */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-10 text-sm text-gray-500">
        <em>
          Disclosure: This post may contain affiliate links. We may earn a
          commission at no extra cost to you.{" "}
          <Link
            href="/affiliate-disclosure/"
            className="text-blue-600 hover:underline"
          >
            Learn more
          </Link>
          .
        </em>
      </div>

      {/* Content Sections */}
      {post.sections.map((section, i) => (
        <div key={i}>
          <SectionBlock section={section} />
          {i === 0 && post.sections.length > 1 && (
            <hr className="my-12 border-gray-200" />
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
                className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition"
              >
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {tool.tagline}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {tool.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {tool.isFree ? "Free tier" : tool.pricing[0]?.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
