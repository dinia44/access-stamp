import {
  getCategoryAccent,
  getImageGradient,
  type VenueImageTheme,
} from "@/lib/venue-finder-category";
import { VENUE_FINDER_HERO_PHOTOS } from "@/lib/venue-finder-images";

const COLLAGE_BLOCKS = [
  {
    label: "Step-free entrance",
    theme: "cafe" as VenueImageTheme,
    large: true,
    photo: VENUE_FINDER_HERO_PHOTOS.stepFreeEntrance,
  },
  {
    label: "Accessible toilet",
    theme: "toilet" as VenueImageTheme,
    large: false,
    photo: VENUE_FINDER_HERO_PHOTOS.accessibleToilet,
  },
  {
    label: "Blue Badge parking",
    theme: "hotel" as VenueImageTheme,
    large: false,
    photo: VENUE_FINDER_HERO_PHOTOS.blueBadgeParking,
  },
  {
    label: "Venue access preview",
    theme: "attraction" as VenueImageTheme,
    large: false,
    photo: VENUE_FINDER_HERO_PHOTOS.venuePreview,
  },
] as const;

export function HeroVisualPanel() {
  return (
    <div className="hidden lg:block" aria-hidden="true">
      <div className="vf-hero-collage">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--vf-gold)" }}>
          What you&apos;ll discover
        </p>
        <div className="vf-hero-collage-grid">
          {COLLAGE_BLOCKS.map((block) => (
            <div
              key={block.label}
              className={`vf-hero-collage-block vf-hero-collage-block--photo ${block.large ? "vf-hero-collage-block--large" : ""}`}
              style={{
                backgroundImage: `url(${block.photo.src}), ${getImageGradient(block.theme)}`,
              }}
            >
              <span className="sr-only">{block.photo.alt}</span>
              <span className="vf-hero-collage-label">{block.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Simplified mobile accent — scrollable preview chips */
export function HeroMobileAccent() {
  return (
    <div
      className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-hidden="true"
    >
      {COLLAGE_BLOCKS.map((block) => {
        const accent = getCategoryAccent(block.theme);
        return (
          <span
            key={block.label}
            className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{
              borderColor: `${accent.accent}55`,
              color: "var(--vf-hero-subtitle)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            {block.label}
          </span>
        );
      })}
    </div>
  );
}
