"use client";

import { useState } from "react";

interface Task {
  id: number;
  name: string;
  frequencyPerWeek: number;
  minutesPerOccurrence: number;
}

function fmtCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

const PRESET_TASKS: Omit<Task, "id">[] = [
  { name: "Data entry", frequencyPerWeek: 5, minutesPerOccurrence: 30 },
  { name: "Email follow-ups", frequencyPerWeek: 10, minutesPerOccurrence: 10 },
  { name: "Report generation", frequencyPerWeek: 2, minutesPerOccurrence: 45 },
  { name: "Invoice processing", frequencyPerWeek: 3, minutesPerOccurrence: 20 },
  { name: "Social media posting", frequencyPerWeek: 7, minutesPerOccurrence: 15 },
];

export default function AutomationSavingsCalculator() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Data entry", frequencyPerWeek: 5, minutesPerOccurrence: 30 },
    { id: 2, name: "Email follow-ups", frequencyPerWeek: 10, minutesPerOccurrence: 10 },
  ]);
  const [hourlyRate, setHourlyRate] = useState(65);
  const [automationRate, setAutomationRate] = useState(80);

  function addTask() {
    setTasks([
      ...tasks,
      { id: Date.now(), name: "", frequencyPerWeek: 1, minutesPerOccurrence: 15 },
    ]);
  }

  function addPreset(preset: Omit<Task, "id">) {
    if (tasks.some((t) => t.name === preset.name)) return;
    setTasks([...tasks, { ...preset, id: Date.now() }]);
  }

  function removeTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function updateTask(id: number, field: string, value: string | number) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  const taskAnalysis = tasks
    .map((t) => {
      const hoursPerMonth = (t.frequencyPerWeek * t.minutesPerOccurrence * 4.33) / 60;
      const costPerMonth = hoursPerMonth * hourlyRate;
      const savingsPerMonth = costPerMonth * (automationRate / 100);
      return { ...t, hoursPerMonth, costPerMonth, savingsPerMonth };
    })
    .sort((a, b) => b.savingsPerMonth - a.savingsPerMonth);

  const totalHoursPerMonth = taskAnalysis.reduce(
    (sum, t) => sum + t.hoursPerMonth,
    0
  );
  const totalCostPerMonth = taskAnalysis.reduce(
    (sum, t) => sum + t.costPerMonth,
    0
  );
  const totalSavingsPerMonth = taskAnalysis.reduce(
    (sum, t) => sum + t.savingsPerMonth,
    0
  );
  const maxSavings = Math.max(
    ...taskAnalysis.map((t) => t.savingsPerMonth),
    1
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your hourly rate ($)
          </label>
          <input
            type="number"
            min={15}
            max={500}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected automation efficiency ({automationRate}%)
          </label>
          <input
            type="range"
            min={30}
            max={95}
            value={automationRate}
            onChange={(e) => setAutomationRate(Number(e.target.value))}
            className="w-full accent-cyan-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>30%</span>
            <span className="font-semibold text-cyan-600">
              {automationRate}%
            </span>
            <span>95%</span>
          </div>
        </div>

        {/* Quick add presets */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Quick add common tasks
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESET_TASKS.map((p) => (
              <button
                key={p.name}
                onClick={() => addPreset(p)}
                disabled={tasks.some((t) => t.name === p.name)}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-cyan-400 hover:text-cyan-700 hover:bg-cyan-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                + {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => updateTask(task.id, "name", e.target.value)}
                  className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-cyan-500 focus:outline-none px-0 py-1 w-48"
                  placeholder="Task name"
                />
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-gray-400 hover:text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Times per week
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={task.frequencyPerWeek}
                    onChange={(e) =>
                      updateTask(task.id, "frequencyPerWeek", Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Minutes each
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={480}
                    value={task.minutesPerOccurrence}
                    onChange={(e) =>
                      updateTask(
                        task.id,
                        "minutesPerOccurrence",
                        Number(e.target.value)
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addTask}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-500 hover:border-cyan-400 hover:text-cyan-600 transition"
        >
          + Add another task
        </button>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Savings Potential
        </h3>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
            <p className="text-xs text-cyan-600 font-medium">Hours/Month</p>
            <p className="text-xl font-bold text-cyan-900">
              {totalHoursPerMonth.toFixed(1)}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-blue-600 font-medium">Current Cost</p>
            <p className="text-xl font-bold text-blue-900">
              {fmtCurrency(totalCostPerMonth)}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-xs text-green-600 font-medium">Savings/Month</p>
            <p className="text-xl font-bold text-green-900">
              {fmtCurrency(totalSavingsPerMonth)}
            </p>
          </div>
        </div>

        {/* Ranked tasks */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Tasks ranked by savings potential
          </p>
          <div className="space-y-3">
            {taskAnalysis.map((task, idx) => (
              <div key={task.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">
                    <span className="font-semibold text-gray-400 mr-2">
                      #{idx + 1}
                    </span>
                    {task.name || "Unnamed"}
                  </span>
                  <span className="font-medium text-gray-900">
                    {fmtCurrency(task.savingsPerMonth)}/mo
                  </span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(3, (task.savingsPerMonth / maxSavings) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {task.hoursPerMonth.toFixed(1)} hrs/mo at{" "}
                  {fmtCurrency(task.costPerMonth)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="text-sm text-indigo-600 font-medium">Annual Savings</p>
          <p className="text-3xl font-bold text-indigo-900">
            {fmtCurrency(totalSavingsPerMonth * 12)}
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl p-5 text-white mt-4">
          <p className="font-semibold mb-1">
            Automate your top tasks with AI tools
          </p>
          <p className="text-sm text-cyan-100 mb-3">
            Tools like Zapier, Make, and n8n can automate repetitive workflows
            and save your team hundreds of hours.
          </p>
          <a
            href="/tools/"
            className="inline-block bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-cyan-50 transition"
          >
            Discover Automation Tools
          </a>
        </div>
      </div>
    </div>
  );
}
