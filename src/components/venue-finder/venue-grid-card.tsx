"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { Venue } from "@/lib/mock-data";
import { FeatureChip, getVenueFeatureChipItems } from "@/components/venue/feature-chip";
import { readSavedVenueSlugs, subscribeSavedVenues, toggleSavedVenueSlug } from "@/lib/saved-venues";
import { getVenueDistanceLabel, getVenuePhoto } from "@/lib/venue-access-score";
import { computeAccessScore } from "@/lib/venue-access-score";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { formatVenueLocation } from "@/lib/venue-card-theme";
import { getAccessScorePresentation, VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";
import { SITE_FOCUS } from "@/lib/site-design";

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
  const featureChips = getVenueFeatureChipItems(venue);

  const saved = useSyncExternalStore(
    subscribeSavedVenues,
    () => readSavedVenueSlugs().includes(venue.slug),
    () => false,
  );

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

        <button
          type="button"
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card text-heading shadow-md transition hover:scale-105 ${SITE_FOCUS}`}
          aria-label={saved ? `Remove ${venue.name} from saved venues` : `Save ${venue.name}`}
          aria-pressed={saved}
          onClick={() => toggleSavedVenueSlug(venue.slug)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden
          >
            <path d="M12 21s-6.7-4.4-9.2-8.6C1.1 9.2 2.6 5.5 6.2 5.1c1.9-.2 3.7.8 4.6 2.4.9-1.6 2.7-2.6 4.6-2.4 3.6.4 5.1 4.1 3.4 7.3C18.7 16.6 12 21 12 21z" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
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

        {featureChips.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Access features">
            {featureChips.map((chip) => (
              <FeatureChip key={chip.label} icon={chip.icon} label={chip.label} />
            ))}
          </div>
        ) : null}

        <div className="mt-4 grid gap-2">
          <Link
            href={reportHref}
            className={`flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-heading transition hover:border-[var(--color-border-mid)] hover:bg-background-2 ${SITE_FOCUS}`}
          >
            View access report
            <span aria-hidden="true">→</span>
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
