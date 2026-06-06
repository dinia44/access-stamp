import {
  getCategoryAccent,
  themeFromSampleId,
} from "@/lib/venue-finder-category";
import type { SampleVenueCard } from "@/lib/venue-finder-samples";
import { getSampleVenuePhoto } from "@/lib/venue-finder-images";
import { SampleVerificationBadge } from "./venue-finder-badges";

function FeatureIcon({ feature }: { feature: string }) {
  const lower = feature.toLowerCase();
  const icon =
    lower.includes("toilet") ? "🚻" : lower.includes("hearing") ? "👂" : lower.includes("lift") ? "🛗" : lower.includes("parking") ? "🅿️" : "♿";

  return (
    <span className="vf-sample-feature" title={feature}>
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
        <div className="vf-sample-card-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} alt={photo.alt} className="vf-sample-card-photo" />
          <span
            className="vf-sample-card-category"
            style={{ color: accent.accent, background: accent.soft, borderColor: `${accent.accent}33` }}
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
              <FeatureIcon key={feature} feature={feature} />
            ))}
          </div>

          <p className="vf-sample-card-description">{venue.description}</p>

          <button
            type="button"
            className="vf-btn-primary vf-sample-card-cta"
            aria-label={`View access report for ${venue.name}`}
          >
            View access report
          </button>
        </div>
      </article>
    </li>
  );
}

export function SampleResultsIntro() {
  return (
    <p className="vf-results-subtitle">
      Example access reports — search above to find venues across the UK.
    </p>
  );
}
