"use client";

import { useState } from "react";

interface Recommendation {
  category: string;
  issue: string;
  tools: string[];
  link: string;
}

function getRecommendations(
  meetingPct: number,
  adminPct: number,
  emailPct: number
): Recommendation[] {
  const recs: Recommendation[] = [];
  if (meetingPct > 25) {
    recs.push({
      category: "Meetings",
      issue: `${meetingPct.toFixed(0)}% of time in meetings is above the 25% healthy threshold`,
      tools: ["Fireflies.ai", "Otter.ai", "Fathom"],
      link: "/tools/",
    });
  }
  if (adminPct > 15) {
    recs.push({
      category: "Admin Work",
      issue: `${adminPct.toFixed(0)}% on admin tasks could be reduced with automation`,
      tools: ["Zapier", "Make", "Notion AI"],
      link: "/tools/",
    });
  }
  if (emailPct > 15) {
    recs.push({
      category: "Email",
      issue: `${emailPct.toFixed(0)}% on email is eating into productive time`,
      tools: ["SaneBox", "Superhuman", "Shortwave"],
      link: "/tools/",
    });
  }
  return recs;
}

export default function TeamProductivityCalculator() {
  const [teamSize, setTeamSize] = useState(8);
  const [meetingHours, setMeetingHours] = useState(12);
  const [adminHours, setAdminHours] = useState(6);
  const [emailHours, setEmailHours] = useState(8);
  const [deepWorkHours, setDeepWorkHours] = useState(14);

  const totalHours = meetingHours + adminHours + emailHours + deepWorkHours;
  const productivityRatio = totalHours > 0 ? (deepWorkHours / totalHours) * 100 : 0;
  const wastedEstimate = meetingHours * 0.3 + adminHours * 0.5 + emailHours * 0.4;
  const teamWastedHoursWeekly = wastedEstimate * teamSize;
  const teamWastedHoursMonthly = teamWastedHoursWeekly * 4.33;

  const meetingPct = totalHours > 0 ? (meetingHours / totalHours) * 100 : 0;
  const adminPct = totalHours > 0 ? (adminHours / totalHours) * 100 : 0;
  const emailPct = totalHours > 0 ? (emailHours / totalHours) * 100 : 0;
  const deepPct = totalHours > 0 ? (deepWorkHours / totalHours) * 100 : 0;

  const recommendations = getRecommendations(meetingPct, adminPct, emailPct);

  const scoreColor =
    productivityRatio >= 50
      ? "text-green-600"
      : productivityRatio >= 35
        ? "text-amber-600"
        : "text-red-600";

  const scoreLabel =
    productivityRatio >= 50
      ? "Excellent"
      : productivityRatio >= 35
        ? "Average"
        : "Needs Improvement";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Team Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team size
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1</span>
            <span className="font-semibold text-indigo-600">
              {teamSize} people
            </span>
            <span>50</span>
          </div>
        </div>

        <p className="text-sm font-medium text-gray-700">
          Hours per person per week
        </p>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Meetings: {meetingHours} hrs
          </label>
          <input
            type="range"
            min={0}
            max={30}
            value={meetingHours}
            onChange={(e) => setMeetingHours(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Admin / ops: {adminHours} hrs
          </label>
          <input
            type="range"
            min={0}
            max={20}
            value={adminHours}
            onChange={(e) => setAdminHours(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Email / messaging: {emailHours} hrs
          </label>
          <input
            type="range"
            min={0}
            max={20}
            value={emailHours}
            onChange={(e) => setEmailHours(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Deep work / focused work: {deepWorkHours} hrs
          </label>
          <input
            type="range"
            min={0}
            max={40}
            value={deepWorkHours}
            onChange={(e) => setDeepWorkHours(Number(e.target.value))}
            className="w-full accent-green-500"
          />
        </div>

        <p className="text-sm text-gray-500">
          Total: {totalHours} hrs/week per person
        </p>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Productivity Score
        </h3>

        {/* Score circle */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-gray-100 relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${productivityRatio >= 50 ? "#16a34a" : productivityRatio >= 35 ? "#d97706" : "#dc2626"} ${productivityRatio * 3.6}deg, #f3f4f6 0deg)`,
                mask: "radial-gradient(transparent 55%, black 56%)",
                WebkitMask: "radial-gradient(transparent 55%, black 56%)",
              }}
            />
            <div className="text-center z-10">
              <p className={`text-3xl font-bold ${scoreColor}`}>
                {productivityRatio.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-500">deep work</p>
            </div>
          </div>
          <p className={`mt-3 font-semibold ${scoreColor}`}>{scoreLabel}</p>
          <p className="text-sm text-gray-500 mt-1">
            Target: 50%+ of time on deep work
          </p>
        </div>

        {/* Time breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Time Breakdown
          </p>
          <div className="flex h-6 rounded-full overflow-hidden">
            <div
              className="bg-red-400 transition-all duration-500"
              style={{ width: `${meetingPct}%` }}
              title={`Meetings: ${meetingPct.toFixed(0)}%`}
            />
            <div
              className="bg-amber-400 transition-all duration-500"
              style={{ width: `${adminPct}%` }}
              title={`Admin: ${adminPct.toFixed(0)}%`}
            />
            <div
              className="bg-orange-400 transition-all duration-500"
              style={{ width: `${emailPct}%` }}
              title={`Email: ${emailPct.toFixed(0)}%`}
            />
            <div
              className="bg-green-500 transition-all duration-500"
              style={{ width: `${deepPct}%` }}
              title={`Deep work: ${deepPct.toFixed(0)}%`}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-red-400" />
              <span>Meetings ({meetingPct.toFixed(0)}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-400" />
              <span>Admin ({adminPct.toFixed(0)}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-orange-400" />
              <span>Email ({emailPct.toFixed(0)}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span>Deep work ({deepPct.toFixed(0)}%)</span>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-600 font-medium">
            Estimated wasted time (team total)
          </p>
          <p className="text-2xl font-bold text-red-900">
            {teamWastedHoursWeekly.toFixed(0)} hrs/week
          </p>
          <p className="text-sm text-red-500">
            {teamWastedHoursMonthly.toFixed(0)} hrs/month across {teamSize}{" "}
            people
          </p>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              Recommended AI Tools
            </p>
            {recommendations.map((rec) => (
              <div
                key={rec.category}
                className="bg-indigo-50 border border-indigo-200 rounded-xl p-4"
              >
                <p className="font-medium text-indigo-900 text-sm">
                  {rec.category}
                </p>
                <p className="text-xs text-indigo-600 mt-0.5">{rec.issue}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {rec.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-xl p-5 text-white mt-4">
          <p className="font-semibold mb-1">
            Boost your team&apos;s productivity ratio
          </p>
          <p className="text-sm text-indigo-100 mb-3">
            The right AI tools can free up {teamWastedHoursWeekly.toFixed(0)}{" "}
            hours per week for your team.
          </p>
          <a
            href="/tools/"
            className="inline-block bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-indigo-50 transition"
          >
            Find Productivity Tools
          </a>
        </div>
      </div>
    </div>
  );
}
