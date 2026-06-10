"use client";

import Link from "next/link";
import type { Venue } from "@/lib/mock-data";
import { getAccessConfidence, getVenueAccessSnapshot } from "@/lib/venue-access-snapshot";
import { getVenueDistanceLabel, getVenuePhoto } from "@/lib/venue-access-score";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { formatVenueLocation } from "@/lib/venue-card-theme";
import { VF_BTN_PRIMARY, VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";

type Props = {
  venue: Venue;
  index?: number;
  userCenter?: VenueCoordinates | null;
  selected?: boolean;
  onSelect?: () => void;
};

export function VenueGridCard({ venue, userCenter, selected, onSelect }: Props) {
  const photo = getVenuePhoto(venue);
  const confidence = getAccessConfidence(venue);
  const snapshot = getVenueAccessSnapshot(venue).slice(0, 5);
  const distance = getVenueDistanceLabel(venue, userCenter);
  const reportHref = `/venue/${venue.slug}`;

  return (
    <article
      className={`group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.10)] ${
        selected ? "ring-2 ring-[#17201C]" : ""
      }`}
    >
      <div className="grid gap-0 md:grid-cols-[240px_1fr]">
        <div className="relative min-h-[220px] overflow-hidden bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#17201C] shadow-sm backdrop-blur">
            {confidence.label}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#17201C]">{venue.name}</h3>
              <p className="mt-1 text-sm text-stone-500">
                {formatVenueLocation(venue.location)}
                {userCenter ? ` · ${distance}` : ""} · {venue.type}
              </p>
            </div>

            <div className="rounded-2xl bg-[#EDF6EF] px-3 py-2 text-right">
              <p className="text-lg font-bold text-[#17201C]">{confidence.score}</p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-stone-500">Score</p>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#4F5A53]">
            {confidence.label} · {confidence.score} confidence score · Based on entrance, toilet, parking,
            internal route and support details.
          </p>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Access snapshot</p>
            <div className="mt-2 grid gap-2 text-sm text-[#344039] sm:grid-cols-2">
              {snapshot.map((line) => (
                <div key={line.category} className="rounded-xl bg-stone-50 px-3 py-2">
                  {line.category}: {line.value}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={reportHref} className={VF_BTN_PRIMARY}>
              Open access report
            </Link>
            {onSelect ? (
              <button
                type="button"
                onClick={onSelect}
                className={VF_BTN_SECONDARY}
                aria-label={selected ? `${venue.name} selected on map` : `Show ${venue.name} on the map`}
              >
                {selected ? "Selected on map" : "Show on map"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
