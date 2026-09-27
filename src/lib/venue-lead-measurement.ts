import type { Venue } from "@/data/venues";
import { toVerificationType } from "@/lib/venue-verification";

export function getVenueLeadMeasurement(venue: Venue): string {
  if (venue.measurements?.entranceWidthCm) {
    const verification = toVerificationType(venue.verification);
    const method =
      verification === "onsite_audited"
        ? "measured on site"
        : verification === "desk_reviewed"
          ? "reviewed remotely"
          : verification === "demo"
            ? "demo measurement"
            : "reported";
    return `Entrance ${venue.measurements.entranceWidthCm} cm · ${method}`;
  }

  const measuredPhoto = venue.photos.find((photo) => photo.measurement);
  if (measuredPhoto?.measurement) {
    return `${measuredPhoto.label} · ${measuredPhoto.measurement.replace(/^Door width measured:\s*/i, "")}`;
  }

  return venue.summary.split(".")[0] ?? venue.summary;
}

/** Seal labels for teaser cards — never claim Verified for demo/unaudited data. */
export type ConfidenceSealLabel = "Measured" | "Demo example" | "Reported" | "Needs check";

export function getVenueConfidenceSealLabel(venue: Venue): ConfidenceSealLabel {
  const type = toVerificationType(venue.verification);

  if (type === "onsite_audited") return "Measured";
  if (type === "demo") return "Demo example";
  if (type === "community_reported" || type === "venue_submitted") return "Reported";
  if (type === "desk_reviewed") return "Reported";
  if (type === "unverified") return "Needs check";
  return "Needs check";
}
