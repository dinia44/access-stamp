"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  type MapRef,
  type ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import Supercluster from "supercluster";
import type { Venue } from "@/lib/mock-data";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { MAP_ATTRIBUTION, MAP_STYLE } from "@/lib/map-config";
import {
  attachVenueCoordinates,
  UK_MAP_DEFAULT,
  type VenueCoordinates,
  type VenueWithCoordinates,
} from "@/lib/venue-coordinates";
import { boundsFromCoordinates } from "@/lib/venue-geography";
import "maplibre-gl/dist/maplibre-gl.css";

type ClusterProperties = {
  cluster: boolean;
  cluster_id?: number;
  point_count?: number;
  venueSlug?: string;
};

type Props = {
  venues: Venue[];
  selectedSlug: string | null;
  mapCenter: VenueCoordinates | null;
  onSelectVenue: (slug: string | null) => void;
  onUserLocation?: (coords: VenueCoordinates) => void;
  className?: string;
};

function AccessStampPin({
  selected,
  clusterCount,
  onClick,
}: {
  selected?: boolean;
  clusterCount?: number;
  onClick?: () => void;
}) {
  if (clusterCount && clusterCount > 1) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border-2 border-white bg-[#F04A16] px-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F1D8C7]"
        aria-label={`${clusterCount} venues in this area`}
      >
        {clusterCount}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex h-11 w-11 items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F1D8C7] ${
        selected ? "scale-110" : ""
      }`}
      aria-label="Venue marker"
    >
      <span
        className={`absolute inset-0 rounded-full ${selected ? "bg-[#F04A16]/35 animate-ping" : ""}`}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CLOUDINARY_MEDIA.mapPinIcon}
        alt=""
        className={`relative h-10 w-10 object-contain drop-shadow-md ${selected ? "brightness-110" : ""}`}
      />
    </button>
  );
}

function syncBounds(map: maplibregl.Map): [number, number, number, number] | null {
  const mapBounds = map.getBounds();
  if (!mapBounds) return null;
  return [
    mapBounds.getWest(),
    mapBounds.getSouth(),
    mapBounds.getEast(),
    mapBounds.getNorth(),
  ];
}

export function VenueFinderMap({
  venues,
  selectedSlug,
  mapCenter,
  onSelectVenue,
  onUserLocation,
  className = "",
}: Props) {
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState({
    longitude: UK_MAP_DEFAULT.lng,
    latitude: UK_MAP_DEFAULT.lat,
    zoom: 5.5,
  });
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);
  const [zoom, setZoom] = useState(5.5);
  const [mapReady, setMapReady] = useState(false);

  const mappableVenues = useMemo(() => attachVenueCoordinates(venues), [venues]);

  const index = useMemo(() => {
    const clusterIndex = new Supercluster<ClusterProperties>({ radius: 56, maxZoom: 16 });
    clusterIndex.load(
      mappableVenues.map((venue) => ({
        type: "Feature" as const,
        properties: { cluster: false, venueSlug: venue.slug },
        geometry: {
          type: "Point" as const,
          coordinates: [venue.coordinates.lng, venue.coordinates.lat],
        },
      })),
    );
    return clusterIndex;
  }, [mappableVenues]);

  const venueBySlug = useMemo(() => {
    const lookup: Record<string, VenueWithCoordinates> = {};
    for (const venue of mappableVenues) lookup[venue.slug] = venue;
    return lookup;
  }, [mappableVenues]);

  const clusters = useMemo(() => {
    if (!bounds) return [];
    return index.getClusters(bounds, Math.round(zoom));
  }, [index, bounds, zoom]);

  const fitToVenues = useCallback(
    (items: VenueWithCoordinates[], center?: VenueCoordinates | null) => {
      const map = mapRef.current;
      if (!map) return;

      try {
        const points = items.map((v) => v.coordinates);
        if (center) points.push(center);
        const nextBounds = boundsFromCoordinates(points, items.length === 1 ? 0.04 : 0.12);
        if (nextBounds) {
          map.fitBounds(nextBounds, { padding: 48, duration: 700, maxZoom: 14 });
          return;
        }
      } catch {
        // Map may not be ready for fitBounds yet.
      }

      if (center) {
        try {
          map.flyTo({ center: [center.lng, center.lat], zoom: 12, duration: 700 });
        } catch {
          // Ignore flyTo failures during teardown.
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (!mapReady) return;

    if (mappableVenues.length) {
      fitToVenues(mappableVenues, mapCenter);
      return;
    }

    if (!mapCenter) return;

    try {
      mapRef.current?.flyTo({ center: [mapCenter.lng, mapCenter.lat], zoom: 12, duration: 700 });
    } catch {
      // Ignore flyTo failures during teardown.
    }
  }, [mapReady, mappableVenues, mapCenter, fitToVenues]);

  const handleMove = useCallback((event: ViewStateChangeEvent) => {
    setViewState(event.viewState);
    setZoom(event.viewState.zoom);
    const nextBounds = syncBounds(event.target);
    if (nextBounds) setBounds(nextBounds);
  }, []);

  const handleLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const nextBounds = syncBounds(map);
    if (nextBounds) setBounds(nextBounds);
    setMapReady(true);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-background-2 ${className}`}>
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        {...viewState}
        onMove={handleMove}
        onLoad={handleLoad}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <GeolocateControl
          position="bottom-right"
          trackUserLocation={false}
          onGeolocate={(event) => {
            onUserLocation?.({ lat: event.coords.latitude, lng: event.coords.longitude });
          }}
        />

        {mapCenter ? (
          <Marker longitude={mapCenter.lng} latitude={mapCenter.lat} anchor="center">
            <span
              className="inline-flex h-4 w-4 rounded-full border-2 border-white bg-[#F04A16] shadow-md"
              aria-label="Search centre"
            />
          </Marker>
        ) : null}

        {mapReady
          ? clusters.map((cluster) => {
              const [lng, lat] = cluster.geometry.coordinates;
              const props = cluster.properties as ClusterProperties;

              if (props.cluster) {
                return (
                  <Marker
                    key={`cluster-${cluster.id ?? `${lng}-${lat}`}`}
                    longitude={lng}
                    latitude={lat}
                    anchor="center"
                  >
                    <AccessStampPin
                      clusterCount={props.point_count}
                      onClick={() => {
                        try {
                          const expansionZoom = Math.min(
                            index.getClusterExpansionZoom(Number(cluster.id)),
                            16,
                          );
                          mapRef.current?.flyTo({
                            center: [lng, lat],
                            zoom: expansionZoom,
                            duration: 500,
                          });
                        } catch {
                          mapRef.current?.flyTo({ center: [lng, lat], zoom: 12, duration: 500 });
                        }
                      }}
                    />
                  </Marker>
                );
              }

              const venue = venueBySlug[props.venueSlug ?? ""];
              if (!venue) return null;

              return (
                <Marker key={venue.slug} longitude={lng} latitude={lat} anchor="bottom">
                  <AccessStampPin
                    selected={selectedSlug === venue.slug}
                    onClick={() => onSelectVenue(selectedSlug === venue.slug ? null : venue.slug)}
                  />
                </Marker>
              );
            })
          : null}
      </Map>

      <div className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-medium text-muted shadow-sm">
        {MAP_ATTRIBUTION}
      </div>
    </div>
  );
}
