"use client";

import { AskAccessStampAiButton } from "@/components/ask-access-stamp-ai-button";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { CRO_FILTER_CHIPS, filterChipClass } from "@/lib/venue-finder-cro";
import { SITE_PANEL } from "@/lib/site-design";

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

export function VenueFinderFloatingBox({
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
  const aiPrefill =
    [query, location].filter(Boolean).join(" — ")
      ? `Help me find accessible venues for ${[query, location].filter(Boolean).join(" in ")}.`
      : "Help me find an accessible venue near me.";

  return (
    <div className={`relative z-20 mx-auto max-w-7xl -mt-12 p-4 sm:-mt-14 sm:p-6 ${SITE_PANEL}`}>
      <form
        role="search"
        aria-label="Search accessible venues"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_260px_auto] md:items-end">
          <TextInput
            name="query"
            label="Search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Venue, café, museum, cinema…"
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

          <div className="flex flex-col gap-2 md:min-w-[148px]">
            <Button type="submit" size="lg" className="w-full">
              Search venues
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full md:hidden"
              isLoading={locating}
              onClick={onUseLocation}
            >
              Use my location
            </Button>
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

        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[#F1D8C7] pt-5 sm:flex-row sm:flex-wrap sm:items-center">
          <AskAccessStampAiButton prefill={aiPrefill} />
          <p className="text-sm leading-6 text-[#5E6A66]">
            Or describe your access needs in plain language and get help planning your visit.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="hidden shrink-0 md:inline-flex"
            isLoading={locating}
            onClick={onUseLocation}
          >
            Use my location
          </Button>
        </div>
      </form>
    </div>
  );
}
