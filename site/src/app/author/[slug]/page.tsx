import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = Array.from(new Set(blogPosts.map((post) => post.authorSlug)));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = toTitleCase(slug);
  return {
    title: `Articles by ${name}`,
    description: `Browse all articles written by ${name} on AI Productivity Hub.`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const authorName = toTitleCase(slug);
  const posts = blogPosts.filter((post) => post.authorSlug === slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">{authorName}</h1>
      <p className="text-gray-500 mb-10">
        {posts.length} article{posts.length !== 1 ? "s" : ""} published
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-600">No articles found for this author.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {post.date} &middot; {post.readTime}
                </p>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
