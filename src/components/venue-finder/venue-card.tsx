import { ConfidenceBadge, VerificationBadge } from "@/components/verification-badge";
import type { Venue } from "@/lib/mock-data";
import {
  buildAccessSummary,
  buildBestFor,
  buildWarning,
  directionsUrl,
} from "@/lib/venue-finder";

export function VenueCard({ venue }: { venue: Venue }) {
  const summary = buildAccessSummary(venue);
  const bestFor = buildBestFor(venue);
  const warning = buildWarning(venue);
  const reportLabel = `View access report for ${venue.name}`;

  return (
    <li>
      <article
        className="flex h-full flex-col p-5 sm:p-6"
        style={{
          background: "var(--vf-card)",
          border: "1px solid var(--vf-border)",
          borderRadius: "var(--vf-radius-card)",
          boxShadow: "var(--vf-shadow-soft)",
        }}
      >
        <header className="space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-ink)]">
                {venue.name}
              </h3>
              <p className="text-sm text-muted">
                <span className="font-semibold text-[var(--color-ink)]">{venue.type}</span>
                <span aria-hidden="true"> · </span>
                <span>{venue.location}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <VerificationBadge status={venue.verification} />
            <ConfidenceBadge level={venue.confidence} />
          </div>
        </header>

        <div className="mt-4 flex-1 space-y-3 text-sm text-muted">
          <p>
            <span className="font-semibold text-[var(--color-ink)]">Access summary: </span>
            {summary}
          </p>
          <p>
            <span className="font-semibold text-[var(--color-ink)]">Best for: </span>
            {bestFor}
          </p>
          {warning ? (
            <p className="vf-warning-box">
              <span className="font-semibold">Check before visiting: </span>
              {warning.replace(/^Check before visiting:\s*/i, "")}
            </p>
          ) : null}
        </div>

        <footer className="mt-4 space-y-3 border-t border-border pt-4">
          <p className="text-xs text-muted">Last checked {venue.lastUpdated}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a href={`/venue/${venue.slug}`} className="vf-btn-primary inline-flex w-full items-center justify-center sm:w-auto">
              {reportLabel}
            </a>
            <a
              href={directionsUrl(venue)}
              className="vf-btn-secondary inline-flex w-full items-center justify-center sm:w-auto"
            >
              Get directions to {venue.name}
            </a>
          </div>
        </footer>
      </article>
    </li>
  );
}

/** Server-safe venue card without client Button onClick needs */
export function VenueCardStatic({ venue }: { venue: Venue }) {
  return <VenueCard venue={venue} />;
}
