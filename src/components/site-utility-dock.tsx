"use client";

import { useEffect, useId, useState } from "react";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { ChatWidgetLoader } from "@/components/chat/chat-widget-loader";
import { useChat } from "@/components/chat/provider";

/**
 * Persistent accessibility launcher. The optional assistant remains available
 * only where a user deliberately opens it from a relevant tool or guide.
 */
export function SiteUtilityDock() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const { open: chatOpen } = useChat();
  const panelId = useId();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (a11yOpen) setA11yOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [a11yOpen]);

  if (chatOpen) return <ChatWidgetLoader docked />;

  return (
    <div
      className="site-utility-dock fixed z-[55] flex flex-col items-end gap-2 print:hidden"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      data-testid="site-utility-dock"
      aria-label="Site utilities dock"
    >
      {a11yOpen ? (
        <div id={panelId} className="max-h-[min(60vh,440px)] overflow-auto">
          <div className="relative">
            <button
              type="button"
              className="absolute right-2 top-2 z-10 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-lg text-[var(--color-text-muted)] hover:text-[var(--color-ink)]"
              aria-label="Close accessibility options"
              onClick={() => setA11yOpen(false)}
            >
              ×
            </button>
            <AccessibilityControls embedded open onOpenChange={setA11yOpen} />
          </div>
        </div>
      ) : null}

      <div className="sm:hidden">
        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-expanded={a11yOpen}
          aria-controls={panelId}
          aria-label="Open accessibility options"
          onClick={() => setA11yOpen((open) => !open)}
        >
          Accessibility
        </button>
      </div>

      <div
        className="hidden max-w-[calc(100vw-2rem)] flex-wrap items-center justify-end gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-soft)] sm:flex"
        role="group"
        aria-label="Site utilities"
      >
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-expanded={a11yOpen}
          aria-controls={panelId}
          onClick={() => setA11yOpen((v) => !v)}
        >
          Accessibility
        </button>
      </div>
    </div>
  );
}
