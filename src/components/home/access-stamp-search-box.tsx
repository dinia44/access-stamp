"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { HOME_INPUT, homeChipClass } from "@/components/home/home-theme";

function ChipIcon({ label }: { label: string }) {
  const cls = "h-4 w-4 shrink-0 text-[#F04A16]";
  if (label === "Step-free access") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="8" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M10 18h5M12 6v6m-2 0h4" />
      </svg>
    );
  }
  if (label === "Accessible toilet") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M8 3v3M16 3v3M5 8h14v12H5z" />
      </svg>
    );
  }
  if (label === "Parking") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8h3a2 2 0 0 1 0 4h-3V8Z" />
      </svg>
    );
  }
  if (label === "Seating") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 10v4M20 10v4M7 8v8M12 6v12M17 8v8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3a9 9 0 0 0-9 9v7h18v-7a9 9 0 0 0-9-9z" />
      <path d="M8 14h8" />
    </svg>
  );
}

const VENUE_CHIPS = [
  { label: "Step-free access", key: "Step-free entrance" },
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Parking", key: "Nearby Blue Badge parking" },
  { label: "Seating", key: "Turning space (150cm+)" },
  { label: "Hearing support", key: "Hearing loop" },
] as const;

type AccessStampSearchBoxProps = {
  integrated?: boolean;
};

export function AccessStampSearchBox({ integrated = false }: AccessStampSearchBoxProps) {
  const router = useRouter();
  const filtersId = useId();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectedCount = selectedFilters.length;
  const venueSubmitLabel =
    selectedCount === 0 ? "Search venues" : `Search with ${selectedCount} filter${selectedCount > 1 ? "s" : ""}`;
  const filterButtonLabel =
    selectedCount === 0 ? "Access filters" : `Access filters, ${selectedCount} selected`;

  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) => {
      const next = prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key];
      track("filter_selected", { source: "homepage", has_filters: next.length > 0 });
      return next;
    });
  };

  const goToVenueFinder = () => {
    track("search_submitted", {
      source: "homepage",
      has_query: Boolean(query.trim() || location.trim()),
      has_filters: selectedCount > 0,
    });
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    if (selectedFilters.length) params.set("filters", selectedFilters.join(","));
    router.push(params.toString() ? `/venue-finder?${params.toString()}` : "/venue-finder");
  };

  const panelClass = integrated
    ? "relative z-20 scroll-mt-28 w-full rounded-3xl border border-[#F1D8C7]/80 bg-white/95 p-6 shadow-xl shadow-[#F04A16]/8 backdrop-blur-xl sm:p-7 lg:p-8"
    : "relative z-20 scroll-mt-28 w-full rounded-3xl border border-[#F1D8C7]/80 bg-white/95 p-6 shadow-xl shadow-[#F04A16]/8 backdrop-blur-xl lg:p-8";

  const filterChips = (
    <div className="flex flex-wrap gap-2">
      {VENUE_CHIPS.map(({ label, key }) => {
        const active = selectedFilters.includes(key);
        return (
          <button
            key={label}
            type="button"
            onClick={() => toggleFilter(key)}
            aria-pressed={active}
            className={homeChipClass(active)}
          >
            <ChipIcon label={label} />
            {label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div id="platform-search" className={panelClass}>
      <p id="platform-search-description" className="sr-only">
        Search access-checked venues by place, town, or access need.
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          goToVenueFinder();
        }}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label htmlFor="platform-search-query" className="mb-2 block text-base font-medium text-[#2A3836]">
              Venue name or category
            </label>
            <input
              id="platform-search-query"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. Harbour Kitchen or café"
              className={HOME_INPUT}
              autoComplete="off"
              aria-describedby="platform-search-description"
            />
          </div>
          <div>
            <label htmlFor="platform-search-location" className="mb-2 block text-base font-medium text-[#2A3836]">
              Town or postcode
            </label>
            <input
              id="platform-search-location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Liverpool or L1"
              className={HOME_INPUT}
              autoComplete="postal-code"
              aria-describedby="platform-search-description"
            />
          </div>
        </div>

        <Button type="submit" className="mt-4 w-full">
          {venueSubmitLabel}
        </Button>
      </form>

      <div className="mt-5 md:hidden">
        <button
          type="button"
          className="inline-flex min-h-[44px] w-full items-center justify-between rounded-2xl border border-[#F1D8C7] bg-white px-4 text-sm font-semibold text-[#13201F]"
          aria-expanded={filtersOpen}
          aria-controls={filtersId}
          onClick={() => {
            setFiltersOpen((open) => {
              const next = !open;
              if (next) track("access_filters_opened", { source: "homepage" });
              return next;
            });
          }}
        >
          {filterButtonLabel}
          <span aria-hidden>{filtersOpen ? "−" : "+"}</span>
        </button>
        {filtersOpen ? (
          <div id={filtersId} className="mt-3">
            {filterChips}
          </div>
        ) : selectedCount > 0 ? (
          <p className="mt-2 text-sm text-[#5E6A66]">{selectedCount} access filter{selectedCount > 1 ? "s" : ""} selected.</p>
        ) : null}
      </div>

      <div className="mt-5 hidden md:block">{filterChips}</div>
    </div>
  );
}

/** @deprecated Use AccessStampSearchBox */
export const VenueFinderBox = AccessStampSearchBox;
