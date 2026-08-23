"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { ChatWidgetLoader } from "@/components/chat/chat-widget-loader";
import { useChat } from "@/components/chat/provider";
import { track } from "@/lib/analytics";

/**
 * Persistent accessibility launcher. The optional assistant remains available
 * only where a user deliberately opens it from a relevant tool or guide.
 */
export function SiteUtilityDock() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const { open: chatOpen } = useChat();
  const panelId = useId();
  const triggerMobileRef = useRef<HTMLButtonElement>(null);
  const triggerDesktopRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    track(a11yOpen ? "a11y_panel_opened" : "a11y_panel_closed");
  }, [a11yOpen]);

  const closePanel = (restoreFocus = true) => {
    setA11yOpen(false);
    if (!restoreFocus) return;
    const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;
    const trigger = mobile ? triggerMobileRef.current : triggerDesktopRef.current;
    queueMicrotask(() => trigger?.focus());
  };

  useEffect(() => {
    if (!a11yOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusable = panel?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    queueMicrotask(() => focusable?.focus());

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel(true);
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const nodes = [
        ...panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onPointerDown(e: MouseEvent | PointerEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (triggerMobileRef.current?.contains(target)) return;
      if (triggerDesktopRef.current?.contains(target)) return;
      closePanel(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
    // closePanel closes over latest refs; open-only dependency is intentional
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
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility options"
          data-testid="accessibility-options-panel"
          className="accessibility-panel site-a11y-panel"
        >
          <div className="relative">
            <button
              type="button"
              className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-lg text-[var(--color-text-muted)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              aria-label="Close accessibility options"
              onClick={() => closePanel(true)}
            >
              <span aria-hidden="true">×</span>
            </button>
            <AccessibilityControls embedded open onOpenChange={(open) => (open ? setA11yOpen(true) : closePanel(true))} />
          </div>
        </div>
      ) : null}

      <div className="sm:hidden">
        <button
          ref={triggerMobileRef}
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-expanded={a11yOpen}
          aria-controls={panelId}
          aria-haspopup="dialog"
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
          ref={triggerDesktopRef}
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-expanded={a11yOpen}
          aria-controls={panelId}
          aria-haspopup="dialog"
          onClick={() => setA11yOpen((v) => !v)}
        >
          Accessibility
        </button>
      </div>
    </div>
  );
}
