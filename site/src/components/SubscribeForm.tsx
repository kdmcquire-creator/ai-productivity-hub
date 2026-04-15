"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { trackNewsletterSignup } from "@/lib/analytics";

export type SubscribeFormVariant = "inline" | "card" | "modal";

interface SubscribeFormProps {
  /** Analytics source label (e.g. "footer", "blog_article", "modal_scroll"). */
  source: string;
  /** Layout variant. Defaults to `card`. */
  variant?: SubscribeFormVariant;
  /** Heading shown above the form (card / modal only). */
  heading?: string;
  /** Description shown above the form (card / modal only). */
  description?: string;
  /** Optional className forwarded to the outer element. */
  className?: string;
  /** Called with the submitted email after a successful subscription. */
  onSuccess?: (email: string) => void;
  /** If true, auto-focus the email input on mount (used by the modal). */
  autoFocusInput?: boolean;
}

type Status = "idle" | "submitting" | "success" | "error";

// Simple RFC-5322-ish email shape check — mirrors server-side `isValidEmail`.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reusable subscribe form that posts `{ email }` to `/api/subscribe`.
 *
 * Supports three visual variants and fires `newsletter_signup` via the site's
 * analytics helper on success. Persists a `moonsmoke_subscribed` flag to
 * localStorage so the modal knows to stay hidden for returning subscribers.
 */
export default function SubscribeForm({
  source,
  variant = "card",
  heading = "Stay ahead of the AI curve",
  description = "Get AI productivity tool reviews + workflow guides. Weekly-ish. No spam.",
  className = "",
  onSuccess,
  autoFocusInput = false,
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const errorId = useId();
  const descriptionId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error || "Something went wrong. Try again?");
      }

      setStatus("success");
      setEmail("");
      trackNewsletterSignup(source);

      // Remember the subscriber so the modal stays out of their way.
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("moonsmoke_subscribed", "1");
        }
      } catch {
        // localStorage may be disabled (private browsing / quota) — ignore.
      }

      onSuccess?.(trimmed);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  }

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isError = status === "error";

  // --- Success state ------------------------------------------------------

  if (isSuccess) {
    const successWrapperClass =
      variant === "inline"
        ? "bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm"
        : "bg-green-50 border border-green-200 rounded-xl p-6 text-center";

    return (
      <div
        className={`${successWrapperClass} ${className}`}
        role="status"
        aria-live="polite"
      >
        <p className="text-green-800 font-medium">
          You&apos;re subscribed! Check your email.
        </p>
      </div>
    );
  }

  // --- Inline variant -----------------------------------------------------

  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-2 ${className}`}
        noValidate
      >
        <div className="flex gap-2">
          <label htmlFor={`subscribe-email-${errorId}`} className="sr-only">
            Email address
          </label>
          <input
            ref={inputRef}
            id={`subscribe-email-${errorId}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isSubmitting}
            aria-invalid={isError || undefined}
            aria-describedby={isError ? errorId : undefined}
            autoFocus={autoFocusInput}
            className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition motion-reduce:transition-none whitespace-nowrap"
          >
            {isSubmitting ? "…" : "Subscribe"}
          </button>
        </div>
        {isError && errorMsg && (
          <p id={errorId} className="text-red-600 text-xs" role="alert">
            {errorMsg}
          </p>
        )}
      </form>
    );
  }

  // --- Modal variant (no gradient background — modal handles chrome) ------

  if (variant === "modal") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 ${className}`}
        aria-describedby={descriptionId}
        noValidate
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{heading}</h2>
          <p id={descriptionId} className="text-gray-600 text-sm">
            {description}
          </p>
        </div>

        <label
          htmlFor={`subscribe-modal-email-${errorId}`}
          className="sr-only"
        >
          Email address
        </label>
        <input
          ref={inputRef}
          id={`subscribe-modal-email-${errorId}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={isSubmitting}
          aria-invalid={isError || undefined}
          aria-describedby={
            isError ? `${errorId} ${descriptionId}` : descriptionId
          }
          autoFocus={autoFocusInput}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition motion-reduce:transition-none"
        >
          {isSubmitting ? "Subscribing…" : "Subscribe Free"}
        </button>

        {isError && errorMsg && (
          <p id={errorId} className="text-red-600 text-sm" role="alert">
            {errorMsg}
          </p>
        )}

        <p className="text-xs text-gray-400">
          We respect your privacy. Unsubscribe any time.
        </p>
      </form>
    );
  }

  // --- Card variant (default) --------------------------------------------

  return (
    <div
      className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 ${className}`}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">{heading}</h3>
      <p id={descriptionId} className="text-gray-600 text-sm mb-4">
        {description}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
        aria-describedby={descriptionId}
        noValidate
      >
        <label htmlFor={`subscribe-card-email-${errorId}`} className="sr-only">
          Email address
        </label>
        <input
          ref={inputRef}
          id={`subscribe-card-email-${errorId}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={isSubmitting}
          aria-invalid={isError || undefined}
          aria-describedby={
            isError ? `${errorId} ${descriptionId}` : descriptionId
          }
          className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition motion-reduce:transition-none"
        >
          {isSubmitting ? "Subscribing…" : "Subscribe Free"}
        </button>
      </form>
      {isError && errorMsg && (
        <p id={errorId} className="text-red-600 text-sm mt-2" role="alert">
          {errorMsg}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-3">
        We respect your privacy. Unsubscribe any time.
      </p>
    </div>
  );
}
