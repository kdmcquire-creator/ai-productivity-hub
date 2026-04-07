import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import { blogPosts } from "@/lib/blog";
import AdUnit from "@/components/AdUnit";
import { WebSiteJsonLd, OrganizationJsonLd } from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function HomePage() {
  const featuredTools = tools.slice(0, 6);
  const [featuredPost, ...remainingPosts] = blogPosts;

  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 py-24 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Find the Best AI Tools for Your Productivity
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            We test AI tools on real work so you don&apos;t have to. In-depth reviews, honest comparisons, and expert guides for every use case.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/tools/"
              className="inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition shadow-md"
            >
              Browse All Tools
            </Link>
            <Link
              href="/blog/"
              className="inline-block text-white font-semibold py-3 px-8 rounded-lg border-2 border-white/70 hover:bg-white/10 hover:border-white transition"
            >
              Read Reviews
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
              <span className="text-blue-200">✦</span> 25+ Tools Reviewed
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
              <span className="text-blue-200">✦</span> 12 Categories
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
              <span className="text-blue-200">✦</span> 8 In-Depth Guides
            </span>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = tools.filter((t) => t.category === cat.name).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/tools/category/${cat.slug}/`}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <div>
                    <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition">{cat.name}</span>
                    <span className="block text-xs text-gray-400">{count} tool{count !== 1 ? "s" : ""}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mid-page Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="SLOT_HOME_MID" format="horizontal" />
      </section>

      {/* Featured AI Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Featured AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all flex"
              >
                {/* Colored left border bar */}
                <div className={`w-1.5 flex-shrink-0 bg-gradient-to-b ${tool.color}`} />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                    {tool.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {tool.category}
                    </span>
                    {tool.isFree ? (
                      <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                        Free tier
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">
                        {tool.pricing[0]?.price}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-blue-600 mt-4 group-hover:underline">
                    View Details &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup source="homepage" />
        </div>
      </section>

      {/* Latest from the Blog */}
      {blogPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Latest from the Blog</h2>

            {/* Featured first post — full width */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}/`}
                className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition mb-6"
              >
                <div className={`h-2 bg-gradient-to-r ${featuredPost.color}`} />
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{featuredPost.date}</span>
                    <span>&middot;</span>
                    <span>{featuredPost.readTime}</span>
                    <span className="ml-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-2xl md:text-3xl mb-3 group-hover:text-blue-600 transition">
                    {featuredPost.title}
                  </h3>
                  <p className="text-base text-gray-600 line-clamp-3 max-w-3xl">{featuredPost.excerpt}</p>
                  <p className="text-sm font-medium text-blue-600 mt-5 group-hover:underline">
                    Read article &rarr;
                  </p>
                </div>
              </Link>
            )}

            {/* Remaining posts — 2-column grid */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {remainingPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    <div className={`h-2 bg-gradient-to-r ${post.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span>&middot;</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* View All Posts link */}
            <div className="text-center mt-8">
              <Link
                href="/blog/"
                className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                View All Posts &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
