"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetChatContext } from "@/components/chat/set-context";
import type { Venue } from "@/lib/mock-data";
import {
  buildVenueFinderQueryString,
  getFilteredVenues,
  hasVenueFinderSearchContext,
  parseVenueFinderSearchParams,
  type VenueFinderSearchState,
} from "@/lib/venue-finder-params";
import { VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";
import { VenueFinderActiveFiltersSummary } from "./venue-finder-active-filters";
import { VenueFinderAiCard } from "./venue-finder-ai-card";
import { VenueFinderFloatingBox } from "./venue-finder-floating-box";
import { VenueFinderHero } from "./venue-finder-hero";
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
      className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
    >
      <h2 id="empty-state-heading" className="text-lg font-semibold text-slate-900">
        No matching venues found
      </h2>
      <p className="mt-2 text-base leading-7 text-slate-600">
        Try removing a filter, searching a nearby town, or suggest a venue for us to check.
      </p>
      <Link href="/submit-venue" className={`${VF_BTN_SECONDARY} mt-5 inline-flex`}>
        Suggest a venue
      </Link>
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
  const [locating, setLocating] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileMapOpen, setMobileMapOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncFromHistory = useCallback((state: VenueFinderSearchState) => {
    setQuery(state.query);
    setLocation(state.location);
    setSelectedFilters(state.filters);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const next = buildVenueFinderQueryString({ query, location, filters: selectedFilters });
      const current =
        typeof window !== "undefined" ? window.location.search.replace(/^\?/, "") : "";
      if (next === current) return;
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, location, selectedFilters, pathname, router]);

  const filtered = useMemo(
    () => getFilteredVenues(venues, { query, location, filters: selectedFilters }),
    [venues, query, location, selectedFilters],
  );

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
      () => {
        setLocation("Near me");
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 },
    );
  }, []);

  const handleSearch = useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const aiPrefill = [query, location].filter(Boolean).join(" — ") || undefined;
  const searchState = useMemo(
    () => ({ query, location, filters: selectedFilters }),
    [query, location, selectedFilters],
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

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-28 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8 lg:pb-8">
          <section
            ref={resultsRef}
            id="venue-results"
            aria-labelledby="venue-results-heading"
            aria-busy="false"
          >
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
              <ul className="mt-6 flex flex-col gap-4">
                {filtered.map((venue) => (
                  <VenueResultCard key={venue.slug} venue={venue} />
                ))}
              </ul>
            ) : (
              <VenueFinderEmptyState />
            )}

            <div className="mt-8 lg:hidden">
              <VenueFinderAiCard prefill={aiPrefill} />
            </div>
          </section>

          <div className="space-y-4">
            <VenueFinderSidebar
              venues={filtered}
              location={location}
              mapOpen={mobileMapOpen}
              onToggleMap={() => setMobileMapOpen((open) => !open)}
            />
            <div className="hidden lg:block">
              <VenueFinderAiCard prefill={aiPrefill} />
            </div>
          </div>
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
