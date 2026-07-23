"use client";

import { useEffect, useId, useState } from "react";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { ChatWidgetLoader } from "@/components/chat/chat-widget-loader";
import { useChat } from "@/components/chat/provider";

/**
 * Coordinated bottom-right utility group: Accessibility + AI assistant.
 * Collapses to one launcher on narrow screens; respects safe-area insets.
 */
export function SiteUtilityDock() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: chatOpen } = useChat();
  const panelId = useId();
  const menuId = useId();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (a11yOpen) setA11yOpen(false);
      if (menuOpen) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [a11yOpen, menuOpen]);

  if (chatOpen) return <ChatWidgetLoader docked />;

  return (
    <div
      className="site-utility-dock fixed z-[55] flex flex-col items-end gap-2 print:hidden"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      data-testid="site-utility-dock"
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

      {/* Mobile: single launcher */}
      <div className="sm:hidden">
        {menuOpen ? (
          <div
            id={menuId}
            className="mb-2 flex w-[min(calc(100vw-2rem),280px)] flex-col gap-1 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow)]"
            role="menu"
            aria-label="Site utilities"
          >
            <button
              type="button"
              role="menuitem"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-3 text-left text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-subtle)]"
              onClick={() => {
                setMenuOpen(false);
                setA11yOpen(true);
              }}
            >
              Accessibility options
            </button>
            <div className="px-1">
              <ChatWidgetLoader docked />
            </div>
          </div>
        ) : null}
        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-expanded={menuOpen || a11yOpen}
          aria-controls={menuOpen ? menuId : a11yOpen ? panelId : undefined}
          aria-label="Open site utilities"
          onClick={() => {
            if (a11yOpen) setA11yOpen(false);
            setMenuOpen((open) => !open);
          }}
        >
          Tools
        </button>
      </div>

      {/* sm+: labelled utility group */}
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
        <span className="h-6 w-px bg-[var(--color-border)]" aria-hidden />
        <ChatWidgetLoader docked />
      </div>
    </div>
  );
}
