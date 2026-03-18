"use client";

import { useState } from "react";
import Link from "next/link";
import { tools, categories } from "@/lib/tools";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = activeCategory
    ? tools.filter(
        (t) =>
          categories
            .find((c) => c.slug === activeCategory)
            ?.name === t.category
      )
    : tools;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Productivity Tools Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and compare the best AI tools across every category. Find the perfect tool for your workflow.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === null
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat.slug
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
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

        {filteredTools.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No tools found in this category yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
