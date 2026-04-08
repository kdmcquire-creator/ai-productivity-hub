import Link from "next/link";
import { blogPosts, type BlogPost } from "@/lib/blog";

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
}

export default function RelatedPosts({
  currentSlug,
  currentCategory,
}: RelatedPostsProps) {
  const sameCategoryPosts = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category === currentCategory
  );
  const otherPosts = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category !== currentCategory
  );

  // Prioritize same category, then fill with recent posts
  const related: BlogPost[] = [
    ...sameCategoryPosts,
    ...otherPosts,
  ].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
          >
            <div
              className={`h-1.5 bg-gradient-to-r ${post.color}`}
            />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">
                  {post.readTime}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/blog/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all articles &rarr;
        </Link>
      </div>
    </section>
  );
}
