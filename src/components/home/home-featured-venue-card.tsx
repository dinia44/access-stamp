import Link from "next/link";
import Image from "next/image";
import { VenueConfidenceBadge } from "@/components/design-system/venue-confidence-badge";
import type { Venue } from "@/lib/mock-data";
import { FeatureChip, getVenueFeatureChipItems } from "@/components/venue/feature-chip";
import { venueCardImageUrl } from "@/lib/cloudinary-url";
import { computeAccessScore, getVenuePhoto } from "@/lib/venue-access-score";
import { formatScoreLabel, getScoreBandStyle } from "@/lib/score-band";
import { KnownUnknowns } from "@/components/venue/KnownUnknowns";
import { countVenueUnknowns, isDemoVenue, mapVenueVerificationStatus, venueNeedsCheckHref } from "@/lib/venue-card";

export const VENUE_CARD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px";

type Props = {
  venue: Venue;
  distance: string;
  index?: number;
};

export function HomeFeaturedVenueCard({ venue, distance }: Props) {
  const photo = getVenuePhoto(venue);
  const imageSrc = venueCardImageUrl(photo.src);
  const featureChips = getVenueFeatureChipItems(venue).slice(0, 4);
  const score = computeAccessScore(venue);
  const bandStyle = score !== null ? getScoreBandStyle(score) : null;
  const href = `/venue/${venue.slug}`;
  const town = venue.location.split(",")[0]?.trim() ?? venue.location;
  const unknownCount = countVenueUnknowns(venue);
  const isDemo = isDemoVenue(venue);

  return (
    <li className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#EFE5DA] bg-white shadow-[0_12px_32px_-20px_rgba(122,80,48,0.14)]">
        <Link
          href={href}
          className="group block focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#EF5B25] focus-visible:outline-offset-4"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-[#FAF4ED]">
            <Image
              src={imageSrc}
              alt={photo.alt}
              fill
              sizes={VENUE_CARD_IMAGE_SIZES}
              loading="lazy"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
            />
            {score !== null && bandStyle ? (
              <span
                className="absolute left-3 top-3 inline-flex min-h-[28px] items-center rounded-full px-2.5 text-xs font-semibold shadow-sm"
                style={{ color: bandStyle.text, backgroundColor: bandStyle.background }}
              >
                {formatScoreLabel(score)}
              </span>
            ) : isDemo ? (
              <span className="absolute left-3 top-3 inline-flex min-h-[28px] items-center rounded-full bg-amber-100 px-2.5 text-xs font-semibold text-amber-950 shadow-sm">
                Demo listing
              </span>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C8430F]">{venue.type}</p>
            <h3 className="mt-1 text-base font-semibold text-[#20242E] group-hover:text-[#C8430F]">{venue.name}</h3>
            <p className="mt-0.5 text-sm text-[#4A5263]">{town}</p>

            <div className="mt-3">
              <VenueConfidenceBadge status={mapVenueVerificationStatus(venue.verification)} showHint={isDemo} />
            </div>

            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Access features">
              {featureChips.map((chip) => (
                <li key={chip.label}>
                  <FeatureChip icon={chip.icon} label={chip.label} />
                </li>
              ))}
            </ul>

            {unknownCount > 0 ? (
              <KnownUnknowns count={unknownCount} className="mt-3 text-xs text-[#76808F]" />
            ) : null}

            <p className="mt-auto pt-4 text-xs text-[#76808F]">
              {venue.confidence} confidence · {distance}
            </p>
          </div>
        </Link>

        <div className="grid gap-2 border-t border-[#EFE5DA] p-4 pt-0">
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#EF5B25] px-4 text-sm font-semibold text-white hover:bg-[#D93E10]"
          >
            View access details
          </Link>
          <Link
            href={venueNeedsCheckHref(venue.slug)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#EFE5DA] bg-white px-4 text-sm font-semibold text-[#20242E] hover:bg-[#FAF4ED]"
          >
            Check with my needs
          </Link>
        </div>
      </article>
    </li>
  );
}
