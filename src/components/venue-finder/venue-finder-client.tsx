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
import { VF_BTN_SECONDARY, VF_PAGE_BG } from "@/lib/venue-finder-cro";
import { VenueFinderAiCard } from "./venue-finder-ai-card";
import { VenueFinderFilters } from "./venue-finder-filters";
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
      className="mt-6 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm"
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
          <h2 id="empty-state-heading" className="text-xl font-semibold text-[#17201C]">
            No matching venues found
          </h2>
          <p className="mt-2 text-base leading-7 text-[#4F5A53]">
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

function VenueFinderSupportSection() {
  return (
    <section
      aria-labelledby="vf-support-heading"
      className="border-t border-black/10 bg-white/60 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <h2 id="vf-support-heading" className="text-2xl font-semibold tracking-[-0.03em] text-[#17201C]">
          Need help planning your visit?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#4F5A53]">
          Open a venue access report for practical detail, or use Access Stamp AI to describe your access
          needs in plain language.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/advice" className={VF_BTN_SECONDARY}>
            Browse practical guides
          </Link>
          <Link href="/submit-venue" className={VF_BTN_SECONDARY}>
            Suggest a venue
          </Link>
        </div>
      </div>
    </section>
  );
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
  const [locationError, setLocationError] = useState<string | null>(null);
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

  const aiPrefill = [query, location].filter(Boolean).join(" — ") || undefined;
  const searchState = useMemo(
    () => ({ query, location, filters: selectedFilters, center: mapCenter ?? undefined }),
    [query, location, selectedFilters, mapCenter],
  );
  const hasSearchContext = hasVenueFinderSearchContext(searchState);

  return (
    <main className={`vf-page min-h-screen ${VF_PAGE_BG} text-[#17201C]`}>
      <SetChatContext page={{ kind: "venue-finder" }} />

      <VenueFinderHero />

      <VenueSearchPanel
        query={query}
        location={location}
        selectedFilters={selectedFilters}
        locating={locating}
        locationError={locationError}
        onQueryChange={setQuery}
        onLocationChange={(value) => {
          setLocation(value);
          if (locationError) setLocationError(null);
        }}
        onToggleFilter={toggleFilter}
        onSearch={handleSearch}
        onUseLocation={handleUseLocation}
        onOpenMobileFilters={() => setMobileFiltersOpen(true)}
      />

      <VenueTrustStrip />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 pb-28 sm:px-6 lg:grid-cols-[280px_1fr] lg:pb-12 xl:grid-cols-[280px_1fr_380px] lg:px-8">
        <aside className="hidden lg:block" aria-label="Access filters">
          <div className="sticky top-24 rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-sm backdrop-blur">
            <VenueFinderFilters
              selectedFilters={selectedFilters}
              onToggleFilter={toggleFilter}
              onClearFilters={clearFilters}
              idPrefix="vf-sidebar"
            />
          </div>
        </aside>

        <div className="space-y-5">
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

            <VenueResultsHeader
              resultCount={filtered.length}
              locating={locating}
              location={location}
              hasSearchContext={hasSearchContext}
              selectedFilters={selectedFilters}
              onRemoveFilter={toggleFilter}
            />

            {filtered.length ? (
              <ul className="mt-6 grid grid-cols-1 gap-6">
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

            <div className="mt-8 xl:hidden">
              <VenueFinderAiCard prefill={aiPrefill} />
            </div>
          </section>
        </div>

        <aside className="hidden xl:block" aria-label="Map and visit planner">
          <div className="sticky top-24 space-y-5">
            <VenueFinderMapPanel
              venues={filtered}
              locationLabel={location}
              selectedSlug={selectedSlug}
              mapCenter={mapCenter}
              onSelectVenue={setSelectedSlug}
              onUserLocation={handleUserLocation}
              mapHeightClass="h-[360px]"
            />
            <VenueFinderAiCard prefill={aiPrefill} />
          </div>
        </aside>
      </section>

      <VenueFinderSupportSection />

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
