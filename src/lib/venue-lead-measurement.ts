import type { Venue } from "@/data/venues";
import { toVerificationLabel, toVerificationType } from "@/lib/venue-verification";

export function getVenueLeadMeasurement(venue: Venue): string {
  if (venue.measurements?.entranceWidthCm) {
    const verification = toVerificationLabel(toVerificationType(venue.verification));
    const method =
      verification === "On-site audited"
        ? "measured on site"
        : verification === "Desk reviewed"
          ? "verified with the venue"
          : "reported";
    return `Entrance ${venue.measurements.entranceWidthCm} cm · ${method}`;
  }

  const measuredPhoto = venue.photos.find((photo) => photo.measurement);
  if (measuredPhoto?.measurement) {
    return `${measuredPhoto.label} · ${measuredPhoto.measurement.replace(/^Door width measured:\s*/i, "")}`;
  }

  return venue.summary.split(".")[0] ?? venue.summary;
}

export function getVenueConfidenceSealLabel(venue: Venue): "Measured" | "Verified" {
  const verification = toVerificationLabel(toVerificationType(venue.verification));
  return verification === "On-site audited" ? "Measured" : "Verified";
}
