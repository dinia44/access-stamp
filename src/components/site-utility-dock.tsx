"use client";

import { useEffect, useId, useState } from "react";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { ChatWidgetLoader } from "@/components/chat/chat-widget-loader";
import { useChat } from "@/components/chat/provider";

/**
 * Coordinated bottom-right utility group: Accessibility + AI assistant.
 * Labelled controls that do not overlap each other or primary page actions.
 */
export function SiteUtilityDock() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const { open: chatOpen } = useChat();
  const panelId = useId();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && a11yOpen) setA11yOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [a11yOpen]);

  if (chatOpen) return <ChatWidgetLoader docked />;

  return (
    <div
      className="site-utility-dock fixed bottom-4 right-4 z-[55] flex flex-col items-end gap-2 print:hidden sm:bottom-5 sm:right-5"
      data-testid="site-utility-dock"
    >
      {a11yOpen ? (
        <div id={panelId} className="max-h-[min(70vh,440px)] overflow-auto">
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

      <div
        className="flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-end gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-soft)]"
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
        <span className="hidden h-6 w-px bg-[var(--color-border)] sm:block" aria-hidden />
        <ChatWidgetLoader docked />
      </div>
    </div>
  );
}
