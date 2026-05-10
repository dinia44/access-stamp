import type { Venue } from "@/lib/mock-data";

/** Extra clearance (cm) assumed between chair outer width and clear opening — hinges, weather strips, approach angle. */
export const DOOR_CLEARANCE_CM = 5;

export type VenueAuditNumbers = {
  /** Narrowest door clear width found in photo captions, if parseable */
  doorClearCm: number | null;
  /** Turning space / circle diameter in cm from captions, if parseable */
  turningSpaceCm: number | null;
  /** Raw measurement strings from the audit */
  measurementNotes: string[];
};

export type UserChairDims = {
  overallWidthCm?: number;
  overallLengthCm?: number;
};

/**
 * Pull numeric doorway / turning data from verified-style photo captions (e.g. "Door width measured: 92cm").
 */
export function parseVenueAuditMeasurements(venue: Venue): VenueAuditNumbers {
  const measurementNotes: string[] = [];
  let doorClearCm: number | null = null;
  let turningSpaceCm: number | null = null;

  for (const p of venue.photos ?? []) {
    const m = p.measurement?.trim();
    if (!m) continue;
    measurementNotes.push(m);

    const lower = m.toLowerCase();
    const nums = m.match(/(\d+)\s*cm/gi) ?? [];

    if (/door|doorway|opening|entrance width|clear width/i.test(m) || (/width/i.test(m) && /door|opening/i.test(p.label))) {
      for (const chunk of nums) {
        const n = parseInt(chunk.replace(/[^\d]/g, ""), 10);
        if (!Number.isNaN(n) && n >= 60 && n <= 250) {
          doorClearCm = doorClearCm == null ? n : Math.min(doorClearCm, n);
        }
      }
    }

    if (/turning|circle|diameter/i.test(lower)) {
      const t = m.match(/(\d+)\s*cm/i);
      if (t) {
        const n = parseInt(t[1], 10);
        if (!Number.isNaN(n) && n >= 100 && n <= 400) turningSpaceCm = n;
      }
    }
  }

  return { doorClearCm, turningSpaceCm, measurementNotes };
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

/**
 * Compare user chair outer width to audited doorway / feature flags. Conservative copy — not a guarantee.
 */
export function assessChairAgainstVenue(chair: UserChairDims, venue: Venue): FitAssessment {
  const audit = parseVenueAuditMeasurements(venue);
  const w = chair.overallWidthCm;
  const detailLines: string[] = [];

  if (w == null) {
    return {
      summary: "Add your chair’s **overall outer width** in cm (widest point) to compare with this listing.",
      detailLines: [],
    };
  }

  const requiredOpening = w + DOOR_CLEARANCE_CM;

  if (audit.doorClearCm != null) {
    const ok = requiredOpening <= audit.doorClearCm;
    detailLines.push(
      `Audited door clear width (from listing photos/captions): **${audit.doorClearCm} cm**.`,
    );
    detailLines.push(
      `Your stated outer width **${w} cm** + allowance **${DOOR_CLEARANCE_CM} cm** → needs about **${requiredOpening} cm** clear opening.`,
    );
    return {
      summary: ok
        ? `On paper, **${w} cm** should clear an opening documented at **${audit.doorClearCm} cm**, allowing a small margin for approach angle and protruding parts — **confirm on the day** if anything feels tight.`
        : `The documented opening (**${audit.doorClearCm} cm**) is **tighter** than your chair plus a safe margin (**about ${requiredOpening} cm** needed). There may be another entrance, removable doors, or staff assistance — **call ahead** or choose a venue with confirmed wider openings.`,
      detailLines,
    };
  }

  const wide = venue.features["Wide doorways (80cm+)"];
  const turning = venue.features["Turning space (150cm+)"];

  if (wide === "yes") {
    detailLines.push('Listing flags **wide doorways (80 cm+)** — typical building regs reference ~800 mm clear; many chairs are wider than 75 cm outer.');
    const ok80 = requiredOpening <= 80;
    return {
      summary: ok80
        ? `The venue is flagged as having **doorways at least 80 cm** wide. Your **${w} cm** outer width plus margin (**~${requiredOpening} cm**) may still be snug at the minimum — worth **confirming measured clear width** with staff if you’re close to the limit.`
        : `Even with **80 cm+** doorways, your **${w} cm** chair needs about **${requiredOpening} cm** clear — **ask the venue for exact measurements** or pick a listing with photo-verified widths.`,
      detailLines,
    };
  }

  if (wide === "no") {
    detailLines.push('Listing indicates **wide doorways may not** meet the usual 80 cm+ expectation.');
    return {
      summary: `This listing suggests **narrow or unknown door widths**. With a **${w} cm** outer chair, **contact the venue** before travelling.`,
      detailLines,
    };
  }

  detailLines.push("No doorway width numbers in this listing yet — compare against photos or ask staff.");

  const turningNote =
    turning === "yes"
      ? " Turning space is flagged **150 cm+**, which helps once you’re inside."
      : turning === "no"
        ? " Turning space is flagged as **tight** — worth checking routes inside as well as doors."
        : "";

  return {
    summary: `We **don’t have a measured door width** on file for this place. Your chair is **${w} cm** wide (outer) — **ask for clear opening widths** at entrances you’ll use.${turningNote}`,
    detailLines,
  };
}

export function formatVenueAuditContextForPrompt(venue: Venue): string {
  const audit = parseVenueAuditMeasurements(venue);
  const lines = [
    `Venue: ${venue.name} (${venue.location})`,
    `Verification: ${venue.verification}; confidence: ${venue.confidence}; updated: ${venue.lastUpdated}`,
    `Summary: ${venue.summary}`,
    `Features: ${JSON.stringify(venue.features)}`,
  ];
  if (audit.measurementNotes.length) {
    lines.push(`Photo caption measurements: ${audit.measurementNotes.join(" | ")}`);
    lines.push(`Parsed: door clear cm ≈ ${audit.doorClearCm ?? "unknown"}, turning cm ≈ ${audit.turningSpaceCm ?? "unknown"}`);
  } else {
    lines.push("Photo caption measurements: none parsed.");
  }
  return lines.join("\n");
}
