import type { Venue } from "@/lib/mock-data";
import {
  shouldShowAccessScore,
  toVerificationType,
  type VerificationType,
} from "@/lib/venue-verification";

export type ScoreCategory = {
  id: string;
  label: string;
  weight: number;
  score: number;
  evidenceCoverage: number;
};

export type VenueScore = {
  total: number;
  categories: ScoreCategory[];
  unknownPenalty: number;
  calculatedAt: string;
  methodologyVersion: string;
};

export const SCORE_METHODOLOGY_VERSION = "2026.06.1";

const CATEGORY_DEFINITIONS: Array<{ id: string; label: string; weight: number; features: string[] }> = [
  {
    id: "entrance",
    label: "Entrance & approach",
    weight: 0.25,
    features: ["Step-free entrance", "Ramp access", "Automatic doors", "Wide doorways (80cm+)"],
  },
  {
    id: "inside",
    label: "Inside the venue",
    weight: 0.25,
    features: ["Turning space (150cm+)", "Lift access", "Quiet environment", "Powered wheelchair suitable"],
  },
  {
    id: "toilets",
    label: "Toilets",
    weight: 0.25,
    features: ["Accessible toilet", "Changing Places toilet"],
  },
  {
    id: "support",
    label: "Parking & support",
    weight: 0.25,
    features: ["Nearby Blue Badge parking", "Staff disability awareness"],
  },
];

function featureStatusScore(status: "yes" | "no" | "unknown" | undefined): number | null {
  if (status === "yes") return 100;
  if (status === "no") return 0;
  return null;
}

function verificationBonus(type: VerificationType): number {
  switch (type) {
    case "onsite_audited":
      return 8;
    case "desk_reviewed":
      return 5;
    case "venue_submitted":
      return 3;
    case "community_reported":
      return 2;
    default:
      return 0;
  }
}

function confidenceBonus(confidence: string): number {
  if (confidence === "High") return 4;
  if (confidence === "Medium") return 2;
  return 0;
}

export function calculateVenueScore(venue: Venue): VenueScore | null {
  const verificationType = toVerificationType(venue.verificationType ?? venue.verification);
  if (!shouldShowAccessScore(verificationType)) {
    return null;
  }

  const categories: ScoreCategory[] = CATEGORY_DEFINITIONS.map((category) => {
    const statuses = category.features.map((feature) => venue.features[feature]);
    const known = statuses.filter((status) => status !== undefined && status !== "unknown");
    const yesCount = known.filter((status) => status === "yes").length;
    const score = known.length ? Math.round((yesCount / known.length) * 100) : 0;
    const evidenceCoverage = statuses.length ? known.length / statuses.length : 0;
    return {
      id: category.id,
      label: category.label,
      weight: category.weight,
      score,
      evidenceCoverage,
    };
  });

  const weightedTotal = categories.reduce((sum, category) => sum + category.score * category.weight, 0);
  const unknownCount = Object.values(venue.features).filter((value) => value === "unknown").length;
  const unknownPenalty = Math.min(15, unknownCount * 2);
  const bonus = verificationBonus(verificationType) + confidenceBonus(venue.confidence);
  const total = Math.min(99, Math.max(0, Math.round(weightedTotal - unknownPenalty + bonus)));

  return {
    total,
    categories,
    unknownPenalty,
    calculatedAt: new Date().toISOString(),
    methodologyVersion: SCORE_METHODOLOGY_VERSION,
  };
}

export function getDisplayAccessScore(venue: Venue): number | null {
  const calculated = calculateVenueScore(venue);
  return calculated?.total ?? null;
}
