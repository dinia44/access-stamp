import {
  getCategoryAccent,
  themeFromSampleId,
} from "@/lib/venue-finder-category";
import type { SampleVenueCard } from "@/lib/venue-finder-samples";
import { getSampleVenuePhoto } from "@/lib/venue-finder-images";
import { SampleVerificationBadge } from "./venue-finder-badges";

function FeatureRow({ feature }: { feature: string }) {
  const lower = feature.toLowerCase();
  const icon =
    lower.includes("toilet") ? "🚻" : lower.includes("hearing") ? "👂" : lower.includes("lift") ? "🛗" : "♿";

  return (
    <span className="vf-sample-feature">
      <span aria-hidden="true">{icon}</span>
      <span>{feature}</span>
    </span>
  );
}

export function SampleVenueCardItem({ venue }: { venue: SampleVenueCard }) {
  const theme = venue.imageTheme ?? themeFromSampleId(venue.id);
  const accent = getCategoryAccent(theme);
  const photo = getSampleVenuePhoto(venue.id, theme);

  return (
    <li>
      <article className="vf-sample-card">
        <div className="vf-sample-card-accent" style={{ background: accent.accent }} aria-hidden="true" />
        <div className="vf-sample-card-body">
          <div className="vf-sample-card-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} className="vf-sample-card-photo" />
            <span
              className="vf-sample-card-category"
              style={{ color: accent.accent, background: accent.soft, borderColor: `${accent.accent}40` }}
            >
              {venue.categoryLabel.toUpperCase()}
            </span>
          </div>

          <div className="vf-sample-card-content">
            <h3 className="vf-sample-card-title">{venue.name}</h3>

            <div className="vf-sample-card-badges">
              <SampleVerificationBadge status={venue.verification} />
              {venue.secondaryVerification ? (
                <SampleVerificationBadge status={venue.secondaryVerification} />
              ) : null}
            </div>

            <div className="vf-sample-card-features">
              {venue.features.map((feature) => (
                <FeatureRow key={feature} feature={feature} />
              ))}
            </div>

            <p className="vf-sample-card-description">{venue.description}</p>

            <button
              type="button"
              className="vf-sample-card-cta"
              aria-label={`View access report for ${venue.name}`}
            >
              View access report
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}
