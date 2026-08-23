import type { Venue } from "@/lib/mock-data";
import { filterVenues, mapIncomingFilters, mapQueryToFilters, normalize, tokenize } from "@/lib/venue-finder";
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

export type VenueFinderResultMeta = {
  venues: Venue[];
  /** True when a keyword query produced zero matches (not a silent browse fallback). */
  isExplicitNoResults: boolean;
  /** True when results are limited by a town/postcode string match. */
  usedLocationTextMatch: boolean;
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
  const query = readParam(input, "q").trim();
  // Never treat `q` as a location. Only an explicit location param (or coords) counts.
  const location = readParam(input, "location").trim();
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

function filterByLocationText(venues: Venue[], location: string): Venue[] {
  const terms = tokenize(location);
  if (!terms.length) return venues;

  const matched = venues.filter((venue) => {
    const haystack = normalize(venue.location);
    return terms.every((term) => haystack.includes(term));
  });

  return matched;
}

export function getFilteredVenuesWithMeta(
  venues: Venue[],
  state: VenueFinderSearchState,
): VenueFinderResultMeta {
  const sortBy: VenueFinderSort =
    state.sortBy ?? (state.center ? "Distance" : "Best match");
  const hasQuery = Boolean(state.query.trim());
  const hasLocation = Boolean(state.location.trim());

  // Keyword matching uses `q` only — never silently fold location into the query.
  let filtered = filterVenues(venues, {
    query: state.query,
    selectedFilters: state.filters,
    verifiedOnly: false,
    sortBy:
      sortBy === "Evidence confidence"
        ? "Evidence confidence"
        : sortBy === "Distance"
          ? "Distance"
          : "Relevance",
  });

  const isExplicitNoResults = hasQuery && filtered.length === 0;

  let usedLocationTextMatch = false;
  if (!isExplicitNoResults && hasLocation && !parseCoordinatePair(state.location)) {
    const byPlace = filterByLocationText(filtered, state.location);
    if (byPlace.length > 0) {
      filtered = byPlace;
      usedLocationTextMatch = true;
    }
    // If the place string matches no venue locations but a map center exists,
    // keep the keyword/filter set and let distance sorting provide geographic bias.
    // Never invent unrelated keyword matches for a failed `q`.
  }

  // Preserve relevance ranking when the visitor searched by name/category.
  if (!hasQuery) {
    filtered = sortVenuesFeaturedFirst(filtered);
  }

  if (sortBy === "Distance" && state.center) {
    filtered = [...filtered].sort((a, b) => {
      const aCoords = getVenueCoordinates(a);
      const bCoords = getVenueCoordinates(b);
      if (!aCoords && !bCoords) return 0;
      if (!aCoords) return 1;
      if (!bCoords) return -1;
      return haversineDistanceKm(state.center!, aCoords) - haversineDistanceKm(state.center!, bCoords);
    });
  }

  return { venues: filtered, isExplicitNoResults, usedLocationTextMatch };
}

export function getFilteredVenues(venues: Venue[], state: VenueFinderSearchState): Venue[] {
  return getFilteredVenuesWithMeta(venues, state).venues;
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

/** Human-readable place line — never treat a venue-name `q` as a geography. */
export function formatVenueFinderLocationLine(location?: string | null): string {
  const trimmed = location?.trim();
  if (!trimmed) return "Venues across the UK";
  if (parseCoordinatePair(trimmed)) return "Venues near your location";
  if (/^near me$/i.test(trimmed)) return "Venues near your location";
  return `Venues in ${trimmed}`;
}
