import type { VenueImageTheme } from "@/lib/venue-finder-category";

export type VenueFinderPhoto = {
  src: string;
  alt: string;
};

function u(photo: string, w = 800): string {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=80`;
}

/** Hero collage — matched to mockup: café entrance, accessible toilet, parking, venue exterior */
export const VENUE_FINDER_HERO_PHOTOS = {
  stepFreeEntrance: {
    src: u("photo-1559305616-3f99cd43e353", 900),
    alt: "Modern café entrance at night with level step-free access",
  },
  accessibleToilet: {
    src: u("photo-1584622650111-993a426fbf0a", 640),
    alt: "Accessible toilet with grab rails and wide transfer space",
  },
  blueBadgeParking: {
    src: u("photo-1617791160505-6ff0479f2068", 640),
    alt: "Blue Badge parking bay near a venue entrance",
  },
  venuePreview: {
    src: u("photo-1486406146926-c627a92ad1ab", 640),
    alt: "Modern brick and glass venue exterior",
  },
} as const;

/** Default sample listing photos — café interior, hotel exterior, accessible toilet */
export const SAMPLE_VENUE_PHOTOS: Record<string, VenueFinderPhoto> = {
  "sample-cafe": {
    src: u("photo-1554118811-1e0d58224f24", 640),
    alt: "Warm café interior with wooden tables and plants",
  },
  "sample-hotel": {
    src: u("photo-1542314831-068cd1dbfc13", 640),
    alt: "Modern hotel exterior with glass windows at dusk",
  },
  "sample-toilet": {
    src: u("photo-1584622650111-993a426fbf0a", 640),
    alt: "Bright accessible public toilet with grab bars and sink",
  },
};

/** Theme fallbacks when a live listing has no uploaded photo */
export const THEME_FALLBACK_PHOTOS: Record<VenueImageTheme, VenueFinderPhoto> = {
  cafe: {
    src: u("photo-1555396273-367ea4eb4db5", 640),
    alt: "Café entrance with level access",
  },
  hotel: {
    src: u("photo-1542314831-068cd1dbfc13", 640),
    alt: "Hotel building exterior",
  },
  toilet: {
    src: u("photo-1584622650111-993a426fbf0a", 640),
    alt: "Accessible toilet facility",
  },
  shop: {
    src: u("photo-1441986300917-64676bd600d8", 640),
    alt: "Shop storefront entrance",
  },
  attraction: {
    src: u("photo-1486406146926-c627a92ad1ab", 640),
    alt: "Public venue exterior",
  },
};

export function getSampleVenuePhoto(id: string, theme: VenueImageTheme): VenueFinderPhoto {
  return SAMPLE_VENUE_PHOTOS[id] ?? THEME_FALLBACK_PHOTOS[theme];
}

export function getThemeFallbackPhoto(theme: VenueImageTheme): VenueFinderPhoto {
  return THEME_FALLBACK_PHOTOS[theme];
}
