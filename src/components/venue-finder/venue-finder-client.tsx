"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import type { Venue } from "@/lib/mock-data";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { parseCoordinatePair } from "@/lib/venue-geography";
import {
  buildVenueFinderQueryString,
  getFilteredVenuesWithMeta,
  hasVenueFinderSearchContext,
  parseVenueFinderSearchParams,
  type VenueFinderSearchState,
  type VenueFinderSort,
} from "@/lib/venue-finder-params";
import { VF_BTN_SECONDARY, VF_PAGE_BG } from "@/lib/venue-finder-cro";
import { suggestVenueMailto } from "@/lib/venue-submission";
import { track } from "@/lib/analytics";
import { BottomVenueCTA } from "./bottom-venue-cta";
import { QuickFilterRow } from "./quick-filter-row";
import { VenueFinderAiCard } from "./venue-finder-ai-card";
import { VenueFinderFilterDrawer } from "./venue-finder-filter-drawer";
import { VenueFinderHero } from "./venue-finder-hero";
import { VenueFinderMobileBar } from "./venue-finder-mobile-bar";
import { VenueResultsHeader } from "./venue-results-header";
import { VenueResultCard } from "./venue-result-card";
import { VenueSearchPanel } from "./venue-search-panel";
import { VenueListRow } from "./venue-list-row";
import { VenueTrustStrip } from "./venue-trust-strip";

const VENUES_PER_PAGE = 12;

type Props = {
  venues: Venue[];
  initial: VenueFinderSearchState;
};

