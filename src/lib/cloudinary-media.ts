/**
 * Cloudinary and marketing media for Access Stamp.
 * Functional maps use MapLibre — these assets are decorative / UI only.
 */

const CLOUDINARY = "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto";

export const CLOUDINARY_MEDIA = {
  /** Generic UK city hero for marketing backgrounds */
  cityHero:
    process.env.NEXT_PUBLIC_CLOUDINARY_CITY_HERO ??
    `${CLOUDINARY}/v1778451836/8819d7d9-417c-49ce-9923-421d287d3e5d_pfvjhq.png`,
  /** Venue exterior — Harbour Kitchen overview */
  venueExterior:
    process.env.NEXT_PUBLIC_CLOUDINARY_VENUE_EXTERIOR ??
    `${CLOUDINARY}/v1778070383/harbour-overview_xhnawl.png`,
  /** Accessible café / interior */
  accessibleInterior:
    process.env.NEXT_PUBLIC_CLOUDINARY_ACCESSIBLE_INTERIOR ??
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
  /** Accessible toilet */
  accessibleToilet:
    process.env.NEXT_PUBLIC_CLOUDINARY_ACCESSIBLE_TOILET ??
    `${CLOUDINARY}/v1778070380/harbour-bathroom_rqjprt.png`,
  /** Custom map pin icon (SVG uploaded to Cloudinary — fallback to inline marker in map component) */
  mapPinIcon:
    process.env.NEXT_PUBLIC_CLOUDINARY_MAP_PIN ??
    `${CLOUDINARY}/v1778020323/hf_20260316_194533_646e53ea-1b19-46ee-a852-28090cc321e7_1_w1vnzs.png`,
  /** Placeholder when a venue has no photo */
  placeholderVenue:
    process.env.NEXT_PUBLIC_CLOUDINARY_PLACEHOLDER_VENUE ??
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  /** Empty state — no venues found */
  emptyState:
    process.env.NEXT_PUBLIC_CLOUDINARY_EMPTY_STATE ??
    "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=900&q=80",
  /** Stylised static map preview for homepage teaser (not interactive) */
  staticMapPreview:
    process.env.NEXT_PUBLIC_CLOUDINARY_STATIC_MAP_PREVIEW ??
    `${CLOUDINARY}/v1778451836/8819d7d9-417c-49ce-9923-421d287d3e5d_pfvjhq.png`,
} as const;
