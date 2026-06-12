import type { Venue as CanonicalVenue } from "@/data/venues";
import { VENUES } from "@/data/venues";

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
  rating: number;
  summary: string;
  tags: string[];
  verification: "Community reported" | "Access Stamp checked" | "Not yet verified";
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
  /** Canonical access score — single source of truth when present. */
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

function mapLegacyVerification(
  verification: CanonicalVenue["verification"],
  confidence: CanonicalVenue["confidence"],
): Venue["verification"] {
  if (verification === "Access Stamp audited") return "Access Stamp checked";
  if (confidence === "Low") return "Not yet verified";
  return "Community reported";
}

export function toLegacyVenue(venue: CanonicalVenue): Venue {
  const location = venue.postcodePrefix
    ? `${venue.town}, ${venue.postcodePrefix}`
    : venue.town;

  return {
    slug: venue.slug,
    name: venue.name,
    location,
    type: LEGACY_TYPE_MAP[venue.category],
    rating: Math.round((venue.accessScore / 20) * 10) / 10,
    summary: venue.summary,
    tags: venue.tags,
    verification: mapLegacyVerification(venue.verification, venue.confidence),
    lastUpdated: venue.lastUpdated,
    confidence: venue.confidence,
    features: venue.featuresDetail,
    photos: venue.photos,
    locationSnapshot: venue.locationSnapshot,
    accessScore: venue.accessScore,
  };
}

export const SAMPLE_VENUES: Venue[] = VENUES.map(toLegacyVenue);
