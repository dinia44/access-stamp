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
  page?: number;
  viewMode?: "grid" | "list";
};

export type VenueFinderResultMeta = {
  venues: Venue[];
  /** True when a keyword query produced zero matches (not a silent browse fallback). */
  isExplicitNoResults: boolean;
  /** True when results are limited by a town/postcode string match. */
  usedLocationTextMatch: boolean;
};

const FULL_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

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

  const sort = readParam(input, "sort");
  const sortBy = (["Best match", "Evidence confidence", "Distance"] as const).find((item) => item === sort);
  const page = Math.max(1, Math.min(10000, Number.parseInt(readParam(input, "page"), 10) || 1));
  const viewMode = readParam(input, "view") === "list" ? "list" : "grid";
  return { query, location, filters, center, sortBy, page, viewMode };
}

function filterByLocationText(venues: Venue[], location: string): Venue[] {
  const terms = tokenize(location);
  if (!terms.length) return venues;

  const matched = venues.filter((venue) => {
    const haystack = normalize(venue.location);
    return terms.every((term) => haystack.split(" ").includes(term));
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

  let usedLocationTextMatch = false;
  const nearby = Boolean(parseCoordinatePair(state.location)) || /^near me$/i.test(state.location.trim()) || FULL_POSTCODE.test(state.location.trim());
  if (hasLocation && !nearby) {
    filtered = filterByLocationText(filtered, state.location);
    usedLocationTextMatch = true;
  } else if (state.center) {
    filtered = filtered.filter((venue) => {
      const coordinates = getVenueCoordinates(venue);
      return coordinates != null && haversineDistanceKm(state.center!, coordinates) <= 25;
    });
  } else if (nearby) {
    filtered = [];
  }
  const isExplicitNoResults = (hasQuery || hasLocation || state.filters.length > 0) && filtered.length === 0;

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
  if (state.sortBy) params.set("sort", state.sortBy);
  if (state.page && state.page > 1) params.set("page", String(state.page));
  if (state.viewMode === "list") params.set("view", "list");
  return params.toString();
}

export function hasVenueFinderSearchContext(state: VenueFinderSearchState): boolean {
  return Boolean(state.query.trim() || state.location.trim() || state.filters.length);
}

/** Human-readable place line — never treat a venue-name `q` as a geography. */
export function formatVenueFinderLocationLine(location?: string | null): string {
  const trimmed = location?.trim();
  if (!trimmed) return "Venues across the UK";
  if (parseCoordinatePair(trimmed)) return "Venues within 25 km of your location";
  if (/^near me$/i.test(trimmed)) return "Venues within 25 km of your location";
  if (FULL_POSTCODE.test(trimmed)) return `Venues within 25 km of ${trimmed}`;
  return `Venues in ${trimmed}`;
}
