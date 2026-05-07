"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";
import { VENUE_FILTERS, VenueFinderFilters } from "@/components/venue-finder-filters";
import { useChat } from "@/components/chat/provider";

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function mapIncomingFilters(input: string) {
  if (!input.trim()) return [];
  const requested = input
    .split(",")
    .map((x) => normalize(x))
    .filter(Boolean);
  return VENUE_FILTERS.filter((f) => requested.some((r) => normalize(f).includes(r) || r.includes(normalize(f))));
}

function mapQueryToFilters(query: string) {
  const q = normalize(query);
  if (!q) return [];
  return VENUE_FILTERS.filter((f) => q.includes(normalize(f)));
}

function VenueFinderPageInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get("location") ?? "";
  const initialType = searchParams.get("type") ?? "Any";
  const initialQuery = searchParams.get("q") ?? "";
  const requestedFilters = mapIncomingFilters(searchParams.get("filters") ?? "");
  const inferredFromQuery = mapQueryToFilters(initialQuery);
  const initialFilters = requestedFilters.length
    ? requestedFilters
    : inferredFromQuery.slice(0, 3);
  const initialSort = searchParams.get("sort") ?? "Relevance";
  const { openChat } = useChat();

  const [query, setQuery] = useState(initialQuery);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [venueType, setVenueType] = useState(initialType);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(initialFilters);
  const [sortBy, setSortBy] = useState(initialSort);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());
    if (venueType !== "Any") params.set("type", venueType);
    if (selectedFilters.length) params.set("filters", selectedFilters.join(","));
    if (sortBy !== "Relevance") params.set("sort", sortBy);

    const next = params.toString();
    const current = searchParams.toString();
    if (next === current) return;
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [query, locationQuery, venueType, selectedFilters, sortBy, pathname, router, searchParams]);

  const filtered = useMemo(() => {
    let items = [...SAMPLE_VENUES];

    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.type.toLowerCase().includes(q) ||
          v.summary.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    const loc = locationQuery.trim().toLowerCase();
    if (loc) {
      items = items.filter((v) => v.location.toLowerCase().includes(loc) || v.name.toLowerCase().includes(loc));
    }

    if (venueType !== "Any") {
      items = items.filter((v) => v.type === venueType);
    }

    if (selectedFilters.length) {
      items = items.filter((v) => selectedFilters.every((f) => v.features[f] === "yes"));
    }

    if (sortBy === "Rating") {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Distance") {
      items.sort((a, b) => a.location.localeCompare(b.location));
    } else {
      items.sort((a, b) => b.confidence.localeCompare(a.confidence));
    }

    return items;
  }, [query, locationQuery, venueType, selectedFilters, sortBy]);

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "venue-finder" }} />
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">Venue Finder</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">
              Search by practical access features
            </h1>
            <p className="max-w-[75ch] text-muted">
              Filter venues by real details, like door width, turning space, toilets, and parking. If you’re not sure
              what a feature means, ask the AI.
            </p>
            <p className="text-sm text-muted">
              Know a place we should list?{" "}
              <Link href="/submit-venue" className="font-semibold text-blue hover:underline">
                Suggest a venue
              </Link>
              .
            </p>
          </div>

          <Card className="p-5 sm:p-6">
            <div className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className="text-sm font-semibold text-muted">
                  Search query
                  <input
                    className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                    placeholder="e.g. step-free restaurant with parking"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    inputMode="search"
                  />
                </label>
                <label className="text-sm font-semibold text-muted">
                  Location
                  <input
                    className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                    placeholder="City, town, or postcode"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    autoComplete="postal-code"
                    inputMode="search"
                  />
                </label>
                <label className="text-sm font-semibold text-muted">
                  Venue type
                  <select
                    className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                  >
                    <option>Any</option>
                    <option>Restaurant</option>
                    <option>Café</option>
                    <option>Hotel</option>
                    <option>Shopping</option>
                    <option>Arts & Culture</option>
                    <option>Leisure</option>
                    <option>Pub & Bar</option>
                    <option>Healthcare</option>
                    <option>Entertainment</option>
                    <option>Outdoor</option>
                    <option>Sports & Fitness</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="mt-3 text-sm">
              <button
                type="button"
                className="font-semibold text-blue hover:underline"
                onClick={() =>
                  openChat({
                    prefill: `Help me search${locationQuery ? ` in ${locationQuery}` : ""}${selectedFilters.length ? ` with ${selectedFilters.join(", ")}` : ""}.`,
                  })
                }
              >
                Ask the AI to help you search →
              </button>
            </div>

            <VenueFinderFilters selected={selectedFilters} onChange={setSelectedFilters} />
          </Card>

          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-heading">Results ({filtered.length})</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted">Sort:</span>
              <select
                className="h-9 rounded-[var(--radius-ui)] border border-border bg-white px-3 text-sm font-semibold text-heading"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Relevance</option>
                <option>Distance</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
          {(query || locationQuery || venueType !== "Any" || selectedFilters.length) ? (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {query ? <Badge tone="blue">Query: {query}</Badge> : null}
              {locationQuery ? <Badge tone="blue">Location: {locationQuery}</Badge> : null}
              {venueType !== "Any" ? <Badge tone="blue">Type: {venueType}</Badge> : null}
              {selectedFilters.map((f) => (
                <Badge key={f} tone="amber">{f}</Badge>
              ))}
              <button
                type="button"
                className="ml-1 rounded-[var(--radius-ui)] border border-border px-2 py-1 font-semibold text-heading hover:bg-background-2"
                onClick={() => {
                  setQuery("");
                  setLocationQuery("");
                  setVenueType("Any");
                  setSelectedFilters([]);
                  setSortBy("Relevance");
                }}
              >
                Clear all
              </button>
            </div>
          ) : null}

          {filtered.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((v) => (
              <Link key={v.slug} href={`/venue/${v.slug}`} className="group">
                <Card className="h-full transition-shadow group-hover:shadow-[var(--shadow)]">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-heading">{v.name}</div>
                        <div className="text-xs text-muted">{v.location}</div>
                      </div>
                      <Badge tone="blue">{v.type}</Badge>
                    </div>
                    <div className="mt-3 text-sm text-muted">{v.summary}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(selectedFilters.length
                        ? selectedFilters.filter((f) => v.features[f] === "yes")
                        : v.tags).slice(0, 3).map((t) => (
                        <Badge key={t} tone="amber" className="text-[11px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                      <span className="text-muted">Rating</span>
                      <span className="text-heading">{v.rating.toFixed(1)}</span>
                    </div>
                    <div className="mt-3 grid gap-1 border-t border-border pt-3 text-xs text-muted">
                      <div>
                        <span className="font-semibold text-heading">Verification:</span> {v.verification}
                      </div>
                      <div>
                        <span className="font-semibold text-heading">Last updated:</span> {v.lastUpdated}
                      </div>
                      <div>
                        <span className="font-semibold text-heading">Confidence:</span> {v.confidence}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
              ))}
            </div>
          ) : (
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">No results with current filters</div>
              <p className="mt-1 text-sm text-muted">
                Try clearing one or two filters, or search a wider location area.
              </p>
              <div className="mt-4 rounded-[var(--radius-ui)] border border-border bg-background p-3">
                <label htmlFor="inline-ai-assist" className="text-xs font-semibold text-heading">
                  Chat message
                </label>
                <input
                  id="inline-ai-assist"
                  readOnly
                  value={`Find venues${locationQuery ? ` in ${locationQuery}` : ""}${selectedFilters.length ? ` with ${selectedFilters.join(", ")}` : ""}.`}
                  className="mt-2 h-10 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-sm text-heading"
                  aria-label="Chat message"
                />
                <button
                  type="button"
                  className="mt-3 rounded-[var(--radius-ui)] bg-blue px-3 py-2 text-xs font-semibold text-white"
                  onClick={() =>
                    openChat({
                      prefill: `Find accessible venues${locationQuery ? ` in ${locationQuery}` : ""}${selectedFilters.length ? ` with ${selectedFilters.join(", ")}` : ""}.`,
                    })
                  }
                >
                  Ask AI with current filters
                </button>
              </div>
            </Card>
          )}

          <Card className="p-5">
            <div className="text-sm font-semibold text-heading">No results?</div>
            <p className="mt-1 text-sm text-muted">
              Try removing a filter, searching a wider area, or using the AI search bar to describe what you need. Still
              stuck?{" "}
              <Link href="/submit-venue" className="font-semibold text-blue hover:underline">
                Suggest a venue
              </Link>{" "}
              for the directory.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default function VenueFinderPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-background">
          <Container className="py-10">
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">Loading venue finder…</div>
            </Card>
          </Container>
        </div>
      }
    >
      <VenueFinderPageInner />
    </Suspense>
  );
}
