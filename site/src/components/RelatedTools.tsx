import Link from "next/link";
import type { Tool } from "@/lib/tools";

interface RelatedToolsProps {
  currentSlug: string;
  category: string;
  allTools: Tool[];
  maxItems?: number;
}

export default function RelatedTools({
  currentSlug,
  category,
  allTools,
  maxItems = 3,
}: RelatedToolsProps) {
  const related = allTools
    .filter((t) => t.category === category && t.slug !== currentSlug)
    .slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related {category} Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}/`}
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all"
          >
            <div
              className={`h-1 w-12 rounded-full bg-gradient-to-r ${tool.color} mb-3`}
            />
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {tool.tagline}
            </p>
            <span className="text-xs text-gray-500">
              {tool.isFree ? "Free tier" : tool.pricing[0]?.price}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href={`/tools/category/${category.toLowerCase().replace(/\s+/g, "-")}/`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all {category} tools &rarr;
        </Link>
      </div>
    </section>
  );
}
