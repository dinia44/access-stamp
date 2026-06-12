import venueSeed from "./venue-seed.json";

export type VenueCategory =
  | "Restaurant"
  | "Café"
  | "Arts & Culture"
  | "Entertainment"
  | "Leisure"
  | "Shopping"
  | "Outdoor"
  | "Other";

export type VenueFeatureKey =
  | "step_free"
  | "accessible_toilet"
  | "parking"
  | "lift"
  | "hearing_loop"
  | "quiet_space"
  | "assistance"
  | "seating";

export type VenueVerification = "Community reported" | "Access Stamp audited";
export type VenueConfidence = "High" | "Medium" | "Low";
export type ScoreBandLabel = "Excellent access" | "Good access" | "Limited access";

export type VenueImage = {
  src: string;
  alt: string;
};

export type VenuePhoto = VenueImage & {
  label: string;
  measurement?: string;
};

export type VenueMeasurements = {
  entranceWidthCm: number;
  toiletDoorWidthCm: number;
  clearanceCm: number;
};

export type Venue = {
  id: string;
  slug: string;
  name: string;
  town: string;
  area: string;
  postcodePrefix: string;
  category: VenueCategory;
  accessScore: number;
  features: VenueFeatureKey[];
  images: VenueImage[];
  summary: string;
  verification: VenueVerification;
  confidence: VenueConfidence;
  lastUpdated: string;
  tags: string[];
  featuresDetail: Record<string, "yes" | "no" | "unknown">;
  photos: VenuePhoto[];
  locationSnapshot?: { src: string; alt: string };
  measurements?: VenueMeasurements;
};

type VenueSeedRecord = {
  id: string;
  slug: string;
  name: string;
  location: string;
  type: string;
  accessScore: number;
  summary: string;
  tags: string[];
  verification: "Community reported" | "Access Stamp checked" | "Not yet verified";
  lastUpdated: string;
  confidence: VenueConfidence;
  features: Record<string, "yes" | "no" | "unknown">;
  photos?: VenuePhoto[];
  locationSnapshot?: { src: string; alt: string };
};

const CATEGORY_MAP: Record<string, VenueCategory> = {
  Restaurant: "Restaurant",
  Café: "Café",
  "Arts & Culture": "Arts & Culture",
  Entertainment: "Entertainment",
  Leisure: "Leisure",
  Shopping: "Shopping",
  Outdoor: "Outdoor",
  Hotel: "Other",
  "Pub & Bar": "Other",
  Healthcare: "Other",
  "Sports & Fitness": "Other",
};

const MEASUREMENTS_BY_SLUG: Partial<Record<string, VenueMeasurements>> = {
  "harbour-kitchen-liverpool": {
    entranceWidthCm: 90,
    toiletDoorWidthCm: 80,
    clearanceCm: 5,
  },
};

function parseLocation(location: string): { town: string; area: string; postcodePrefix: string } {
  const parts = location.split(",").map((part) => part.trim());
  const town = parts[0] ?? location;
  const tail = parts.slice(1).join(", ");
  const postcodeMatch = tail.match(/\b([A-Z]{1,2}\d{1,2})\b/i);
  const postcodePrefix = (postcodeMatch?.[1]?.toUpperCase() ?? tail) || town;
  const area = tail.replace(/\b[A-Z]{1,2}\d{1,2}\b/i, "").trim() || town;
  return { town, area, postcodePrefix };
}

function mapVerification(
  verification: VenueSeedRecord["verification"],
): VenueVerification {
  if (verification === "Access Stamp checked") return "Access Stamp audited";
  return "Community reported";
}

function deriveFeatureKeys(
  features: Record<string, "yes" | "no" | "unknown">,
  tags: string[],
): VenueFeatureKey[] {
  const keys: VenueFeatureKey[] = [];
  if (features["Step-free entrance"] === "yes") keys.push("step_free");
  if (features["Accessible toilet"] === "yes") keys.push("accessible_toilet");
  if (features["Nearby Blue Badge parking"] === "yes") keys.push("parking");
  if (features["Lift access"] === "yes") keys.push("lift");
  if (tags.some((tag) => /hearing\s*loop/i.test(tag))) keys.push("hearing_loop");
  if (features["Quiet environment"] === "yes") keys.push("quiet_space");
  if (features["Staff disability awareness"] === "yes") keys.push("assistance");
  if (
    features["Turning space (150cm+)"] === "yes" ||
    features["Powered wheelchair suitable"] === "yes"
  ) {
    keys.push("seating");
  }
  return keys;
}

function toCanonicalVenue(record: VenueSeedRecord): Venue {
  const { town, area, postcodePrefix } = parseLocation(record.location);
  const photos = (record.photos ?? []).map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    label: photo.label,
    measurement: photo.measurement,
  }));

  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    town,
    area,
    postcodePrefix,
    category: CATEGORY_MAP[record.type] ?? "Other",
    accessScore: record.accessScore,
    features: deriveFeatureKeys(record.features, record.tags),
    images: photos.map(({ src, alt }) => ({ src, alt })),
    summary: record.summary,
    verification: mapVerification(record.verification),
    confidence: record.confidence,
    lastUpdated: record.lastUpdated,
    tags: record.tags,
    featuresDetail: record.features,
    photos,
    locationSnapshot: record.locationSnapshot,
    measurements: MEASUREMENTS_BY_SLUG[record.slug],
  };
}

export function getScoreBand(score: number): ScoreBandLabel {
  if (score >= 85) return "Excellent access";
  if (score >= 70) return "Good access";
  return "Limited access";
}

export const VENUES: Venue[] = (venueSeed as VenueSeedRecord[]).map(toCanonicalVenue);

export function getVenueBySlug(slug: string): Venue | undefined {
  return VENUES.find((venue) => venue.slug === slug);
}

/** Venue with the richest photo set — used for homepage hero sample report. */
export function getHeroSampleVenue(): Venue {
  return (
    VENUES.reduce<Venue | null>((best, venue) => {
      if (!best || venue.photos.length > best.photos.length) return venue;
      return best;
    }, null) ?? VENUES[0]
  );
}

export const HOME_VENUE_SLUGS = [
  "harbour-kitchen-liverpool",
  "royal-armouries-leeds",
  "gallery-cafe-manchester",
  "cardiff-community-hub",
  "pump-room-tea-room-bath",
  "tate-st-ives-gallery",
] as const;

export function getHomepageVenues(): Venue[] {
  const bySlug = new Map(VENUES.map((venue) => [venue.slug, venue]));
  return HOME_VENUE_SLUGS.map((slug) => bySlug.get(slug)).filter((venue): venue is Venue => Boolean(venue));
}
