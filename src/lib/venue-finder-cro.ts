import type { Venue } from "@/lib/mock-data";
import { SITE_FOCUS } from "@/lib/site-design";
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

export const VF_INPUT = `h-14 min-h-[44px] w-full rounded-2xl border border-[#93C5FD] bg-white px-4 text-base text-[#0B1D3A] placeholder:text-[#3B6B9A]/80 transition-all duration-200 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/15 ${SITE_FOCUS}`;

export const VF_BTN_PRIMARY = `inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 disabled:pointer-events-none disabled:opacity-60 ${SITE_FOCUS}`;

export const VF_BTN_SECONDARY = `inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-[#93C5FD] bg-white px-4 text-sm font-semibold text-[#1E3A5F] transition-all duration-200 hover:border-[#2563EB]/40 hover:bg-[#EFF6FF] hover:text-[#0B1D3A] ${SITE_FOCUS}`;

export function filterChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${SITE_FOCUS}`;
  return active
    ? `${base} border-blue-600 bg-blue-600 text-white shadow-sm shadow-[#2563EB]/20`
    : `${base} border-[#BFDBFE] bg-white text-[#1E3A5F] hover:border-[#93C5FD] hover:bg-[#EFF6FF] hover:text-[#0B1D3A]`;
}

export function sortVenuesFeaturedFirst(venues: Venue[]): Venue[] {
  const bySlug = new Map(venues.map((venue) => [venue.slug, venue]));
  const featured = FEATURED_VENUE_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean) as Venue[];
  const featuredSet = new Set(FEATURED_VENUE_SLUGS);
  const rest = venues.filter((venue) => !featuredSet.has(venue.slug as (typeof FEATURED_VENUE_SLUGS)[number]));
  return [...featured, ...rest];
}
