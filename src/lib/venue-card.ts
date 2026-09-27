import type { Venue } from "@/lib/mock-data";
import type { VenueConfidenceStatus } from "@/components/design-system/venue-confidence-badge";
import {
  toVerificationLabel,
  toVerificationType,
} from "@/lib/venue-verification";

export function countVenueUnknowns(venue: Venue): number {
  return Object.values(venue.features).filter((value) => value === "unknown")
    .length;
}

export function mapVenueVerificationStatus(
  verification: Venue["verification"],
): VenueConfidenceStatus {
  return toVerificationLabel(toVerificationType(verification));
}

export function venueNeedsCheckHref(slug: string) {
  return `/venue/${encodeURIComponent(slug)}#venue-fit`;
}

export function isDemoVenue(venue: Venue): boolean {
  return (
    venue.verificationType === "demo" ||
    toVerificationType(venue.verification) === "demo"
  );
}
