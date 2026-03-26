"use client";

import { useState } from "react";

interface SaasEntry {
  id: number;
  name: string;
  costPerMonth: number;
  category: string;
  usage: "daily" | "weekly" | "rarely";
}

const CATEGORIES = [
  "Communication",
  "Project Management",
  "Design",
  "Marketing",
  "Development",
  "Analytics",
  "Sales",
  "HR",
  "Finance",
  "Other",
];

const AI_ALTERNATIVES: Record<string, { name: string; note: string }[]> = {
  Communication: [
    { name: "Shortwave", note: "AI-powered email" },
    { name: "Fireflies.ai", note: "AI meeting assistant" },
  ],
  "Project Management": [
    { name: "Notion AI", note: "AI workspace" },
    { name: "ClickUp AI", note: "AI project management" },
  ],
  Design: [
    { name: "Midjourney", note: "AI image generation" },
    { name: "Canva AI", note: "AI design features" },
  ],
  Marketing: [
    { name: "Jasper", note: "AI copywriting" },
    { name: "Copy.ai", note: "AI marketing content" },
  ],
  Development: [
    { name: "GitHub Copilot", note: "AI coding assistant" },
    { name: "Cursor", note: "AI code editor" },
  ],
  Analytics: [
    { name: "Julius AI", note: "AI data analysis" },
    { name: "Polymer", note: "AI-powered BI" },
  ],
  Sales: [
    { name: "Clay", note: "AI prospecting" },
    { name: "Lavender", note: "AI email coaching" },
  ],
  HR: [
    { name: "Leena AI", note: "AI HR assistant" },
  ],
  Finance: [
    { name: "Vic.ai", note: "AI accounting" },
  ],
  Other: [],
};

function fmtCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

const USAGE_COLORS = {
  daily: "bg-green-100 text-green-700",
  weekly: "bg-blue-100 text-blue-700",
  rarely: "bg-red-100 text-red-700",
};

export default function SaasSpendCalculator() {
  const [tools, setTools] = useState<SaasEntry[]>([
    { id: 1, name: "Slack", costPerMonth: 12.50, category: "Communication", usage: "daily" },
    { id: 2, name: "Jira", costPerMonth: 10, category: "Project Management", usage: "weekly" },
    { id: 3, name: "Grammarly", costPerMonth: 30, category: "Marketing", usage: "rarely" },
  ]);

  function addTool() {
    setTools([
      ...tools,
      { id: Date.now(), name: "", costPerMonth: 0, category: "Other", usage: "weekly" },
    ]);
  }

  function removeTool(id: number) {
    setTools(tools.filter((t) => t.id !== id));
  }

  function updateTool(id: number, field: string, value: string | number) {
    setTools(
      tools.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  const totalSpend = tools.reduce((sum, t) => sum + t.costPerMonth, 0);
  const rarelyUsed = tools.filter((t) => t.usage === "rarely");
  const rarelyUsedSpend = rarelyUsed.reduce(
    (sum, t) => sum + t.costPerMonth,
    0
  );

  // Group by category
  const byCategory = tools.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.costPerMonth;
      return acc;
    },
    {} as Record<string, number>
  );
  const categoryEntries = Object.entries(byCategory).sort(
    (a, b) => b[1] - a[1]
  );
  const maxCategorySpend = Math.max(
    ...categoryEntries.map(([, v]) => v),
    1
  );

  // Find categories with AI alternatives
  const categoriesWithAlternatives = Array.from(
    new Set(tools.map((t) => t.category))
  ).filter((c) => (AI_ALTERNATIVES[c] || []).length > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Your SaaS Tools
          </h3>
          <button
            onClick={addTool}
            className="text-sm font-medium text-gray-600 hover:text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition"
          >
            + Add Tool
          </button>
        </div>

        <div className="space-y-3">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => updateTool(tool.id, "name", e.target.value)}
                  className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none px-0 py-1 w-40"
                  placeholder="Tool name"
                />
                <button
                  onClick={() => removeTool(tool.id)}
                  className="text-gray-400 hover:text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    $/month
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={tool.costPerMonth}
                    onChange={(e) =>
                      updateTool(tool.id, "costPerMonth", Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Category
                  </label>
                  <select
                    value={tool.category}
                    onChange={(e) =>
                      updateTool(tool.id, "category", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Usage
                  </label>
                  <select
                    value={tool.usage}
                    onChange={(e) =>
                      updateTool(tool.id, "usage", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="rarely">Rarely</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addTool}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-500 hover:border-gray-400 hover:text-gray-600 transition"
        >
          + Add another tool
        </button>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Spend Analysis</h3>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-600 font-medium">Monthly</p>
            <p className="text-xl font-bold text-gray-900">
              {fmtCurrency(totalSpend)}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-600 font-medium">Annual</p>
            <p className="text-xl font-bold text-gray-900">
              {fmtCurrency(totalSpend * 12)}
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs text-red-600 font-medium">Rarely Used</p>
            <p className="text-xl font-bold text-red-900">
              {fmtCurrency(rarelyUsedSpend)}
            </p>
          </div>
        </div>

        {/* Spend by category */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Spend by Category
          </p>
          <div className="space-y-2">
            {categoryEntries.map(([cat, spend]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{cat}</span>
                  <span className="font-medium text-gray-900">
                    {fmtCurrency(spend)}/mo
                  </span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-slate-400 to-gray-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(3, (spend / maxCategorySpend) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rarely used tools alert */}
        {rarelyUsed.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-medium text-red-900 text-sm mb-2">
              Rarely used tools to review
            </p>
            <div className="space-y-2">
              {rarelyUsed.map((tool) => (
                <div
                  key={tool.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-red-700">
                    {tool.name || "Unnamed"}
                  </span>
                  <span className="font-medium text-red-900">
                    {fmtCurrency(tool.costPerMonth)}/mo
                  </span>
                </div>
              ))}
              <p className="text-xs text-red-600 border-t border-red-200 pt-2 mt-2">
                Potential annual savings:{" "}
                <span className="font-bold">
                  {fmtCurrency(rarelyUsedSpend * 12)}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Usage overview */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Usage Overview
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool.id}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${USAGE_COLORS[tool.usage]}`}
              >
                {tool.name || "Unnamed"}
              </span>
            ))}
          </div>
        </div>

        {/* AI alternatives */}
        {categoriesWithAlternatives.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              AI-Powered Alternatives
            </p>
            {categoriesWithAlternatives.map((cat) => (
              <div
                key={cat}
                className="bg-indigo-50 border border-indigo-200 rounded-xl p-4"
              >
                <p className="font-medium text-indigo-900 text-sm">{cat}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {AI_ALTERNATIVES[cat].map((alt) => (
                    <span
                      key={alt.name}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                    >
                      {alt.name} — {alt.note}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-xl p-5 text-white mt-4">
          <p className="font-semibold mb-1">Optimize your SaaS stack</p>
          <p className="text-sm text-gray-300 mb-3">
            Consolidate tools with AI-powered alternatives and save{" "}
            {fmtCurrency(rarelyUsedSpend * 12)}+ per year.
          </p>
          <a
            href="/tools/"
            className="inline-block bg-white text-gray-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
          >
            Explore AI Alternatives
          </a>
        </div>
      </div>
    </div>
  );
}
