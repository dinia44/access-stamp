import Link from "next/link";
import { Container } from "@/components/container";
import { SAMPLE_VENUE_CARDS } from "@/lib/venue-finder-samples";
import { ExplainerPanel } from "./explainer-panel";
import { HeroMobileAccent, HeroVisualPanel } from "./hero-visual-panel";
import { SampleResultsIntro, SampleVenueCardItem } from "./sample-venue-card";

type ShellProps = {
  resultsCount?: number;
  searchSlot: React.ReactNode;
  resultsSlot?: React.ReactNode;
  showDefaultSamples?: boolean;
  resultsSubtitle?: React.ReactNode;
  compactResults?: boolean;
};

export function VenueFinderHero() {
  return (
    <section
      aria-labelledby="venue-finder-heading"
      className="vf-hero pb-24 pt-12 sm:pb-28 sm:pt-14"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10">
          <div>
            <p className="vf-hero-badge inline-flex rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
              UK&apos;s trusted accessibility platform
            </p>
            <div className="vf-hero-accent-line mt-4" aria-hidden />
            <h1
              id="venue-finder-heading"
              className="mt-4 max-w-2xl font-[var(--font-heading)] text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
              style={{ color: "var(--vf-hero-heading)" }}
            >
              The UK&apos;s trusted accessibility platform
            </h1>
            <p
              className="mt-4 max-w-xl text-[1.25rem] leading-[1.35]"
              style={{ color: "var(--vf-hero-subtitle)" }}
            >
              Find and share step-free venues. Access accurate. Access confident.
            </p>
            <p
              className="mt-3 max-w-xl text-sm font-medium"
              style={{ color: "#94a3b8" }}
            >
              Built from lived experience. Practical UK guidance. Real access detail, not vague labels.
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
    <Container className="relative z-10 -mt-14 sm:-mt-16">
      <div className="vf-search-card p-4 sm:p-5 lg:p-6">{children}</div>
    </Container>
  );
}

export function DefaultSampleResults() {
  return (
    <ul className="vf-sample-grid mt-8">
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
  compactResults = false,
}: ShellProps) {
  const count = resultsCount ?? SAMPLE_VENUE_CARDS.length;
  const showingSamples = showDefaultSamples && !compactResults;

  return (
    <div className="vf-page">
      <VenueFinderHero />
      <VenueFinderSearchCard>{searchSlot}</VenueFinderSearchCard>

      <section className="vf-results-section py-10 sm:py-12" aria-labelledby="venue-results-heading">
        <Container>
          <div className={showingSamples ? "" : "lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-8"}>
            <main id="venue-results" className="min-w-0">
              <div className="vf-results-header">
                <h2 id="venue-results-heading" className="sr-only">
                  Venue search results
                </h2>
                {compactResults ? <ResultsCount count={count} /> : null}
                {resultsSubtitle ?? (showingSamples ? <SampleResultsIntro /> : null)}
              </div>

              {resultsSlot ?? (showDefaultSamples ? <DefaultSampleResults /> : null)}
            </main>

            {!showingSamples ? <ExplainerPanel className="mt-8 lg:mt-0 lg:sticky lg:top-6" /> : null}
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
        <form action="/venue-finder" method="get" className="vf-search-form space-y-4">
          <div className="vf-search-row">
            <label htmlFor="vf-search-static" className="vf-search-field">
              <span className="vf-search-field-icon" aria-hidden>
                ⌕
              </span>
              <span className="vf-search-field-inner">
                <span className="vf-search-field-label">Search for a venue, place, or access need</span>
                <input
                  id="vf-search-static"
                  name="q"
                  type="search"
                  className="vf-search-field-input"
                  placeholder="e.g. Step-free restaurant in Leeds with parking"
                  autoComplete="off"
                />
              </span>
            </label>
            <button type="submit" className="vf-btn-primary vf-search-submit">
              Find access-checked venues
            </button>
          </div>
        </form>
      }
    />
  );
}
