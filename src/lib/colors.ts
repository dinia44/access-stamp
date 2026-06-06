/** Access Stamp semantic colour system — see globals.css for CSS variables. */

export const ADVICE_CATEGORY_TINT: Record<string, string> = {
  "/advice/rights": "#EFF6FF",
  "/advice/care": "#F0FDFA",
  "/advice/transport": "#FFFBEB",
  "/advice/equipment": "#F8FAFC",
  "/advice/workplace": "#EEF2FF",
  "/advice/education": "#EFF6FF",
  "/advice/emergency": "#FFFBEB",
  "/advice/new-to-disability": "#F8FAFC",
  "/advice/cars": "#FFFBEB",
  "/advice/sport": "#F0FDFA",
  "/advice/travel": "#FFFBEB",
};

export function adviceCategoryTint(href: string) {
  return ADVICE_CATEGORY_TINT[href] ?? "#F8FAFC";
}

export type VerificationStatus = "Access Stamp checked" | "Community reported" | "Not yet verified" | string;

export function verificationBadgeMeta(status: VerificationStatus) {
  if (status === "Access Stamp checked") {
    return { label: "Access Stamp checked", tone: "verified" as const };
  }
  if (status === "Community reported") {
    return { label: "Community reported", tone: "community" as const };
  }
  if (status === "Not yet verified") {
    return { label: "Not yet verified", tone: "warning" as const };
  }
  if (status === "Major access concern") {
    return { label: "Major access concern", tone: "error" as const };
  }
  return { label: status, tone: "neutral" as const };
}

export function confidenceBadgeMeta(level: string) {
  if (level === "High") return { label: "High confidence", tone: "verified" as const };
  if (level === "Medium") return { label: "Medium confidence", tone: "warning" as const };
  if (level === "Low") return { label: "Low confidence", tone: "error" as const };
  return { label: level, tone: "neutral" as const };
}
