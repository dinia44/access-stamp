"use client";

import { VF_BTN_PRIMARY, VF_INPUT } from "@/lib/venue-finder-cro";

type Props = {
  query: string;
  location: string;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
  onUseLocation: () => void;
  locating: boolean;
};

export function VenueFinderSearchBar({
  query,
  location,
  onQueryChange,
  onLocationChange,
  onSearch,
  onUseLocation,
  locating,
}: Props) {
  return (
    <form
      className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-end">
        <label className="block">
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

        <label className="block">
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

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:min-w-[148px]">
          <button type="submit" className={`${VF_BTN_PRIMARY} w-full`}>
            Search venues
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
            onClick={onUseLocation}
            disabled={locating}
          >
            {locating ? "Finding location…" : "Use my location"}
          </button>
        </div>
      </div>
    </form>
  );
}
