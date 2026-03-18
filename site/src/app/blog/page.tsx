import Link from "next/link";
import { Metadata } from "next";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "AI Productivity Blog",
  description:
    "Read the latest AI tool reviews, comparisons, and productivity guides. Expert insights to help you choose the right AI tools for your workflow.",
};

export default function BlogPage() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Productivity Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Latest reviews, comparisons, and guides to help you get the most from AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
            >
              <div className={`h-2 bg-gradient-to-r ${post.color}`} />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <span className="text-sm font-medium text-blue-600 group-hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No blog posts yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
