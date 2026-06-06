"use client";

import { AskAccessStampAiButton } from "@/components/ask-access-stamp-ai-button";
import { CRO_FILTER_CHIPS, filterChipClass, VF_INPUT } from "@/lib/venue-finder-cro";

const VF_BTN_SEARCH =
  "inline-flex h-14 w-full items-center justify-center rounded-2xl bg-blue-700 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

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
    <div className="relative z-20 mx-auto max-w-6xl -mt-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/15 sm:p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_260px_auto] md:items-end">
          <label className="block min-w-0">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">
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
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">
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
            <button type="submit" className={VF_BTN_SEARCH}>
              Search venues
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 md:hidden"
              onClick={onUseLocation}
              disabled={locating}
            >
              {locating ? "Finding location…" : "Use my location"}
            </button>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Access filters</p>
            {onOpenMobileFilters ? (
              <button
                type="button"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 lg:hidden"
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

          <div
            className="mt-3 hidden flex-wrap gap-2 lg:flex"
            role="group"
            aria-label="Quick access filters"
          >
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

        <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center">
          <AskAccessStampAiButton prefill={aiPrefill} />
          <p className="text-sm leading-6 text-slate-600">
            Or describe your access needs in plain language and get help planning your visit.
          </p>
          <button
            type="button"
            className="hidden min-h-11 shrink-0 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 md:inline-flex"
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
