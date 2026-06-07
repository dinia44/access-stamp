import Link from "next/link";
import type { ReactNode } from "react";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26 6.9.6-5.2 4.52 1.55 6.74L12 17.77l-6.15 3.35 1.55-6.74-5.2-4.52 6.9-.6L12 2z" />
    </svg>
  );
}

const ACCESS_FEATURES = [
  { label: "Step-free entrance", value: "Yes" },
  { label: "Accessible toilet", value: "Yes" },
  { label: "Accessible parking", value: "Yes" },
  { label: "Seating available", value: "Yes" },
  { label: "Hearing support", value: "Induction loop" },
] as const;

function ScoreRing() {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div className="relative flex h-[72px] w-[72px] items-center justify-center sm:h-[84px] sm:w-[84px]">
        <svg viewBox="0 0 84 84" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="42" cy="42" r="34" fill="none" stroke="#FFE2D3" strokeWidth="7" />
          <circle
            cx="42"
            cy="42"
            r="34"
            fill="none"
            stroke="#59682A"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${0.92 * 213.6} 213.6`}
          />
        </svg>
        <span className="relative text-xl font-bold tracking-tight text-[#13201F] sm:text-2xl">92%</span>
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#59682A]">
        Access Score
      </span>
    </div>
  );
}

function FloatingBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-[#F1D8C7] bg-white px-3 py-2 shadow-md shadow-[#F04A16]/8 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function CollagePhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[18px] border-[4px] border-white bg-white shadow-[0_14px_36px_-18px_rgba(16,33,32,0.3)] ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

function HeroPhotoCollage() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <CollagePhoto
        src={CLOUDINARY_MEDIA.homepageVenueExterior}
        alt="Modern café entrance with accessible ramp"
        className="absolute left-[2%] top-0 z-10 h-[54%] w-[88%]"
      />
      <CollagePhoto
        src={CLOUDINARY_MEDIA.homepageVenueInterior}
        alt="Cozy accessible café interior with ramp to counter"
        className="absolute bottom-[8%] right-0 z-20 h-[50%] w-[68%]"
      />
      <CollagePhoto
        src={CLOUDINARY_MEDIA.homepageMapPreview}
        alt="Stylised map with route and access pins"
        className="absolute bottom-0 left-0 z-30 h-[36%] w-[52%]"
      />
    </div>
  );
}

export function PlatformHeroGraphic() {
  return (
    <div className="relative w-full min-w-0 py-4 lg:py-0" aria-hidden="true">
      <div className="relative ml-auto w-full max-w-[760px] min-w-0">
        {/* Single canvas: card left, collage right — stays inside the hero column */}
        <div className="relative min-h-[420px] w-full sm:min-h-[460px] lg:min-h-[500px]">
          {/* Photo collage — right half of canvas */}
          <div className="absolute right-0 top-2 h-[min(72vw,420px)] w-[min(62%,340px)] sm:top-4 sm:h-[min(68vw,440px)] sm:w-[min(58%,360px)] lg:top-6 lg:h-[400px] lg:w-[340px] xl:h-[430px] xl:w-[370px]">
            <HeroPhotoCollage />
          </div>

          {/* Floating badges — kept inside canvas bounds */}
          <FloatingBadge className="absolute right-[8%] top-0 z-30 hidden max-w-[168px] lg:block xl:right-[6%]">
            <p className="text-[11px] font-semibold leading-snug text-[#13201F]">
              Step-free entrance — <span className="text-[#59682A]">Yes</span>
            </p>
          </FloatingBadge>

          <FloatingBadge className="absolute bottom-[4.5rem] left-[4%] z-30 hidden lg:block xl:left-[2%]">
            <p className="text-[11px] font-semibold leading-snug text-[#13201F]">
              Accessible parking — <span className="text-[#59682A]">2 bays</span>
            </p>
          </FloatingBadge>

          <FloatingBadge className="absolute bottom-8 right-[6%] z-30 hidden lg:block">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-[#13201F]">4.8</span>
              <div className="flex gap-0.5 text-[#F04A16]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="h-3 w-3" />
                ))}
              </div>
            </div>
            <p className="mt-0.5 text-[11px] font-medium text-[#5E6A66]">118 reviews</p>
          </FloatingBadge>

          {/* Access report card — left, overlaps collage slightly */}
          <div className="relative z-20 w-[min(100%,420px)] pt-8 sm:w-[min(92%,440px)] lg:w-[400px] xl:w-[420px]">
            <article className="rounded-[24px] border border-[#F1D8C7] bg-white/95 p-6 shadow-[0_20px_48px_-24px_rgba(240,74,22,0.18)] backdrop-blur-sm sm:p-7 lg:p-8">
              <div className="flex items-start gap-4 sm:gap-5">
                <ScoreRing />

                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59682A]">
                    Access Report
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#13201F] sm:text-xl">
                    The Riverside Café
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#5E6A66]">12 River Street, Manchester M4 5AB</p>
                  <Link
                    href="/venue-finder"
                    tabIndex={-1}
                    className="mt-2.5 inline-flex text-xs font-semibold text-[#F04A16] underline-offset-2 transition-colors hover:text-[#D93E10] hover:underline"
                  >
                    View listing
                  </Link>
                </div>
              </div>

              <ul className="mt-5 divide-y divide-[#F1D8C7] border-y border-[#F1D8C7] sm:mt-6">
                {ACCESS_FEATURES.map(({ label, value }) => (
                  <li key={label} className="flex items-center justify-between gap-4 py-2.5 first:pt-3 last:pb-3 sm:py-3">
                    <span className="flex min-w-0 items-center gap-2.5 text-sm text-[#2A3836]">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDF7ED] text-[#2F7D32]">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {label}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-[#13201F]">{value}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/venue-finder"
                tabIndex={-1}
                className="mt-5 inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#F04A16] text-sm font-semibold text-white shadow-sm shadow-[#F04A16]/20 transition-all duration-200 hover:bg-[#D93E10] hover:shadow-md hover:shadow-[#F04A16]/25 sm:mt-6 sm:h-[52px]"
              >
                View full report
                <span aria-hidden>→</span>
              </Link>
            </article>

            {/* Mobile-only summary chips */}
            <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
              <FloatingBadge>
                <p className="text-[11px] font-semibold text-[#13201F]">Step-free entrance — Yes</p>
              </FloatingBadge>
              <FloatingBadge>
                <p className="text-[11px] font-semibold text-[#13201F]">Accessible parking — 2 bays</p>
              </FloatingBadge>
              <FloatingBadge>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#13201F]">4.8</span>
                  <div className="flex gap-0.5 text-[#F04A16]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} className="h-2.5 w-2.5" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#5E6A66]">118 reviews</span>
                </div>
              </FloatingBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
