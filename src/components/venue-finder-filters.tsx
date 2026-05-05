"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PRIMARY_COUNT = 8;

const FILTERS = [
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

export function VenueFinderFilters() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [moreOpen, setMoreOpen] = useState(false);

  function toggle(label: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  const primary = FILTERS.slice(0, PRIMARY_COUNT);
  const extra = FILTERS.slice(PRIMARY_COUNT);

  return (
    <div className="mt-5 space-y-3">
      <div className="text-sm font-semibold text-heading">Access filters</div>
      <p className="text-xs text-muted">
        Tap to highlight must-haves (preview only — live filtering connects when search is wired to data).
      </p>
      <div className="flex flex-wrap gap-2">
        {primary.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => toggle(t)}
            className={cn(
              "rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
              selected.has(t)
                ? "border-blue bg-blue-pale text-blue"
                : "border-border bg-background text-heading hover:bg-background-2",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <details
        className="rounded-[var(--radius-card)] border border-border bg-background-2/60 p-3"
        open={moreOpen}
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
                selected.has(t)
                  ? "border-blue bg-blue-pale text-blue"
                  : "border-border bg-background text-heading hover:bg-background-2",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </details>

      {selected.size > 0 ? (
        <div className="text-xs font-semibold text-muted">
          {selected.size} filter{selected.size === 1 ? "" : "s"} selected
        </div>
      ) : null}
    </div>
  );
}
