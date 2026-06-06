import Link from "next/link";
import { Container } from "@/components/container";
import { SAMPLE_VENUE_CARDS } from "@/lib/venue-finder-samples";
import { QUICK_FILTERS } from "@/lib/venue-finder";
import { ExplainerPanel } from "./explainer-panel";
import { HeroMobileAccent, HeroVisualPanel } from "./hero-visual-panel";
import { SampleResultsIntro, SampleVenueCardItem } from "./sample-venue-card";

type ShellProps = {
  resultsCount?: number;
  searchSlot: React.ReactNode;
  resultsSlot?: React.ReactNode;
  showDefaultSamples?: boolean;
  resultsSubtitle?: React.ReactNode;
};

export function VenueFinderHero() {
  return (
    <section
      aria-labelledby="venue-finder-heading"
      className="vf-hero pb-20 pt-12 sm:pb-24 sm:pt-14"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div>
            <p className="vf-hero-badge inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Access Stamp Venue Finder
            </p>
            <h1
              id="venue-finder-heading"
              className="mt-4 max-w-2xl font-[var(--font-heading)] text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.5rem]"
              style={{ color: "var(--vf-hero-heading)" }}
            >
              Find accessible places with confidence
            </h1>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--vf-hero-subtitle)" }}
            >
              Search practical access information for cafés, restaurants, hotels, toilets, shops
              and public places.
            </p>
            <HeroMobileAccent />
          </div>
          <HeroVisualPanel />
        </div>
      </Container>
    </section>
  );
}

export function VenueFinderSearchCard({ children }: { children: React.ReactNode }) {
  return (
    <Container className="relative z-10 -mt-12 sm:-mt-14">
      <div className="vf-search-card p-5 sm:p-6 lg:p-8">{children}</div>
    </Container>
  );
}

export function StaticQuickFilters() {
  return (
    <div className="mt-5">
      <p
        id="quick-filters-static-label"
        className="text-sm font-semibold"
        style={{ color: "var(--vf-ink)" }}
      >
        Quick filters
      </p>
      <ul
        aria-labelledby="quick-filters-static-label"
        className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {QUICK_FILTERS.map((label) => (
          <li key={label} className="shrink-0">
            <span
              className="vf-chip inline-flex"
              data-verified={label === "Verified by Access Stamp" ? "true" : undefined}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DefaultSampleResults() {
  return (
    <ul className="mt-6 grid gap-5">
      {SAMPLE_VENUE_CARDS.map((venue) => (
        <SampleVenueCardItem key={venue.id} venue={venue} />
      ))}
    </ul>
  );
}

function ResultsCount({ count }: { count: number }) {
  return (
    <p className="vf-results-count" aria-live="polite" aria-atomic="true">
      <span className="vf-results-count-badge" aria-hidden="true">
        {count}
      </span>
      <span>
        venue{count === 1 ? "" : "s"} found
      </span>
    </p>
  );
}

export function VenueFinderShell({
  resultsCount,
  searchSlot,
  resultsSlot,
  showDefaultSamples = true,
  resultsSubtitle,
}: ShellProps) {
  const count = resultsCount ?? SAMPLE_VENUE_CARDS.length;

  return (
    <div className="vf-page">
      <VenueFinderHero />
      <VenueFinderSearchCard>{searchSlot}</VenueFinderSearchCard>

      <section className="vf-results-section py-10 sm:py-12" aria-labelledby="venue-results-heading">
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-8">
            <main id="venue-results" className="min-w-0">
              <div className="vf-results-header">
                <h2 id="venue-results-heading" className="sr-only">
                  Venue search results
                </h2>
                <ResultsCount count={count} />
                {resultsSubtitle ?? (showDefaultSamples ? <SampleResultsIntro /> : null)}
              </div>

              {resultsSlot ?? (showDefaultSamples ? <DefaultSampleResults /> : null)}
            </main>

            <ExplainerPanel className="mt-8 lg:mt-0 lg:sticky lg:top-6" />
          </div>
        </Container>
      </section>
    </div>
  );
}

export function VenueFinderEmptyState() {
  return (
    <section
      aria-labelledby="empty-state-heading"
      className="mt-6 p-6 text-center"
      style={{
        background: "var(--vf-card)",
        border: "1px solid var(--vf-border)",
        borderRadius: "var(--vf-radius-card)",
        boxShadow: "var(--vf-shadow-soft)",
      }}
    >
      <h2
        id="empty-state-heading"
        className="font-[var(--font-heading)] text-lg font-semibold"
        style={{ color: "var(--vf-ink)" }}
      >
        No matching venues found
      </h2>
      <p className="mt-2 text-sm" style={{ color: "var(--vf-muted)" }}>
        Try removing one filter, searching a nearby town, or suggest a venue for us to check.
      </p>
      <Link href="/submit-venue" className="vf-btn-primary mt-4 inline-flex">
        Suggest a venue
      </Link>
    </section>
  );
}

/** Full server-rendered page — no loading-only state */
export function VenueFinderStaticPage() {
  return (
    <VenueFinderShell
      searchSlot={
        <form action="/venue-finder" method="get" className="space-y-4">
          <div>
            <label htmlFor="vf-search-static" className="text-sm font-semibold" style={{ color: "var(--vf-ink)" }}>
              Search by place, town, postcode or venue name
            </label>
            <input
              id="vf-search-static"
              name="q"
              type="search"
              className="vf-input mt-2 h-12 px-4"
              placeholder="Try 'café in Uckfield' or 'accessible toilet near me'"
              autoComplete="postal-code"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="vf-btn-primary w-full sm:w-auto">
              Search
            </button>
            <span className="vf-btn-secondary inline-flex w-full items-center justify-center sm:w-auto">
              Use my location
            </span>
          </div>
          <StaticQuickFilters />
        </form>
      }
    />
  );
}
