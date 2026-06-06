"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchAccessStamp } from "@/data/searchIndex";
import { filterChipClass } from "@/lib/venue-finder-cro";

type SearchCategory = "all" | "venues" | "guides" | "rights" | "travel" | "care" | "equipment";

const CATEGORY_TABS: { id: SearchCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "venues", label: "Venues" },
  { id: "guides", label: "Guides" },
  { id: "rights", label: "Rights" },
  { id: "travel", label: "Travel" },
  { id: "care", label: "Care" },
  { id: "equipment", label: "Equipment" },
];

const FILTER_CHIPS = [
  { label: "Step-free access", key: "Step-free entrance", href: null },
  { label: "Accessible toilet", key: "Accessible toilet", href: null },
  { label: "Travel planning", key: null, href: "/advice/travel" },
  { label: "Rights & support", key: null, href: "/advice/rights" },
  { label: "Care support", key: null, href: "/advice/care" },
  { label: "Equipment", key: null, href: "/advice/equipment" },
] as const;

const CATEGORY_ROUTES: Record<Exclude<SearchCategory, "all" | "venues">, string> = {
  guides: "/advice",
  rights: "/advice/rights",
  travel: "/advice/travel",
  care: "/advice/care",
  equipment: "/advice/equipment",
};

const CATEGORY_SEARCH_TYPES: Record<Exclude<SearchCategory, "all" | "venues">, string> = {
  guides: "Guide",
  rights: "Rights",
  travel: "Transport",
  care: "Care",
  equipment: "Equipment",
};

const INPUT_CLASS =
  "h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-950 placeholder:text-slate-500 transition-all duration-200 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100";

function tabClass(active: boolean) {
  const base =
    "inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200";
  return active
    ? `${base} bg-blue-700 text-white shadow-sm`
    : `${base} border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50`;
}

export function VenueFinderBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<SearchCategory>("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const isVenueSearch = category === "venues";

  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) => (prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]));
  };

  const goToVenueFinder = (extra?: { filters?: string[] }) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    const filters = extra?.filters ?? selectedFilters;
    if (filters.length) params.set("filters", filters.join(","));
    router.push(params.toString() ? `/venue-finder?${params.toString()}` : "/venue-finder");
  };

  const handlePlatformSearch = () => {
    const trimmed = query.trim();

    if (category === "venues") {
      goToVenueFinder();
      return;
    }

    if (category !== "all") {
      const hub = CATEGORY_ROUTES[category];
      if (trimmed) {
        const results = searchAccessStamp(trimmed, 8);
        const match = results.find((item) => item.category === CATEGORY_SEARCH_TYPES[category]);
        if (match) {
          router.push(match.url);
          return;
        }
        router.push(`${hub}?q=${encodeURIComponent(trimmed)}`);
        return;
      }
      router.push(hub);
      return;
    }

    if (trimmed) {
      const results = searchAccessStamp(trimmed, 5);
      const topHit = results.find((item) => !item.comingSoon);
      if (topHit) {
        router.push(topHit.url);
        return;
      }
    }

    router.push(trimmed ? `/advice?q=${encodeURIComponent(trimmed)}` : "/advice");
  };

  const handleMoreFilters = () => {
    if (isVenueSearch || category === "all") {
      goToVenueFinder();
      return;
    }
    router.push(CATEGORY_ROUTES[category as Exclude<SearchCategory, "all" | "venues">] ?? "/advice");
  };

  return (
    <div
      id="platform-search"
      className="relative z-20 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/15 sm:p-5 lg:p-6"
    >
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {CATEGORY_TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setCategory(id)}
            aria-pressed={category === id}
            className={tabClass(category === id)}
          >
            {label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePlatformSearch();
        }}
      >
        <div className={`grid gap-3 ${isVenueSearch ? "md:grid-cols-[minmax(0,1fr)_260px_auto]" : "md:grid-cols-[minmax(0,1fr)_auto]"}`}>
          <div>
            <label htmlFor="platform-search-query" className="mb-2 block text-sm font-semibold text-slate-900">
              Search Access Stamp
            </label>
            <input
              id="platform-search-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search venues, guides, rights, travel support or access needs"
              className={INPUT_CLASS}
              autoComplete="off"
            />
          </div>

          {isVenueSearch ? (
            <div>
              <label htmlFor="platform-search-location" className="mb-2 block text-sm font-semibold text-slate-900">
                Location
              </label>
              <input
                id="platform-search-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city, town or postcode"
                className={INPUT_CLASS}
                autoComplete="postal-code"
              />
            </div>
          ) : null}

          <div className="flex items-end">
            <button
              type="submit"
              className="h-14 min-h-[44px] w-full rounded-2xl bg-blue-700 px-6 text-base font-semibold text-white transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 md:w-auto"
            >
              {isVenueSearch ? "Find access-checked venues" : "Search"}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
        {FILTER_CHIPS.map(({ label, key, href }) => {
          if (href) {
            return (
              <button
                key={label}
                type="button"
                onClick={() => router.push(href)}
                className={filterChipClass(false)}
              >
                {label}
              </button>
            );
          }

          const active = key ? selectedFilters.includes(key) : false;
          return (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (!key) return;
                if (isVenueSearch || category === "all") {
                  toggleFilter(key);
                  return;
                }
                const nextFilters = selectedFilters.includes(key)
                  ? selectedFilters.filter((f) => f !== key)
                  : [...selectedFilters, key];
                goToVenueFinder({ filters: nextFilters });
              }}
              aria-pressed={active}
              className={filterChipClass(active)}
            >
              {label}
            </button>
          );
        })}

        <button type="button" onClick={handleMoreFilters} className={filterChipClass(false)}>
          More filters
        </button>
      </div>
    </div>
  );
}
