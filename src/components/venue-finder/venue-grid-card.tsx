"use client";

import Link from "next/link";
import { VenueConfidenceBadge } from "@/components/design-system/venue-confidence-badge";
import type { Venue } from "@/lib/mock-data";
import { FeatureChip, getVenueFeatureChipItems } from "@/components/venue/feature-chip";
import { computeAccessScore, getVenueDistanceLabel, getVenuePhoto } from "@/lib/venue-access-score";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { formatVenueLocation } from "@/lib/venue-card-theme";
import { KnownUnknowns } from "@/components/venue/KnownUnknowns";
import { countVenueUnknowns, isDemoVenue, mapVenueVerificationStatus, venueNeedsCheckHref } from "@/lib/venue-card";
import { getAccessScorePresentation, VF_BTN_PRIMARY, VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";

type Props = {
  venue: Venue;
  userCenter?: VenueCoordinates | null;
  selected?: boolean;
  onSelect?: () => void;
};

export function VenueGridCard({ venue, userCenter, selected, onSelect }: Props) {
  const photo = getVenuePhoto(venue);
  const score = computeAccessScore(venue);
  const scoreStyle = getAccessScorePresentation(score);
  const distance = getVenueDistanceLabel(venue, userCenter);
  const reportHref = `/venue/${venue.slug}`;
  const featureChips = getVenueFeatureChipItems(venue).slice(0, 5);
  const unknownCount = countVenueUnknowns(venue);
  const confidenceStatus = mapVenueVerificationStatus(venue.verification);
  const isDemo = isDemoVenue(venue);

  return (
    <article
      className={`group overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
        selected ? "ring-2 ring-[var(--color-primary)]" : ""
      }`}
    >
      <div className="relative aspect-[1.1/0.82] overflow-hidden bg-background-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        {isDemo ? (
          <span className="absolute left-3 top-3 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-950 shadow-sm">
            Demo listing
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted">{venue.type}</p>
          <span
            className="rounded-full px-2 py-1 text-xs font-semibold"
            style={{ color: scoreStyle.textColor, backgroundColor: scoreStyle.backgroundColor }}
          >
            {scoreStyle.formatted}
          </span>
        </div>

        <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-heading">{venue.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {formatVenueLocation(venue.location)}
          {userCenter ? ` · ${distance}` : ""}
        </p>

        <div className="mt-3">
          <VenueConfidenceBadge status={confidenceStatus} showHint={isDemo} />
        </div>

        {featureChips.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Key access features">
            {featureChips.map((chip) => (
              <FeatureChip key={chip.label} icon={chip.icon} label={chip.label} />
            ))}
          </div>
        ) : null}

        {unknownCount > 0 ? (
          <KnownUnknowns count={unknownCount} className="mt-3 text-xs font-medium text-muted" />
        ) : null}

        <div className="mt-4 grid gap-2">
          <Link href={reportHref} className={`${VF_BTN_PRIMARY} w-full text-sm`}>
            View access details
          </Link>
          <Link href={venueNeedsCheckHref(venue.slug)} className={`${VF_BTN_SECONDARY} w-full text-sm`}>
            Check with my needs
          </Link>
          {onSelect ? (
            <button type="button" onClick={onSelect} className={`${VF_BTN_SECONDARY} w-full text-sm`}>
              {selected ? "Selected on map" : "Show on map"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
