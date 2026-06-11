"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { Venue } from "@/lib/mock-data";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { SITE_FOCUS } from "@/lib/site-design";
import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";
import { MapErrorBoundary } from "./map-error-boundary";
import { VenueFinderSelectedCard } from "./venue-finder-selected-card";

type MapComponentProps = {
  venues: Venue[];
  selectedSlug: string | null;
  mapCenter: VenueCoordinates | null;
  onSelectVenue: (slug: string | null) => void;
  onUserLocation?: (coords: VenueCoordinates) => void;
  className?: string;
};

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

function MapPlaceholder({
  loading,
  onLoad,
}: {
  loading: boolean;
  onLoad: () => void;
}) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-background-2 to-verified-pale px-6 text-center">
      <p className="text-sm font-semibold text-heading">Interactive map</p>
      <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
        Load the map to explore venue markers near your search. This keeps the page fast on first visit.
      </p>
      <button type="button" className={`${VF_BTN_PRIMARY} mt-5`} onClick={onLoad} disabled={loading}>
        {loading ? "Loading map…" : "Load map"}
      </button>
    </div>
  );
}

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
  mapEnabledByDefault?: boolean;
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
  mapEnabledByDefault = false,
}: Props) {
  const [mapEnabled, setMapEnabled] = useState(mapEnabledByDefault);
  const [mapLoading, setMapLoading] = useState(false);
  const [MapComponent, setMapComponent] = useState<ComponentType<MapComponentProps> | null>(null);
  const selectedVenue = venues.find((venue) => venue.slug === selectedSlug) ?? null;

  const handleLoadMap = () => {
    if (MapComponent || mapLoading) return;

    setMapLoading(true);
    import("./venue-finder-map")
      .then((mod) => {
        setMapComponent(() => mod.VenueFinderMap);
        setMapEnabled(true);
      })
      .catch(() => {
        setMapEnabled(false);
      })
      .finally(() => {
        setMapLoading(false);
      });
  };

  useEffect(() => {
    if (mapEnabledByDefault) handleLoadMap();
    // Only auto-load once when the panel is mounted on demand.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapEnabledByDefault]);

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
          {mapEnabled && MapComponent ? (
            <MapErrorBoundary fallback={<MapPlaceholder loading={false} onLoad={handleLoadMap} />}>
              <MapComponent
                venues={venues}
                selectedSlug={selectedSlug}
                mapCenter={mapCenter}
                onSelectVenue={onSelectVenue}
                onUserLocation={onUserLocation}
                className="h-full min-h-[280px] rounded-2xl border-0"
              />
            </MapErrorBoundary>
          ) : mapLoading ? (
            <MapLoadingState />
          ) : (
            <MapPlaceholder loading={mapLoading} onLoad={handleLoadMap} />
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
