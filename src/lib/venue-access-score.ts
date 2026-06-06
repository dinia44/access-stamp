import type { Venue } from "@/lib/mock-data";
import { themeFromVenueType } from "@/lib/venue-finder-category";
import { getThemeFallbackPhoto } from "@/lib/venue-finder-images";
import { credibilityScore } from "@/lib/venue-finder";

export function computeAccessScore(venue: Venue): number {
  const values = Object.values(venue.features);
  const yesCount = values.filter((value) => value === "yes").length;
  const knownCount = values.filter((value) => value !== "unknown").length;
  const featurePct = knownCount ? (yesCount / knownCount) * 100 : 55;
  const credibility = credibilityScore(venue.verification, venue.confidence);
  const score = featurePct * 0.62 + credibility * 9 + venue.rating * 4;
  return Math.min(99, Math.max(42, Math.round(score)));
}

export function mockVenueDistanceKm(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % 97;
  }
  const km = (hash % 22) / 10 + 0.4;
  return `${km.toFixed(1)} km`;
}

export function getVenuePhoto(venue: Venue): { src: string; alt: string } {
  if (venue.photos?.[0]) {
    return { src: venue.photos[0].src, alt: venue.photos[0].alt };
  }
  return getThemeFallbackPhoto(themeFromVenueType(venue.type));
}
