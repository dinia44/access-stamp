"use client";

import { TextInput } from "@/components/ui/TextInput";
import {
  filterChipClass,
  VENUE_FINDER_QUICK_FILTERS,
  VF_BTN_PRIMARY,
  VF_BTN_SECONDARY,
} from "@/lib/venue-finder-cro";

type Props = {
  query: string;
  location: string;
  selectedFilters: string[];
  locating: boolean;
  locationError?: string | null;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onToggleFilter: (key: string) => void;
  onSearch: () => void;
  onUseLocation: () => void;
  onOpenMobileFilters?: () => void;
};

export function VenueSearchPanel({
  query,
  location,
  selectedFilters,
  locating,
  locationError,
  onQueryChange,
  onLocationChange,
  onToggleFilter,
  onSearch,
  onUseLocation,
  onOpenMobileFilters,
}: Props) {
  const active = new Set(selectedFilters);
  const searchValue = [query, location].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-black/10 bg-white/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-6">
        <form
          role="search"
          aria-label="Search accessible venues"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <p className="text-sm font-semibold text-[#17201C]">Where do you want to go?</p>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-end">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <TextInput
                name="query"
                label="Search venues"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search by town, postcode or venue name"
                autoComplete="off"
              />
              <TextInput
                name="location"
                label="Location"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="Town, city, or postcode"
                autoComplete="postal-code"
                error={locationError ?? undefined}
              />
            </div>

            <button
              type="button"
              className={`${VF_BTN_SECONDARY} h-14 w-full lg:w-auto`}
              disabled={locating}
              onClick={onUseLocation}
            >
              {locating ? "Finding location…" : "Use my location"}
            </button>

            <button type="submit" className={`${VF_BTN_PRIMARY} h-14 w-full lg:w-auto`}>
              Search venues
            </button>
          </div>

          <div className="mt-6 border-t border-black/5 pt-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Quick access needs
              </p>
              {onOpenMobileFilters ? (
                <button
                  type="button"
                  className="text-xs font-semibold text-[#17201C] underline-offset-2 hover:underline lg:hidden"
                  onClick={onOpenMobileFilters}
                >
                  All filters
                </button>
              ) : null}
            </div>

            <div
              className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap"
              role="group"
              aria-label="Quick access needs"
            >
              {VENUE_FINDER_QUICK_FILTERS.map(({ label, key }) => {
                const pressed = active.has(key);
                return (
                  <button
                    key={key}
                    type="button"
                    className={`${filterChipClass(pressed)} shrink-0 whitespace-nowrap`}
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

          {searchValue ? (
            <p className="mt-4 text-sm text-[#4F5A53]">
              Searching for <span className="font-medium text-[#17201C]">{searchValue}</span>
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
