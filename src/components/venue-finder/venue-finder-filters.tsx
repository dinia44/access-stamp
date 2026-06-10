"use client";

import {
  filterChipClass,
  VENUE_FINDER_FILTER_GROUPS,
  VF_BTN_PRIMARY,
  VF_BTN_SECONDARY,
} from "@/lib/venue-finder-cro";

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
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
          Access filters{count ? ` · ${count}` : ""}
        </h2>
        {count > 0 ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs font-semibold text-[#17201C] underline-offset-2 hover:underline"
          >
            Clear
          </button>
        ) : null}
      </div>

      {VENUE_FINDER_FILTER_GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label={`${group.title} filters`}>
            {group.filters.map(({ label, key }) => {
              const pressed = active.has(key);
              return (
                <button
                  key={key}
                  id={`${idPrefix}-${key.replace(/[^a-z0-9]+/gi, "-")}`}
                  type="button"
                  className={filterChipClass(pressed)}
                  aria-pressed={pressed}
                  data-active={pressed ? "true" : "false"}
                  onClick={() => onToggleFilter(key)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {showApply && onApply ? (
        <button type="button" className={`${VF_BTN_PRIMARY} mt-2 w-full`} onClick={onApply}>
          Apply filters
        </button>
      ) : null}

      {!showApply && count > 0 ? (
        <button type="button" className={`${VF_BTN_SECONDARY} mt-2 w-full`} onClick={onClearFilters}>
          Reset filters
        </button>
      ) : null}
    </div>
  );
}
