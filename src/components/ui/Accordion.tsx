"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  id?: string;
};

export function AccordionItem({ title, children, isOpen, onToggle, id }: AccordionItemProps) {
  const autoId = useId();
  const itemId = id ?? autoId;
  const triggerId = `trigger-${itemId}`;
  const panelId = `panel-${itemId}`;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex min-h-12 w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-semibold text-[var(--color-ink)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--as-focus)]/30 focus-visible:ring-offset-2",
        )}
      >
        <span>{title}</span>
        <svg
          viewBox="0 0 24 24"
          className={cn("h-5 w-5 shrink-0 text-[var(--color-muted)] transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="border-t border-[var(--color-border)] px-4 py-4"
      >
        {children}
      </div>
    </div>
  );
}
