"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/lib/mock-data";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { VenueFinderSelectedCard } from "./venue-finder-selected-card";

function MapLoadingState() {
  return (
    <div
      className="flex h-full min-h-[280px] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-stone-200 to-stone-100"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="px-6 text-center">
        <p className="text-sm font-semibold text-[#17201C]">Map loading</p>
        <p className="mt-1 text-sm text-stone-500">
          We&apos;re preparing nearby venue markers.
        </p>
        <p className="mt-2 text-xs text-stone-500">You can still browse all results below.</p>
      </div>
    </div>
  );
}

const VenueFinderMap = dynamic(
  () => import("./venue-finder-map").then((mod) => mod.VenueFinderMap),
  {
    ssr: false,
    loading: () => <MapLoadingState />,
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
      <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-100/70 p-4 shadow-sm">
        <div className="mb-3 px-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Map</p>
          <p className="mt-1 text-sm font-semibold text-[#17201C]">{locationLabel.trim() || "UK venues"}</p>
          <p className="mt-1 text-xs text-[#4F5A53]">
            Tap a marker to preview access detail. Use location controls to centre the map on you.
          </p>
        </div>
        <div className={mapHeightClass}>
          <VenueFinderMap
            venues={venues}
            selectedSlug={selectedSlug}
            mapCenter={mapCenter}
            onSelectVenue={onSelectVenue}
            onUserLocation={onUserLocation}
            className="h-full rounded-[1.5rem] border-0"
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
