"use client";

import Link from "next/link";
import type { Venue } from "@/lib/mock-data";
import { computeAccessScore, getVenuePhoto } from "@/lib/venue-access-score";
import { VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";

type Props = {
  venues: Venue[];
  location: string;
  mapOpen: boolean;
  onToggleMap: () => void;
};

function MapPanel({ location }: { location: string }) {
  const label = location.trim() || "UK venues";
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Map</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{label}</p>
      </div>
      <div
        className="relative grid h-56 place-items-center bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50"
        role="img"
        aria-label={`Map overview for ${label}`}
      >
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <svg viewBox="0 0 320 180" className="h-full w-full">
            <path d="M0 120 C40 90, 80 140, 120 100 S200 60, 320 90 L320 180 L0 180 Z" fill="#CBD5E1" />
            <path d="M0 80 C60 40, 120 70, 180 45 S260 20, 320 50" stroke="#94A3B8" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="relative flex gap-2">
          {[0, 1, 2].map((pin) => (
            <span
              key={pin}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-700 text-xs font-bold text-white shadow"
              aria-hidden="true"
            >
              {pin + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VenueFinderSidebar({ venues, location, mapOpen, onToggleMap }: Props) {
  const areaLabel = location.trim() || "All areas";
  const latest = venues.slice(0, 3);

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          className={`${VF_BTN_SECONDARY} w-full`}
          onClick={onToggleMap}
          aria-expanded={mapOpen}
        >
          {mapOpen ? "Hide map" : "View map"}
        </button>
        {mapOpen ? (
          <div className="mt-4">
            <MapPanel location={location} />
          </div>
        ) : null}
      </div>

      <aside className="hidden space-y-4 lg:block" aria-label="Map and area overview">
        <div className="sticky top-28 space-y-4">
          <MapPanel location={location} />

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Selected area</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{areaLabel}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {venues.length} venue{venues.length === 1 ? "" : "s"} match your search. Open a report for step-free
              routes, toilets, parking, and confidence notes.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Latest reports</p>
            <ul className="mt-3 space-y-3">
              {latest.map((venue) => {
                const photo = getVenuePhoto(venue);
                const score = computeAccessScore(venue);
                return (
                  <li key={venue.slug}>
                    <Link
                      href={`/venue/${venue.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-2 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.src} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">{venue.name}</p>
                        <p className="text-xs text-slate-500">{venue.location}</p>
                      </div>
                      <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                        {score}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </aside>
    </>
  );
}
