"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetChatContext } from "@/components/chat/set-context";
import { DEFAULT_VENUE_FILTERS, HeroSearchCard } from "@/components/home/hero-search";
import type { Venue } from "@/lib/mock-data";
import { SAMPLE_VENUE_CARDS } from "@/lib/venue-finder-samples";
import {
  filterVenues,
  mapIncomingFilters,
  mapQueryToFilters,
} from "@/lib/venue-finder";
import { SampleVenueCardItem } from "./sample-venue-card";
import { VenueCard } from "./venue-card";
import { VenueFinderEmptyState, VenueFinderShell } from "./venue-finder-shell";

type Props = {
  venues: Venue[];
};

function VenueFinderInteractive({ venues }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const initialLocation = searchParams.get("location") ?? "";
  const requestedFilters = mapIncomingFilters(searchParams.get("filters") ?? searchParams.get("features") ?? "");
  const inferredFromQuery = mapQueryToFilters(initialQuery);
  const hasUrlParams = Boolean(
    initialQuery.trim() ||
      initialLocation.trim() ||
      requestedFilters.length ||
      searchParams.get("verified") === "1",
  );
  const initialFilters = requestedFilters.length
    ? requestedFilters
    : inferredFromQuery.length
      ? inferredFromQuery.slice(0, 3)
      : [...DEFAULT_VENUE_FILTERS];
  const initialVerifiedOnly = searchParams.get("verified") === "1";

  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(initialFilters);
  const [verifiedOnly, setVerifiedOnly] = useState(initialVerifiedOnly);
  const [locating, setLocating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasActiveSearch = Boolean(query.trim() || location.trim() || verifiedOnly);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (location.trim()) params.set("location", location.trim());
      if (selectedFilters.length) params.set("filters", selectedFilters.join(","));
      if (verifiedOnly) params.set("verified", "1");

      const next = params.toString();
      const current = searchParams.toString();
      if (next === current) return;
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, location, selectedFilters, verifiedOnly, pathname, router, searchParams]);

  const filtered = useMemo(
    () =>
      filterVenues(venues, {
        query: [query, location].filter(Boolean).join(" "),
        selectedFilters,
        verifiedOnly,
        sortBy: "Relevance",
      }),
    [venues, query, location, selectedFilters, verifiedOnly],
  );

  const toggleFilter = useCallback((key: string) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters([]);
    setVerifiedOnly(false);
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

  const resultsCount = hasActiveSearch ? filtered.length : SAMPLE_VENUE_CARDS.length;

  const resultsSlot = hasActiveSearch ? (
    filtered.length ? (
      <ul className="mt-6 grid gap-5">
        {filtered.map((venue) => (
          <VenueCard key={venue.slug} venue={venue} />
        ))}
      </ul>
    ) : (
      <VenueFinderEmptyState />
    )
  ) : (
    <ul className="vf-sample-grid">
      {SAMPLE_VENUE_CARDS.map((venue) => (
        <SampleVenueCardItem key={venue.id} venue={venue} />
      ))}
    </ul>
  );

  return (
    <>
      <SetChatContext page={{ kind: "venue-finder" }} />
      <VenueFinderShell
        resultsCount={resultsCount}
        showDefaultSamples={false}
        compactResults={hasActiveSearch}
        searchSlot={
          <HeroSearchCard
            embedded
            query={query}
            onQueryChange={setQuery}
            location={location}
            onLocationChange={setLocation}
            activeFilters={selectedFilters}
            onToggleFilter={toggleFilter}
            onClearFilters={clearFilters}
            onUseLocation={handleUseLocation}
            locating={locating}
          />
        }
        resultsSlot={resultsSlot}
      />
    </>
  );
}

export function VenueFinderClient({ venues }: Props) {
  return <VenueFinderInteractive venues={venues} />;
}
