"use client";

import { useState } from "react";

interface ToolEntry {
  id: number;
  name: string;
  features: number;
  pricing: number;
  easeOfUse: number;
  support: number;
  integrations: number;
}

interface Weights {
  features: number;
  pricing: number;
  easeOfUse: number;
  support: number;
  integrations: number;
}

const CRITERIA = [
  { key: "features" as const, label: "Features" },
  { key: "pricing" as const, label: "Pricing" },
  { key: "easeOfUse" as const, label: "Ease of Use" },
  { key: "support" as const, label: "Support" },
  { key: "integrations" as const, label: "Integrations" },
];

function emptyTool(id: number): ToolEntry {
  return {
    id,
    name: "",
    features: 5,
    pricing: 5,
    easeOfUse: 5,
    support: 5,
    integrations: 5,
  };
}

function weightedScore(tool: ToolEntry, weights: Weights): number {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return 0;
  return (
    (tool.features * weights.features +
      tool.pricing * weights.pricing +
      tool.easeOfUse * weights.easeOfUse +
      tool.support * weights.support +
      tool.integrations * weights.integrations) /
    totalWeight
  );
}

const COLORS = [
  { bar: "bg-purple-500", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600" },
  { bar: "bg-blue-500", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
  { bar: "bg-teal-500", bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600" },
  { bar: "bg-amber-500", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600" },
];

export default function ToolScorecardCalculator() {
  const [tools, setTools] = useState<ToolEntry[]>([
    { ...emptyTool(1), name: "Tool A" },
    { ...emptyTool(2), name: "Tool B" },
  ]);
  const [weights, setWeights] = useState<Weights>({
    features: 3,
    pricing: 2,
    easeOfUse: 2,
    support: 1,
    integrations: 2,
  });

  function addTool() {
    if (tools.length >= 4) return;
    setTools([
      ...tools,
      { ...emptyTool(Date.now()), name: `Tool ${String.fromCharCode(65 + tools.length)}` },
    ]);
  }

  function removeTool(id: number) {
    if (tools.length <= 2) return;
    setTools(tools.filter((t) => t.id !== id));
  }

  function updateTool(id: number, field: string, value: string | number) {
    setTools(
      tools.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  function updateWeight(key: keyof Weights, value: number) {
    setWeights((prev) => ({ ...prev, [key]: value }));
  }

  const scores = tools.map((t) => ({
    tool: t,
    score: weightedScore(t, weights),
  }));
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...scores.map((s) => s.score), 1);
  const winner = sorted[0];

  return (
    <div className="space-y-8">
      {/* Weights section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Criteria Weights
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {CRITERIA.map((c) => (
            <div key={c.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {c.label}
              </label>
              <select
                value={weights[c.key]}
                onChange={(e) => updateWeight(c.key, Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {[1, 2, 3, 4, 5].map((w) => (
                  <option key={w} value={w}>
                    {w}x
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Tools input */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Rate Your Tools</h3>
          {tools.length < 4 && (
            <button
              onClick={addTool}
              className="text-sm font-medium text-purple-600 hover:text-purple-700 border border-purple-300 rounded-lg px-3 py-1.5 hover:bg-purple-50 transition"
            >
              + Add Tool
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, idx) => (
            <div
              key={tool.id}
              className={`${COLORS[idx].bg} border ${COLORS[idx].border} rounded-xl p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => updateTool(tool.id, "name", e.target.value)}
                  className="font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-purple-500 focus:outline-none px-0 py-1 w-40"
                  placeholder="Tool name"
                />
                {tools.length > 2 && (
                  <button
                    onClick={() => removeTool(tool.id)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                    aria-label="Remove tool"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {CRITERIA.map((c) => (
                  <div key={c.key} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24 shrink-0">
                      {c.label}
                    </span>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={tool[c.key]}
                      onChange={(e) =>
                        updateTool(tool.id, c.key, Number(e.target.value))
                      }
                      className="flex-1 accent-purple-600"
                    />
                    <span className="text-sm font-semibold text-gray-900 w-6 text-right">
                      {tool[c.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>

        {/* Score bars */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          {sorted.map((entry, idx) => {
            const pct = (entry.score / 10) * 100;
            const colorIdx = tools.findIndex((t) => t.id === entry.tool.id);
            const isWinner = idx === 0;
            return (
              <div key={entry.tool.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">
                    {entry.tool.name || "Unnamed"}
                    {isWinner && (
                      <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-semibold">
                        Winner
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-gray-900">
                    {entry.score.toFixed(1)} / 10
                  </span>
                </div>
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${COLORS[colorIdx].bar} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(3, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {winner && winner.tool.name && (
          <div className="bg-gradient-to-r from-purple-600 to-violet-700 rounded-xl p-5 text-white mt-4">
            <p className="font-semibold mb-1">
              {winner.tool.name} wins with a score of{" "}
              {winner.score.toFixed(1)}/10
            </p>
            <p className="text-sm text-purple-100 mb-3">
              Based on your weighted criteria. Adjust weights above to see how
              results change.
            </p>
            <a
              href="/tools/"
              className="inline-block bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-purple-50 transition"
            >
              Explore AI Tools
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
