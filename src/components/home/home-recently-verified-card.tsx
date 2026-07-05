import Image from "next/image";
import Link from "next/link";
import { HeroConfidenceSeal } from "@/components/home/hero-finder/hero-confidence-seal";
import { HOME_FOCUS } from "@/components/home/home-theme";
import type { Venue } from "@/data/venues";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { venueCardImageUrl } from "@/lib/cloudinary-url";
import { getVenueConfidenceSealLabel, getVenueLeadMeasurement } from "@/lib/venue-lead-measurement";

const CARD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px";

function getCanonicalVenuePhoto(venue: Venue): { src: string; alt: string } {
  const photo = venue.photos[0] ?? venue.images[0];
  if (photo) return { src: photo.src, alt: photo.alt };
  return {
    src: CLOUDINARY_MEDIA.placeholderVenue,
    alt: `${venue.name} venue photo`,
  };
}

type Props = {
  venue: Venue;
  distance: string;
};

export function HomeRecentlyVerifiedCard({ venue, distance }: Props) {
  const href = `/venue/${venue.slug}`;
  const town = venue.town;
  const sealLabel = getVenueConfidenceSealLabel(venue);
  const leadLine = getVenueLeadMeasurement(venue);
  const photo = getCanonicalVenuePhoto(venue);
  const imageSrc = venueCardImageUrl(photo.src);

  return (
    <li className="h-full">
      <article className="venue-card group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background-2)]">
          <Image
            src={imageSrc}
            alt={photo.alt}
            fill
            sizes={CARD_IMAGE_SIZES}
            loading="lazy"
            className="object-cover motion-safe:transition motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
          />
          <HeroConfidenceSeal label={sealLabel} className="right-3 top-3" />
        </div>

        <div className="relative flex flex-1 flex-col p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-primary)]">
            {venue.category}
            {distance ? (
              <span className="font-normal normal-case tracking-normal text-[var(--color-muted)]"> · {distance}</span>
            ) : null}
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[var(--color-text)]">
            <Link href={href} className={`venue-link text-[var(--color-text)] hover:text-[var(--color-primary)] ${HOME_FOCUS}`}>
              {venue.name}
              <span className="sr-only"> in {town}</span>
            </Link>
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{leadLine}</p>
        </div>
      </article>
    </li>
  );
}
