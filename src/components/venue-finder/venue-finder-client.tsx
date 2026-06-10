"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SetChatContext } from "@/components/chat/set-context";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import type { Venue } from "@/lib/mock-data";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { parseCoordinatePair } from "@/lib/venue-geography";
import {
  buildVenueFinderQueryString,
  getFilteredVenues,
  hasVenueFinderSearchContext,
  parseVenueFinderSearchParams,
  type VenueFinderSearchState,
} from "@/lib/venue-finder-params";
import { VF_BTN_SECONDARY, VF_PAGE_BG } from "@/lib/venue-finder-cro";
import { BottomVenueCTA } from "./bottom-venue-cta";
import { QuickFilterRow } from "./quick-filter-row";
import { SavedVenuesCard } from "./saved-venues-card";
import { VenueFinderAiCard } from "./venue-finder-ai-card";
import { VenueFinderFilterDrawer } from "./venue-finder-filter-drawer";
import { VenueFinderHero } from "./venue-finder-hero";
import { VenueFinderMapPanel } from "./venue-finder-map-panel";
import { VenueFinderMobileBar } from "./venue-finder-mobile-bar";
import { VenueResultsHeader } from "./venue-results-header";
import { VenueResultCard } from "./venue-result-card";
import { VenueSearchPanel } from "./venue-search-panel";
import { VenueTrustStrip } from "./venue-trust-strip";

type Props = {
  venues: Venue[];
  initial: VenueFinderSearchState;
};

function VenueFinderEmptyState() {
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
            No matching venues found
          </h2>
          <p className="mt-2 text-base leading-7 text-muted">
            Try removing a filter, searching a nearby town, or suggest a venue for us to check.
          </p>
          <Link href="/submit-venue" className={`${VF_BTN_SECONDARY} mt-5 inline-flex`}>
            Suggest a venue
          </Link>
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

function VenueFinderInteractive({ venues, initial }: Props) {
  const router = useRouter();
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
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
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
        typeof window !== "undefined" ? window.location.search.replace(/^\?/, "") : "";
      if (next === current) return;
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, location, selectedFilters, mapCenter, pathname, router]);

  useEffect(() => {
    const parsed = parseCoordinatePair(location);
    if (parsed) {
      setMapCenter(parsed);
      return;
    }

    if (!location.trim() || /^near me$/i.test(location.trim())) return;

    let cancelled = false;
    fetch(`/api/geocode?q=${encodeURIComponent(location.trim())}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { lat?: number; lng?: number } | null) => {
        if (cancelled || !data?.lat || !data?.lng) return;
        setMapCenter({ lat: data.lat, lng: data.lng });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [location]);

  const filtered = useMemo(
    () =>
      getFilteredVenues(venues, {
        query,
        location,
        filters: selectedFilters,
        center: mapCenter ?? undefined,
      }),
    [venues, query, location, selectedFilters, mapCenter],
  );

  useEffect(() => {
    if (selectedSlug && !filtered.some((venue) => venue.slug === selectedSlug)) {
      setSelectedSlug(null);
    }
  }, [filtered, selectedSlug]);

  const toggleFilter = useCallback((key: string) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters([]);
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
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleChangeLocation = useCallback(() => {
    searchPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = searchPanelRef.current?.querySelector<HTMLInputElement>("input[name='search']");
    input?.focus();
  }, []);

  const handleOpenFullMap = useCallback(() => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const aiPrefill = [query, location].filter(Boolean).join(" — ") || undefined;
  const searchState = useMemo(
    () => ({ query, location, filters: selectedFilters, center: mapCenter ?? undefined }),
    [query, location, selectedFilters, mapCenter],
  );
  const hasSearchContext = hasVenueFinderSearchContext(searchState);

  return (
    <div className={`vf-page min-h-screen ${VF_PAGE_BG}`}>
        <SetChatContext page={{ kind: "venue-finder" }} />

        <VenueFinderHero />

        <div ref={searchPanelRef}>
          <VenueSearchPanel
            query={query}
            location={location}
            locating={locating}
            locationError={locationError}
            onQueryChange={setQuery}
            onLocationChange={setLocation}
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
            <section id="venue-results" aria-labelledby="venue-results-heading" aria-busy="false">
              <VenueResultsHeader
                resultCount={filtered.length}
                locating={locating}
                location={location}
                hasSearchContext={hasSearchContext}
                selectedFilters={selectedFilters}
                onRemoveFilter={toggleFilter}
                onChangeLocation={handleChangeLocation}
              />

              {filtered.length ? (
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                  {filtered.map((venue, index) => (
                    <VenueResultCard
                      key={venue.slug}
                      venue={venue}
                      index={index}
                      userCenter={mapCenter}
                      selected={selectedSlug === venue.slug}
                      onSelect={() => setSelectedSlug(venue.slug)}
                    />
                  ))}
                </ul>
              ) : (
                <VenueFinderEmptyState />
              )}
            </section>
          </div>

          <aside
            className="order-1 space-y-6 lg:sticky lg:top-28 lg:order-2 lg:self-start"
            aria-label="Map and visit planner"
          >
            <div ref={mapRef}>
              <VenueFinderMapPanel
                venues={filtered}
                locationLabel={location}
                selectedSlug={selectedSlug}
                mapCenter={mapCenter}
                onSelectVenue={setSelectedSlug}
                onUserLocation={handleUserLocation}
                onOpenFullMap={handleOpenFullMap}
              />
            </div>
            <VenueFinderAiCard prefill={aiPrefill} />
            <SavedVenuesCard venues={venues} />
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
