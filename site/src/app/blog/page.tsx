import Link from "next/link";
import { Metadata } from "next";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "AI Productivity Blog",
  description:
    "Read the latest AI tool reviews, comparisons, and productivity guides. Expert insights to help you choose the right AI tools for your workflow.",
};

export default function BlogPage() {
  const featuredBlogPosts = blogPosts.filter((p) => p.featured);
  const nonFeaturedPosts = blogPosts.filter((p) => !p.featured);
  const [featuredPost, ...otherFeatured] = featuredBlogPosts;
  const remainingPosts = [...otherFeatured, ...nonFeaturedPosts];

  return (
    <>
      {/* Gradient Hero Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
            AI Productivity Blog
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Expert reviews, head-to-head comparisons, and practical guides to
            help you get more from AI tools every day.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured / Latest Post */}
          {featuredPost && (
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
                Latest Post
              </p>
              <Link
                href={`/blog/${featuredPost.slug}/`}
                className="group block rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all"
              >
                <div
                  className={`bg-gradient-to-r ${featuredPost.color} p-10 md:p-14`}
                >
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/80 bg-white/20 px-3 py-1 rounded-full mb-4">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 group-hover:underline decoration-white/50 underline-offset-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/80 text-base md:text-lg max-w-3xl mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                    <span>By {featuredPost.author}</span>
                    <span>&middot;</span>
                    <time dateTime={featuredPost.dateISO}>
                      {featuredPost.date}
                    </time>
                    <span>&middot;</span>
                    <span>{featuredPost.readTime}</span>
                    <span className="ml-auto text-sm font-semibold text-white group-hover:underline">
                      Read article &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Remaining Posts Grid */}
          {remainingPosts.length > 0 && (
            <>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
                {otherFeatured.length > 0 ? "Featured & Recent" : "More Articles"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {remainingPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all flex flex-col"
                  >
                    <div
                      className={`h-1.5 bg-gradient-to-r ${post.color}`}
                    />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {post.readTime}
                        </span>
                        {post.featured && (
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                            Featured
                          </span>
                        )}
                      </div>
                      <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-3 mb-5 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-400">
                          <span className="font-medium text-gray-600">
                            By {post.author}
                          </span>
                          <span className="mx-1.5">&middot;</span>
                          <time dateTime={post.dateISO}>{post.date}</time>
                        </div>
                        <span className="text-sm font-medium text-blue-600 group-hover:underline">
                          Read &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {blogPosts.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No blog posts yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
