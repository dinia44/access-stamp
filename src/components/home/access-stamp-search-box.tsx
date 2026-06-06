"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AskAccessStampAiButton } from "@/components/ask-access-stamp-ai-button";
import { searchAccessStamp } from "@/data/searchIndex";
import { filterChipClass } from "@/lib/venue-finder-cro";

const VENUE_FILTERS = [
  { label: "Step-free entrance", key: "Step-free entrance" },
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Blue Badge parking", key: "Nearby Blue Badge parking" },
] as const;

const TOPIC_CHIPS = [
  { label: "Travel planning", href: "/advice/travel" },
  { label: "Rights & support", href: "/advice/rights" },
] as const;

const INPUT_CLASS =
  "h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-950 placeholder:text-slate-500 transition-all duration-200 hover:border-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-blue-100";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function CrosshairIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}

const GUIDANCE_CATEGORIES = new Set(["Guide", "Rights", "Equipment", "Care", "Transport", "Workplace", "AI Assistant"]);

export function AccessStampSearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [locating, setLocating] = useState(false);

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

  const handleSearch = () => {
    const trimmed = query.trim();
    const hasVenueContext = Boolean(location.trim() || selectedFilters.length);

    if (trimmed && !hasVenueContext) {
      const results = searchAccessStamp(trimmed, 5);
      const guidanceHit = results.find((item) => GUIDANCE_CATEGORIES.has(item.category) && !item.comingSoon);
      const venueHit = results.find((item) => item.category === "Venue");

      if (guidanceHit && (!venueHit || guidanceHit.title.toLowerCase().includes(trimmed.toLowerCase()))) {
        router.push(guidanceHit.url);
        return;
      }
    }

    goToVenueFinder();
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 10000 },
    );
  };

  const aiPrefill = query.trim()
    ? `Help me with: ${[query, location].filter(Boolean).join(" in ")}`
    : undefined;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/15 sm:p-5">
      <div className="mb-4 border-b border-slate-100 pb-4">
        <p className="text-sm font-bold text-slate-950">Start with a place, need, or question</p>
        <p className="mt-1 text-sm text-slate-600">
          Search venues, guides, access needs and support — one entry point into Access Stamp.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px_auto]">
          <div>
            <label htmlFor="home-search-query" className="mb-2 block text-sm font-bold text-slate-950">
              What do you need?
            </label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                id="home-search-query"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search venues, guides, access needs or support"
                className={INPUT_CLASS}
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label htmlFor="home-search-location" className="mb-2 block text-sm font-bold text-slate-950">
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                id="home-search-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city, town or postcode"
                className={`${INPUT_CLASS} pr-11`}
                autoComplete="postal-code"
              />
              <button
                type="button"
                onClick={useMyLocation}
                disabled={locating}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded text-[#2563EB] hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                aria-label="Use my location"
              >
                <CrosshairIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="h-14 min-h-11 w-full rounded-2xl bg-[#2563EB] px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2 lg:w-auto"
            >
              Search Access Stamp
            </button>
          </div>
        </div>
      </form>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
        {VENUE_FILTERS.map(({ label, key }) => (
          <button
            key={key}
            type="button"
            onClick={() => toggleFilter(key)}
            className={filterChipClass(selectedFilters.includes(key))}
          >
            {label}
          </button>
        ))}

        {TOPIC_CHIPS.map(({ label, href }) => (
          <button
            key={href}
            type="button"
            onClick={() => router.push(href)}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => goToVenueFinder()}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
        >
          More filters
        </button>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <AskAccessStampAiButton variant="compact" prefill={aiPrefill} className="w-full justify-start" />
      </div>
    </div>
  );
}
