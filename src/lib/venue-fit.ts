import type { Venue } from "@/lib/mock-data";

/** Extra clearance (cm) assumed between chair outer width and clear opening — hinges, weather strips, approach angle. */
export const DOOR_CLEARANCE_CM = 5;

export type VenueOpening = { label: string; widthCm: number };
export type VenueAuditNumbers = {
  doorClearCm: number | null;
  turningSpaceCm: number | null;
  measurementNotes: string[];
  openings: VenueOpening[];
};

export type UserChairDims = {
  overallWidthCm?: number;
  overallLengthCm?: number;
};

/** Structured measurements take priority over legacy photo-caption parsing. */
export function parseVenueAuditMeasurements(venue: Venue): VenueAuditNumbers {
  const openings: VenueOpening[] = [];
  const valid = (value: number | undefined): value is number => value != null && Number.isFinite(value) && value > 0;
  if (valid(venue.measurements?.entranceWidthCm)) openings.push({ label: "Entrance", widthCm: venue.measurements.entranceWidthCm });
  if (valid(venue.measurements?.toiletDoorWidthCm)) openings.push({ label: "Toilet door", widthCm: venue.measurements.toiletDoorWidthCm });
  let turningSpaceCm: number | null = null;
  const measurementNotes: string[] = openings.map(({ label, widthCm }) => `${label}: ${widthCm} cm`);
  const hasStructuredOpenings = openings.length > 0;
  for (const photo of venue.photos ?? []) {
    const measurement = photo.measurement?.trim();
    if (!measurement) continue;
    if (/turning|circle|diameter/i.test(measurement)) {
      const value = measurement.match(/(\d+(?:\.\d+)?)\s*cm/i);
      if (value) turningSpaceCm = Number(value[1]);
    }
    if (!hasStructuredOpenings && /door|doorway|opening|entrance width|clear width/i.test(measurement)) {
      const value = measurement.match(/(\d+(?:\.\d+)?)\s*cm/i);
      if (value && Number(value[1]) > 0) {
        openings.push({ label: photo.label, widthCm: Number(value[1]) });
        measurementNotes.push(measurement);
      }
    }
  }
  return { openings, doorClearCm: openings.length ? Math.min(...openings.map((opening) => opening.widthCm)) : null, turningSpaceCm, measurementNotes };
}

/**
 * Best-effort parse of user-supplied chair dimensions from chat or form input.
 */
export function parseUserChairDimensions(text: string): UserChairDims {
  const t = text.trim();
  if (!t) return {};

  const xy = t.match(/\b(\d{2,3})\s*[x×]\s*(\d{2,3})\s*(?:cm)?\b/i);
  if (xy) {
    const a = parseInt(xy[1], 10);
    const b = parseInt(xy[2], 10);
    const w = Math.min(a, b);
    const l = Math.max(a, b);
    return { overallWidthCm: w, overallLengthCm: l };
  }

  const widthMatch =
    t.match(/\b(?:overall\s+)?width\s*:?\s*(\d{2,3})\s*cm\b/i) ??
    t.match(/\b(\d{2,3})\s*cm\s*(?:wide|width|across)\b/i) ??
    t.match(/\bchair\s+(?:is\s+)?(\d{2,3})\s*cm\b/i);
  if (widthMatch) {
    const w = parseInt(widthMatch[1], 10);
    if (!Number.isNaN(w)) return { overallWidthCm: w };
  }

  const loneCm = t.match(/\b(\d{2,3})\s*cm\b/);
  if (loneCm && /fit|door|through|narrow|venue|clear|will/i.test(t)) {
    const w = parseInt(loneCm[1], 10);
    if (!Number.isNaN(w) && w >= 40 && w <= 120) return { overallWidthCm: w };
  }

  return {};
}

export type FitAssessment = {
  summary: string;
  detailLines: string[];
};

/** Compare every documented opening; never infer whole-venue suitability. */
export function assessChairAgainstVenue(chair: UserChairDims, venue: Venue): FitAssessment {
  const width = chair.overallWidthCm;
  if (width == null || !Number.isFinite(width) || width < 40 || width > 130) {
    return { summary: "Enter your chair’s overall outer width between 40 and 130 cm.", detailLines: [] };
  }
  const audit = parseVenueAuditMeasurements(venue);
  const required = width + DOOR_CLEARANCE_CM;
  const demo = venue.verificationType === "demo" || venue.verification === "Demo listing";
  const detailLines = [
    ...(demo ? ["Demonstration measurements only — this result is not evidence for a real visit."] : []),
    `Chair width ${width} cm + planning allowance ${DOOR_CLEARANCE_CM} cm = ${required} cm required clear opening.`,
    ...audit.openings.map(({ label, widthCm }) => `${label}: ${widthCm} cm — ${required <= widthCm ? "within the listed width including allowance" : "insufficient clearance including allowance"}.`),
    "This checks only the listed widths. Internal routes, turning space, door operation and temporary obstructions still need checking.",
  ];
  if (!audit.openings.length) {
    return { summary: "No measured doorway widths are available. A feature label alone cannot establish whether your chair fits.", detailLines };
  }
  const barriers = audit.openings.filter((opening) => required > opening.widthCm);
  return {
    summary: barriers.length
      ? `Insufficient clearance at ${barriers.map((opening) => opening.label.toLowerCase()).join(" and ")}: your chair plus allowance needs ${required} cm.`
      : "Within the listed doorway widths, including the planning allowance. This does not establish access throughout the venue.",
    detailLines,
  };
}

export function formatVenueAuditContextForPrompt(venue: Venue): string {
  const audit = parseVenueAuditMeasurements(venue);
  const lines = [
    `Venue: ${venue.name} (${venue.location})`,
    venue.verificationType === "demo"
      ? "DEMONSTRATION ONLY: all features, dates and measurements are illustrative, not verified facts. Do not recommend this listing for a real visit."
      : `Verification: ${venue.verification}; confidence: ${venue.confidence}; updated: ${venue.lastUpdated}`,
    `Summary: ${venue.summary}`,
    `Features: ${JSON.stringify(venue.features)}`,
  ];
  if (audit.measurementNotes.length) {
    lines.push(`Listing measurements: ${audit.measurementNotes.join(" | ")}`);
    lines.push(`Parsed: door clear cm ≈ ${audit.doorClearCm ?? "unknown"}, turning cm ≈ ${audit.turningSpaceCm ?? "unknown"}`);
  } else {
    lines.push("Photo caption measurements: none parsed.");
  }
  return lines.join("\n");
}
