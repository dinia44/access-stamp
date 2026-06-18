/** Access Stamp semantic colour system — see globals.css for CSS variables. */

export const ADVICE_CATEGORY_TINT: Record<string, string> = {
  "/advice/rights": "#FFF3E8",
  "/advice/care": "#EDF7ED",
  "/advice/transport": "#FFFBEB",
  "/advice/equipment": "#FFF8F1",
  "/advice/workplace": "#FFF0E4",
  "/advice/education": "#FFE2D3",
  "/advice/emergency": "#FFFBEB",
  "/advice/new-to-disability": "#FFF8F1",
  "/advice/cars": "#FFFBEB",
  "/advice/sport": "#EDF7ED",
  "/advice/travel": "#FFF3E8",
};

export function adviceCategoryTint(href: string) {
  return ADVICE_CATEGORY_TINT[href] ?? "#FFF8F1";
}

import { toVerificationLabel, toVerificationType, type VerificationLabel } from "@/lib/venue-verification";

export type VerificationStatus = VerificationLabel | string;

export function verificationBadgeMeta(status: VerificationStatus) {
  const type = toVerificationType(status);
  const label = toVerificationLabel(type);

  switch (type) {
    case "onsite_audited":
      return { label, tone: "verified" as const };
    case "desk_reviewed":
      return { label, tone: "verified" as const };
    case "community_reported":
      return { label, tone: "community" as const };
    case "venue_submitted":
      return { label, tone: "blue" as const };
    case "demo":
      return { label, tone: "warning" as const };
    case "unverified":
      return { label, tone: "warning" as const };
    default:
      return { label: status, tone: "neutral" as const };
  }
}

export function confidenceBadgeMeta(level: string) {
  if (level === "High") return { label: "High confidence", tone: "verified" as const };
  if (level === "Medium") return { label: "Medium confidence", tone: "warning" as const };
  if (level === "Low") return { label: "Low confidence", tone: "error" as const };
  return { label: level, tone: "neutral" as const };
}
