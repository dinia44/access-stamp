"use client";

import { SITE_FOCUS } from "@/lib/site-design";
import { VenueFinderActiveFiltersSummary } from "./venue-finder-active-filters";

type Props = {
  resultCount: number;
  locating: boolean;
  location?: string;
  hasSearchContext: boolean;
  selectedFilters: string[];
  onRemoveFilter?: (key: string) => void;
  onChangeLocation?: () => void;
};

export function VenueResultsHeader({
  resultCount,
  locating,
  location,
  hasSearchContext,
  selectedFilters,
  onRemoveFilter,
  onChangeLocation,
}: Props) {
  const venueLabel = resultCount === 1 ? "venue" : "venues";
  const trimmedLocation = location?.trim();
  const locationLine = trimmedLocation
    ? `Venues in ${trimmedLocation}`
    : "Venues across the UK";

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2
          id="venue-results-heading"
          className="text-3xl font-semibold tracking-[-0.03em] text-heading sm:text-4xl"
        >
          {hasSearchContext ? (
            <>
              <span className="tabular-nums">{resultCount}</span> {venueLabel} found
            </>
          ) : (
            "Venues to explore"
          )}
        </h2>
        <p
          role="status"
          className="mt-2 text-base leading-7 text-muted"
          aria-live="polite"
          aria-atomic="true"
        >
          {locating ? (
            "Finding your location…"
          ) : (
            <>
              <span className="font-medium text-heading">{locationLine}</span>
              {onChangeLocation ? (
                <>
                  {" "}
                  <button
                    type="button"
                    className={`font-semibold text-[var(--color-secondary)] underline-offset-2 hover:underline ${SITE_FOCUS}`}
                    onClick={onChangeLocation}
                  >
                    Change location
                  </button>
                </>
              ) : null}
            </>
          )}
        </p>
        <VenueFinderActiveFiltersSummary selectedFilters={selectedFilters} onRemove={onRemoveFilter} />
      </div>

      <button
        type="button"
        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-heading shadow-sm transition hover:border-[var(--color-border-mid)] hover:bg-background-2"
        aria-haspopup="listbox"
        aria-label="Sort by best match"
      >
        Sort by: <span className="text-[var(--color-secondary)]">Best match</span>
      </button>
    </header>
  );
}
