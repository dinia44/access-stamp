import {
  getCategoryAccent,
  themeFromVenueType,
} from "@/lib/venue-finder-category";
import type { Venue } from "@/lib/mock-data";
import {
  buildAccessSummary,
  buildBestFor,
  buildWarning,
  directionsUrl,
} from "@/lib/venue-finder";
import { getThemeFallbackPhoto } from "@/lib/venue-finder-images";
import {
  CategoryBadge,
  VenueFinderConfidenceBadge,
  VenueFinderVerificationBadge,
} from "./venue-finder-badges";
import { VenueCardImage } from "./venue-card-image";

const PHOTO_LABELS: Record<string, string> = {
  Entrance: "Step-free entrance",
  "Venue overview": "Venue preview",
  Doorway: "Accessible doorway",
  Toilet: "Accessible toilet",
  Parking: "Blue Badge parking",
};

function pickVenueImage(venue: Venue, theme: ReturnType<typeof themeFromVenueType>) {
  const photo = venue.photos?.[0];
  if (photo) {
    return {
      src: photo.src,
      alt: photo.alt,
      label: PHOTO_LABELS[photo.label] ?? photo.label,
    };
  }

  const fallback = getThemeFallbackPhoto(theme);
  return {
    src: fallback.src,
    alt: fallback.alt,
    label: undefined,
  };
}

export function VenueCard({ venue }: { venue: Venue }) {
  const theme = themeFromVenueType(venue.type);
  const accent = getCategoryAccent(theme);
  const image = pickVenueImage(venue, theme);
  const summary = buildAccessSummary(venue);
  const bestFor = buildBestFor(venue);
  const warning = buildWarning(venue);
  const reportLabel = `View access report for ${venue.name}`;

  return (
    <li>
      <article className="vf-venue-card">
        <div className="vf-venue-card-accent" style={{ background: accent.accent }} aria-hidden="true" />
        <div className="vf-venue-card-body">
          <VenueCardImage
            theme={theme}
            src={image?.src}
            alt={image?.alt}
            label={image?.label}
          />
          <div className="vf-venue-card-content">
            <header className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge label={venue.type} accent={accent.accent} soft={accent.soft} />
              </div>
              <h3
                className="font-[var(--font-heading)] text-lg font-semibold leading-snug"
                style={{ color: "var(--vf-ink)" }}
              >
                {venue.name}
              </h3>
              <p className="text-sm" style={{ color: "var(--vf-muted)" }}>
                <span className="font-semibold" style={{ color: "var(--vf-ink)" }}>
                  {venue.type}
                </span>
                <span aria-hidden="true"> · </span>
                <span>{venue.location}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <VenueFinderVerificationBadge status={venue.verification} />
                <VenueFinderConfidenceBadge level={venue.confidence} />
              </div>
            </header>

            <div className="mt-4 space-y-3 text-sm" style={{ color: "var(--vf-muted)" }}>
              <p>
                <span className="font-semibold" style={{ color: "var(--vf-ink)" }}>
                  Access summary:{" "}
                </span>
                {summary}
              </p>
              <p>
                <span className="font-semibold" style={{ color: "var(--vf-ink)" }}>
                  Best for:{" "}
                </span>
                {bestFor}
              </p>
              {warning ? (
                <div className="vf-warning-box">
                  <span className="font-semibold">Check before visiting: </span>
                  {warning.replace(/^Check before visiting:\s*/i, "")}
                </div>
              ) : null}
            </div>

            <footer className="mt-5 space-y-3 border-t pt-4" style={{ borderColor: "var(--vf-border)" }}>
              <p className="text-xs" style={{ color: "var(--vf-muted)" }}>
                Last checked {venue.lastUpdated}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <a
                  href={`/venue/${venue.slug}`}
                  className="vf-btn-primary inline-flex w-full items-center justify-center sm:w-auto"
                >
                  {reportLabel}
                </a>
                <a
                  href={directionsUrl(venue)}
                  className="vf-btn-secondary inline-flex w-full items-center justify-center sm:w-auto"
                >
                  Get directions
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </li>
  );
}

/** Server-safe venue card without client Button onClick needs */
export function VenueCardStatic({ venue }: { venue: Venue }) {
  return <VenueCard venue={venue} />;
}
