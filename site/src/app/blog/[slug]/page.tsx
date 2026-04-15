import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";
import BlogArticle from "@/components/BlogArticle";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const ogParams = new URLSearchParams({
    title: post.title,
    type: "blog",
    subtitle: post.excerpt,
  });

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://aiproductivityhub.co/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.dateISO,
      authors: [post.author],
      images: [
        {
          url: `/api/og?${ogParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://aiproductivityhub.co" },
          { name: "Blog", url: "https://aiproductivityhub.co/blog/" },
          { name: post.title, url: `https://aiproductivityhub.co/blog/${post.slug}/` },
        ]}
      />
      <BlogArticle post={post} />
    </>
  );
}
