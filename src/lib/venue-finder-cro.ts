import type { Venue } from "@/lib/mock-data";
import { FEATURED_VENUE_SLUGS } from "@/lib/venue-finder-featured";
import { AS_BTN_PRIMARY, AS_BTN_SECONDARY, AS_FOCUS, AS_INPUT } from "@/lib/design-system";

export const CRO_FILTER_CHIPS = [
  { label: "Wheelchair access", key: "__wheelchair_access" },
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Step-free entrance", key: "Step-free entrance" },
  { label: "Parking", key: "Nearby Blue Badge parking" },
  { label: "Quiet space", key: "Quiet environment" },
  { label: "Hearing loop", key: "__hearing_loop" },
  { label: "Assistance available", key: "Staff disability awareness" },
] as const;

export const VF_INPUT = AS_INPUT;

export const VF_BTN_PRIMARY = AS_BTN_PRIMARY;

export const VF_BTN_SECONDARY = AS_BTN_SECONDARY;

export function filterChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${AS_FOCUS}`;
  return active
    ? `${base} border-[#2563EB] bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/15`
    : `${base} border-[rgba(16,32,51,0.12)] bg-white text-[#102033] hover:border-[#2563EB]/25 hover:bg-[#F8F5EE]`;
}

export function sortVenuesFeaturedFirst(venues: Venue[]): Venue[] {
  const bySlug = new Map(venues.map((venue) => [venue.slug, venue]));
  const featured = FEATURED_VENUE_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean) as Venue[];
  const featuredSet = new Set(FEATURED_VENUE_SLUGS);
  const rest = venues.filter((venue) => !featuredSet.has(venue.slug as (typeof FEATURED_VENUE_SLUGS)[number]));
  return [...featured, ...rest];
}
