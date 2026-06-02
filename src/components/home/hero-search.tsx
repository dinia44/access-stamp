"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";
import { useChat } from "@/components/chat/provider";

const FILTERS = [
  { label: "Step-free access", key: "Step-free entrance" },
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Hearing loop", key: "Staff disability awareness" },
  { label: "Lift access", key: "Lift access" },
  { label: "Parking", key: "Nearby Blue Badge parking" },
  { label: "Sensory support", key: "Quiet environment" },
  { label: "Wide doorways", key: "Wide doorways (80cm+)" },
  { label: "Turning space", key: "Turning space (150cm+)" },
  { label: "Changing Places", key: "Changing Places toilet" },
] as const;

const DEFAULT_ACTIVE = new Set<string>(["Step-free entrance", "Accessible toilet", "Nearby Blue Badge parking"]);
const TOP_FILTER_COUNT = 5;

const VENUE_SUGGESTIONS = ["Restaurant", "Cinema", "Museum", "Library", "Cafe", "Hotel", "Shopping centre"] as const;
const LOCATION_SUGGESTIONS = ["Leeds", "Liverpool", "Manchester", "Bristol", "L1 8JQ", "LS1 4AP"] as const;
const TYPE_SUGGESTIONS = ["Restaurant", "Cinema", "Museum", "Library", "Cafe", "Hotel", "Shopping", "Arts & Culture"] as const;
const RECENT_SEARCHES = [
  "Step-free restaurant in Leeds with parking",
  "Accessible museum in Liverpool",
  "Cinema with hearing loop near Manchester",
] as const;

