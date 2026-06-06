import type { Venue } from "@/lib/mock-data";
import { SAMPLE_VENUE_CARDS, type SampleVenueCard } from "@/lib/venue-finder-samples";

/** Default grid order — 16 venues for 4×4 homepage grid */
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
