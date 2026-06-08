"use client";

import { AskAccessStampAiButton } from "@/components/ask-access-stamp-ai-button";
import { CRO_FILTER_CHIPS, filterChipClass, VF_BTN_PRIMARY, VF_BTN_SECONDARY, VF_INPUT } from "@/lib/venue-finder-cro";
import { SITE_PANEL } from "@/lib/site-design";

type Props = {
  query: string;
  location: string;
  selectedFilters: string[];
  locating: boolean;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onToggleFilter: (key: string) => void;
  onSearch: () => void;
  onUseLocation: () => void;
  onOpenMobileFilters?: () => void;
};

export function VenueFinderFloatingBox({
  query,
  location,
  selectedFilters,
  locating,
  onQueryChange,
  onLocationChange,
  onToggleFilter,
  onSearch,
  onUseLocation,
  onOpenMobileFilters,
}: Props) {
  const active = new Set(selectedFilters);
  const aiPrefill =
    [query, location].filter(Boolean).join(" — ")
      ? `Help me find accessible venues for ${[query, location].filter(Boolean).join(" in ")}.`
      : "Help me find an accessible venue near me.";

  return (
    <div className={`relative z-20 mx-auto max-w-[1180px] -mt-12 p-4 sm:-mt-14 sm:p-6 ${SITE_PANEL}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_260px_auto] md:items-end">
          <label className="block min-w-0">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5E6A66]">
              Search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className={VF_INPUT}
              placeholder="Venue, place, or access need"
              autoComplete="off"
            />
          </label>

          <label className="block min-w-0">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5E6A66]">
              Location
            </span>
            <input
              type="search"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className={VF_INPUT}
              placeholder="City, town or postcode"
              autoComplete="postal-code"
            />
          </label>

          <div className="flex flex-col gap-2 md:min-w-[148px]">
            <button type="submit" className={`${VF_BTN_PRIMARY} h-14 w-full`}>
              Search venues
            </button>
            <button
              type="button"
              className={`${VF_BTN_SECONDARY} w-full md:hidden`}
              onClick={onUseLocation}
              disabled={locating}
            >
              {locating ? "Finding location…" : "Use my location"}
            </button>
          </div>
        </div>

        <div className="mt-5 border-t border-[#F1D8C7] pt-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5E6A66]">Access filters</p>
            {onOpenMobileFilters ? (
              <button
                type="button"
                className="text-xs font-semibold text-[#F04A16] hover:text-[#D93E10] lg:hidden"
                onClick={onOpenMobileFilters}
              >
                All filters
              </button>
            ) : null}
          </div>

          <div
            className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden"
            role="group"
            aria-label="Quick access filters"
          >
            {CRO_FILTER_CHIPS.map(({ label, key }) => {
              const pressed = active.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  className={`${filterChipClass(pressed)} shrink-0 whitespace-nowrap`}
                  aria-pressed={pressed}
                  onClick={() => onToggleFilter(key)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 hidden flex-wrap gap-2 lg:flex" role="group" aria-label="Quick access filters">
            {CRO_FILTER_CHIPS.map(({ label, key }) => {
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

        <div className="mt-5 flex flex-col gap-3 border-t border-[#F1D8C7] pt-5 sm:flex-row sm:items-center">
          <AskAccessStampAiButton prefill={aiPrefill} />
          <p className="text-sm leading-6 text-[#5E6A66]">
            Or describe your access needs in plain language and get help planning your visit.
          </p>
          <button
            type="button"
            className={`${VF_BTN_SECONDARY} hidden shrink-0 md:inline-flex`}
            onClick={onUseLocation}
            disabled={locating}
          >
            {locating ? "Finding location…" : "Use my location"}
          </button>
        </div>
      </form>
    </div>
  );
}
