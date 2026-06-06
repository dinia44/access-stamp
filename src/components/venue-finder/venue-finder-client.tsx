"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetChatContext } from "@/components/chat/set-context";
import type { Venue } from "@/lib/mock-data";
import { filterVenues, mapIncomingFilters, mapQueryToFilters } from "@/lib/venue-finder";
import { sortVenuesFeaturedFirst } from "@/lib/venue-finder-cro";
import { VenueFinderAiCard } from "./venue-finder-ai-card";
import { VenueFinderFilters } from "./venue-finder-filters";
import { VenueFinderMobileBar } from "./venue-finder-mobile-bar";
import { VenueFinderSearchBar } from "./venue-finder-search-bar";
import { VenueResultCard } from "./venue-result-card";
import { VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";

type Props = {
  venues: Venue[];
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

function VenueFinderInteractive({ venues }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLElement>(null);

  const initialQuery = searchParams.get("q") ?? "";
  const initialLocation = searchParams.get("location") ?? "";
  const requestedFilters = mapIncomingFilters(searchParams.get("filters") ?? searchParams.get("features") ?? "");
  const inferredFromQuery = mapQueryToFilters(initialQuery);
  const initialFiltersBase = requestedFilters.length
    ? requestedFilters
    : inferredFromQuery.length
      ? inferredFromQuery.slice(0, 3)
      : [];
  const initialFilters =
    searchParams.get("verified") === "1" && !initialFiltersBase.includes("__verified_checked")
      ? [...initialFiltersBase, "__verified_checked"]
      : initialFiltersBase;

  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(initialFilters);
  const [locating, setLocating] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (location.trim()) params.set("location", location.trim());
      if (selectedFilters.length) params.set("filters", selectedFilters.join(","));

      const next = params.toString();
      const current = searchParams.toString();
      if (next === current) return;
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, location, selectedFilters, pathname, router, searchParams]);

  const filtered = useMemo(() => {
    const items = filterVenues(venues, {
      query: [query, location].filter(Boolean).join(" "),
      selectedFilters,
      verifiedOnly: false,
      sortBy: "Relevance",
    });
    return sortVenuesFeaturedFirst(items);
  }, [venues, query, location, selectedFilters]);

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
  const hasSearchContext = Boolean(query.trim() || location.trim() || selectedFilters.length);
  const resultsHeading = hasSearchContext ? "Search results" : "Venues to explore";

  return (
    <main className="vf-page min-h-screen bg-slate-50 pb-28 lg:pb-0">
      <SetChatContext page={{ kind: "venue-finder" }} />

      <section aria-labelledby="venue-finder-heading" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Venue finder</p>
          <h1
            id="venue-finder-heading"
            className="mt-2 text-4xl font-bold tracking-[-0.035em] leading-[1.05] text-slate-900 lg:text-5xl"
          >
            Find accessible venues
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Search UK venues with practical access detail. Open a full access report before you travel.
          </p>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-y border-slate-200 bg-white/95 backdrop-blur">
        <VenueFinderSearchBar
          query={query}
          location={location}
          onQueryChange={setQuery}
          onLocationChange={setLocation}
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
          locating={locating}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <VenueFinderFilters
              selectedFilters={selectedFilters}
              onToggleFilter={toggleFilter}
              onClearFilters={clearFilters}
            />
            <VenueFinderAiCard prefill={aiPrefill} />
          </div>
        </aside>

        <section ref={resultsRef} id="venue-results" aria-labelledby="venue-results-heading">
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
          </div>

          {filtered.length ? (
            <ul className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
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
    </main>
  );
}

export function VenueFinderClient({ venues }: Props) {
  return <VenueFinderInteractive venues={venues} />;
}

export function VenueFinderStaticPage() {
  return (
    <main className="vf-page min-h-screen bg-slate-50 pb-28 lg:pb-0">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-10 w-full max-w-lg animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-lg bg-slate-100" />
        </div>
      </section>
      <div className="border-y border-slate-200 bg-white/95">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="h-14 animate-pulse rounded-2xl bg-slate-100 lg:col-span-2" />
            <div className="h-14 animate-pulse rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          ))}
        </div>
      </div>
    </main>
  );
}
