"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetChatContext } from "@/components/chat/set-context";
import type { Venue } from "@/lib/mock-data";
import { SAMPLE_VENUE_CARDS } from "@/lib/venue-finder-samples";
import { cn } from "@/lib/utils";
import {
  filterVenues,
  mapIncomingFilters,
  mapQueryToFilters,
  QUICK_FILTER_KEYS,
  QUICK_FILTERS,
} from "@/lib/venue-finder";
import { ResultsSkeleton } from "./results-skeleton";
import { SampleVenueCardItem } from "./sample-venue-card";
import { VenueCard } from "./venue-card";
import { VenueFinderEmptyState, VenueFinderShell } from "./venue-finder-shell";

type Props = {
  venues: Venue[];
};

function QuickFilterChips({
  activeCheck,
  onToggle,
  id,
  className,
}: {
  activeCheck: (label: (typeof QUICK_FILTERS)[number]) => boolean;
  onToggle: (label: (typeof QUICK_FILTERS)[number]) => void;
  id: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p id={id} className="text-sm font-semibold" style={{ color: "var(--vf-ink)" }}>
        Quick filters
      </p>
      <ul
        aria-labelledby={id}
        className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {QUICK_FILTERS.map((label) => {
          const active = activeCheck(label);
          return (
            <li key={label} className="shrink-0">
              <button
                type="button"
                className="vf-chip"
                data-active={active ? "true" : "false"}
                aria-pressed={active}
                onClick={() => onToggle(label)}
              >
                {active ? "✓ " : ""}
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function VenueFinderInteractive({ venues }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const requestedFilters = mapIncomingFilters(searchParams.get("filters") ?? "");
  const inferredFromQuery = mapQueryToFilters(initialQuery);
  const initialFilters = requestedFilters.length ? requestedFilters : inferredFromQuery.slice(0, 3);
  const initialVerifiedOnly = searchParams.get("verified") === "1";

  const [query, setQuery] = useState(initialQuery);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(initialFilters);
  const [verifiedOnly, setVerifiedOnly] = useState(initialVerifiedOnly);
  const [isSearching, setIsSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasActiveSearch = Boolean(
    query.trim() || selectedFilters.length || verifiedOnly,
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
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
  }, [query, selectedFilters, verifiedOnly, pathname, router, searchParams]);

  const filtered = useMemo(
    () =>
      filterVenues(venues, {
        query,
        selectedFilters,
        verifiedOnly,
        sortBy: "Relevance",
      }),
    [venues, query, selectedFilters, verifiedOnly],
  );

  const toggleQuickFilter = useCallback((label: (typeof QUICK_FILTERS)[number]) => {
    const key = QUICK_FILTER_KEYS[label];
    if (!key) return;
    if (label === "Verified by Access Stamp") {
      setVerifiedOnly((v) => !v);
      return;
    }
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
    );
  }, []);

  const isQuickFilterActive = useCallback(
    (label: (typeof QUICK_FILTERS)[number]) => {
      const key = QUICK_FILTER_KEYS[label];
      if (label === "Verified by Access Stamp") return verifiedOnly;
      return key ? selectedFilters.includes(key) : false;
    },
    [selectedFilters, verifiedOnly],
  );

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    window.setTimeout(() => setIsSearching(false), 500);
  }, []);

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setQuery((q) => (q ? q : "accessible toilet near me"));
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 },
    );
  }, []);

  const resultsCount = isSearching
    ? undefined
    : hasActiveSearch
      ? filtered.length
      : SAMPLE_VENUE_CARDS.length;

  const resultsSlot = isSearching ? (
    <ResultsSkeleton />
  ) : hasActiveSearch ? (
    filtered.length ? (
      <ul className="mt-6 grid gap-4">
        {filtered.map((venue) => (
          <VenueCard key={venue.slug} venue={venue} />
        ))}
      </ul>
    ) : (
      <VenueFinderEmptyState />
    )
  ) : (
    <div className="mt-6">
      <p className="mb-4 text-sm" style={{ color: "var(--vf-muted)" }}>
        Example listings — search above to find venues across the UK.
      </p>
      <ul className="grid gap-4">
        {SAMPLE_VENUE_CARDS.map((venue) => (
          <SampleVenueCardItem key={venue.id} venue={venue} />
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <SetChatContext page={{ kind: "venue-finder" }} />
      <VenueFinderShell
        resultsCount={resultsCount}
        showDefaultSamples={false}
        searchSlot={
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="vf-search" className="text-sm font-semibold" style={{ color: "var(--vf-ink)" }}>
                Search by place, town, postcode or venue name
              </label>
              <input
                id="vf-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="vf-input mt-2 h-12 px-4"
                placeholder="Try 'café in Uckfield' or 'accessible toilet near me'"
                autoComplete="postal-code"
                inputMode="search"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="vf-btn-primary w-full sm:w-auto">
                Search
              </button>
              <button
                type="button"
                onClick={handleUseLocation}
                disabled={locating}
                className={cn("vf-btn-secondary w-full sm:w-auto", locating && "opacity-60")}
              >
                {locating ? "Finding location…" : "Use my location"}
              </button>
            </div>
            <QuickFilterChips
              id="quick-filters-search"
              activeCheck={isQuickFilterActive}
              onToggle={toggleQuickFilter}
            />
            <p className="text-sm" style={{ color: "var(--vf-muted)" }}>
              Know a place we should list?{" "}
              <Link href="/submit-venue" className="font-semibold hover:underline" style={{ color: "var(--vf-blue)" }}>
                Suggest a venue
              </Link>
            </p>
          </form>
        }
        resultsSlot={resultsSlot}
      />
    </>
  );
}

export function VenueFinderClient({ venues }: Props) {
  return <VenueFinderInteractive venues={venues} />;
}
