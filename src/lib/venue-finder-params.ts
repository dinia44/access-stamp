import type { Venue } from "@/lib/mock-data";
import { filterVenues, mapIncomingFilters, mapQueryToFilters } from "@/lib/venue-finder";
import { sortVenuesFeaturedFirst } from "@/lib/venue-finder-cro";

export type VenueFinderSearchState = {
  query: string;
  location: string;
  filters: string[];
};

type SearchParamsInput =
  | Record<string, string | string[] | undefined>
  | URLSearchParams;

function readParam(input: SearchParamsInput, key: string): string {
  if (input instanceof URLSearchParams) {
    return input.get(key) ?? "";
  }
  const value = input[key];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function parseVenueFinderSearchParams(input: SearchParamsInput): VenueFinderSearchState {
  const query = readParam(input, "q");
  const location = readParam(input, "location");
  const filtersRaw = readParam(input, "filters") || readParam(input, "features");
  const requestedFilters = mapIncomingFilters(filtersRaw);
  const inferredFromQuery = mapQueryToFilters(query);
  const initialFiltersBase = requestedFilters.length
    ? requestedFilters
    : inferredFromQuery.length
      ? inferredFromQuery.slice(0, 3)
      : [];
  const filters =
    readParam(input, "verified") === "1" && !initialFiltersBase.includes("__verified_checked")
      ? [...initialFiltersBase, "__verified_checked"]
      : initialFiltersBase;

  return { query, location, filters };
}

export function getFilteredVenues(venues: Venue[], state: VenueFinderSearchState): Venue[] {
  return sortVenuesFeaturedFirst(
    filterVenues(venues, {
      query: [state.query, state.location].filter(Boolean).join(" "),
      selectedFilters: state.filters,
      verifiedOnly: false,
      sortBy: "Relevance",
    }),
  );
}

export function buildVenueFinderQueryString(state: VenueFinderSearchState): string {
  const params = new URLSearchParams();
  if (state.query.trim()) params.set("q", state.query.trim());
  if (state.location.trim()) params.set("location", state.location.trim());
  if (state.filters.length) params.set("filters", state.filters.join(","));
  return params.toString();
}

export function hasVenueFinderSearchContext(state: VenueFinderSearchState): boolean {
  return Boolean(state.query.trim() || state.location.trim() || state.filters.length);
}
