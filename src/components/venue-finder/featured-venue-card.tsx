import Link from "next/link";
import {
  getCategoryAccent,
  themeFromSampleId,
  themeFromVenueType,
} from "@/lib/venue-finder-category";
import type { FeaturedVenueItem } from "@/lib/venue-finder-featured";
import { getSampleVenuePhoto, getThemeFallbackPhoto } from "@/lib/venue-finder-images";
import {
  SampleVerificationBadge,
  VenueFinderVerificationBadge,
} from "./venue-finder-badges";
import { mapVenueVerificationStatus } from "@/lib/venue-card";

function FeatureChip({ label }: { label: string }) {
  return (
    <span className="vf-featured-feature" title={label}>
      {label}
    </span>
  );
}

function FeaturedCardShell({
  href,
  accent,
  categoryLabel,
  imageSrc,
  imageAlt,
  title,
  badges,
  features,
  description,
  ctaLabel,
}: {
  href?: string;
  accent: string;
  categoryLabel: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  badges: React.ReactNode;
  features: string[];
  description: string;
  ctaLabel: string;
}) {
  const inner = (
    <>
      <div className="vf-featured-card-accent" style={{ background: accent }} aria-hidden="true" />
      <div className="vf-featured-card-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={imageAlt} className="vf-featured-card-photo" />
        <span className="vf-featured-card-category">{categoryLabel}</span>
      </div>
      <div className="vf-featured-card-content">
        <h3 className="vf-featured-card-title">{title}</h3>
        <div className="vf-featured-card-badges">{badges}</div>
        <div className="vf-featured-card-features">
          {features.slice(0, 3).map((feature) => (
            <FeatureChip key={feature} label={feature} />
          ))}
        </div>
        <p className="vf-featured-card-description">{description}</p>
        <span className="vf-featured-card-cta">{ctaLabel}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="vf-featured-card vf-featured-card--link">
        {inner}
      </Link>
    );
  }

  return <article className="vf-featured-card">{inner}</article>;
}

export function FeaturedVenueCardItem({ item }: { item: FeaturedVenueItem }) {
  if (item.kind === "venue") {
    const { venue } = item;
    const theme = themeFromVenueType(venue.type);
    const accent = getCategoryAccent(theme);
    const photo = venue.photos?.[0] ?? getThemeFallbackPhoto(theme);

    return (
      <li>
        <FeaturedCardShell
          href={`/venue/${venue.slug}`}
          accent={accent.accent}
          categoryLabel={venue.type.toUpperCase()}
          imageSrc={photo.src}
          imageAlt={photo.alt ?? `${venue.name} accessibility photo`}
          title={venue.name}
          badges={<VenueFinderVerificationBadge status={mapVenueVerificationStatus(venue.verification)} />}
          features={venue.tags}
          description={venue.summary}
          ctaLabel="View access report"
        />
      </li>
    );
  }

  const { sample } = item;
  const theme = sample.imageTheme ?? themeFromSampleId(sample.id);
  const accent = getCategoryAccent(theme);
  const photo = getSampleVenuePhoto(sample.id, theme);

  return (
    <li>
      <FeaturedCardShell
        accent={accent.accent}
        categoryLabel={sample.categoryLabel.toUpperCase()}
        imageSrc={photo.src}
        imageAlt={photo.alt}
        title={sample.name}
        badges={
          <>
            <SampleVerificationBadge status={sample.verification} />
            {sample.secondaryVerification ? (
              <SampleVerificationBadge status={sample.secondaryVerification} />
            ) : null}
          </>
        }
        features={sample.features}
        description={sample.description}
        ctaLabel="View access report"
      />
    </li>
  );
}

export function FeaturedVenueGrid({ items }: { items: FeaturedVenueItem[] }) {
  return (
    <ul className="vf-featured-grid">
      {items.map((item) => (
        <FeaturedVenueCardItem
          key={item.kind === "venue" ? item.venue.slug : item.sample.id}
          item={item}
        />
      ))}
    </ul>
  );
}
