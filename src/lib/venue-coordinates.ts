import type { Venue } from "@/lib/mock-data";

export type VenueCoordinates = {
  lat: number;
  lng: number;
};

/** Approximate UK coordinates for sample listings — replace with geocoded CMS data later */
export const VENUE_COORDINATES: Record<string, VenueCoordinates> = {
  "harbour-kitchen-liverpool": { lat: 53.4084, lng: -2.9916 },
  "gallery-cafe-manchester": { lat: 53.4808, lng: -2.2426 },
  "riverside-cinema-leeds": { lat: 53.7997, lng: -1.5491 },
  "the-botanist-kitchen-manchester": { lat: 53.4839, lng: -2.2446 },
  "riverside-arts-centre-bristol": { lat: 51.4545, lng: -2.5879 },
  "greenfield-shopping-village-leeds": { lat: 53.8018, lng: -1.5472 },
  "botanical-gardens-manchester": { lat: 53.4603, lng: -2.2269 },
  "gluckberry-woods-cafe-liverpool": { lat: 53.3904, lng: -2.983 },
  "royal-armouries-leeds": { lat: 53.7915, lng: -1.5322 },
  "brighton-pier-pavilion": { lat: 50.8168, lng: -0.1368 },
  "central-library-birmingham": { lat: 52.4796, lng: -1.9085 },
  "meadowhall-food-hall-sheffield": { lat: 53.4144, lng: -1.4115 },
  "castle-view-restaurant-edinburgh": { lat: 55.9485, lng: -3.1999 },
  "tate-st-ives-gallery": { lat: 50.2144, lng: -5.4806 },
  "cardiff-community-hub": { lat: 51.4816, lng: -3.1791 },
  "pump-room-tea-room-bath": { lat: 51.3811, lng: -2.359 },
  "norwich-cathedral-refectory": { lat: 52.631, lng: 1.3014 },
};

export const UK_MAP_DEFAULT: VenueCoordinates = { lat: 53.48, lng: -2.24 };

export function getVenueCoordinates(venue: Venue): VenueCoordinates | null {
  return VENUE_COORDINATES[venue.slug] ?? null;
}

export type VenueWithCoordinates = Venue & { coordinates: VenueCoordinates };

export function attachVenueCoordinates(venues: Venue[]): VenueWithCoordinates[] {
  return venues.flatMap((venue) => {
    const coordinates = getVenueCoordinates(venue);
    return coordinates ? [{ ...venue, coordinates }] : [];
  });
}
