import type { Venue } from "@/lib/mock-data";
import { filterVenues, mapIncomingFilters, mapQueryToFilters } from "@/lib/venue-finder";
import { sortVenuesFeaturedFirst } from "@/lib/venue-finder-cro";
import {
  getVenueCoordinates,
  type VenueCoordinates,
} from "@/lib/venue-coordinates";
import { haversineDistanceKm, parseCoordinatePair } from "@/lib/venue-geography";

export type VenueFinderSort = "Best match" | "Evidence confidence" | "Distance";

export type VenueFinderSearchState = {
  query: string;
  location: string;
  filters: string[];
  center?: VenueCoordinates;
  sortBy?: VenueFinderSort;
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

  const centerRaw = readParam(input, "center");
  const center = parseCoordinatePair(centerRaw) ?? undefined;

  return { query, location, filters, center };
}

export function getFilteredVenues(venues: Venue[], state: VenueFinderSearchState): Venue[] {
  const sortBy: VenueFinderSort =
    state.sortBy ?? (state.center ? "Distance" : "Best match");

  const filtered = sortVenuesFeaturedFirst(
    filterVenues(venues, {
      query: [state.query, state.location].filter(Boolean).join(" "),
      selectedFilters: state.filters,
      verifiedOnly: false,
      sortBy: sortBy === "Evidence confidence" ? "Evidence confidence" : sortBy === "Distance" ? "Distance" : "Relevance",
    }),
  );

  if (sortBy !== "Distance" || !state.center) return filtered;

  return [...filtered].sort((a, b) => {
    const aCoords = getVenueCoordinates(a);
    const bCoords = getVenueCoordinates(b);
    if (!aCoords && !bCoords) return 0;
    if (!aCoords) return 1;
    if (!bCoords) return -1;
    return haversineDistanceKm(state.center!, aCoords) - haversineDistanceKm(state.center!, bCoords);
  });
}

export function buildVenueFinderQueryString(state: VenueFinderSearchState): string {
  const params = new URLSearchParams();
  if (state.query.trim()) params.set("q", state.query.trim());
  if (state.location.trim()) params.set("location", state.location.trim());
  if (state.filters.length) params.set("filters", state.filters.join(","));
  if (state.center) params.set("center", `${state.center.lat},${state.center.lng}`);
  return params.toString();
}

export function hasVenueFinderSearchContext(state: VenueFinderSearchState): boolean {
  return Boolean(state.query.trim() || state.location.trim() || state.filters.length);
}
