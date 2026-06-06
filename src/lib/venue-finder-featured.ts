import type { Venue } from "@/lib/mock-data";
import { SAMPLE_VENUE_CARDS, type SampleVenueCard } from "@/lib/venue-finder-samples";

/** Default grid order — Harbour Kitchen first, then other listings, then examples */
export const FEATURED_VENUE_SLUGS = [
  "harbour-kitchen-liverpool",
  "gallery-cafe-manchester",
  "the-botanist-kitchen-manchester",
  "gluckberry-woods-cafe-liverpool",
  "riverside-cinema-leeds",
  "riverside-arts-centre-bristol",
  "greenfield-shopping-village-leeds",
  "botanical-gardens-manchester",
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
