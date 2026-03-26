"use client";

import { useState } from "react";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function fmtCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function AiRoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [aiToolCost, setAiToolCost] = useState(30);
  const [timeSavingsPercent, setTimeSavingsPercent] = useState(30);

  const monthlyHoursOnTask = hoursPerWeek * 4.33;
  const hoursSavedPerMonth = monthlyHoursOnTask * (timeSavingsPercent / 100);
  const moneySavedPerMonth = hoursSavedPerMonth * hourlyRate - aiToolCost;
  const annualSavings = moneySavedPerMonth * 12;
  const annualToolCost = aiToolCost * 12;
  const annualROI =
    annualToolCost > 0
      ? ((annualSavings - annualToolCost) / annualToolCost) * 100
      : 0;
  const paybackDays =
    moneySavedPerMonth > 0 ? (aiToolCost / moneySavedPerMonth) * 30 : Infinity;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Inputs</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hours spent on task per week
          </label>
          <input
            type="range"
            min={1}
            max={60}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1 hr</span>
            <span className="font-semibold text-indigo-600">
              {hoursPerWeek} hrs/week
            </span>
            <span>60 hrs</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your hourly rate ($)
          </label>
          <input
            type="number"
            min={10}
            max={500}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            AI tool cost per month ($)
          </label>
          <input
            type="number"
            min={0}
            max={1000}
            value={aiToolCost}
            onChange={(e) => setAiToolCost(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated time savings with AI (%)
          </label>
          <input
            type="range"
            min={5}
            max={80}
            value={timeSavingsPercent}
            onChange={(e) => setTimeSavingsPercent(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>5%</span>
            <span className="font-semibold text-indigo-600">
              {timeSavingsPercent}%
            </span>
            <span>80%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Results</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-600 font-medium">
              Hours Saved / Month
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {fmt(hoursSavedPerMonth)}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-600 font-medium">
              Net Savings / Month
            </p>
            <p className="text-2xl font-bold text-green-900">
              {fmtCurrency(moneySavedPerMonth)}
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <p className="text-sm text-indigo-600 font-medium">Annual ROI</p>
            <p className="text-2xl font-bold text-indigo-900">
              {annualROI > 0 ? `${fmt(annualROI)}%` : "N/A"}
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-600 font-medium">
              Payback Period
            </p>
            <p className="text-2xl font-bold text-amber-900">
              {paybackDays === Infinity
                ? "N/A"
                : paybackDays < 1
                  ? "< 1 day"
                  : `${Math.ceil(paybackDays)} days`}
            </p>
          </div>
        </div>

        {/* Visual bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Annual Comparison
          </p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Without AI</span>
                <span>{fmtCurrency(monthlyHoursOnTask * hourlyRate * 12)}</span>
              </div>
              <div className="h-4 bg-red-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full w-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>With AI (incl. tool cost)</span>
                <span>
                  {fmtCurrency(
                    (monthlyHoursOnTask - hoursSavedPerMonth) *
                      hourlyRate *
                      12 +
                      annualToolCost
                  )}
                </span>
              </div>
              <div className="h-4 bg-green-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(5, 100 - timeSavingsPercent + (annualToolCost / (monthlyHoursOnTask * hourlyRate * 12)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 text-white mt-4">
          <p className="font-semibold mb-1">
            You could save {fmtCurrency(annualSavings)} per year
          </p>
          <p className="text-sm text-blue-100 mb-3">
            Start with AI tools that fit your workflow and budget.
          </p>
          <a
            href="/tools/"
            className="inline-block bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition"
          >
            Browse AI Tools
          </a>
        </div>
      </div>
    </div>
  );
}
