"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchAccessStamp } from "@/data/searchIndex";
import {
  HOME_BTN_PRIMARY,
  HOME_GLASS_PANEL,
  HOME_INPUT,
  homeChipClass,
  homeTabClass,
} from "@/components/home/home-theme";

type SearchMode = "venue" | "advice";

const SEARCH_MODES: { id: SearchMode; label: string }[] = [
  { id: "venue", label: "Find a venue" },
  { id: "advice", label: "Get advice" },
];

const VISIBLE_CHIPS = [
  { label: "Step-free access", key: "Step-free entrance", href: null },
  { label: "Accessible toilet", key: "Accessible toilet", href: null },
  { label: "Blue Badge parking", key: "Blue Badge parking", href: null },
  { label: "Travel support", key: null, href: "/advice/travel" },
  { label: "Rights & support", key: null, href: "/advice/rights" },
  { label: "Equipment", key: null, href: "/advice/equipment" },
] as const;

type AccessStampSearchBoxProps = {
  integrated?: boolean;
};

export function AccessStampSearchBox({ integrated = false }: AccessStampSearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState<SearchMode>("venue");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  const isVenueSearch = mode === "venue";

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

    if (isVenueSearch) {
      goToVenueFinder();
      return;
    }

    if (trimmed) {
      const results = searchAccessStamp(trimmed, 5);
      const topHit = results.find((item) => !item.comingSoon);
      if (topHit) {
        router.push(topHit.url);
        return;
      }
      router.push(`/advice?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    router.push("/advice");
  };

  const handleMoreFilters = () => {
    if (isVenueSearch) {
      goToVenueFinder();
      return;
    }
    router.push("/advice");
  };

  const panelClass = integrated
    ? "relative z-20 scroll-mt-28 rounded-3xl border border-[#22D3EE]/20 bg-[#0D3568]/70 p-5 shadow-xl shadow-[#030B1A]/25 backdrop-blur-xl lg:p-6"
    : `relative z-20 scroll-mt-28 ${HOME_GLASS_PANEL} p-5 lg:p-6`;

  return (
    <div id="platform-search" className={panelClass}>
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#E0F7FF] sm:text-lg">What do you need help with?</h2>
        <p className="mt-1 text-base leading-relaxed text-[#BAE6FD]">
          {isVenueSearch
            ? "Search access-checked venues by place, town, or access need."
            : "Search practical UK guidance on rights, travel, care, work, and equipment."}
        </p>
      </div>

      <div className="mb-4 flex gap-2" role="tablist" aria-label="Search mode">
        {SEARCH_MODES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`search-tab-${id}`}
            aria-selected={mode === id}
            aria-controls={`search-panel-${id}`}
            onClick={() => setMode(id)}
            className={homeTabClass(mode === id)}
          >
            {label}
          </button>
        ))}
      </div>

      <form
        role="tabpanel"
        id={`search-panel-${mode}`}
        aria-labelledby={`search-tab-${mode}`}
        onSubmit={(e) => {
          e.preventDefault();
          handlePlatformSearch();
        }}
      >
        <div
          className={`grid gap-3 ${isVenueSearch ? "md:grid-cols-[minmax(0,1fr)_260px_auto]" : "md:grid-cols-[minmax(0,1fr)_auto]"}`}
        >
          <div>
            <label htmlFor="platform-search-query" className="mb-2 block text-base font-medium text-[#BAE6FD]">
              Search
            </label>
            <input
              id="platform-search-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isVenueSearch
                  ? "Search by venue, town, or access need"
                  : "Search PIP, travel, care, work, equipment…"
              }
              className={HOME_INPUT}
              autoComplete="off"
            />
          </div>

          {isVenueSearch ? (
            <div>
              <label htmlFor="platform-search-location" className="mb-2 block text-base font-medium text-[#BAE6FD]">
                Location
              </label>
              <input
                id="platform-search-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city, town or postcode"
                className={HOME_INPUT}
                autoComplete="postal-code"
              />
            </div>
          ) : null}

          <div className="flex items-end">
            <button type="submit" className={`${HOME_BTN_PRIMARY} w-full md:w-auto`}>
              {isVenueSearch ? "Search accessible places" : "Get advice"}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {VISIBLE_CHIPS.map(({ label, key, href }) => {
          if (href) {
            return (
              <button key={label} type="button" onClick={() => router.push(href)} className={homeChipClass(false)}>
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
                if (isVenueSearch) {
                  toggleFilter(key);
                  return;
                }
                goToVenueFinder({
                  filters: selectedFilters.includes(key)
                    ? selectedFilters.filter((f) => f !== key)
                    : [...selectedFilters, key],
                });
              }}
              aria-pressed={active}
              className={homeChipClass(active)}
            >
              {label}
            </button>
          );
        })}

        {moreFiltersOpen ? (
          <>
            <button type="button" onClick={() => router.push("/advice/care")} className={homeChipClass(false)}>
              Care support
            </button>
            <button type="button" onClick={() => router.push("/advice/workplace")} className={homeChipClass(false)}>
              Workplace
            </button>
            <button type="button" onClick={() => router.push("/advice/education")} className={homeChipClass(false)}>
              Education
            </button>
          </>
        ) : null}

        <button
          type="button"
          onClick={() => {
            if (moreFiltersOpen) {
              handleMoreFilters();
              return;
            }
            setMoreFiltersOpen(true);
          }}
          className={homeChipClass(false)}
          aria-expanded={moreFiltersOpen}
        >
          {moreFiltersOpen ? "Search with filters" : "More filters"}
        </button>
      </div>
    </div>
  );
}

/** @deprecated Use AccessStampSearchBox */
export const VenueFinderBox = AccessStampSearchBox;
