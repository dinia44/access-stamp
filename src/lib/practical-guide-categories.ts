import type { AdviceCategorySlug } from "@/lib/content/types";

/** Categories using the practical guide step-by-step experience. */
export const PRACTICAL_GUIDE_CATEGORIES: AdviceCategorySlug[] = [
  "rights",
  "transport",
  "equipment",
  "workplace",
  "education",
  "care",
  "cars",
  "sport",
  "travel",
  "new-to-disability",
  "emergency",
];

export function isPracticalGuideCategory(categorySlug: AdviceCategorySlug): boolean {
  return PRACTICAL_GUIDE_CATEGORIES.includes(categorySlug);
}
