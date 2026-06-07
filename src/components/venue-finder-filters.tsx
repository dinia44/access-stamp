"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PRIMARY_COUNT = 8;

export const VENUE_FILTERS = [
  "Step-free entrance",
  "Ramp access",
  "Accessible toilet",
  "Changing Places toilet",
  "Automatic doors",
  "Wide doorways (80cm+)",
  "Turning space (150cm+)",
  "Nearby Blue Badge parking",
  "Lift access",
  "Transfer-friendly seating",
  "Space for carers",
  "Powered wheelchair suitable",
  "Quiet environment",
  "Staff disability awareness",
] as const;

type Props = {
  selected: string[];
  onChange: (next: string[]) => void;
};

export function VenueFinderFilters({ selected, onChange }: Props) {
  const [moreOpen, setMoreOpen] = useState(false);
  const selectedSet = new Set(selected);

  function toggle(label: string) {
    const next = new Set(selectedSet);
    if (next.has(label)) next.delete(label);
    else next.add(label);
    onChange(Array.from(next));
  }

  const primary = VENUE_FILTERS.slice(0, PRIMARY_COUNT);
  const extra = VENUE_FILTERS.slice(PRIMARY_COUNT);
  const extraSelected = extra.some((t) => selectedSet.has(t));

  return (
    <div className="mt-5 space-y-3">
      <div className="text-sm font-semibold text-heading">Access filters</div>
      <p className="text-xs text-muted">Click or tap to toggle must-haves.</p>
      <div className="flex flex-wrap gap-2">
        {primary.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => toggle(t)}
            className={cn(
              "rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
              selectedSet.has(t)
                ? "border-blue bg-blue-pale text-blue shadow-[inset_0_0_0_1px_rgba(240,74,22,0.25)]"
                : "border-border bg-background text-heading hover:bg-background-2",
            )}
            aria-pressed={selectedSet.has(t)}
            aria-label={`${t} filter ${selectedSet.has(t) ? "selected" : "not selected"}`}
          >
            {selectedSet.has(t) ? "✓ " : ""}
            {t}
          </button>
        ))}
      </div>

      <details
        className="rounded-[var(--radius-card)] border border-border bg-background-2/60 p-3"
        open={moreOpen || extraSelected}
        onToggle={(e) => setMoreOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer text-sm font-semibold text-heading">More filters</summary>
        <div className="mt-3 flex flex-wrap gap-2">
          {extra.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggle(t)}
              className={cn(
                "rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
                selectedSet.has(t)
                  ? "border-blue bg-blue-pale text-blue shadow-[inset_0_0_0_1px_rgba(240,74,22,0.25)]"
                  : "border-border bg-background text-heading hover:bg-background-2",
              )}
              aria-pressed={selectedSet.has(t)}
              aria-label={`${t} filter ${selectedSet.has(t) ? "selected" : "not selected"}`}
            >
              {selectedSet.has(t) ? "✓ " : ""}
              {t}
            </button>
          ))}
        </div>
      </details>

      {selected.length > 0 ? (
        <div className="flex items-center justify-between gap-3 text-xs font-semibold text-muted">
          <span>
            {selected.length} filter{selected.length === 1 ? "" : "s"} selected
          </span>
          <button
            type="button"
            className="rounded-[var(--radius-ui)] border border-border px-2 py-1 text-heading hover:bg-background-2"
            onClick={() => onChange([])}
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
