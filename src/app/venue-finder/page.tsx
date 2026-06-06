"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";
import { VenueFinderPromoVideo } from "@/components/venue-finder-promo-video";
import { ConfidenceBadge, VerificationBadge } from "@/components/verification-badge";
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

const QUERY_SYNONYMS: Record<string, string[]> = {
  toilet: ["accessible toilet", "toilets", "bathroom", "wc"],
  parking: ["blue badge parking", "nearby blue badge parking", "car park"],
  quiet: ["quiet environment", "calm", "sensory"],
  stepfree: ["step free", "step-free entrance", "wheelchair access"],
};

function tokenize(input: string) {
  return normalize(input).split(" ").filter(Boolean);
}

function credibilityScore(verification: string, confidence: string) {
  const verificationScore = verification === "Access Stamp checked" ? 3 : verification === "Community reported" ? 2 : 1;
  const confidenceScore = confidence === "High" ? 3 : confidence === "Medium" ? 2 : 1;
  return verificationScore + confidenceScore;
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
  const initialVerifiedOnly = searchParams.get("verified") === "1";
  const { openChat } = useChat();

  const [query, setQuery] = useState(initialQuery);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [venueType, setVenueType] = useState(initialType);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(initialFilters);
  const [sortBy, setSortBy] = useState(initialSort);
  const [verifiedOnly, setVerifiedOnly] = useState(initialVerifiedOnly);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());
    if (venueType !== "Any") params.set("type", venueType);
    if (selectedFilters.length) params.set("filters", selectedFilters.join(","));
    if (sortBy !== "Relevance") params.set("sort", sortBy);
    if (verifiedOnly) params.set("verified", "1");

    const next = params.toString();
    const current = searchParams.toString();
    if (next === current) return;
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [query, locationQuery, venueType, selectedFilters, sortBy, verifiedOnly, pathname, router, searchParams]);

  const filtered = useMemo(() => {
    let items = [...SAMPLE_VENUES];

    const q = query.trim();
    if (q) {
      const terms = tokenize(q);
      const expandedTerms = terms.flatMap((term) => [term, ...(QUERY_SYNONYMS[term] ?? [])]);
      items = items
        .map((v) => {
          const featureKeys = Object.entries(v.features)
            .filter(([, value]) => value === "yes")
            .map(([key]) => key.toLowerCase());
          const haystack = [
            v.name.toLowerCase(),
            v.location.toLowerCase(),
            v.type.toLowerCase(),
            v.summary.toLowerCase(),
            ...v.tags.map((t) => t.toLowerCase()),
            ...featureKeys,
          ];
          const score = expandedTerms.reduce((acc, term) => {
            if (haystack.some((field) => field.includes(term))) return acc + 3;
            return acc;
          }, 0);
          return { venue: v, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.venue);
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

    if (verifiedOnly) {
      items = items.filter((v) => v.verification === "Access Stamp checked");
    }

    if (sortBy === "Rating") {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Distance") {
      items.sort((a, b) => a.location.localeCompare(b.location));
    } else if (sortBy === "Credibility") {
      items.sort((a, b) => credibilityScore(b.verification, b.confidence) - credibilityScore(a.verification, a.confidence));
    } else {
      items.sort((a, b) => b.confidence.localeCompare(a.confidence));
    }

    return items;
  }, [query, locationQuery, venueType, selectedFilters, sortBy, verifiedOnly]);

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
            <p className="max-w-[75ch] text-sm text-muted">
              <span className="font-semibold text-heading">Verification:</span> &quot;Access Stamp checked&quot; means we&apos;ve
              applied our structured review; &quot;Community reported&quot; is first-hand or crowd detail; &quot;Not yet
              verified&quot; may still be useful—confirm before you travel.{" "}
              <Link href="/about#listings" className="font-semibold text-blue hover:underline">
                How we label listings
              </Link>
            </p>
            <p className="text-sm text-muted">
              Know a place we should list?{" "}
              <Link href="/submit-venue" className="font-semibold text-blue hover:underline">
                Suggest a venue
              </Link>
              .
            </p>
          </div>

          <VenueFinderPromoVideo showCaption={false} />

          <Card className="p-5 sm:p-6">
            <div className="grid gap-4">
              <p className="text-sm text-muted">
                <span className="font-semibold text-heading">New here?</span> Watch the video above for a quick tour of
                Access Stamp Venue Finder, then search below.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className="text-sm font-semibold text-muted">
                  Search query
                  <input
                    className="form-input mt-1 h-11 w-full px-3"
                    placeholder="e.g. step-free restaurant with parking"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    inputMode="search"
                  />
                </label>
                <label className="text-sm font-semibold text-muted">
                  Location
                  <input
                    className="form-input mt-1 h-11 w-full px-3"
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
                    className="form-input mt-1 h-11 w-full px-3"
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
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-heading">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                />
                Show verified venues only
              </label>
              <p className="text-xs text-muted">Verified = Access Stamp checked in person or by evidence review.</p>
            </div>
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
                <option>Credibility</option>
                <option>Distance</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
          {(query || locationQuery || venueType !== "Any" || selectedFilters.length || verifiedOnly) ? (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {query ? <Badge tone="blue">Query: {query}</Badge> : null}
              {locationQuery ? <Badge tone="blue">Location: {locationQuery}</Badge> : null}
              {venueType !== "Any" ? <Badge tone="blue">Type: {venueType}</Badge> : null}
              {verifiedOnly ? <Badge tone="blue">Verified only</Badge> : null}
              {selectedFilters.map((f) => (
                <Badge key={f} tone="blue">{f}</Badge>
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
                  setVerifiedOnly(false);
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
                        <Badge key={t} tone="neutral" className="text-[11px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                      <span className="text-muted">Rating</span>
                      <span className="text-heading">{v.rating.toFixed(1)}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
                      <VerificationBadge status={v.verification} />
                      <ConfidenceBadge level={v.confidence} />
                    </div>
                    <div className="mt-2 text-xs text-muted">
                      Updated {v.lastUpdated} · Credibility {credibilityScore(v.verification, v.confidence)}/6
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
