import type { Venue } from "@/lib/mock-data";
import { SAMPLE_VENUE_CARDS, type SampleVenueCard } from "@/lib/venue-finder-samples";

/** Hard cap — homepage must never show more than six venue cards */
export const HOME_VENUE_LIMIT = 6;

/**
 * Exactly six venues on the homepage.
 * Edit this list to change which venues appear — do not pull from the full directory.
 */
export const HOME_VENUE_SLUGS = [
  "harbour-kitchen-liverpool",
  "royal-armouries-leeds",
  "gallery-cafe-manchester",
  "cardiff-community-hub",
  "pump-room-tea-room-bath",
  "tate-st-ives-gallery",
] as const;

/** @deprecated Use HOME_VENUE_SLUGS — first three homepage venues */
export const HOME_FEATURED_VENUE_SLUGS = HOME_VENUE_SLUGS.slice(0, 3);

/** @deprecated Use HOME_VENUE_SLUGS — last three homepage venues */
export const HOME_NEW_VENUE_SLUGS = HOME_VENUE_SLUGS.slice(3);

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

  return HOME_VENUE_SLUGS.map((slug) => bySlug.get(slug))
    .filter((venue): venue is Venue => Boolean(venue))
    .slice(0, HOME_VENUE_LIMIT);
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
