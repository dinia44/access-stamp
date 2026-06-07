import type { Venue } from "@/lib/mock-data";
import { SITE_BTN_PRIMARY, SITE_BTN_SECONDARY, SITE_FOCUS } from "@/lib/site-design";
import { FEATURED_VENUE_SLUGS } from "@/lib/venue-finder-featured";

export const CRO_FILTER_CHIPS = [
  { label: "Wheelchair access", key: "__wheelchair_access" },
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Step-free entrance", key: "Step-free entrance" },
  { label: "Parking", key: "Nearby Blue Badge parking" },
  { label: "Quiet space", key: "Quiet environment" },
  { label: "Hearing loop", key: "__hearing_loop" },
  { label: "Assistance available", key: "Staff disability awareness" },
] as const;

export const VF_INPUT = `h-14 min-h-[44px] w-full rounded-2xl border border-[#E8C4A8] bg-white px-4 text-base text-[#13201F] placeholder:text-[#5E6A66]/80 transition-all duration-200 focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15 ${SITE_FOCUS}`;

export const VF_BTN_PRIMARY = SITE_BTN_PRIMARY;

export const VF_BTN_SECONDARY = SITE_BTN_SECONDARY;

export function filterChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${SITE_FOCUS}`;
  return active
    ? `${base} border-[#F04A16] bg-[#F04A16] text-white shadow-sm shadow-[#F04A16]/20`
    : `${base} border-[#F1D8C7] bg-white text-[#2A3836] hover:border-[#E8C4A8] hover:bg-[#FFF3E8] hover:text-[#13201F]`;
}

export function sortVenuesFeaturedFirst(venues: Venue[]): Venue[] {
  const bySlug = new Map(venues.map((venue) => [venue.slug, venue]));
  const featured = FEATURED_VENUE_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean) as Venue[];
  const featuredSet = new Set(FEATURED_VENUE_SLUGS);
  const rest = venues.filter((venue) => !featuredSet.has(venue.slug as (typeof FEATURED_VENUE_SLUGS)[number]));
  return [...featured, ...rest];
}
