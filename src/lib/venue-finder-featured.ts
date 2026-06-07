import type { Venue } from "@/lib/mock-data";
import { SAMPLE_VENUE_CARDS, type SampleVenueCard } from "@/lib/venue-finder-samples";

/** Homepage shows featured venues first, then new listings — never the full directory */
export const HOME_VENUE_LIMIT = 6;

/** Curated flagship venues on the homepage */
export const HOME_FEATURED_VENUE_SLUGS = [
  "harbour-kitchen-liverpool",
  "royal-armouries-leeds",
  "gallery-cafe-manchester",
] as const;

/** Recently added venues on the homepage (after featured, up to HOME_VENUE_LIMIT total) */
export const HOME_NEW_VENUE_SLUGS = [
  "cardiff-community-hub",
  "pump-room-tea-room-bath",
  "tate-st-ives-gallery",
] as const;

/** Venue finder sort order — featured listings surface first in search results */
export const FEATURED_VENUE_SLUGS = [
  "harbour-kitchen-liverpool",
  "royal-armouries-leeds",
  "gallery-cafe-manchester",
  "riverside-cinema-leeds",
  "the-botanist-kitchen-manchester",
  "brighton-pier-pavilion",
  "riverside-arts-centre-bristol",
  "central-library-birmingham",
  "greenfield-shopping-village-leeds",
  "meadowhall-food-hall-sheffield",
  "botanical-gardens-manchester",
  "castle-view-restaurant-edinburgh",
  "gluckberry-woods-cafe-liverpool",
  "tate-st-ives-gallery",
  "cardiff-community-hub",
  "pump-room-tea-room-bath",
] as const;

export const FEATURED_SAMPLE_IDS = ["sample-cafe", "sample-hotel", "sample-toilet"] as const;

export type FeaturedVenueItem =
  | { kind: "venue"; venue: Venue }
  | { kind: "sample"; sample: SampleVenueCard };

export function getHomepageVenues(venues: Venue[]): Venue[] {
  const bySlug = new Map(venues.map((venue) => [venue.slug, venue]));
  const seen = new Set<string>();
  const result: Venue[] = [];

  for (const slug of [...HOME_FEATURED_VENUE_SLUGS, ...HOME_NEW_VENUE_SLUGS]) {
    if (result.length >= HOME_VENUE_LIMIT) break;
    if (seen.has(slug)) continue;
    const venue = bySlug.get(slug);
    if (venue) {
      result.push(venue);
      seen.add(slug);
    }
  }

  return result;
}

export function buildFeaturedVenueItems(venues: Venue[]): FeaturedVenueItem[] {
  const bySlug = new Map(venues.map((venue) => [venue.slug, venue]));
  const items: FeaturedVenueItem[] = [];

  for (const slug of FEATURED_VENUE_SLUGS) {
    const venue = bySlug.get(slug);
    if (venue) items.push({ kind: "venue", venue });
  }

  for (const id of FEATURED_SAMPLE_IDS) {
    const sample = SAMPLE_VENUE_CARDS.find((card) => card.id === id);
    if (sample) items.push({ kind: "sample", sample });
  }

  return items;
}
