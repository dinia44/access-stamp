import type { Venue as CanonicalVenue } from "@/data/venues";
import { VENUES } from "@/data/venues";
import {
  toVerificationLabel,
  toVerificationType,
  type VerificationType,
} from "@/lib/venue-verification";

/** Legacy venue shape used across finder, detail pages, and chat. */
export type Venue = {
  slug: string;
  name: string;
  location: string;
  type:
    | "Restaurant"
    | "Café"
    | "Hotel"
    | "Shopping"
    | "Arts & Culture"
    | "Leisure"
    | "Pub & Bar"
    | "Healthcare"
    | "Entertainment"
    | "Outdoor"
    | "Sports & Fitness";
  summary: string;
  tags: string[];
  verification: string;
  verificationType: VerificationType;
  lastUpdated: string;
  confidence: "High" | "Medium" | "Low";
  features: Record<string, "yes" | "no" | "unknown">;
  photos?: Array<{
    src: string;
    alt: string;
    label: string;
    measurement?: string;
  }>;
  locationSnapshot?: { src: string; alt: string };
  /** Canonical access score — hidden for demo listings in UI. */
  accessScore: number;
};

const LEGACY_TYPE_MAP: Record<CanonicalVenue["category"], Venue["type"]> = {
  Restaurant: "Restaurant",
  Café: "Café",
  "Arts & Culture": "Arts & Culture",
  Entertainment: "Entertainment",
  Leisure: "Leisure",
  Shopping: "Shopping",
  Outdoor: "Outdoor",
  Other: "Restaurant",
};

export function toLegacyVenue(venue: CanonicalVenue): Venue {
  const location = venue.postcodePrefix
    ? `${venue.town}, ${venue.postcodePrefix}`
    : venue.town;

  const verificationType = toVerificationType(venue.verification);

  return {
    slug: venue.slug,
    name: venue.name,
    location,
    type: LEGACY_TYPE_MAP[venue.category],
    summary: venue.summary,
    tags: venue.tags,
    verification: toVerificationLabel(verificationType),
    verificationType,
    lastUpdated: venue.lastUpdated,
    confidence: venue.confidence,
    features: venue.featuresDetail,
    photos: venue.photos,
    locationSnapshot: venue.locationSnapshot,
    accessScore: venue.accessScore,
  };
}

export const SAMPLE_VENUES: Venue[] = VENUES.map(toLegacyVenue);
