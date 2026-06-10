import { VenueFinderActiveFiltersSummary } from "./venue-finder-active-filters";

type Props = {
  resultCount: number;
  locating: boolean;
  location?: string;
  hasSearchContext: boolean;
  selectedFilters: string[];
  onRemoveFilter?: (key: string) => void;
};

export function VenueResultsHeader({
  resultCount,
  locating,
  location,
  hasSearchContext,
  selectedFilters,
  onRemoveFilter,
}: Props) {
  const venueLabel = resultCount === 1 ? "venue" : "venues";
  const heading = hasSearchContext ? "Search results" : "Venues to explore";

  return (
    <header>
      <h2
        id="venue-results-heading"
        className="text-2xl font-semibold tracking-[-0.03em] text-[#17201C] sm:text-3xl"
      >
        {heading}
      </h2>
      <p
        role="status"
        className="mt-2 text-base leading-7 text-[#4F5A53]"
        aria-live="polite"
        aria-atomic="true"
      >
        {locating
          ? "Finding your location…"
          : `${resultCount} ${venueLabel} found`}
        {location?.trim() && !locating ? ` · ${location.trim()}` : ""}
      </p>
      <VenueFinderActiveFiltersSummary selectedFilters={selectedFilters} onRemove={onRemoveFilter} />
    </header>
  );
}
