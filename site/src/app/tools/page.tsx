"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, categories } from "@/lib/tools";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    let result = tools;

    if (activeCategory) {
      const categoryName = categories.find(
        (c) => c.slug === activeCategory
      )?.name;
      result = result.filter((t) => t.category === categoryName);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.bestFor.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Productivity Tools Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Browse and compare {tools.length} AI tools across every category.
            Find the perfect tool for your workflow.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name, category, or use case..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === null
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({tools.length})
          </button>
          {categories.map((cat) => {
            const count = tools.filter((t) => t.category === cat.name).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.slug}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.slug ? null : cat.slug
                  )
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat.slug
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.icon} {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Results count */}
        {(searchQuery || activeCategory) && (
          <p className="text-sm text-gray-500 mb-6 text-center">
            {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}{" "}
            found
            {searchQuery && ` for "${searchQuery}"`}
            {activeCategory &&
              ` in ${categories.find((c) => c.slug === activeCategory)?.name}`}
          </p>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className={`h-1.5 bg-gradient-to-r ${tool.color}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition">
                    {tool.name}
                  </h3>
                  {tool.isFree && (
                    <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                      Free tier
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {tool.tagline}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {tool.pricing[0]?.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No tools found
              {searchQuery ? ` for "${searchQuery}"` : " in this category"}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(null);
              }}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
