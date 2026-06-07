"use client";

import { CRO_FILTER_CHIPS, filterChipClass, VF_BTN_PRIMARY, VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";

type Props = {
  selectedFilters: string[];
  onToggleFilter: (key: string) => void;
  onClearFilters: () => void;
  onApply?: () => void;
  showApply?: boolean;
  idPrefix?: string;
};

export function VenueFinderFilters({
  selectedFilters,
  onToggleFilter,
  onClearFilters,
  onApply,
  showApply = false,
  idPrefix = "vf-filter",
}: Props) {
  const active = new Set(selectedFilters);
  const count = selectedFilters.length;

  return (
    <div className="rounded-2xl border border-[#F1D8C7] bg-white/95 p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5E6A66]">
          Access filters{count ? ` · ${count}` : ""}
        </h2>
        {count > 0 ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs font-semibold text-[#F04A16] hover:text-[#D93E10]"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Access filters">
        {CRO_FILTER_CHIPS.map(({ label, key }) => {
          const pressed = active.has(key);
          return (
            <button
              key={key}
              id={`${idPrefix}-${key.replace(/[^a-z0-9]+/gi, "-")}`}
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

      {showApply && onApply ? (
        <button type="button" className={`${VF_BTN_PRIMARY} mt-4 w-full`} onClick={onApply}>
          Apply filters
        </button>
      ) : null}

      {!showApply && count > 0 ? (
        <button type="button" className={`${VF_BTN_SECONDARY} mt-4 w-full`} onClick={onClearFilters}>
          Reset filters
        </button>
      ) : null}
    </div>
  );
}
