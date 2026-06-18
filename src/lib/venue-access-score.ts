import type { Venue } from "@/lib/mock-data";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { getDisplayAccessScore } from "@/lib/venue-score";
import { getVenueCoordinates, type VenueCoordinates } from "@/lib/venue-coordinates";
import { formatDistanceKm, haversineDistanceKm } from "@/lib/venue-geography";
import { themeFromVenueType } from "@/lib/venue-finder-category";
import { getThemeFallbackPhoto } from "@/lib/venue-finder-images";

/** Deterministic access score — returns null for demo/unverified listings. */
export function computeAccessScore(venue: Venue): number | null {
  return getDisplayAccessScore(venue);
}

export function mockVenueDistanceKm(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % 97;
  }
  const km = (hash % 22) / 10 + 0.4;
  return `${km.toFixed(1)} km`;
}

export function getVenueDistanceLabel(venue: Venue, userCenter?: VenueCoordinates | null): string {
  const coords = getVenueCoordinates(venue);
  if (userCenter && coords) {
    return formatDistanceKm(haversineDistanceKm(userCenter, coords));
  }
  return mockVenueDistanceKm(venue.slug);
}

export function getVenuePhoto(venue: Venue): { src: string; alt: string } {
  if (venue.photos?.[0]) {
    return { src: venue.photos[0].src, alt: venue.photos[0].alt };
  }
  const fallback = getThemeFallbackPhoto(themeFromVenueType(venue.type));
  return {
    src: fallback.src || CLOUDINARY_MEDIA.placeholderVenue,
    alt: fallback.alt || `${venue.name} placeholder image`,
  };
}
