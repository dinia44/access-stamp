import {
  getCategoryAccent,
  getImageGradient,
  type VenueImageTheme,
} from "@/lib/venue-finder-category";

type Props = {
  theme: VenueImageTheme;
  label?: string;
  src?: string;
  alt?: string;
  className?: string;
};

export function VenueCardImage({ theme, label, src, alt, className = "" }: Props) {
  const accent = getCategoryAccent(theme);

  if (src) {
    return (
      <div className={`vf-venue-card-image ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? label ?? "Venue photo"} className="vf-venue-card-photo" />
        {label ? (
          <span className="vf-venue-card-image-label" style={{ borderColor: accent.accent }}>
            {label}
          </span>
        ) : null}
        <span className="vf-venue-card-image-overlay" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={`vf-venue-card-image vf-venue-card-image--placeholder ${className}`}
      style={{ background: getImageGradient(theme) }}
      role="img"
      aria-label={alt ?? label ?? `${accent.label} preview`}
    >
      <span className="vf-venue-card-image-pattern" aria-hidden="true" />
      <span className="vf-venue-card-image-overlay" aria-hidden="true" />
      {label ? <span className="vf-venue-card-image-label">{label}</span> : null}
    </div>
  );
}
