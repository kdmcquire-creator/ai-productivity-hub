import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import { blogPosts } from "@/lib/blog";
import AdUnit from "@/components/AdUnit";
import { WebSiteJsonLd, OrganizationJsonLd } from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function HomePage() {
  const featuredTools = tools.slice(0, 6);

  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Find the Best AI Tools for Your Productivity
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Discover, compare, and choose the right AI tools to streamline your workflow. In-depth reviews, honest comparisons, and expert guides for every use case.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools/"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
            >
              Browse All Tools
            </Link>
            <Link
              href="/blog/"
              className="inline-block bg-white text-gray-700 font-semibold py-3 px-8 rounded-lg border border-gray-300 hover:border-blue-400 hover:text-blue-600 transition"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools/?category=${cat.slug}`}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-semibold text-gray-800">{cat.name}</span>
              </Link>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {tool.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {tool.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {tool.isFree ? "Free tier" : tool.pricing[0]?.price}
                    </span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
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
          </div>
        </section>
      )}
    </>
  );
}
