"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";
import { VenueFinderFilters } from "@/components/venue-finder-filters";

export default function VenueFinderPage() {
  const [locationQuery, setLocationQuery] = useState("");
  const [venueType, setVenueType] = useState("Any");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Relevance");

  const filtered = useMemo(() => {
    let items = [...SAMPLE_VENUES];

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
  }, [locationQuery, venueType, selectedFilters, sortBy]);

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
            <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
              <div className="grid gap-3 sm:grid-cols-2">
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

              <div className="grid gap-3">
                <label className="text-sm font-semibold text-muted">
                  Or describe what you need (AI search)
                  <input
                    className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                    placeholder='e.g. "wheelchair-friendly pub in Liverpool with good parking and a Changing Places toilet"'
                  />
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Search</Button>
                  <Link href="/ai" className="text-sm font-semibold text-blue">
                    Ask the AI to help you search →
                  </Link>
                </div>
              </div>
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
                      {v.tags.slice(0, 3).map((t) => (
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
