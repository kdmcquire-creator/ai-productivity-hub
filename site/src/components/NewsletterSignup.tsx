"use client";

import { useState, FormEvent } from "react";

interface NewsletterSignupProps {
  source: string;
  variant?: "inline" | "card";
  className?: string;
}

export default function NewsletterSignup({
  source,
  variant = "card",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");

      // Push GA4 event
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "newsletter_signup",
          signup_source: source,
        });
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${className}`}
      >
        <p className="text-green-800 font-medium">
          You&apos;re in! Check your inbox for a welcome email.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
        >
          {status === "submitting" ? "..." : "Subscribe"}
        </button>
      </form>
    );
  }

  return (
    <div
      className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 ${className}`}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Stay ahead of the AI curve
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Get weekly AI tool discoveries, in-depth reviews, and productivity tips
        delivered to your inbox. No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          {status === "submitting" ? "Subscribing..." : "Subscribe Free"}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
      )}
      <p className="text-xs text-gray-400 mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
