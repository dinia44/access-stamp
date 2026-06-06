import type { VenueImageTheme } from "@/lib/venue-finder-category";

export type VenueFinderPhoto = {
  src: string;
  alt: string;
};

function u(photo: string, w = 800, crop = "entropy"): string {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&crop=${crop}&w=${w}&q=82`;
}

/** Hero floating report previews — three overlapping cards from the mockup */
export const HERO_FLOAT_CARDS = [
  {
    id: "toilet",
    title: "Accessible toilet",
    report: "Step-free access · Wide door · L/R transfer",
    photo: {
      src: u("photo-1584622650111-993a426fbf0a", 520, "center"),
      alt: "Accessible toilet with grab rails and transfer space",
    },
    offset: "vf-hero-float-card--back",
  },
  {
    id: "cafe",
    title: "Café entrance",
    report: "Level access · Automatic door",
    photo: {
      src: u("photo-1559305616-3f99cd43e353", 520, "center"),
      alt: "Modern café storefront at night with level entrance",
    },
    offset: "vf-hero-float-card--mid",
  },
  {
    id: "venue",
    title: "Venue exterior",
    report: "Step-free route · Smooth path",
    photo: {
      src: u("photo-1486406146926-c627a92ad1ab", 520, "center"),
      alt: "Modern brick and glass building exterior",
    },
    offset: "vf-hero-float-card--front",
  },
] as const;

/** Default sample listing photos — warm interior, hotel dusk, accessible toilet */
export const SAMPLE_VENUE_PHOTOS: Record<string, VenueFinderPhoto> = {
  "sample-cafe": {
    src: u("photo-1493854034680-05fbe662e774", 720, "center"),
    alt: "Warm café interior with wooden tables and plants",
  },
  "sample-hotel": {
    src: u("photo-1566073770669-8ec7ac4d7db4", 720, "center"),
    alt: "Modern hotel exterior with glass windows at dusk",
  },
  "sample-toilet": {
    src: u("photo-1584622650111-993a426fbf0a", 720, "center"),
    alt: "Bright accessible public toilet with grab bars and sink",
  },
};

/** Theme fallbacks when a live listing has no uploaded photo */
export const THEME_FALLBACK_PHOTOS: Record<VenueImageTheme, VenueFinderPhoto> = {
  cafe: {
    src: u("photo-1554118811-1e0d58224f24", 640, "center"),
    alt: "Café interior with seating",
  },
  hotel: {
    src: u("photo-1566073770669-8ec7ac4d7db4", 640, "center"),
    alt: "Hotel building exterior",
  },
  toilet: {
    src: u("photo-1584622650111-993a426fbf0a", 640, "center"),
    alt: "Accessible toilet facility",
  },
  shop: {
    src: u("photo-1441986300917-64676bd600d8", 640, "center"),
    alt: "Shop storefront entrance",
  },
  attraction: {
    src: u("photo-1486406146926-c627a92ad1ab", 640, "center"),
    alt: "Public venue exterior",
  },
};

export function getSampleVenuePhoto(id: string, theme: VenueImageTheme): VenueFinderPhoto {
  return SAMPLE_VENUE_PHOTOS[id] ?? THEME_FALLBACK_PHOTOS[theme];
}

export function getThemeFallbackPhoto(theme: VenueImageTheme): VenueFinderPhoto {
  return THEME_FALLBACK_PHOTOS[theme];
}
