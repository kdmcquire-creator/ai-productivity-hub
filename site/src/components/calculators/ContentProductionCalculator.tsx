"use client";

import { useState } from "react";

function fmtCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function ContentProductionCalculator() {
  const [articlesPerMonth, setArticlesPerMonth] = useState(8);
  const [researchHours, setResearchHours] = useState(2);
  const [writingHours, setWritingHours] = useState(4);
  const [editingHours, setEditingHours] = useState(1.5);
  const [writerRate, setWriterRate] = useState(60);
  const [aiTimeReduction, setAiTimeReduction] = useState(40);
  const [aiToolCost, setAiToolCost] = useState(49);

  const hoursPerArticle = researchHours + writingHours + editingHours;
  const totalHoursWithout = articlesPerMonth * hoursPerArticle;
  const costWithoutAI = totalHoursWithout * writerRate;

  const hoursPerArticleWithAI = hoursPerArticle * (1 - aiTimeReduction / 100);
  const totalHoursWithAI = articlesPerMonth * hoursPerArticleWithAI;
  const costWithAI = totalHoursWithAI * writerRate + aiToolCost;

  const savings = costWithoutAI - costWithAI;
  const articlesWithSameBudget =
    hoursPerArticleWithAI > 0
      ? Math.floor(
          (totalHoursWithout - aiToolCost / writerRate) / hoursPerArticleWithAI
        )
      : 0;
  const extraArticles = Math.max(0, articlesWithSameBudget - articlesPerMonth);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Current Production
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Articles per month
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={articlesPerMonth}
            onChange={(e) => setArticlesPerMonth(Number(e.target.value))}
            className="w-full accent-pink-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1</span>
            <span className="font-semibold text-pink-600">
              {articlesPerMonth} articles
            </span>
            <span>50</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <p className="text-sm font-medium text-gray-700">
            Hours per article
          </p>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Research: {researchHours} hrs
            </label>
            <input
              type="range"
              min={0.5}
              max={8}
              step={0.5}
              value={researchHours}
              onChange={(e) => setResearchHours(Number(e.target.value))}
              className="w-full accent-pink-600"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Writing: {writingHours} hrs
            </label>
            <input
              type="range"
              min={0.5}
              max={12}
              step={0.5}
              value={writingHours}
              onChange={(e) => setWritingHours(Number(e.target.value))}
              className="w-full accent-pink-600"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Editing: {editingHours} hrs
            </label>
            <input
              type="range"
              min={0.5}
              max={6}
              step={0.5}
              value={editingHours}
              onChange={(e) => setEditingHours(Number(e.target.value))}
              className="w-full accent-pink-600"
            />
          </div>
          <p className="text-sm text-gray-900 font-medium border-t border-gray-200 pt-2">
            Total: {hoursPerArticle} hrs/article
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Writer hourly rate ($)
          </label>
          <input
            type="number"
            min={15}
            max={300}
            value={writerRate}
            onChange={(e) => setWriterRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 pt-2">
          With AI Assistance
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated time reduction with AI ({aiTimeReduction}%)
          </label>
          <input
            type="range"
            min={10}
            max={70}
            value={aiTimeReduction}
            onChange={(e) => setAiTimeReduction(Number(e.target.value))}
            className="w-full accent-pink-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>10%</span>
            <span className="font-semibold text-pink-600">
              {aiTimeReduction}% faster
            </span>
            <span>70%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            AI writing tool cost per month ($)
          </label>
          <input
            type="number"
            min={0}
            max={500}
            value={aiToolCost}
            onChange={(e) => setAiToolCost(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Cost Comparison</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600 font-medium">Without AI</p>
            <p className="text-2xl font-bold text-red-900">
              {fmtCurrency(costWithoutAI)}
            </p>
            <p className="text-xs text-red-500 mt-1">
              {totalHoursWithout.toFixed(0)} hrs/mo
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-600 font-medium">With AI</p>
            <p className="text-2xl font-bold text-green-900">
              {fmtCurrency(costWithAI)}
            </p>
            <p className="text-xs text-green-500 mt-1">
              {totalHoursWithAI.toFixed(0)} hrs/mo + tool
            </p>
          </div>
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
          <p className="text-sm text-pink-600 font-medium">Monthly Savings</p>
          <p className="text-3xl font-bold text-pink-900">
            {fmtCurrency(savings)}
          </p>
          <p className="text-sm text-pink-600 mt-1">
            {fmtCurrency(savings * 12)} annually
          </p>
        </div>

        {/* Visual comparison */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Time per article
          </p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Without AI</span>
                <span>{hoursPerArticle} hrs</span>
              </div>
              <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 rounded-full w-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>With AI</span>
                <span>{hoursPerArticleWithAI.toFixed(1)} hrs</span>
              </div>
              <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(hoursPerArticleWithAI / hoursPerArticle) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="text-sm text-indigo-600 font-medium">
            With the same budget, you could produce
          </p>
          <p className="text-3xl font-bold text-indigo-900">
            {articlesWithSameBudget} articles/mo
          </p>
          <p className="text-sm text-indigo-600 mt-1">
            That is {extraArticles} more articles than your current{" "}
            {articlesPerMonth}
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-5 text-white mt-4">
          <p className="font-semibold mb-1">
            Scale your content with AI writing tools
          </p>
          <p className="text-sm text-rose-100 mb-3">
            Jasper, Copy.ai, and Writesonic can help with research, drafting,
            and editing.
          </p>
          <a
            href="/tools/"
            className="inline-block bg-white text-pink-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-pink-50 transition"
          >
            Browse Writing Tools
          </a>
        </div>
      </div>
    </div>
  );
}
