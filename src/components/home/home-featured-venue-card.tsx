import Image from "next/image";
import Link from "next/link";
import type { Venue } from "@/lib/mock-data";
import { FeatureChip, getVenueFeatureChipItems } from "@/components/venue/feature-chip";
import { venueCardImageUrl } from "@/lib/cloudinary-url";
import { computeAccessScore, getVenuePhoto } from "@/lib/venue-access-score";
import { formatScoreLabel, getScoreBandStyle } from "@/lib/score-band";

export const VENUE_CARD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px";

type Props = {
  venue: Venue;
  distance: string;
  index?: number;
};

export function HomeFeaturedVenueCard({ venue, distance }: Props) {
  const photo = getVenuePhoto(venue);
  const imageSrc = venueCardImageUrl(photo.src);
  const featureChips = getVenueFeatureChipItems(venue);
  const score = computeAccessScore(venue);
  const bandStyle = getScoreBandStyle(score);
  const href = `/venue/${venue.slug}`;
  const town = venue.location.split(",")[0]?.trim() ?? venue.location;
  const verificationLabel =
    venue.verification === "Access Stamp checked" ? "Access Stamp audited" : venue.verification;

  return (
    <li className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#EFE5DA] bg-white shadow-[0_12px_32px_-20px_rgba(122,80,48,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(122,80,48,0.2)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#EF5B25] focus-visible:outline-offset-4"
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
          <span
            className="absolute left-3 top-3 inline-flex min-h-[28px] items-center rounded-full px-2.5 text-xs font-semibold shadow-sm"
            style={{ color: bandStyle.text, backgroundColor: bandStyle.background }}
          >
            {formatScoreLabel(score)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C8430F]">{venue.type}</p>
          <h3 className="mt-1 text-base font-semibold text-[#20242E] group-hover:text-[#C8430F]">{venue.name}</h3>
          <p className="mt-0.5 text-sm text-[#4A5263]">{town}</p>

          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Access features">
            {featureChips.map((chip) => (
              <li key={chip.label}>
                <FeatureChip icon={chip.icon} label={chip.label} />
              </li>
            ))}
          </ul>

          <p className="mt-auto pt-4 text-xs text-[#76808F]">
            {verificationLabel} · {venue.confidence} confidence · {distance}
          </p>
        </div>
      </Link>
    </li>
  );
}
