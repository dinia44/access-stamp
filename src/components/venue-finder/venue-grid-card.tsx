"use client";

import Link from "next/link";
import { VenueConfidenceBadge } from "@/components/design-system/venue-confidence-badge";
import type { Venue } from "@/lib/mock-data";
import { getVenueFeatureChipItems } from "@/components/venue/feature-chip";
import { computeAccessScore, getVenueDistanceLabel, getVenuePhoto } from "@/lib/venue-access-score";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { formatVenueLocation } from "@/lib/venue-card-theme";
import { KnownUnknowns } from "@/components/venue/KnownUnknowns";
import { countVenueUnknowns, isDemoVenue, mapVenueVerificationStatus, venueNeedsCheckHref } from "@/lib/venue-card";
import { getAccessScorePresentation, VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";
import { shouldShowAccessScore, toVerificationType } from "@/lib/venue-verification";

type Props = {
  venue: Venue;
  userCenter?: VenueCoordinates | null;
  selected?: boolean;
  onSelect?: () => void;
};

function DecisionFacts({ venue }: { venue: Venue }) {
  const facts: string[] = [];
  const measuredPhoto = venue.photos?.find((photo) => photo.measurement);
  if (measuredPhoto?.measurement) {
    facts.push(measuredPhoto.measurement.replace(/^Door width measured:\s*/i, "Doorway "));
  }
  const chips = getVenueFeatureChipItems(venue).slice(0, 4);
  for (const chip of chips) {
    if (facts.length >= 4) break;
    if (!facts.some((f) => f.toLowerCase().includes(chip.label.toLowerCase().slice(0, 8)))) {
      facts.push(chip.label);
    }
  }
  if (facts.length === 0) return null;
  return (
    <ul className="mt-3 grid gap-1.5 text-sm text-[var(--color-ink)]" aria-label="Key access facts">
      {facts.map((fact) => (
        <li key={fact} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-trust)]" aria-hidden />
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  );
}

export function VenueGridCard({ venue, userCenter, selected, onSelect }: Props) {
  const photo = getVenuePhoto(venue);
  const score = computeAccessScore(venue);
  const showScore = shouldShowAccessScore(toVerificationType(venue.verification)) && score != null;
  const scoreStyle = showScore ? getAccessScorePresentation(score) : null;
  const distance = getVenueDistanceLabel(venue, userCenter);
  const reportHref = `/venue/${venue.slug}`;
  const unknownCount = countVenueUnknowns(venue);
  const confidenceStatus = mapVenueVerificationStatus(venue.verification);
  const isDemo = isDemoVenue(venue);

  return (
    <article
      className={`group overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card transition ${
        selected ? "ring-2 ring-[var(--color-brand)]" : ""
      }`}
    >
      <div className="relative aspect-[1.1/0.82] overflow-hidden bg-background-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {isDemo ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--color-information-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--color-information)]">
            Demo example
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted">{venue.type}</p>
          {scoreStyle ? (
            <span
              className="rounded-full px-2 py-1 text-xs font-semibold"
              style={{ color: scoreStyle.textColor, backgroundColor: scoreStyle.backgroundColor }}
            >
              {scoreStyle.formatted}
            </span>
          ) : null}
        </div>

        <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-heading">{venue.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {formatVenueLocation(venue.location)}
          {userCenter ? ` · ${distance}` : ""}
        </p>

        <div className="mt-3">
          {/* Avoid repeating demo explanation when the photo already shows Demo example */}
          <VenueConfidenceBadge status={confidenceStatus} showHint={false} />
        </div>

        <DecisionFacts venue={venue} />

        {unknownCount > 0 ? (
          <KnownUnknowns count={unknownCount} className="mt-3 text-xs font-medium text-muted" />
        ) : null}

        <div className="mt-4 flex flex-col gap-2">
          <Link href={reportHref} className={`${VF_BTN_PRIMARY} w-full text-sm`}>
            View access details
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href={venueNeedsCheckHref(venue.slug)}
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] hover:underline"
            >
              Check against my needs
            </Link>
            {onSelect ? (
              <button
                type="button"
                onClick={onSelect}
                className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-muted hover:text-heading"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {selected ? "Selected on map" : "Show on map"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
