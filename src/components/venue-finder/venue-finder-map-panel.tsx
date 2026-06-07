"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/lib/mock-data";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { VenueFinderSelectedCard } from "./venue-finder-selected-card";

const VenueFinderMap = dynamic(
  () => import("./venue-finder-map").then((mod) => mod.VenueFinderMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="grid h-full min-h-[280px] place-items-center rounded-2xl border border-[#F1D8C7] bg-[#FFF3E8] text-sm font-medium text-[#5E6A66]"
        aria-hidden="true"
      >
        Loading map…
      </div>
    ),
  },
);

type Props = {
  venues: Venue[];
  locationLabel: string;
  selectedSlug: string | null;
  mapCenter: VenueCoordinates | null;
  onSelectVenue: (slug: string | null) => void;
  onUserLocation?: (coords: VenueCoordinates) => void;
  className?: string;
  mapHeightClass?: string;
};

export function VenueFinderMapPanel({
  venues,
  locationLabel,
  selectedSlug,
  mapCenter,
  onSelectVenue,
  onUserLocation,
  className = "",
  mapHeightClass = "h-[320px] sm:h-[360px] lg:h-[420px]",
}: Props) {
  const selectedVenue = venues.find((venue) => venue.slug === selectedSlug) ?? null;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-[#F1D8C7] bg-white/95 shadow-[var(--shadow-soft)]">
        <div className="border-b border-[#F1D8C7] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#59682A]">Interactive map</p>
          <p className="mt-1 text-sm font-semibold text-[#13201F]">{locationLabel.trim() || "UK venues"}</p>
          <p className="mt-1 text-xs text-[#5E6A66]">
            Tap a marker to preview access information. Use location controls to centre the map on you.
          </p>
        </div>
        <div className={mapHeightClass}>
          <VenueFinderMap
            venues={venues}
            selectedSlug={selectedSlug}
            mapCenter={mapCenter}
            onSelectVenue={onSelectVenue}
            onUserLocation={onUserLocation}
            className="h-full rounded-none border-0"
          />
        </div>
      </div>

      {selectedVenue ? (
        <VenueFinderSelectedCard
          venue={selectedVenue}
          userCenter={mapCenter}
          onClose={() => onSelectVenue(null)}
        />
      ) : null}
    </div>
  );
}
