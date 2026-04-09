"use client";

import { useState, useEffect, useCallback } from "react";

interface NewsletterEntry {
  id: string;
  title: string;
  status: "draft" | "queued" | "sent";
  sendDate: string;
  sentAt?: string;
  format: string;
}

interface CronEndpoint {
  name: string;
  path: string;
}

interface SiteLink {
  name: string;
  url: string;
  domain: string;
}

const CRON_ENDPOINTS: CronEndpoint[] = [
  { name: "Link Checker", path: "/api/cron/check-links" },
  { name: "Stale Queue", path: "/api/cron/stale-queue" },
  { name: "Content Pipeline", path: "/api/cron/content-pipeline" },
  { name: "Send Newsletter", path: "/api/cron/send-newsletter" },
  { name: "Analytics Digest", path: "/api/cron/analytics-digest" },
  { name: "Social Post", path: "/api/cron/social-post" },
];

const NETWORK_SITES: SiteLink[] = [
  {
    name: "AI Productivity Hub",
    url: "https://aiproductivityhub.co",
    domain: "aiproductivityhub.co",
  },
  {
    name: "Clarity Engine",
    url: "https://clarity-engine.ai",
    domain: "clarity-engine.ai",
  },
  {
    name: "AI Finance Hub",
    url: "https://aifinancehub.ai",
    domain: "aifinancehub.ai",
  },
  {
    name: "LegalTech AI Hub",
    url: "https://legaltech-ai-hub.com",
    domain: "legaltech-ai-hub.com",
  },
];

const AUTH_STORAGE_KEY = "ph_admin_key";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    queued: "bg-blue-100 text-blue-700",
    sent: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colors[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

function LoginForm({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter the admin API key to continue.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (key.trim()) onLogin(key.trim());
          }}
        >
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin API Key"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [newsletters, setNewsletters] = useState<NewsletterEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [triggerResult, setTriggerResult] = useState<string | null>(null);

  // Restore key from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) setAdminKey(stored);
  }, []);

  const handleLogin = useCallback((key: string) => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, key);
    setAdminKey(key);
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setAdminKey(null);
    setNewsletters([]);
  }, []);

  // Fetch newsletters when authenticated
  useEffect(() => {
    if (!adminKey) return;

    setLoading(true);
    fetch("/api/newsletters", {
      headers: { "x-api-key": adminKey },
    })
      .then(async (r) => {
        if (r.ok) {
          const data = (await r.json()) as { newsletters?: NewsletterEntry[] };
          setNewsletters(data.newsletters ?? []);
        }
      })
      .catch(() => {
        // Newsletters endpoint may not exist yet — that's fine
      })
      .finally(() => setLoading(false));
  }, [adminKey]);

  const triggerCron = useCallback(
    async (endpoint: CronEndpoint) => {
      if (!adminKey) return;
      setTriggerResult(null);
      try {
        const res = await fetch(endpoint.path, {
          method: "POST",
          headers: { Authorization: `Bearer ${adminKey}` },
        });
        const data: unknown = await res.json();
        setTriggerResult(
          `${endpoint.name}: ${res.status} - ${JSON.stringify(data).slice(0, 300)}`
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Request failed";
        setTriggerResult(`${endpoint.name}: Error - ${message}`);
      }
    },
    [adminKey]
  );

  if (!adminKey) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-2">
        {/* Newsletter Queue */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Newsletter Queue</h2>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : newsletters.length === 0 ? (
            <p className="text-sm text-gray-400">
              No newsletters found (endpoint may not be configured yet).
            </p>
          ) : (
            <ul className="divide-y">
              {newsletters.map((nl) => (
                <li key={nl.id} className="py-3 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{nl.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {nl.format} &middot;{" "}
                      {nl.sentAt
                        ? `Sent ${new Date(nl.sentAt).toLocaleDateString()}`
                        : `Scheduled ${new Date(nl.sendDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <StatusBadge status={nl.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Cron Status */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Cron Endpoints</h2>
          <p className="text-xs text-gray-400 mb-3">
            Configured cron jobs that run via the dispatcher.
          </p>
          <ul className="space-y-2">
            {CRON_ENDPOINTS.map((ep) => (
              <li
                key={ep.path}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-medium">{ep.name}</span>
                <code className="text-xs text-gray-400">{ep.path}</code>
              </li>
            ))}
          </ul>
        </section>

        {/* Site Health */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Site Health</h2>
          <ul className="space-y-3">
            {NETWORK_SITES.map((site) => (
              <li key={site.url}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm group"
                >
                  <span className="font-medium group-hover:text-blue-600 transition-colors">
                    {site.name}
                  </span>
                  <span className="text-xs text-gray-400">{site.domain}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Quick Actions */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <p className="text-xs text-gray-400 mb-3">
            Manually trigger cron endpoints (sends authenticated POST).
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CRON_ENDPOINTS.map((ep) => (
              <button
                key={ep.path}
                onClick={() => triggerCron(ep)}
                className="text-sm border border-gray-200 rounded px-3 py-2 hover:bg-gray-50 transition-colors text-left"
              >
                {ep.name}
              </button>
            ))}
          </div>
          {triggerResult && (
            <div className="mt-4 p-3 bg-gray-50 rounded text-xs font-mono break-all">
              {triggerResult}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
