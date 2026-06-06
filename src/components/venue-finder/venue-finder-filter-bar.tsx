"use client";

import { CRO_FILTER_CHIPS, filterChipClass } from "@/lib/venue-finder-cro";

type Props = {
  selectedFilters: string[];
  onToggleFilter: (key: string) => void;
  compact?: boolean;
};

export function VenueFinderFilterBar({ selectedFilters, onToggleFilter, compact = false }: Props) {
  const active = new Set(selectedFilters);
  const chips = compact ? CRO_FILTER_CHIPS.slice(0, 5) : CRO_FILTER_CHIPS;

  return (
    <div
      className="border-t border-slate-200 bg-white/95 px-4 py-3 sm:px-6 lg:px-8"
      role="group"
      aria-label="Quick access filters"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
        {chips.map(({ label, key }) => {
          const pressed = active.has(key);
          return (
            <button
              key={key}
              type="button"
              className={filterChipClass(pressed)}
              aria-pressed={pressed}
              onClick={() => onToggleFilter(key)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
