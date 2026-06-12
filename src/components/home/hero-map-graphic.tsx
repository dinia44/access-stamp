import Image from "next/image";
import Link from "next/link";
import { getHeroSampleVenue, getScoreBand } from "@/data/venues";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { heroCollageImageUrl } from "@/lib/cloudinary-url";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

const FEATURE_LABELS: Record<string, string> = {
  step_free: "Step-free entrance",
  accessible_toilet: "Accessible toilet",
  parking: "Accessible parking",
  seating: "Seating available",
  hearing_loop: "Hearing support",
  lift: "Lift available",
  quiet_space: "Quiet space",
  assistance: "Staff assistance",
};

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div
        className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border-4 border-[#5F7444] xl:h-[84px] xl:w-[84px]"
        aria-hidden
      >
        <span className="text-xl font-bold tracking-tight text-[#13201F] xl:text-2xl">{score}%</span>
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#76808F]">
        Access score
      </span>
    </div>
  );
}

function CollagePhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[16px] border-[4px] border-white bg-[#FFF3E8] shadow-[0_12px_32px_-16px_rgba(16,33,32,0.28)] ${className ?? ""}`}
    >
      <Image
        src={heroCollageImageUrl(src)}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 40vw, 260px"
        loading="lazy"
        className="object-cover"
      />
    </div>
  );
}

function HeroPhotoCollage({ venueName }: { venueName: string }) {
  const sample = getHeroSampleVenue();
  const photos = sample.photos.slice(0, 3);
  const fallbacks = [
    { src: CLOUDINARY_MEDIA.homepageVenueExterior, alt: `${venueName} exterior with accessible approach` },
    { src: CLOUDINARY_MEDIA.homepageVenueInterior, alt: `${venueName} interior with step-free route` },
    { src: CLOUDINARY_MEDIA.homepageMapPreview, alt: `Map preview near ${venueName}` },
  ];

  return (
    <div className="relative mx-auto aspect-[29/36] w-full max-w-[290px] xl:max-w-[310px]" aria-hidden="true">
      <CollagePhoto
        src={photos[0]?.src ?? fallbacks[0].src}
        alt={photos[0]?.alt ?? fallbacks[0].alt}
        className="absolute left-0 top-0 z-10 h-[52%] w-full"
      />
      <CollagePhoto
        src={photos[1]?.src ?? fallbacks[1].src}
        alt={photos[1]?.alt ?? fallbacks[1].alt}
        className="absolute bottom-[10%] right-0 z-20 h-[46%] w-[74%]"
      />
      <CollagePhoto
        src={photos[2]?.src ?? fallbacks[2].src}
        alt={photos[2]?.alt ?? fallbacks[2].alt}
        className="absolute bottom-0 left-0 z-30 h-[32%] w-[56%]"
      />
    </div>
  );
}

export function PlatformHeroGraphic() {
  const venue = getHeroSampleVenue();
  const band = getScoreBand(venue.accessScore);
  const reportFeatures = venue.features.slice(0, 5).map((key) => ({
    label: FEATURE_LABELS[key] ?? key,
    value: "Yes",
  }));
  const listingHref = `/venue/${venue.slug}`;

  return (
    <div className="relative w-full min-w-0 py-2 lg:py-0">
      <div className="ml-auto w-full max-w-[720px]">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5 xl:gap-6">
          <div className="relative w-full min-w-0 lg:max-w-[400px]">
            <article
              className="rounded-[24px] border border-[#F1D8C7] bg-white p-6 shadow-[0_20px_48px_-24px_rgba(240,74,22,0.16)] sm:p-7 xl:p-8"
              aria-label={`Sample access report for ${venue.name}`}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="sr-only">
                  {venue.accessScore}/100 · {band}
                </div>
                <ScoreRing score={venue.accessScore} />

                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C8430F]">
                    Access report
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#13201F] xl:text-xl">
                    {venue.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#5E6A66]">{venue.town}</p>
                  <Link
                    href={listingHref}
                    className="mt-2.5 inline-flex text-xs font-semibold text-[#C8430F] underline-offset-2 transition-colors hover:text-[#A3360C] hover:underline"
                  >
                    View listing
                  </Link>
                </div>
              </div>

              <ul className="mt-5 divide-y divide-[#F1D8C7] border-y border-[#F1D8C7] sm:mt-6">
                {reportFeatures.map(({ label, value }) => (
                  <li key={label} className="flex items-center justify-between gap-4 py-2.5 first:pt-3 last:pb-3 sm:py-3">
                    <span className="flex min-w-0 items-center gap-2.5 text-sm text-[#2A3836]">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EFF3E7] text-[#5F7444]">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {label}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-[#13201F]">{value}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-[#76808F]">
                {venue.verification} · {venue.confidence} confidence
              </p>

              <Link
                href={listingHref}
                className="mt-5 inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#EF5B25] text-sm font-semibold text-white shadow-sm shadow-[rgba(122,80,48,0.2)] transition-all duration-200 hover:bg-[#D93E10] sm:mt-6 sm:h-[52px]"
              >
                Full report
                <span aria-hidden>→</span>
              </Link>
            </article>
          </div>

          <div className="relative w-full min-w-0 pt-2 lg:pt-6">
            <HeroPhotoCollage venueName={venue.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
