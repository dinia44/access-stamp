"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";
import { VENUE_GRID_CLASS } from "@/lib/venue-grid-layout";
import { VenueFinderActiveFiltersSummary } from "./venue-finder-active-filters";
import { VenueFinderAiCard } from "./venue-finder-ai-card";
import { VenueFinderFloatingBox } from "./venue-finder-floating-box";
import { VenueFinderHero } from "./venue-finder-hero";
import { VenueFinderMapPanel } from "./venue-finder-map-panel";
import { VenueFinderMobileBar } from "./venue-finder-mobile-bar";
import { VenueFinderSidebar } from "./venue-finder-sidebar";
import { VenueResultCard } from "./venue-result-card";

type Props = {
  venues: Venue[];
  initial: VenueFinderSearchState;
};

function VenueFinderEmptyState() {
  return (
    <section
      aria-labelledby="empty-state-heading"
      className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
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
          <h2 id="empty-state-heading" className="text-lg font-semibold text-slate-900">
            No matching venues found
          </h2>
          <p className="mt-2 text-base leading-7 text-slate-600">
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
  const searchParams = useSearchParams();

  useEffect(() => {
    onSync(parseVenueFinderSearchParams(searchParams));
  }, [searchParams, onSync]);

  return null;
}

function VenueFinderInteractive({ venues, initial }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const resultsRef = useRef<HTMLElement>(null);

  const [query, setQuery] = useState(initial.query);
  const [location, setLocation] = useState(initial.location);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(initial.filters);
  const [mapCenter, setMapCenter] = useState<VenueCoordinates | null>(initial.center ?? null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
        setMapCenter(coords);
        setLocating(false);
      },
      () => setLocating(false),
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

  const aiPrefill = [query, location].filter(Boolean).join(" — ") || undefined;
  const searchState = useMemo(
    () => ({ query, location, filters: selectedFilters, center: mapCenter ?? undefined }),
    [query, location, selectedFilters, mapCenter],
  );
  const hasSearchContext = hasVenueFinderSearchContext(searchState);
  const resultsHeading = hasSearchContext ? "Search results" : "Venues to explore";

  return (
    <main className="vf-page min-h-screen">
      <SetChatContext page={{ kind: "venue-finder" }} />

      <VenueFinderHero />

      <div className="bg-slate-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <VenueFinderFloatingBox
            query={query}
            location={location}
            selectedFilters={selectedFilters}
            locating={locating}
            onQueryChange={setQuery}
            onLocationChange={setLocation}
            onToggleFilter={toggleFilter}
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mb-8 hidden gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_420px]">
            <VenueFinderMapPanel
              venues={filtered}
              locationLabel={location}
              selectedSlug={selectedSlug}
              mapCenter={mapCenter}
              onSelectVenue={setSelectedSlug}
              onUserLocation={handleUserLocation}
              mapHeightClass="h-[360px]"
            />
            <div className="space-y-4">
              <VenueFinderSidebar venues={filtered} location={location} />
              <VenueFinderAiCard prefill={aiPrefill} />
            </div>
          </div>

          <section
            ref={resultsRef}
            id="venue-results"
            aria-labelledby="venue-results-heading"
            aria-busy="false"
          >
            <div className="mb-6 lg:hidden">
              <VenueFinderMapPanel
                venues={filtered}
                locationLabel={location}
                selectedSlug={selectedSlug}
                mapCenter={mapCenter}
                onSelectVenue={setSelectedSlug}
                onUserLocation={handleUserLocation}
              />
            </div>

            <div>
              <h2
                id="venue-results-heading"
                className="text-2xl font-bold tracking-[-0.025em] leading-[1.15] text-slate-900"
              >
                {resultsHeading}
              </h2>
              <p className="mt-1 text-base leading-7 text-slate-600" aria-live="polite" aria-atomic="true">
                {filtered.length} venue{filtered.length === 1 ? "" : "s"}
                {location.trim() ? ` · ${location.trim()}` : ""}
              </p>
              <VenueFinderActiveFiltersSummary
                selectedFilters={selectedFilters}
                onRemove={toggleFilter}
              />
            </div>

            {filtered.length ? (
              <ul className={`mt-6 ${VENUE_GRID_CLASS}`}>
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

            <div className="mt-8 lg:hidden">
              <VenueFinderAiCard prefill={aiPrefill} />
            </div>
          </section>
        </div>
      </div>

      <VenueFinderMobileBar
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
        filterCount={selectedFilters.length}
        selectedFilters={selectedFilters}
        onToggleFilter={toggleFilter}
        onClearFilters={clearFilters}
        onSearch={handleSearch}
      />

      <Suspense fallback={null}>
        <VenueFinderHistorySync onSync={syncFromHistory} />
      </Suspense>
    </main>
  );
}

export function VenueFinderClient({ venues, initial }: Props) {
  return <VenueFinderInteractive venues={venues} initial={initial} />;
}
