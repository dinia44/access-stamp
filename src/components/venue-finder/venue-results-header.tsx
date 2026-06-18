"use client";

import { SITE_FOCUS } from "@/lib/site-design";
import type { VenueFinderSort } from "@/lib/venue-finder-params";
import { VenueFinderActiveFiltersSummary } from "./venue-finder-active-filters";

const SORT_OPTIONS: VenueFinderSort[] = ["Best match", "Evidence confidence", "Distance"];

type Props = {
  resultCount: number;
  locating: boolean;
  location?: string;
  hasSearchContext: boolean;
  selectedFilters: string[];
  sortBy: VenueFinderSort;
  onSortChange: (sort: VenueFinderSort) => void;
  onRemoveFilter?: (key: string) => void;
  onChangeLocation?: () => void;
  onClearAll?: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
};

export function VenueResultsHeader({
  resultCount,
  locating,
  location,
  hasSearchContext,
  selectedFilters,
  sortBy,
  onSortChange,
  onRemoveFilter,
  onChangeLocation,
  onClearAll,
  viewMode,
  onViewModeChange,
}: Props) {
  const venueLabel = resultCount === 1 ? "venue" : "venues";
  const trimmedLocation = location?.trim();
  const locationLine = trimmedLocation ? `Venues in ${trimmedLocation}` : "Venues across the UK";

  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-border bg-card px-3 text-sm font-semibold text-heading shadow-sm">
            <span className="sr-only">Sort venues</span>
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as VenueFinderSort)}
              className="bg-transparent text-sm font-semibold text-[var(--color-secondary)] focus:outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="inline-flex rounded-2xl border border-border bg-card p-1 shadow-sm" role="group" aria-label="View mode">
            <button
              type="button"
              className={`min-h-[40px] rounded-xl px-3 text-sm font-semibold ${viewMode === "grid" ? "bg-background-2 text-heading" : "text-muted"} ${SITE_FOCUS}`}
              aria-pressed={viewMode === "grid"}
              onClick={() => onViewModeChange("grid")}
            >
              Grid
            </button>
            <button
              type="button"
              className={`min-h-[40px] rounded-xl px-3 text-sm font-semibold ${viewMode === "list" ? "bg-background-2 text-heading" : "text-muted"} ${SITE_FOCUS}`}
              aria-pressed={viewMode === "list"}
              onClick={() => onViewModeChange("list")}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {hasSearchContext && onClearAll ? (
        <button
          type="button"
          className={`inline-flex min-h-[44px] w-fit items-center text-sm font-semibold text-[var(--color-secondary)] underline-offset-2 hover:underline ${SITE_FOCUS}`}
          onClick={onClearAll}
        >
          Clear all search and filters
        </button>
      ) : null}
    </header>
  );
}
