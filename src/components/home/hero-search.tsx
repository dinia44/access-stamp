"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";

const FILTERS = [
  "Step-free access",
  "Accessible toilet",
  "Hearing loop",
  "Lift access",
  "Parking",
  "Sensory support",
  "Wide doorways",
  "Turning space",
  "Changing Places",
] as const;

const DEFAULT_ACTIVE = new Set<string>([
  "Step-free access",
  "Accessible toilet",
  "Parking",
]);

const TOP_FILTER_COUNT = 5;

const VENUE_SUGGESTIONS = [
  "Restaurant",
  "Cinema",
  "Museum",
  "Library",
  "Cafe",
  "Hotel",
  "Shopping centre",
] as const;

const LOCATION_SUGGESTIONS = [
  "Leeds",
  "Liverpool",
  "Manchester",
  "Bristol",
  "L1 8JQ",
  "LS1 4AP",
] as const;

const RECENT_SEARCHES = [
  "Step-free restaurant in Leeds with parking",
  "Accessible museum in Liverpool",
  "Cinema with hearing loop near Manchester",
] as const;

export function HeroSearchCard() {
  const router = useRouter();
  const [active, setActive] = useState<Set<string>>(new Set(DEFAULT_ACTIVE));
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [mainQuery, setMainQuery] = useState("");
  const [venueType, setVenueType] = useState("");
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);

  const chips = useMemo(() => FILTERS.map((t) => ({ t, on: active.has(t) })), [active]);
  const visibleChips = showAllFilters ? chips : chips.slice(0, TOP_FILTER_COUNT);

  function toggle(t: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  function clearFilters() {
    setActive(new Set());
  }

  function applyRecentSearch(search: string) {
    setMainQuery(search);
  }

  function useMyLocation() {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 },
    );
  }

  function runSearch() {
    const params = new URLSearchParams();
    if (mainQuery.trim()) params.set("q", mainQuery.trim());
    if (venueType.trim()) params.set("type", venueType.trim());
    if (location.trim()) params.set("location", location.trim());
    if (active.size) params.set("filters", Array.from(active).join(","));
    const qs = params.toString();
    router.push(qs ? `/venue-finder?${qs}` : "/venue-finder");
  }

  return (
    <Card className="overflow-hidden border border-[#d8dfea] bg-[#f7f7f8] shadow-[0_28px_64px_-20px_rgba(0,0,0,0.35)]">
      <div className="p-4 sm:p-5">
        <div className="grid gap-3">
          <div className="grid gap-2 lg:grid-cols-[1fr_220px]">
            <label
              htmlFor="hero-search"
              className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[10px] border border-[#d8dfea] bg-white px-3"
            >
              <span aria-hidden className="text-lg text-[#184080]">⌕</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-heading">Search for a venue, place, or access need</div>
                <input
                  id="hero-search"
                  className="w-full border-0 bg-transparent p-0 text-xs text-muted outline-none"
                  placeholder="e.g. Step-free restaurant in Leeds with parking"
                  aria-label="Search for a venue or place"
                  value={mainQuery}
                  onChange={(e) => setMainQuery(e.target.value)}
                  list="hero-main-suggestions"
                  autoComplete="on"
                />
              </div>
            </label>

            <Button
              className="h-12 w-full justify-center gap-2 rounded-[10px] bg-[#0d4bb3] text-white hover:bg-[#0a3f97]"
              aria-label="Find access-checked venues"
              onClick={runSearch}
            >
              <span aria-hidden>⌕</span>
              Find access-checked venues
            </Button>
          </div>

          <datalist id="hero-main-suggestions">
            {[...RECENT_SEARCHES, ...VENUE_SUGGESTIONS, ...LOCATION_SUGGESTIONS].map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>

          <div className="flex flex-wrap items-center gap-2">
            {RECENT_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => applyRecentSearch(item)}
                className="rounded-full border border-[#d8dfea] bg-white px-3 py-1 text-xs font-semibold text-[#184080] hover:bg-[#f5f8ff] cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={() => setShowMoreOptions((v) => !v)}
              className="font-semibold text-[#184080] hover:underline cursor-pointer"
              aria-expanded={showMoreOptions}
            >
              {showMoreOptions ? "Hide options ˄" : "More options ˅"}
            </button>
            <button
              type="button"
              onClick={useMyLocation}
              className="rounded-full border border-[#d8dfea] bg-white px-3 py-1 font-semibold text-[#184080] hover:bg-[#f5f8ff] cursor-pointer"
            >
              {locating ? "Finding location..." : "Use my location"}
            </button>
          </div>

          {showMoreOptions ? (
            <div className="grid gap-2 md:grid-cols-2">
              <label
                htmlFor="hero-venue-type"
                className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[10px] border border-[#d8dfea] bg-white px-3"
              >
                <span aria-hidden className="text-lg text-[#184080]">⌂</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-heading">Venue type</div>
                  <input
                    id="hero-venue-type"
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                    className="w-full border-0 bg-transparent p-0 text-xs text-muted outline-none"
                    placeholder="Restaurant, cinema, museum..."
                    list="hero-venue-suggestions"
                    autoComplete="organization-title"
                    aria-label="Venue type"
                  />
                </div>
              </label>

              <label
                htmlFor="hero-location"
                className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[10px] border border-[#d8dfea] bg-white px-3"
              >
                <span aria-hidden className="text-lg text-[#184080]">⌖</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-heading">Location</div>
                  <input
                    id="hero-location"
                    className="w-full border-0 bg-transparent p-0 text-xs text-muted outline-none"
                    placeholder="Enter city, town or postcode"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    list="hero-location-suggestions"
                  />
                </div>
              </label>
              <datalist id="hero-venue-suggestions">
                {VENUE_SUGGESTIONS.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
              <datalist id="hero-location-suggestions">
                {LOCATION_SUGGESTIONS.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
          ) : null}

          <Link
            href="/ai"
            className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[10px] border border-[#d8dfea] bg-white px-3 py-2 hover:bg-[#f5f8ff]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-blue text-xs text-white" aria-hidden>
              ✦
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-heading">Ask Access Stamp AI</span>
                <span className="rounded-full bg-blue px-2 py-0.5 text-[10px] font-bold text-white">BETA</span>
              </div>
              <div className="truncate text-xs text-muted">
                Get help finding venues, understanding accessibility, and planning your visit.
              </div>
            </div>
            <span className="text-[#184080]" aria-hidden>›</span>
          </Link>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5f6f86]">
                Access filters ({active.size})
              </div>
              <div className="flex items-center gap-2">
                {active.size > 0 ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-[#184080] hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setShowAllFilters((v) => !v)}
                  className="text-xs font-semibold text-[#184080] hover:underline cursor-pointer"
                >
                  {showAllFilters ? "Show fewer filters ˄" : "View all filters ˅"}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-max flex-wrap gap-2 md:min-w-0">
                {visibleChips.map(({ t, on }) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggle(t)}
                    className={
                      "rounded-[10px] border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer " +
                      (on
                        ? "border-[#0d4bb3] bg-[#e8f0ff] text-[#184080]"
                        : "border-[#d8dfea] bg-white text-[#184080] hover:bg-[#f5f8ff]")
                    }
                    aria-pressed={on}
                    aria-label={`${t} filter ${on ? "selected" : "not selected"}`}
                  >
                    {on ? "✓ " : ""}
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-[10px] bg-[#eef2f7] px-3 py-2 text-sm text-muted">
            <span className="text-base leading-none text-[#184080]" aria-hidden>◌</span>
            <div>
              Or describe what you need, for example:{" "}
              <span className="italic text-[#184080]">
                wheelchair-friendly museum in Liverpool with accessible toilets
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

