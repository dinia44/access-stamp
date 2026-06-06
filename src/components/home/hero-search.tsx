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
    const postcode = query.match(/\b([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})\b/i)?.[1];
    if (postcode) return postcode;
    return "";
  }

  function applyRecentSearch(item: string) {
    setMainQuery(item);
    const loc = extractLocationFromQuery(item);
    if (loc) setLocation(loc);
  }

  function useMyLocation() {
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
  }

  function runSearch() {
    const params = new URLSearchParams();
    if (mainQuery.trim()) params.set("q", mainQuery.trim());
    if (location.trim()) params.set("location", location.trim());
    if (venueType.trim()) params.set("type", venueType.trim());
    if (active.size) params.set("features", Array.from(active).join(","));
    router.push(`/venue-finder?${params.toString()}`);
  }

  return (
    <Card className="overflow-hidden border border-border bg-card shadow-[0_28px_64px_-20px_rgba(0,0,0,0.35)]">
      <div className="p-4 sm:p-5">
        <div className="grid gap-3">
          <div className="grid gap-3 lg:grid-cols-[1.2fr_.9fr_240px]">
            <label
              htmlFor="hero-search"
              className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[var(--radius-ui)] border border-border bg-card px-3"
            >
              <span aria-hidden className="text-lg text-blue">
                ⌕
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-heading">Search for a venue, place, or access need</div>
                <input
                  id="hero-search"
                  className="w-full border-0 bg-transparent p-0 text-sm text-heading outline-none placeholder:text-xs placeholder:text-muted focus-visible:outline-none"
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
              className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[var(--radius-ui)] border border-border bg-card px-3"
            >
              <span aria-hidden className="text-lg text-blue">
                ⌖
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-heading">Location</div>
                <input
                  id="hero-location-main"
                  className="w-full border-0 bg-transparent p-0 text-sm text-heading outline-none placeholder:text-xs placeholder:text-muted focus-visible:outline-none"
                  placeholder="Enter city, town or postcode"
                  autoComplete="postal-code"
                  inputMode="search"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  list="hero-location-suggestions"
                />
              </div>
            </label>

            <Button className="h-12 w-full justify-center gap-2" aria-label="Find access-checked venues" onClick={runSearch}>
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
                className="cursor-pointer rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-blue hover:bg-blue-pale"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={() => setShowMoreOptions((v) => !v)}
              className="cursor-pointer font-semibold text-blue hover:underline"
              aria-expanded={showMoreOptions}
            >
              {showMoreOptions ? "Hide options ˄" : "More options ˅"}
            </button>
            <button
              type="button"
              onClick={useMyLocation}
              className="cursor-pointer rounded-full border border-border bg-amber-pale px-3 py-1 font-semibold text-warning hover:bg-[#fef3c7]"
            >
              {locating ? "Finding location..." : "Use my location"}
            </button>
          </div>

          {showMoreOptions ? (
            <div className="grid gap-2">
              <label
                htmlFor="hero-venue-type"
                className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[var(--radius-ui)] border border-border bg-card px-3"
              >
                <span aria-hidden className="text-lg text-blue">
                  ⌂
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-heading">Venue type</div>
                  <input
                    id="hero-venue-type"
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                    className="w-full border-0 bg-transparent p-0 text-sm text-heading outline-none placeholder:text-xs placeholder:text-muted focus-visible:outline-none"
                    placeholder="Restaurant, cinema, museum..."
                    list="hero-venue-suggestions"
                    autoComplete="organization-title"
                    aria-label="Venue type"
                  />
                </div>
              </label>
              <datalist id="hero-venue-suggestions">
                {TYPE_SUGGESTIONS.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() =>
              openChat({
                prefill:
                  mainQuery ||
                  `Find accessible venues${location ? ` in ${location}` : ""}${active.size ? ` with ${Array.from(active).join(", ")}` : ""}.`,
              })
            }
            className="grid min-h-11 w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[var(--radius-ui)] border border-border bg-card px-3 py-2 text-left hover:bg-blue-pale"
            aria-label="Ask Access Stamp AI"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-xs text-navy" aria-hidden>
              ✦
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-heading">Ask Access Stamp AI</span>
                <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-navy">BETA</span>
              </div>
              <div className="truncate text-xs text-muted">
                Get help finding venues, understanding accessibility, and planning your visit.
              </div>
            </div>
            <span className="text-blue" aria-hidden>
              ›
            </span>
          </button>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">Access filters ({active.size})</div>
              <div className="flex items-center gap-2">
                {active.size > 0 ? (
                  <button type="button" onClick={clearFilters} className="cursor-pointer text-xs font-semibold text-blue hover:underline">
                    Clear
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setShowAllFilters((v) => !v)}
                  className="cursor-pointer text-xs font-semibold text-blue hover:underline"
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
                      "cursor-pointer rounded-[var(--radius-ui)] border px-3 py-2 text-[13px] font-medium transition-colors " +
                      (on
                        ? "border-blue bg-blue-pale text-blue shadow-[inset_0_0_0_1px_rgba(37,99,235,0.15)]"
                        : "border-border bg-card text-heading hover:bg-blue-pale")
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

          <div className="flex items-center gap-2 rounded-[var(--radius-ui)] bg-background-2 px-3 py-2 text-sm text-muted">
            <span className="text-base leading-none text-blue" aria-hidden>
              ◌
            </span>
            <div>
              Or describe what you need, for example:{" "}
              <span className="italic text-blue">wheelchair-friendly museum in Liverpool with accessible toilets</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
