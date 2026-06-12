import type { Venue } from "@/lib/mock-data";
import { formatScoreLabel, getScoreBandStyle } from "@/lib/score-band";
import {
  SITE_BTN_PRIMARY,
  SITE_BTN_SECONDARY,
  SITE_COLORS,
  SITE_FOCUS,
  SITE_PAGE_BG,
} from "@/lib/site-design";
import { FEATURED_VENUE_SLUGS } from "@/lib/venue-finder-featured";

export type VenueFilterChip = { label: string; key: string };

export type VenueFilterGroup = {
  title: string;
  filters: VenueFilterChip[];
};

export const VENUE_FINDER_FILTER_GROUPS: VenueFilterGroup[] = [
  {
    title: "Mobility",
    filters: [
      { label: "Step-free entrance", key: "Step-free entrance" },
      { label: "Wheelchair access", key: "__wheelchair_access" },
      { label: "Lift available", key: "Lift access" },
    ],
  },
  {
    title: "Facilities",
    filters: [
      { label: "Accessible toilet", key: "Accessible toilet" },
      { label: "Blue Badge parking", key: "Nearby Blue Badge parking" },
      { label: "Seating available", key: "__seating_available" },
    ],
  },
  {
    title: "Sensory / support",
    filters: [
      { label: "Quiet space", key: "Quiet environment" },
      { label: "Hearing loop", key: "__hearing_loop" },
      { label: "Staff assistance", key: "Staff disability awareness" },
    ],
  },
];

export const VENUE_FINDER_QUICK_FILTERS: VenueFilterChip[] = [
  { label: "Step-free entrance", key: "Step-free entrance" },
  { label: "Wheelchair access", key: "__wheelchair_access" },
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Blue Badge parking", key: "Nearby Blue Badge parking" },
  { label: "Quiet space", key: "Quiet environment" },
  { label: "Hearing loop", key: "__hearing_loop" },
  { label: "Assistance available", key: "Staff disability awareness" },
];

/** @deprecated Use VENUE_FINDER_QUICK_FILTERS — kept for any external imports */
export const CRO_FILTER_CHIPS = VENUE_FINDER_QUICK_FILTERS;

/** Site-aligned venue finder tokens */
export const VF_INK = SITE_COLORS.ink;
export const VF_MUTED = SITE_COLORS.muted;
export const VF_ACCENT = SITE_COLORS.secondary;
export const VF_PRIMARY = SITE_COLORS.primary;
export const VF_PAGE_BG = SITE_PAGE_BG;
export const VF_PANEL = SITE_COLORS.white;
export const VF_SAGE = "var(--verified-pale)";
export const VF_SAGE_SOFT = "var(--background-2)";
export const VF_WARM = "var(--background-3)";

export const VF_TEXT_INK = "text-heading";
export const VF_TEXT_MUTED = "text-muted";
export const VF_TEXT_ACCENT = "text-[var(--color-secondary)]";
export const VF_BG_PAGE = "bg-background";
export const VF_BG_SOFT = "bg-background-2";
export const VF_BG_TRUST = "bg-verified-pale";
export const VF_BORDER = "border-border";

export const VF_INPUT = `h-16 min-h-[44px] w-full rounded-2xl border border-border bg-card px-5 text-base text-heading placeholder:text-muted/80 transition-all duration-200 focus:border-[var(--color-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/15 ${SITE_FOCUS}`;

export const VF_BTN_PRIMARY = SITE_BTN_PRIMARY;

export const VF_BTN_SECONDARY = SITE_BTN_SECONDARY;

export const VF_BTN_PRIMARY_ALT = SITE_BTN_PRIMARY;
export const VF_BTN_SECONDARY_ALT = SITE_BTN_SECONDARY;

export function filterChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${SITE_FOCUS}`;
  return active
    ? `${base} border-heading bg-heading text-white shadow-sm`
    : `${base} border-border bg-card text-text shadow-sm hover:border-[var(--color-border-mid)] hover:bg-background-2`;
}

export function getAccessScorePresentation(score: number): {
  label: string;
  badgeClass: string;
  formatted: string;
  textColor: string;
  backgroundColor: string;
} {
  const band = getScoreBandStyle(score);
  return {
    label: band.label,
    formatted: formatScoreLabel(score),
    textColor: band.text,
    backgroundColor: band.background,
    badgeClass: "font-semibold",
  };
}

export function labelForFilterKey(key: string): string {
  for (const group of VENUE_FINDER_FILTER_GROUPS) {
    const match = group.filters.find((chip) => chip.key === key);
    if (match) return match.label;
  }
  const quick = VENUE_FINDER_QUICK_FILTERS.find((chip) => chip.key === key);
  if (quick) return quick.label;
  return key.replace(/^__/, "").replace(/_/g, " ");
}

export function sortVenuesFeaturedFirst(venues: Venue[]): Venue[] {
  const bySlug = new Map(venues.map((venue) => [venue.slug, venue]));
  const featured = FEATURED_VENUE_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean) as Venue[];
  const featuredSet = new Set(FEATURED_VENUE_SLUGS);
  const rest = venues.filter((venue) => !featuredSet.has(venue.slug as (typeof FEATURED_VENUE_SLUGS)[number]));
  return [...featured, ...rest];
}
