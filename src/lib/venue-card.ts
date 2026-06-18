import type { Venue } from "@/lib/mock-data";
import type { VenueConfidenceStatus } from "@/components/design-system/venue-confidence-badge";
import { toVerificationLabel, toVerificationType } from "@/lib/venue-verification";

export function countVenueUnknowns(venue: Venue): number {
  return Object.values(venue.features).filter((value) => value === "unknown").length;
}

export function mapVenueVerificationStatus(verification: Venue["verification"]): VenueConfidenceStatus {
  const label = toVerificationLabel(toVerificationType(verification));
  if (label === "On-site audited" || label === "Desk reviewed") return label;
  if (label === "Community reported") return "Community reported";
  if (label === "Demo listing") return "Demo listing";
  if (label === "Venue submitted") return "Venue submitted";
  return "Not yet verified";
}

export function venueNeedsCheckHref(slug: string) {
  return `/ai-toolkit/venue-fit-planner?venue=${encodeURIComponent(slug)}`;
}

export function isDemoVenue(venue: Venue): boolean {
  return venue.verificationType === "demo" || venue.verification === "Demo listing";
}
