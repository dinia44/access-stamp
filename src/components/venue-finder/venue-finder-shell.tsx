import Link from "next/link";
import { HeroSearchCard } from "@/components/home/hero-search";
import { Container } from "@/components/container";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { buildFeaturedVenueItems } from "@/lib/venue-finder-featured";
import { ExplainerPanel } from "./explainer-panel";
import { FeaturedVenueGrid } from "./featured-venue-card";
import { HeroMobileAccent, HeroVisualPanel } from "./hero-visual-panel";

type ShellProps = {
  resultsCount?: number;
  searchSlot: React.ReactNode;
  resultsSlot?: React.ReactNode;
  showDefaultSamples?: boolean;
  compactResults?: boolean;
};

export function VenueFinderHero() {
  return (
    <section
      aria-labelledby="venue-finder-heading"
      className="vf-hero relative overflow-hidden pb-24 pt-12 sm:pb-28 sm:pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(980px 600px at 10% 40%, rgba(36,120,208,0.28), transparent 58%), radial-gradient(700px 480px at 88% 12%, rgba(212,149,42,0.16), transparent 55%), radial-gradient(800px 500px at 90% 15%, rgba(15,38,72,0.35), transparent 62%)",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
          <div>
            <p className="hero-badge inline-flex items-center rounded-full px-4 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
              UK&apos;s trusted accessibility platform
            </p>
            <div className="hero-accent-line mt-4 !mx-0" aria-hidden />
            <h1
              id="venue-finder-heading"
              className="mt-4 max-w-2xl font-[var(--font-heading)] text-[clamp(2.2rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#f8fafc]"
            >
              The UK&apos;s trusted accessibility platform
            </h1>
            <p className="mt-3 max-w-xl text-[22px] leading-[1.35] text-[#cbd5e1]">
              Find and share step-free venues. Access accurate. Access confident.
            </p>
            <p className="mt-3 max-w-xl text-sm font-medium text-[#94a3b8]">
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
    <Container className="relative z-10 -mt-12 sm:-mt-14">
      <div className="mx-auto max-w-[980px]">{children}</div>
    </Container>
  );
}

export function DefaultSampleResults() {
  return <FeaturedVenueGrid items={buildFeaturedVenueItems(SAMPLE_VENUES)} />;
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
  compactResults = false,
}: ShellProps) {
  const count = resultsCount ?? buildFeaturedVenueItems(SAMPLE_VENUES).length;
  const showingSamples = showDefaultSamples && !compactResults;

  return (
    <div className="vf-page">
      <VenueFinderHero />
      <VenueFinderSearchCard>{searchSlot}</VenueFinderSearchCard>

      <section className="vf-results-section py-10 sm:py-12" aria-labelledby="venue-results-heading">
        <Container>
          <div className={`mx-auto max-w-[980px] ${showingSamples ? "" : "lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-8"}`}>
            <main id="venue-results" className="min-w-0">
              <div className="vf-results-header">
                <h2 id="venue-results-heading" className="sr-only">
                  Venue search results
                </h2>
                {compactResults ? <ResultsCount count={count} /> : null}
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
      searchSlot={<HeroSearchCard />}
    />
  );
}
