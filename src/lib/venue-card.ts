import type { Venue } from "@/lib/mock-data";
import type { VenueConfidenceStatus } from "@/components/design-system/venue-confidence-badge";

export function countVenueUnknowns(venue: Venue): number {
  return Object.values(venue.features).filter((value) => value === "unknown").length;
}

export function mapVenueVerificationStatus(verification: Venue["verification"]): VenueConfidenceStatus {
  if (verification === "Access Stamp checked") return "Access Stamp checked";
  if (verification === "Community reported") return "Community reported";
  return "Not yet verified";
}

export function venueNeedsCheckHref(slug: string) {
  return `/ai-toolkit/venue-fit-planner?venue=${encodeURIComponent(slug)}`;
}
