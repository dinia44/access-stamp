import type { Venue } from "@/lib/mock-data";
import { SITE_BTN_PRIMARY, SITE_BTN_SECONDARY, SITE_FOCUS } from "@/lib/site-design";
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
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Blue Badge parking", key: "Nearby Blue Badge parking" },
  { label: "Quiet space", key: "Quiet environment" },
  { label: "Hearing loop", key: "__hearing_loop" },
  { label: "Assistance available", key: "Staff disability awareness" },
];

/** @deprecated Use VENUE_FINDER_QUICK_FILTERS — kept for any external imports */
export const CRO_FILTER_CHIPS = VENUE_FINDER_QUICK_FILTERS;

export const VF_INK = "#17201C";
export const VF_MUTED = "#4F5A53";
export const VF_PAGE_BG = "#F7F3EA";
export const VF_PANEL = "#FFFDF8";
export const VF_SAGE = "#EDF6EF";

export const VF_INPUT = `h-14 min-h-[44px] w-full rounded-2xl border border-stone-200 bg-white px-5 text-base text-[#17201C] placeholder:text-[#4F5A53]/80 transition-all duration-200 focus:border-[#17201C] focus:outline-none focus:ring-4 focus:ring-black/5 ${SITE_FOCUS}`;

export const VF_BTN_PRIMARY = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#17201C] px-6 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#26312B] ${SITE_FOCUS}`;

export const VF_BTN_SECONDARY = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-6 text-sm font-semibold text-[#17201C] transition-all duration-200 hover:border-[#17201C] hover:bg-[#F4EFE5] ${SITE_FOCUS}`;

export const VF_BTN_PRIMARY_ALT = SITE_BTN_PRIMARY;
export const VF_BTN_SECONDARY_ALT = SITE_BTN_SECONDARY;

export function filterChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${SITE_FOCUS}`;
  return active
    ? `${base} border-[#17201C] bg-[#17201C] text-white shadow-sm`
    : `${base} border-stone-200 bg-white text-[#26312B] shadow-sm hover:border-[#17201C] hover:bg-[#F4EFE5]`;
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
