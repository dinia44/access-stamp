"use client";

import Link from "next/link";
import type { Venue } from "@/lib/mock-data";
import { computeAccessScore, getVenuePhoto } from "@/lib/venue-access-score";
import { VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";

type Props = {
  venues: Venue[];
  location: string;
};

export function VenueFinderSidebar({ venues, location }: Props) {
  const areaLabel = location.trim() || "All areas";
  const latest = venues.slice(0, 3);

  return (
    <aside className="space-y-4" aria-label="Area overview">
      <section className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Selected area</p>
        <h2 className="mt-2 text-lg font-semibold text-heading">{areaLabel}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {venues.length} venue{venues.length === 1 ? "" : "s"} match your search. Open a report for step-free routes,
          toilets, parking, and confidence notes.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Latest reports</p>
        <ul className="mt-3 space-y-3">
          {latest.map((venue) => {
            const photo = getVenuePhoto(venue);
            const score = computeAccessScore(venue);
            return (
              <li key={venue.slug}>
                <Link
                  href={`/venue/${venue.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-border p-2 transition-colors hover:bg-background-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFE2D3]"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-heading">{venue.name}</p>
                    <p className="text-xs text-muted">{venue.location}</p>
                  </div>
                  <span className="rounded-lg bg-background-2 px-2 py-1 text-xs font-bold text-text">{score}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {venues.length > latest.length ? (
          <Link href="#venue-results" className={`${VF_BTN_SECONDARY} mt-4 w-full`}>
            View all results
          </Link>
        ) : null}
      </section>
    </aside>
  );
}
