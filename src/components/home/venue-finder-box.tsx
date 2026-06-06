"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const FILTER_CHIPS = [
  { label: "Step-free entrance", key: "Step-free entrance" },
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Hearing loop", key: "__hearing_loop" },
  { label: "Lift access", key: "Lift access" },
  { label: "Blue Badge parking", key: "Nearby Blue Badge parking" },
] as const;

const INPUT_CLASS =
  "h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-950 placeholder:text-slate-500 transition-all duration-200 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100";

function chipClass(active: boolean) {
  const base =
    "inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200";
  return active
    ? `${base} border-blue-700 bg-blue-50 text-blue-700 hover:bg-blue-100`
    : `${base} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;
}

export function VenueFinderBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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

  return (
    <div className="relative z-20 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/15 sm:p-5 lg:p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToVenueFinder();
        }}
      >
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_260px_auto]">
          <div>
            <label htmlFor="venue-finder-query" className="mb-2 block text-sm font-semibold text-slate-900">
              What are you looking for?
            </label>
            <input
              id="venue-finder-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a venue, place or access need"
              className={INPUT_CLASS}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="venue-finder-location" className="mb-2 block text-sm font-semibold text-slate-900">
              Where?
            </label>
            <input
              id="venue-finder-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city, town or postcode"
              className={INPUT_CLASS}
              autoComplete="postal-code"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="h-14 min-h-[44px] w-full rounded-2xl bg-blue-700 px-6 text-base font-semibold text-white transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 md:w-auto"
            >
              Find access-checked venues
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
        {FILTER_CHIPS.map(({ label, key }) => (
          <button
            key={key}
            type="button"
            onClick={() => toggleFilter(key)}
            aria-pressed={selectedFilters.includes(key)}
            className={chipClass(selectedFilters.includes(key))}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => goToVenueFinder()}
          className={chipClass(false)}
        >
          More filters
        </button>
      </div>
    </div>
  );
}
