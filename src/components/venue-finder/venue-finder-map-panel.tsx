"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Venue } from "@/lib/mock-data";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { SITE_FOCUS } from "@/lib/site-design";
import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";
import { MapErrorBoundary } from "./map-error-boundary";
import { VenueFinderSelectedCard } from "./venue-finder-selected-card";

function MapLoadingState({ label = "Preparing nearby venue markers…" }: { label?: string }) {
  return (
    <div
      className="flex h-full min-h-[280px] animate-pulse items-center justify-center rounded-2xl bg-gradient-to-br from-background-2 to-verified-pale"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Map loading"
    >
      <div className="px-6 text-center">
        <p className="text-sm font-semibold text-heading">Map loading</p>
        <p className="mt-1 text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}

function MapPlaceholder({ onLoad }: { onLoad: () => void }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-background-2 to-verified-pale px-6 text-center">
      <p className="text-sm font-semibold text-heading">Interactive map</p>
      <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
        Load the map to explore venue markers near your search. This keeps the page fast on first visit.
      </p>
      <button type="button" className={`${VF_BTN_PRIMARY} mt-5`} onClick={onLoad}>
        Load map
      </button>
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
  onOpenFullMap?: () => void;
};

export function VenueFinderMapPanel({
  venues,
  locationLabel,
  selectedSlug,
  mapCenter,
  onSelectVenue,
  onUserLocation,
  className = "",
  mapHeightClass = "aspect-square",
  onOpenFullMap,
}: Props) {
  const [mapEnabled, setMapEnabled] = useState(false);
  const selectedVenue = venues.find((venue) => venue.slug === selectedSlug) ?? null;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="rounded-[2rem] border border-border bg-background-2 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-heading">Explore on map</h2>
            <p className="mt-1 text-xs text-muted">{locationLabel.trim() || "UK venues"}</p>
          </div>
          <button
            type="button"
            className={`rounded-xl bg-card px-3 py-2 text-xs font-semibold text-heading shadow-sm transition hover:bg-background ${SITE_FOCUS}`}
            onClick={onOpenFullMap}
          >
            Open full map
          </button>
        </div>

        <div className={`overflow-hidden rounded-2xl bg-background-2 ${mapHeightClass}`}>
          {mapEnabled ? (
            <MapErrorBoundary
              fallback={
                <MapPlaceholder
                  onLoad={() => {
                    setMapEnabled(false);
                    requestAnimationFrame(() => setMapEnabled(true));
                  }}
                />
              }
            >
              <VenueFinderMap
                venues={venues}
                selectedSlug={selectedSlug}
                mapCenter={mapCenter}
                onSelectVenue={onSelectVenue}
                onUserLocation={onUserLocation}
                className="h-full min-h-[280px] rounded-2xl border-0"
              />
            </MapErrorBoundary>
          ) : (
            <MapPlaceholder onLoad={() => setMapEnabled(true)} />
          )}
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
