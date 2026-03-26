"use client";

import { useState } from "react";

interface ModelPricing {
  name: string;
  inputPer1M: number;
  outputPer1M: number;
  color: string;
  bg: string;
}

const MODELS: ModelPricing[] = [
  {
    name: "GPT-4o",
    inputPer1M: 2.5,
    outputPer1M: 10,
    color: "bg-green-500",
    bg: "bg-green-50",
  },
  {
    name: "GPT-4 Turbo",
    inputPer1M: 10,
    outputPer1M: 30,
    color: "bg-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    name: "Claude 3.5 Sonnet",
    inputPer1M: 3,
    outputPer1M: 15,
    color: "bg-orange-500",
    bg: "bg-orange-50",
  },
  {
    name: "Claude 3 Opus",
    inputPer1M: 15,
    outputPer1M: 75,
    color: "bg-amber-600",
    bg: "bg-amber-50",
  },
  {
    name: "Gemini 1.5 Pro",
    inputPer1M: 3.5,
    outputPer1M: 10.5,
    color: "bg-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "Gemini 1.5 Flash",
    inputPer1M: 0.075,
    outputPer1M: 0.3,
    color: "bg-sky-400",
    bg: "bg-sky-50",
  },
];

const WORDS_TO_TOKENS = 1.33;

function fmtCurrency(n: number): string {
  if (n < 0.01 && n > 0) return `$${n.toFixed(4)}`;
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function TokenCostCalculator() {
  const [wordsPerRequest, setWordsPerRequest] = useState(500);
  const [outputWords, setOutputWords] = useState(800);
  const [requestsPerDay, setRequestsPerDay] = useState(20);
  const [selectedModels, setSelectedModels] = useState<string[]>([
    "GPT-4o",
    "Claude 3.5 Sonnet",
    "Gemini 1.5 Pro",
  ]);

  const inputTokens = Math.round(wordsPerRequest * WORDS_TO_TOKENS);
  const outputTokens = Math.round(outputWords * WORDS_TO_TOKENS);

  function toggleModel(name: string) {
    setSelectedModels((prev) =>
      prev.includes(name)
        ? prev.filter((m) => m !== name)
        : prev.length < 4
          ? [...prev, name]
          : prev
    );
  }

  function getCost(model: ModelPricing) {
    const inputCostPerReq = (inputTokens / 1_000_000) * model.inputPer1M;
    const outputCostPerReq = (outputTokens / 1_000_000) * model.outputPer1M;
    const dailyCost = (inputCostPerReq + outputCostPerReq) * requestsPerDay;
    const monthlyCost = dailyCost * 30;
    return {
      inputCostPerReq,
      outputCostPerReq,
      perRequest: inputCostPerReq + outputCostPerReq,
      daily: dailyCost,
      monthly: monthlyCost,
    };
  }

  const activeModels = MODELS.filter((m) => selectedModels.includes(m.name));
  const maxMonthlyCost = Math.max(...activeModels.map((m) => getCost(m).monthly), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Usage</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Words per request (input)
          </label>
          <input
            type="range"
            min={50}
            max={5000}
            step={50}
            value={wordsPerRequest}
            onChange={(e) => setWordsPerRequest(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>50</span>
            <span className="font-semibold text-teal-600">
              {wordsPerRequest} words (~{inputTokens} tokens)
            </span>
            <span>5,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Words per response (output)
          </label>
          <input
            type="range"
            min={50}
            max={5000}
            step={50}
            value={outputWords}
            onChange={(e) => setOutputWords(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>50</span>
            <span className="font-semibold text-teal-600">
              {outputWords} words (~{outputTokens} tokens)
            </span>
            <span>5,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requests per day
          </label>
          <input
            type="number"
            min={1}
            max={10000}
            value={requestsPerDay}
            onChange={(e) => setRequestsPerDay(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Models to compare (select up to 4)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MODELS.map((model) => (
              <button
                key={model.name}
                onClick={() => toggleModel(model.name)}
                className={`text-left px-3 py-2 rounded-lg border text-sm font-medium transition ${
                  selectedModels.includes(model.name)
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Cost Comparison</h3>

        {activeModels.length === 0 ? (
          <p className="text-gray-500 italic">Select at least one model to see costs.</p>
        ) : (
          <>
            {/* Visual bars */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-600 mb-3">
                Monthly Cost Comparison
              </p>
              <div className="space-y-3">
                {activeModels
                  .sort((a, b) => getCost(a).monthly - getCost(b).monthly)
                  .map((model) => {
                    const cost = getCost(model);
                    const pct = (cost.monthly / maxMonthlyCost) * 100;
                    return (
                      <div key={model.name}>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span className="font-medium">{model.name}</span>
                          <span>{fmtCurrency(cost.monthly)}/mo</span>
                        </div>
                        <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${model.color} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.max(3, pct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Detailed breakdown */}
            <div className="space-y-3">
              {activeModels
                .sort((a, b) => getCost(a).monthly - getCost(b).monthly)
                .map((model) => {
                  const cost = getCost(model);
                  return (
                    <div
                      key={model.name}
                      className={`${model.bg} border border-gray-200 rounded-xl p-4`}
                    >
                      <p className="font-semibold text-gray-900 mb-2">
                        {model.name}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Input:</span>{" "}
                          <span className="font-medium">
                            ${model.inputPer1M}/1M tokens
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Output:</span>{" "}
                          <span className="font-medium">
                            ${model.outputPer1M}/1M tokens
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Per request:</span>{" "}
                          <span className="font-medium">
                            {fmtCurrency(cost.perRequest)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Daily:</span>{" "}
                          <span className="font-medium">
                            {fmtCurrency(cost.daily)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl p-5 text-white mt-4">
          <p className="font-semibold mb-1">Need help choosing the right model?</p>
          <p className="text-sm text-emerald-100 mb-3">
            Read our in-depth comparisons of AI models for different use cases.
          </p>
          <a
            href="/compare/"
            className="inline-block bg-white text-teal-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-emerald-50 transition"
          >
            View Comparisons
          </a>
        </div>
      </div>
    </div>
  );
}
