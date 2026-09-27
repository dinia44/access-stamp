import type { Venue } from "@/lib/mock-data";

/** Retained for existing imports; public venue suitability is never a single score. */
export const SCORE_METHODOLOGY_VERSION = "2026.09.1";

/** @deprecated Compare recorded features with the user's stated needs instead. */
export function calculateVenueScore(venue: Venue): null {
  void venue;
  return null;
}

/** Legacy score consumers receive no score for any verification state. */
export function getDisplayAccessScore(venue: Venue): null {
  void venue;
  return null;
}
