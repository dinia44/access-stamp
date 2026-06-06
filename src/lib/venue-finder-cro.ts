import type { Venue } from "@/lib/mock-data";
import { FEATURED_VENUE_SLUGS } from "@/lib/venue-finder-featured";

export const CRO_FILTER_CHIPS = [
  { label: "Step-free access", key: "Step-free entrance" },
  { label: "Accessible toilet", key: "Accessible toilet" },
  { label: "Parking", key: "Nearby Blue Badge parking" },
  { label: "Lift access", key: "Lift access" },
  { label: "Hearing loop", key: "Staff disability awareness" },
  { label: "Changing Places", key: "Changing Places toilet" },
  { label: "Verified only", key: "__verified_checked" },
] as const;

export const VF_INPUT =
  "h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-500 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100";

export const VF_BTN_PRIMARY =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

export const VF_BTN_SECONDARY =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2";

export function filterChipClass(active: boolean) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2";
  return active
    ? `${base} border-blue-700 bg-blue-700 text-white`
    : `${base} border-slate-300 bg-white text-slate-700 hover:border-slate-400`;
}

export function sortVenuesFeaturedFirst(venues: Venue[]): Venue[] {
  const bySlug = new Map(venues.map((venue) => [venue.slug, venue]));
  const featured = FEATURED_VENUE_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean) as Venue[];
  const featuredSet = new Set(FEATURED_VENUE_SLUGS);
  const rest = venues.filter((venue) => !featuredSet.has(venue.slug as (typeof FEATURED_VENUE_SLUGS)[number]));
  return [...featured, ...rest];
}
