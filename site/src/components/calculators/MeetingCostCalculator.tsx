"use client";

import { useState } from "react";

function fmtCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function MeetingCostCalculator() {
  const [attendees, setAttendees] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [duration, setDuration] = useState(60);
  const [meetingsPerWeek, setMeetingsPerWeek] = useState(8);

  const costPerMeeting = attendees * hourlyRate * (duration / 60);
  const weeklyCost = costPerMeeting * meetingsPerWeek;
  const monthlyCost = weeklyCost * 4.33;
  const annualCost = monthlyCost * 12;
  const totalHoursPerWeek = attendees * (duration / 60) * meetingsPerWeek;
  const recoveredHoursWithAI = totalHoursPerWeek * 0.25;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Meeting Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of attendees
          </label>
          <input
            type="range"
            min={2}
            max={30}
            value={attendees}
            onChange={(e) => setAttendees(Number(e.target.value))}
            className="w-full accent-orange-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>2</span>
            <span className="font-semibold text-orange-600">
              {attendees} people
            </span>
            <span>30</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average hourly rate ($)
          </label>
          <input
            type="number"
            min={15}
            max={500}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meeting duration (minutes)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 60].map((min) => (
              <button
                key={min}
                onClick={() => setDuration(min)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${
                  duration === min
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {min} min
              </button>
            ))}
          </div>
          <input
            type="range"
            min={10}
            max={180}
            step={5}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-orange-600 mt-2"
          />
          <p className="text-sm text-center text-orange-600 font-semibold">
            {duration} minutes
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meetings per week
          </label>
          <input
            type="range"
            min={1}
            max={40}
            value={meetingsPerWeek}
            onChange={(e) => setMeetingsPerWeek(Number(e.target.value))}
            className="w-full accent-orange-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1</span>
            <span className="font-semibold text-orange-600">
              {meetingsPerWeek} meetings
            </span>
            <span>40</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">The True Cost</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-600 font-medium">Per Meeting</p>
            <p className="text-2xl font-bold text-amber-900">
              {fmtCurrency(costPerMeeting)}
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-sm text-orange-600 font-medium">Weekly</p>
            <p className="text-2xl font-bold text-orange-900">
              {fmtCurrency(weeklyCost)}
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600 font-medium">Monthly</p>
            <p className="text-2xl font-bold text-red-900">
              {fmtCurrency(monthlyCost)}
            </p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <p className="text-sm text-rose-600 font-medium">Annual</p>
            <p className="text-2xl font-bold text-rose-900">
              {fmtCurrency(annualCost)}
            </p>
          </div>
        </div>

        {/* Time visualization */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Total person-hours in meetings per week
          </p>
          <div className="flex items-end gap-1 h-24">
            {Array.from({ length: Math.min(meetingsPerWeek, 20) }).map(
              (_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-orange-400 rounded-t transition-all duration-300"
                  style={{
                    height: `${(attendees * (duration / 60) * 4) / 1}%`,
                    minHeight: "8px",
                    maxHeight: "100%",
                  }}
                />
              )
            )}
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            <span className="font-bold text-gray-900">
              {totalHoursPerWeek.toFixed(0)}
            </span>{" "}
            person-hours per week
          </p>
        </div>

        {/* AI CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-5 text-white mt-4">
          <p className="font-semibold mb-1">
            Recover ~{recoveredHoursWithAI.toFixed(0)} hours/week with AI
            meeting tools
          </p>
          <p className="text-sm text-amber-100 mb-3">
            Tools like Fireflies.ai, Otter.ai, and Fathom can auto-transcribe,
            summarize, and extract action items from your meetings — saving{" "}
            {fmtCurrency(recoveredHoursWithAI * hourlyRate)} per week.
          </p>
          <a
            href="/tools/"
            className="inline-block bg-white text-orange-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-orange-50 transition"
          >
            Explore Meeting AI Tools
          </a>
        </div>
      </div>
    </div>
  );
}
