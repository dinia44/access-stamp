"use client";

import Link from "next/link";
import { VenueConfidenceBadge } from "@/components/design-system/venue-confidence-badge";
import type { Venue } from "@/lib/mock-data";
import { getVenueDistanceLabel } from "@/lib/venue-access-score";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { formatVenueLocation } from "@/lib/venue-card-theme";
import { isDemoVenue, mapVenueVerificationStatus } from "@/lib/venue-card";
import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";

type Props = {
  venue: Venue;
  userCenter?: VenueCoordinates | null;
  selected?: boolean;
  onSelect?: () => void;
};

export function VenueListRow({ venue, userCenter, selected, onSelect }: Props) {
  const distance = getVenueDistanceLabel(venue, userCenter);
  const confidenceStatus = mapVenueVerificationStatus(venue.verification);
  const isDemo = isDemoVenue(venue);

  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:border-[var(--color-border-mid)] sm:flex-row sm:items-center sm:justify-between ${
        selected ? "ring-2 ring-[var(--color-primary)]" : ""
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs text-muted">{venue.type}</p>
          {isDemo ? (
            <span className="rounded-full bg-[var(--color-information-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-information)]">
              Demo example
            </span>
          ) : null}
        </div>
        <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-heading">{venue.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {formatVenueLocation(venue.location)}
          {userCenter ? ` · ${distance}` : ""}
        </p>
        <div className="mt-2">
          <VenueConfidenceBadge status={confidenceStatus} showHint={false} />
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        {onSelect ? (
          <button type="button" className="min-h-11 rounded-2xl border border-border px-4 text-sm font-semibold" onClick={onSelect}>
            Show on map
          </button>
        ) : null}
        <Link href={`/venue/${venue.slug}`} className={`${VF_BTN_PRIMARY} min-h-11 px-4 text-sm`}>
          View report
        </Link>
      </div>
    </article>
  );
}
