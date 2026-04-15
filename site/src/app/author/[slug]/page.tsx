import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import { authors, getAuthorBySlug } from "@/lib/authors";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return {
    title: `Articles by ${author.name}`,
    description: `Browse all articles written by ${author.name} on AI Productivity Hub. ${author.bio}`,
    alternates: {
      canonical: `https://aiproductivityhub.co/author/${author.slug}/`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = blogPosts.filter((post) => post.authorSlug === slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
        <p className="text-sm text-blue-600 font-medium mb-4">{author.role}</p>
        <p className="text-gray-600 max-w-2xl">{author.bio}</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {posts.length} Article{posts.length !== 1 ? "s" : ""} Published
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">No articles found for this author.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                <time dateTime={post.dateISO}>{post.date}</time>
                <span>&middot;</span>
                <span>{post.readTime}</span>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
