"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import SubscribeForm from "@/components/SubscribeForm";

interface SubscribeModalProps {
  /** Trigger at this fraction of page scroll (0-1). Default 0.5. */
  scrollDepth?: number;
  /** Max dwell time (ms) before showing the modal. Default 45 s. */
  timeDelayMs?: number;
  /** Heading shown inside the modal. */
  heading?: string;
  /** Body copy shown above the form. */
  description?: string;
  /** Analytics label forwarded to the form. */
  source?: string;
}

// Storage keys — shared across both sites so a subscription on one surface
// suppresses the modal everywhere during that browser session.
const SESSION_SHOWN_KEY = "moonsmoke_modal_shown";
const SUBSCRIBED_KEY = "moonsmoke_subscribed";
const DISMISSED_UNTIL_KEY = "moonsmoke_modal_dismissed_until";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Scroll-depth / time-delay newsletter modal.
 *
 * Shows at most once per session. Skipped entirely if the visitor has
 * already subscribed or opted into the 30-day "don't show again" snooze.
 * Dismissal adds a delayed "Don't show me this again" button that, once
 * clicked, writes a 30-day timestamp to localStorage.
 */
export default function SubscribeModal({
  scrollDepth = 0.5,
  timeDelayMs = 45_000,
  heading = "Get the newsletter",
  description = "Get AI productivity tool reviews + workflow guides. Weekly-ish. No spam.",
  source = "modal_scroll",
}: SubscribeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<"form" | "snooze">("form");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const scrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingOpenRef = useRef(false);
  const shownInThisLoadRef = useRef(false);

  // --- Gating helpers ----------------------------------------------------

  const shouldSuppress = useCallback((): boolean => {
    if (typeof window === "undefined") return true;
    try {
      if (window.localStorage.getItem(SUBSCRIBED_KEY) === "1") return true;
      const dismissedUntil = window.localStorage.getItem(DISMISSED_UNTIL_KEY);
      if (dismissedUntil && Number(dismissedUntil) > Date.now()) return true;
      if (window.sessionStorage.getItem(SESSION_SHOWN_KEY) === "1") return true;
    } catch {
      // Storage blocked — err on the side of showing.
    }
    return false;
  }, []);

  const markShownForSession = useCallback(() => {
    try {
      window.sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
    } catch {
      // ignore
    }
  }, []);

  const openModal = useCallback(() => {
    if (shownInThisLoadRef.current) return;
    if (shouldSuppress()) return;
    shownInThisLoadRef.current = true;
    markShownForSession();
    previousFocusRef.current =
      (document.activeElement as HTMLElement | null) ?? null;
    setIsOpen(true);
  }, [shouldSuppress, markShownForSession]);

  const requestOpen = useCallback(() => {
    // Do not interrupt an active scroll — wait until the user settles.
    if (scrollingRef.current) {
      pendingOpenRef.current = true;
      return;
    }
    openModal();
  }, [openModal]);

  const fullyClose = useCallback(() => {
    setIsOpen(false);
    setPhase("form");
    // Restore focus to whatever had it before the modal opened.
    queueMicrotask(() => {
      previousFocusRef.current?.focus?.();
    });
  }, []);

  /** Close button / Escape / backdrop click handler. */
  const handleDismiss = useCallback(() => {
    // First dismissal from the form view swaps to the snooze prompt.
    // A second dismissal (or either snooze button) closes fully.
    setPhase((current) => {
      if (current === "form") return "snooze";
      // Already on snooze — actually close.
      queueMicrotask(() => fullyClose());
      return current;
    });
  }, [fullyClose]);

  const handleSnoozeThirtyDays = useCallback(() => {
    try {
      window.localStorage.setItem(
        DISMISSED_UNTIL_KEY,
        String(Date.now() + THIRTY_DAYS_MS)
      );
    } catch {
      // ignore
    }
    fullyClose();
  }, [fullyClose]);

  // --- Trigger: scroll depth + dwell timer -------------------------------

  useEffect(() => {
    if (shouldSuppress()) return;

    const timer = window.setTimeout(requestOpen, timeDelayMs);

    function settleScroll() {
      scrollingRef.current = false;
      if (pendingOpenRef.current) {
        pendingOpenRef.current = false;
        openModal();
      }
    }

    function onScroll() {
      scrollingRef.current = true;
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(settleScroll, 150);

      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const viewport = window.innerHeight;
      const fullHeight = doc.scrollHeight;
      const scrollable = Math.max(fullHeight - viewport, 1);
      const fraction = scrollTop / scrollable;

      if (fraction >= scrollDepth) {
        requestOpen();
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollDepth, timeDelayMs, requestOpen, openModal, shouldSuppress]);

  // --- Body scroll lock + initial focus ----------------------------------

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Give the dialog a tick to mount, then focus the close button.
    const handle = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(handle);
    };
  }, [isOpen]);

  // --- Escape-key handler (global, only while open) ----------------------

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        handleDismiss();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleDismiss]);

  // --- Focus trap --------------------------------------------------------

  function handleDialogKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const root = dialogRef.current;
    if (!root) return;

    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function handleBackdropClick(e: ReactMouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleDismiss();
    }
  }

  // --- Render ------------------------------------------------------------

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 motion-reduce:backdrop-blur-none"
      onClick={handleBackdropClick}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-modal-heading"
        onKeyDown={handleDialogKeyDown}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={handleDismiss}
          aria-label={phase === "form" ? "Close subscribe dialog" : "Dismiss"}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition motion-reduce:transition-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {phase === "form" ? (
          <>
            <h2
              id="subscribe-modal-heading"
              className="sr-only"
            >
              {heading}
            </h2>
            <SubscribeForm
              source={source}
              variant="modal"
              heading={heading}
              description={description}
              autoFocusInput
              onSuccess={() => {
                // Auto-close a beat after success so the user reads the message.
                window.setTimeout(() => fullyClose(), 1500);
              }}
            />
          </>
        ) : (
          <div className="text-center py-2">
            <h2
              id="subscribe-modal-heading"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              No worries
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Want us to stop asking? We&apos;ll stay out of your way for a
              while.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={handleSnoozeThirtyDays}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition motion-reduce:transition-none"
              >
                Don&apos;t show for 30 days
              </button>
              <button
                type="button"
                onClick={fullyClose}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition motion-reduce:transition-none"
              >
                Maybe later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
