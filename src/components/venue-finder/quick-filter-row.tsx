"use client";

import type { ReactNode } from "react";
import { VENUE_FINDER_QUICK_FILTERS } from "@/lib/venue-finder-cro";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const FILTER_ICONS: Record<string, ReactNode> = {
  "Step-free entrance": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 20h16M7 20V10l5-6 5 6v10" />
      <path d="M12 4v4" />
    </svg>
  ),
  "__wheelchair_access": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="9" cy="6" r="2" />
      <path d="M9 8v5l4 2 3 5" />
      <circle cx="16" cy="18" r="2.5" />
      <circle cx="7" cy="18" r="2.5" />
    </svg>
  ),
  "Accessible toilet": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M8 4h8v4H8z" />
      <path d="M12 8v12M9 20h6" />
    </svg>
  ),
  "Nearby Blue Badge parking": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 12h3l2-3v6l2-3h3" />
    </svg>
  ),
  "Wide doorways (80cm+)": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 20V4M20 20V4M9 20V9h6v11" />
    </svg>
  ),
  "__seating_available": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 18v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
      <path d="M6 18h12" />
      <path d="M8 10V6h8v4" />
    </svg>
  ),
  "Quiet environment": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    </svg>
  ),
  "__hearing_loop": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 4a8 8 0 0 0-8 8v4a4 4 0 0 0 4 4h1" />
      <path d="M12 4a8 8 0 0 1 8 8v4a4 4 0 0 1-4 4h-1" />
    </svg>
  ),
  "Staff disability awareness": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </svg>
  ),
};

function formatFilterLabel(label: string) {
  const parts = label.split(" ");
  if (parts.length <= 2) return label;
  const mid = Math.ceil(parts.length / 2);
  return (
    <>
      {parts.slice(0, mid).join(" ")}
      <br />
      {parts.slice(mid).join(" ")}
    </>
  );
}

type Props = {
  selectedFilters: string[];
  onToggleFilter: (key: string) => void;
  onOpenMoreFilters: () => void;
};

export function QuickFilterRow({ selectedFilters, onToggleFilter, onOpenMoreFilters }: Props) {
  const active = new Set(selectedFilters);

  return (
    <section
      aria-label="Quick access filters"
      className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
        {VENUE_FINDER_QUICK_FILTERS.map(({ label, key }) => {
          const pressed = active.has(key);
          const displayLabel =
            label.includes(" ")
              ? formatFilterLabel(label)
              : label;

          return (
            <button
              key={key}
              type="button"
              className={cn(
                "flex min-h-[64px] items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-left text-sm font-semibold text-heading shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                pressed
                  ? "border-[var(--color-border-mid)] bg-background-2 shadow-md"
                  : "border-border hover:border-[var(--color-border-mid)]",
                SITE_FOCUS,
              )}
              aria-pressed={pressed}
              onClick={() => onToggleFilter(key)}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-verified-pale text-[var(--color-secondary)]">
                {FILTER_ICONS[key] ?? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                    <path d="M5 12h14M12 5v14" />
                  </svg>
                )}
              </span>
              <span>{displayLabel}</span>
            </button>
          );
        })}

        <button
          type="button"
          className={cn(
            "flex min-h-[64px] items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm font-semibold text-heading shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--color-border-mid)] hover:shadow-md",
            SITE_FOCUS,
          )}
          onClick={onOpenMoreFilters}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-verified-pale text-[var(--color-secondary)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h10" />
              <circle cx="18" cy="17" r="2" />
            </svg>
          </span>
          <span>
            More
            <br />
            filters
          </span>
        </button>
      </div>
    </section>
  );
}
