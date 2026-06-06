import Link from "next/link";
import {
  getCategoryAccent,
  themeFromSampleId,
  type VenueImageTheme,
} from "@/lib/venue-finder-category";
import type { SampleVenueCard } from "@/lib/venue-finder-samples";
import {
  CategoryBadge,
  SampleConfidenceBadge,
  SampleVerificationBadge,
} from "./venue-finder-badges";
import { VenueCardImage } from "./venue-card-image";

const IMAGE_LABELS: Record<VenueImageTheme, string> = {
  cafe: "Café exterior",
  hotel: "Hotel lobby",
  toilet: "Accessible facility",
  shop: "Storefront",
  attraction: "Public venue",
};

export function SampleVenueCardItem({ venue }: { venue: SampleVenueCard }) {
  const theme = venue.imageTheme ?? themeFromSampleId(venue.id);
  const accent = getCategoryAccent(theme);

  return (
    <li>
      <article className="vf-venue-card">
        <div className="vf-venue-card-accent" style={{ background: accent.accent }} aria-hidden="true" />
        <div className="vf-venue-card-body">
          <VenueCardImage theme={theme} label={IMAGE_LABELS[theme]} />
          <div className="vf-venue-card-content">
            <header className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge label={accent.label} accent={accent.accent} soft={accent.soft} />
              </div>
              <h3
                className="font-[var(--font-heading)] text-lg font-semibold leading-snug"
                style={{ color: "var(--vf-ink)" }}
              >
                {venue.name}
              </h3>
              <p className="text-sm" style={{ color: "var(--vf-muted)" }}>
                {venue.type}
              </p>
              <div className="flex flex-wrap gap-2">
                <SampleVerificationBadge status={venue.verification} />
                <SampleConfidenceBadge level={venue.confidence} />
              </div>
            </header>

            <div className="mt-4 space-y-3 text-sm" style={{ color: "var(--vf-muted)" }}>
              <p>
                <span className="font-semibold" style={{ color: "var(--vf-ink)" }}>
                  Access summary:{" "}
                </span>
                {venue.summary}
              </p>
              {venue.bestFor ? (
                <p>
                  <span className="font-semibold" style={{ color: "var(--vf-ink)" }}>
                    Best for:{" "}
                  </span>
                  {venue.bestFor}
                </p>
              ) : null}
              <div className="vf-warning-box">
                <span className="font-semibold">Check before visiting: </span>
                {venue.warning.replace(/^Check before visiting:\s*/i, "")}
              </div>
            </div>

            <footer className="mt-5 border-t pt-4" style={{ borderColor: "var(--vf-border)" }}>
              <button
                type="button"
                className="vf-btn-primary w-full sm:w-auto"
                aria-label={`View access report for ${venue.name}`}
              >
                View access report
              </button>
            </footer>
          </div>
        </div>
      </article>
    </li>
  );
}

export function SampleResultsIntro() {
  return (
    <p className="vf-results-subtitle">
      Example listings with access summaries and verification status — search above to find venues
      across the UK.
    </p>
  );
}

export function SampleResultsLink() {
  return (
    <p className="text-sm" style={{ color: "var(--vf-muted)" }}>
      Know a place we should list?{" "}
      <Link
        href="/submit-venue"
        className="font-semibold hover:underline"
        style={{ color: "var(--vf-blue)" }}
      >
        Suggest a venue
      </Link>
    </p>
  );
}
