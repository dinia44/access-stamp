import type { Venue } from "@/lib/mock-data";
import { computeAccessScore } from "@/lib/venue-access-score";

export type AccessSnapshotLine = {
  category: string;
  value: string;
};

export type AccessConfidence = {
  label: string;
  score: number;
};

export function getAccessConfidence(venue: Venue): AccessConfidence {
  const score = computeAccessScore(venue);
  if (score >= 90) return { label: "Excellent access", score };
  if (score >= 75) return { label: "Good access", score };
  if (score >= 60) return { label: "Limited access", score };
  return { label: "Mixed access", score };
}

function featureLine(
  venue: Venue,
  key: string,
  yesText: string,
  unknownText: string,
): string {
  const value = venue.features[key];
  if (value === "yes") return yesText;
  if (value === "no") return "Not listed in report";
  return unknownText;
}

export function getVenueAccessSnapshot(venue: Venue): AccessSnapshotLine[] {
  const entrance =
    venue.features["Step-free entrance"] === "yes"
      ? "Step-free entrance listed"
      : venue.features["Ramp access"] === "yes"
        ? "Ramp access listed"
        : venue.features["Step-free entrance"] === "no"
          ? "Steps reported — check report"
          : "Entrance detail in report";

  const toilet = featureLine(
    venue,
    "Accessible toilet",
    "Accessible toilet listed",
    "Toilet detail in report",
  );

  const parking = featureLine(
    venue,
    "Nearby Blue Badge parking",
    "Blue Badge parking listed",
    "Parking detail in report",
  );

  let interior = "Interior detail in report";
  if (venue.features["Lift access"] === "yes") {
    interior = "Lift available";
  } else if (venue.features["Wide doorways (80cm+)"] === "yes") {
    interior = "Wide routes listed";
  } else if (venue.features["Turning space (150cm+)"] === "yes") {
    interior = "Spacious layout listed";
  }

  let support = "Support detail in report";
  if (venue.features["Staff disability awareness"] === "yes") {
    support = "Staff assistance listed";
  } else if (venue.features["Quiet environment"] === "yes") {
    support = "Quiet space listed";
  } else if (venue.tags.some((tag) => /hearing\s*loop/i.test(tag))) {
    support = "Hearing loop listed";
  }

  const confidenceNote =
    venue.verification === "Access Stamp checked"
      ? `${venue.confidence} confidence · Access Stamp checked`
      : venue.verification === "Community reported"
        ? `${venue.confidence} confidence · Community reported`
        : `${venue.confidence} confidence · Report needs checking`;

  return [
    { category: "Entrance", value: entrance },
    { category: "Toilet", value: toilet },
    { category: "Parking", value: parking },
    { category: "Interior", value: interior },
    { category: "Support", value: support },
    { category: "Confidence", value: confidenceNote },
  ];
}