export function HeroSearchCard() {
  const router = useRouter();
  const { openChat } = useChat();
  const [active, setActive] = useState<Set<string>>(new Set(DEFAULT_ACTIVE));
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [mainQuery, setMainQuery] = useState("");
  const [venueType, setVenueType] = useState("");
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);

  const chips = useMemo(() => FILTERS.map((f) => ({ ...f, on: active.has(f.key) })), [active]);
  const visibleChips = showAllFilters ? chips : chips.slice(0, TOP_FILTER_COUNT);

  function toggle(key: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function clearFilters() {
    setActive(new Set());
  }

  function extractLocationFromQuery(query: string) {
    const fromPhrase = query.match(/\b(?:in|near)\s+([a-z][a-z\s-]{2,30})/i)?.[1]?.trim();
    if (fromPhrase) return fromPhrase;
    const postcode = query.match(/\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/i)?.[0];
    if (postcode) return postcode.toUpperCase();
    return "";
  }

  function extractTypeFromQuery(query: string) {
    const lower = query.toLowerCase();
    return TYPE_SUGGESTIONS.find((t) => lower.includes(t.toLowerCase())) ?? "";
  }

  function inferFiltersFromQuery(query: string) {
    const lower = query.toLowerCase();
    return FILTERS.filter((f) => lower.includes(f.label.toLowerCase())).map((f) => f.key);
  }

  function runSearch(query = mainQuery, forcedLocation = location, forcedType = venueType, forcedFilters = Array.from(active)) {
    const params = new URLSearchParams();
    const cleanQuery = query.trim();
    const inferredLocation = !forcedLocation.trim() ? extractLocationFromQuery(cleanQuery) : "";
    const inferredType = !forcedType.trim() ? extractTypeFromQuery(cleanQuery) : "";
    const mergedFilters = forcedFilters.length ? forcedFilters : inferFiltersFromQuery(cleanQuery);

    if (cleanQuery) params.set("q", cleanQuery);
    if ((forcedType || inferredType).trim()) params.set("type", (forcedType || inferredType).trim());
    if ((forcedLocation || inferredLocation).trim()) params.set("location", (forcedLocation || inferredLocation).trim());
    if (mergedFilters.length) params.set("filters", mergedFilters.join(","));
    const qs = params.toString();
    router.push(qs ? `/venue-finder?${qs}` : "/venue-finder");
  }

  function applyRecentSearch(search: string) {
    setMainQuery(search);
    const inferredLocation = extractLocationFromQuery(search);
    const inferredType = extractTypeFromQuery(search);
    const inferredFilters = inferFiltersFromQuery(search);
    if (inferredLocation) setLocation(inferredLocation);
    if (inferredType) setVenueType(inferredType);
    if (inferredFilters.length) setActive((prev) => new Set([...Array.from(prev), ...inferredFilters]));
    runSearch(search, inferredLocation || location, inferredType || venueType, inferredFilters.length ? inferredFilters : Array.from(active));
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

  return (
    <Card className="overflow-hidden border border-[#d8dfea] bg-[#f7f7f8] shadow-[0_28px_64px_-20px_rgba(0,0,0,0.35)]">
      <div className="p-4 sm:p-5">
        <div className="grid gap-3">
          <div className="grid gap-2 lg:grid-cols-[1.2fr_.9fr_240px]">
            <label
              htmlFor="hero-search"
              className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[var(--radius-ui)] border border-[#c7d5ed] bg-white px-3"
            >
              <span aria-hidden className="text-lg text-[#184080]">⌕</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-heading">Search for a venue, place, or access need</div>
                <input
                  id="hero-search"
                  className="w-full border-0 bg-transparent p-0 text-sm text-heading outline-none placeholder:text-xs placeholder:text-muted"
                  placeholder="e.g. Step-free restaurant in Leeds with parking"
                  aria-label="Search for a venue or place"
                  value={mainQuery}
                  onChange={(e) => setMainQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") runSearch();
                  }}
                  list="hero-main-suggestions"
                  autoComplete="on"
                />
              </div>
            </label>

            <label
              htmlFor="hero-location-main"
              className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[var(--radius-ui)] border border-[#c7d5ed] bg-white px-3"
            >
              <span aria-hidden className="text-lg text-[#184080]">⌖</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-heading">Location</div>
                <input
                  id="hero-location-main"
                  className="w-full border-0 bg-transparent p-0 text-sm text-heading outline-none placeholder:text-xs placeholder:text-muted"
                  placeholder="Enter city, town or postcode"
                  autoComplete="postal-code"
                  inputMode="search"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  list="hero-location-suggestions"
                />
              </div>
            </label>

            <Button
              className="h-12 w-full justify-center gap-2 rounded-[var(--radius-ui)] bg-[#f3be55] text-[#071a3b] hover:bg-[#e4ad40]"
              aria-label="Find access-checked venues"
              onClick={runSearch}
            >
              <span aria-hidden>⌕</span>
              {location.trim() ? `Find access-checked venues in ${location.trim()}` : "Find access-checked venues"}
            </Button>
          </div>

          <datalist id="hero-main-suggestions">
            {[...RECENT_SEARCHES, ...VENUE_SUGGESTIONS, ...LOCATION_SUGGESTIONS].map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
          <datalist id="hero-location-suggestions">
            {LOCATION_SUGGESTIONS.map((item) => (
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
              className="rounded-full border border-[#f0c979] bg-[#fdf0cf] px-3 py-1 font-semibold text-[#6f4f1a] hover:bg-[#f8e4b0] cursor-pointer"
            >
              {locating ? "Finding location..." : "Use my location"}
            </button>
          </div>

          {showMoreOptions ? (
            <div className="grid gap-2">
              <label
                htmlFor="hero-venue-type"
                className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[var(--radius-ui)] border border-[#c7d5ed] bg-white px-3"
              >
                <span aria-hidden className="text-lg text-[#184080]">⌂</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-heading">Venue type</div>
                  <input
                    id="hero-venue-type"
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                    className="w-full border-0 bg-transparent p-0 text-sm text-heading outline-none placeholder:text-xs placeholder:text-muted"
                    placeholder="Restaurant, cinema, museum..."
                    list="hero-venue-suggestions"
                    autoComplete="organization-title"
                    aria-label="Venue type"
                  />
                </div>
              </label>
              <datalist id="hero-venue-suggestions">
                {VENUE_SUGGESTIONS.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() =>
              openChat({
                prefill: mainQuery || `Find accessible venues${location ? ` in ${location}` : ""}${active.size ? ` with ${Array.from(active).join(", ")}` : ""}.`,
              })
            }
            className="grid min-h-11 w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[var(--radius-ui)] border border-[#d8dfea] bg-white px-3 py-2 text-left hover:bg-[#f5f8ff] cursor-pointer"
            aria-label="Ask Access Stamp AI"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f3be55] text-xs text-[#071a3b]" aria-hidden>
              ✦
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-heading">Ask Access Stamp AI</span>
                <span className="rounded-full bg-[#f3be55] px-2 py-0.5 text-[10px] font-bold text-[#071a3b]">BETA</span>
              </div>
              <div className="truncate text-xs text-muted">
                Get help finding venues, understanding accessibility, and planning your visit.
              </div>
            </div>
            <span className="text-[#184080]" aria-hidden>›</span>
          </button>

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
                {visibleChips.map(({ label, key, on }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggle(key)}
                    className={
                      "rounded-[var(--radius-ui)] border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer " +
                      (on
                        ? "border-[#f3be55] bg-[#fdf0cf] text-[#6f4f1a] shadow-[inset_0_0_0_1px_rgba(243,190,85,0.25)]"
                        : "border-[#d8dfea] bg-white text-[#184080] hover:bg-[#f5f8ff]")
                    }
                    aria-pressed={on}
                    aria-label={`${label} filter ${on ? "selected" : "not selected"}`}
                  >
                    {on ? "✓ " : ""}
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-[var(--radius-ui)] bg-[#eef2f7] px-3 py-2 text-sm text-muted">
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

