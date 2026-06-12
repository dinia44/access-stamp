import Image from "next/image";
import Link from "next/link";
import { getHeroSampleVenue, getScoreBand } from "@/data/venues";
import { ScoreDisplay } from "@/components/venue/score-display";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { heroCollageImageUrl } from "@/lib/cloudinary-url";

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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

export function HomeHeroImageBand() {
  const venue = getHeroSampleVenue();
  const band = getScoreBand(venue.accessScore);
  const heroImage = venue.photos[0]?.src ?? CLOUDINARY_MEDIA.homepageHeroBackdrop;
  const heroAlt =
    venue.photos[0]?.alt ?? `${venue.name} exterior showing step-free approach`;
  const reportFeatures = venue.features.slice(0, 5).map((key) => ({
    label: FEATURE_LABELS[key] ?? key,
    value: "Yes",
  }));
  const listingHref = `/venue/${venue.slug}`;

  return (
    <section className="relative bg-[#FDFBF8] px-4 pb-16 pt-4 sm:px-6 lg:pb-20" aria-label="Sample access report">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative">
          <div className="overflow-hidden rounded-[24px] border-8 border-white bg-white shadow-[0_24px_64px_-24px_rgba(122,80,48,0.28)]">
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              <Image
                src={heroCollageImageUrl(heroImage)}
                alt={heroAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          </div>

          <article className="relative z-10 mx-auto mt-6 w-full max-w-md rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_20px_48px_-24px_rgba(122,80,48,0.2)] sm:p-7 lg:absolute lg:-right-4 lg:-top-10 lg:mt-0 lg:w-[min(100%,380px)] xl:-right-8">
            <div className="flex items-start gap-4">
              <ScoreDisplay score={venue.accessScore} showRing size="sm" />
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C8430F]">
                  Access report
                </p>
                <h2 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#20242E]">{venue.name}</h2>
                <p className="mt-1 text-sm text-[#4A5263]">{venue.town}</p>
                <Link
                  href={listingHref}
                  className="mt-2 inline-flex text-xs font-semibold text-[#C8430F] underline-offset-2 hover:underline"
                >
                  View listing
                </Link>
              </div>
            </div>

            <ul className="mt-5 divide-y divide-[#EFE5DA] border-y border-[#EFE5DA]">
              {reportFeatures.map(({ label, value }) => (
                <li key={label} className="flex items-center justify-between gap-4 py-2.5">
                  <span className="flex min-w-0 items-center gap-2.5 text-sm text-[#4A5263]">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EFF3E7] text-[#5F7444]">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {label}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-[#20242E]">{value}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-[#76808F]">
              {venue.verification} · {venue.confidence} confidence · {band}
            </p>

            <Link
              href={listingHref}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#EF5B25] text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(239,91,37,0.45)] transition hover:bg-[#D93E10]"
            >
              Full report
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
