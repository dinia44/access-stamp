"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import type { Venue } from "@/lib/mock-data";
import { readSavedVenueSlugs, subscribeSavedVenues } from "@/lib/saved-venues";
import { getVenuePhoto } from "@/lib/venue-access-score";
import { SITE_FOCUS } from "@/lib/site-design";

type Props = {
  venues: Venue[];
};

export function SavedVenuesCard({ venues }: Props) {
  const savedSlugs = useSyncExternalStore(subscribeSavedVenues, readSavedVenueSlugs, () => []);

  const savedVenues = useMemo(() => {
    const bySlug = new Map(venues.map((venue) => [venue.slug, venue]));
    return savedSlugs.map((slug) => bySlug.get(slug)).filter(Boolean) as Venue[];
  }, [savedSlugs, venues]);

  const thumbnails = savedVenues.slice(0, 3);

  return (
    <div
      id="saved-venues"
      className="rounded-[2rem] border border-border bg-background-2 p-5 shadow-sm"
      aria-labelledby="saved-venues-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="saved-venues-heading" className="text-xl font-semibold tracking-[-0.03em] text-heading">
          Saved venues
        </h2>
        <span className="rounded-full bg-card px-2.5 py-1 text-xs font-bold text-[var(--color-secondary)] shadow-sm">
          {savedVenues.length}
        </span>
      </div>

      {thumbnails.length > 0 ? (
        <div className="mt-4 flex gap-2" aria-label="Saved venue previews">
          {thumbnails.map((venue) => {
            const photo = getVenuePhoto(venue);
            return (
              <Link
                key={venue.slug}
                href={`/venue/${venue.slug}`}
                className={`relative h-16 w-16 overflow-hidden rounded-xl border border-border bg-card shadow-sm ${SITE_FOCUS}`}
                aria-label={`View saved venue ${venue.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt="" className="h-full w-full object-cover" />
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-muted">
          Save venues you like with the heart icon to build a shortlist for your trip.
        </p>
      )}

      {savedVenues.length > 0 ? (
        <Link
          href={savedVenues[0] ? `/venue/${savedVenues[0].slug}` : "/venue-finder"}
          className={`mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-heading shadow-sm transition hover:border-[var(--color-border-mid)] hover:bg-background ${SITE_FOCUS}`}
        >
          View saved venues
        </Link>
      ) : null}
    </div>
  );
}