function VenueFinderEmptyState({
  query,
  onClearQuery,
  onClearFilters,
  onBrowseAll,
  hasFilters,
}: {
  query?: string;
  onClearQuery?: () => void;
  onClearFilters?: () => void;
  onBrowseAll?: () => void;
  hasFilters?: boolean;
}) {
  const trimmed = query?.trim();
  return (
    <section
      aria-labelledby="empty-state-heading"
      className="mt-6 overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm"
    >
      <div className="grid gap-0 md:grid-cols-[180px_minmax(0,1fr)]">
        <div className="relative hidden min-h-[180px] md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CLOUDINARY_MEDIA.emptyState}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" aria-hidden="true" />
        </div>
        <div className="p-8 text-center md:text-left">
          <h2 id="empty-state-heading" className="text-xl font-semibold text-heading">
            {trimmed ? `No venues match “${trimmed}”` : "No matching venues found"}
          </h2>
          <p role="status" aria-live="polite" className="mt-2 text-base leading-7 text-muted">
            Try another name, remove a filter, or browse all demonstration venues.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            {trimmed && onClearQuery ? (
              <button type="button" className={VF_BTN_SECONDARY} onClick={onClearQuery}>
                Clear search
              </button>
            ) : null}
            {hasFilters && onClearFilters ? (
              <button type="button" className={VF_BTN_SECONDARY} onClick={onClearFilters}>
                Clear filters
              </button>
            ) : null}
            {onBrowseAll ? (
              <button type="button" className={VF_BTN_SECONDARY} onClick={onBrowseAll}>
                Browse demonstration venues
              </button>
            ) : (
              <a href={suggestVenueMailto()} className={`${VF_BTN_SECONDARY} inline-flex`}>
                Suggest a venue
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function VenueFinderHistorySync({
  onSync,
}: {
  onSync: (state: VenueFinderSearchState) => void;
}) {
  useEffect(() => {
    const syncFromLocation = () => {
      const params = new URLSearchParams(window.location.search);
      onSync(parseVenueFinderSearchParams(params));
    };

    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [onSync]);

  return null;
}

type MapPanelComponent = typeof import("./venue-finder-map-panel").VenueFinderMapPanel;

function VenueFinderInteractive({ venues, initial }: Props) {
  const pathname = usePathname();
  const resultsRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(initial.query);
  const [location, setLocation] = useState(initial.location);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(initial.filters);
  const [mapCenter, setMapCenter] = useState<VenueCoordinates | null>(initial.center ?? null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<VenueFinderSort>(initial.center ? "Distance" : "Best match");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [MapPanel, setMapPanel] = useState<MapPanelComponent | null>(null);
  const [mapPanelLoading, setMapPanelLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncFromHistory = useCallback((state: VenueFinderSearchState) => {
    setQuery(state.query);
    setLocation(state.location);
    setSelectedFilters(state.filters);
    setMapCenter(state.center ?? null);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const next = buildVenueFinderQueryString({
        query,
        location,
        filters: selectedFilters,
        center: mapCenter ?? undefined,
      });
      const current =
        typeof window !== "undefined"
          ? buildVenueFinderQueryString(
              parseVenueFinderSearchParams(new URLSearchParams(window.location.search)),
            )
          : "";
      if (next === current) return;
      const url = next ? `${pathname}?${next}` : pathname;
      window.history.replaceState(window.history.state, "", url);
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, location, selectedFilters, mapCenter, pathname]);

  useEffect(() => {
    const parsed = parseCoordinatePair(location);
    if (parsed || !location.trim() || /^near me$/i.test(location.trim())) {
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      setGeocoding(true);
      setGeocodeError(null);
      fetch(`/api/geocode?q=${encodeURIComponent(location.trim())}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { lat?: number; lng?: number } | null) => {
          if (cancelled) return;
          if (!data?.lat || !data?.lng) {
            setGeocodeError("We couldn’t find that town or postcode. Try another place name.");
            setGeocoding(false);
            return;
          }
          setMapCenter({ lat: data.lat, lng: data.lng });
          setGeocodeError(null);
          setGeocoding(false);
        })
        .catch(() => {
          if (cancelled) return;
          setGeocodeError("Location lookup failed. You can still search by venue name.");
          setGeocoding(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [location]);

  const { venues: filtered, isExplicitNoResults } = useMemo(
    () =>
      getFilteredVenuesWithMeta(venues, {
        query,
        location,
        filters: selectedFilters,
        center: mapCenter ?? undefined,
        sortBy,
      }),
    [venues, query, location, selectedFilters, mapCenter, sortBy],
  );

  const zeroResultsTracked = useRef(false);
  const searchEpoch = `${query}|${location}|${selectedFilters.join(",")}|${mapCenter?.lat ?? ""}|${sortBy}|${viewMode}`;
  const [pageEpoch, setPageEpoch] = useState(searchEpoch);
  const [pageForEpoch, setPageForEpoch] = useState(1);
  if (pageEpoch !== searchEpoch) {
    setPageEpoch(searchEpoch);
    setPageForEpoch(1);
  }
  const page = pageForEpoch;
  const setPage = setPageForEpoch;

  useEffect(() => {
    if (!isExplicitNoResults) {
      zeroResultsTracked.current = false;
      return;
    }
    if (zeroResultsTracked.current) return;
    zeroResultsTracked.current = true;
    track("search_zero_results", {
      has_query: Boolean(query.trim()),
      has_filters: selectedFilters.length > 0,
    });
  }, [isExplicitNoResults, query, selectedFilters.length]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / VENUES_PER_PAGE));
  const paginated = useMemo(() => {
    const start = (page - 1) * VENUES_PER_PAGE;
    return filtered.slice(start, start + VENUES_PER_PAGE);
  }, [filtered, page]);

  const activeSelectedSlug =
    selectedSlug && filtered.some((venue) => venue.slug === selectedSlug) ? selectedSlug : null;
  const toggleFilter = useCallback((key: string) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters([]);
  }, []);

  const clearAllSearch = useCallback(() => {
    setQuery("");
    setLocation("");
    setSelectedFilters([]);
    setMapCenter(null);
    setSortBy("Best match");
    setPageForEpoch(1);
    setLocationError(null);
    setGeocodeError(null);
  }, []);

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Location is not supported in this browser. Search by postcode instead.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
        setMapCenter(coords);
        setLocating(false);
        setLocationError(null);
      },
      () => {
        setLocating(false);
        setLocationError("Location access was blocked. Search by postcode instead.");
      },
      { timeout: 8000 },
    );
  }, []);

  const handleUserLocation = useCallback((coords: VenueCoordinates) => {
    setMapCenter(coords);
    setLocation(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
  }, []);

  const handleSearch = useCallback(() => {
    const hasContext = hasVenueFinderSearchContext({
      query,
      location,
      filters: selectedFilters,
      center: mapCenter ?? undefined,
    });
    track("search_submitted", {
      has_query: Boolean(query.trim()),
      has_filters: selectedFilters.length > 0,
      result_count: filtered.length,
    });
    if (filtered.length === 0 && hasContext) {
      track("search_zero_results", {
        has_query: Boolean(query.trim()),
        has_filters: selectedFilters.length > 0,
      });
    }
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [filtered.length, location, mapCenter, query, selectedFilters]);

  const handleChangeLocation = useCallback(() => {
    searchPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = searchPanelRef.current?.querySelector<HTMLInputElement>("input[name='location']");
    input?.focus();
  }, []);

  const handleOpenFullMap = useCallback(() => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleLoadMapPanel = useCallback(() => {
    if (MapPanel || mapPanelLoading) return;
    setMapPanelLoading(true);
    import("./venue-finder-map-panel")
      .then((mod) => setMapPanel(() => mod.VenueFinderMapPanel))
      .finally(() => setMapPanelLoading(false));
  }, [MapPanel, mapPanelLoading]);

  const aiPrefill = [query, location].filter(Boolean).join(" — ") || undefined;
  const searchState = useMemo(
    () => ({ query, location, filters: selectedFilters, center: mapCenter ?? undefined }),
    [query, location, selectedFilters, mapCenter],
  );
  const hasSearchContext = hasVenueFinderSearchContext(searchState);

  return (
    <div className={`vf-page min-h-screen ${VF_PAGE_BG}`}>
        <VenueFinderHero />

        <div ref={searchPanelRef}>
          <VenueSearchPanel
            query={query}
            location={location}
            locating={locating}
            locationError={locationError ?? geocodeError}
            onQueryChange={setQuery}
            onLocationChange={(value) => {
              setLocation(value);
              const parsed = parseCoordinatePair(value);
              if (parsed) {
                setMapCenter(parsed);
                setGeocodeError(null);
                setGeocoding(false);
                return;
              }
              if (!value.trim()) {
                setMapCenter(null);
                setGeocodeError(null);
                setGeocoding(false);
              }
            }}
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
          />
        </div>

        <QuickFilterRow
          selectedFilters={selectedFilters}
          onToggleFilter={toggleFilter}
          onOpenMoreFilters={() => setFiltersOpen(true)}
        />

        <VenueTrustStrip />

        <section
          ref={resultsRef}
          className="mx-auto grid max-w-7xl gap-8 px-4 py-12 pb-28 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:pb-12"
        >
          <div className="order-2 space-y-6 lg:order-1">
            <section
              id="venue-results"
              aria-labelledby="venue-results-heading"
              aria-busy={locating || geocoding}
            >
              <VenueResultsHeader
                resultCount={filtered.length}
                locating={locating}
                geocoding={geocoding}
                location={location}
                query={query}
                hasSearchContext={hasSearchContext}
                selectedFilters={selectedFilters}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onRemoveFilter={toggleFilter}
                onChangeLocation={handleChangeLocation}
                onClearAll={clearAllSearch}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {filtered.length ? (
                <>
                  <ul
                    className={
                      viewMode === "grid"
                        ? "mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-2"
                        : "mt-6 flex flex-col gap-4"
                    }
                  >
                    {paginated.map((venue, index) =>
                      viewMode === "grid" ? (
                        <VenueResultCard
                          key={venue.slug}
                          venue={venue}
                          index={index}
                          userCenter={mapCenter}
                          selected={activeSelectedSlug === venue.slug}
                          onSelect={() => setSelectedSlug(venue.slug)}
                        />
                      ) : (
                        <li key={venue.slug}>
                          <VenueListRow
                            venue={venue}
                            userCenter={mapCenter}
                            selected={activeSelectedSlug === venue.slug}
                            onSelect={() => setSelectedSlug(venue.slug)}
                          />
                        </li>
                      ),
                    )}
                  </ul>

                  {totalPages > 1 ? (
                    <nav className="mt-8 flex flex-wrap items-center justify-between gap-3" aria-label="Venue results pages">
                      <p className="text-sm text-muted">
                        Showing {(page - 1) * VENUES_PER_PAGE + 1}–
                        {Math.min(page * VENUES_PER_PAGE, filtered.length)} of {filtered.length}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className={VF_BTN_SECONDARY}
                          disabled={page <= 1}
                          onClick={() => setPage((current) => Math.max(1, current - 1))}
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          className={VF_BTN_SECONDARY}
                          disabled={page >= totalPages}
                          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                        >
                          Next
                        </button>
                      </div>
                    </nav>
                  ) : null}
                </>
              ) : (
                <VenueFinderEmptyState
                  query={isExplicitNoResults ? query : undefined}
                  hasFilters={selectedFilters.length > 0}
                  onClearQuery={() => setQuery("")}
                  onClearFilters={clearFilters}
                  onBrowseAll={clearAllSearch}
                />
              )}
            </section>
          </div>

          <aside
            className="order-1 space-y-6 lg:sticky lg:top-28 lg:order-2 lg:self-start"
            aria-label="Map and visit planner"
          >
            <div ref={mapRef}>
              {MapPanel ? (
                <MapPanel
                  venues={filtered}
                  locationLabel={location}
                  selectedSlug={activeSelectedSlug}
                  mapCenter={mapCenter}
                  onSelectVenue={setSelectedSlug}
                  onUserLocation={handleUserLocation}
                  onOpenFullMap={handleOpenFullMap}
                  mapEnabledByDefault
                />
              ) : (
                <div className="rounded-[2rem] border border-border bg-background-2 p-5 shadow-sm">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold tracking-[-0.03em] text-heading">Explore on map</h2>
                    <p className="mt-1 text-xs text-muted">{location.trim() || "UK venues"}</p>
                  </div>
                  <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-background-2 to-verified-pale px-6 text-center">
                    <p className="text-sm font-semibold text-heading">Interactive map</p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
                      Load the map to explore venue markers near your search.
                    </p>
                    <button
                      type="button"
                      className={`${VF_BTN_SECONDARY} mt-5`}
                      onClick={handleLoadMapPanel}
                      disabled={mapPanelLoading}
                    >
                      {mapPanelLoading ? "Loading map…" : "Load map"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <VenueFinderAiCard prefill={aiPrefill} />
          </aside>
        </section>

        <BottomVenueCTA />

        <VenueFinderMobileBar
          onOpenChange={setFiltersOpen}
          filterCount={selectedFilters.length}
          onSearch={handleSearch}
        />

        <VenueFinderFilterDrawer
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          selectedFilters={selectedFilters}
          onToggleFilter={toggleFilter}
          onClearFilters={clearFilters}
        />

        <VenueFinderHistorySync onSync={syncFromHistory} />
    </div>
  );
}

export function VenueFinderClient({ venues, initial }: Props) {
  return <VenueFinderInteractive venues={venues} initial={initial} />;
}
