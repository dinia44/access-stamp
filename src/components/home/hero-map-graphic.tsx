import Link from "next/link";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
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
      <div className="relative flex h-[76px] w-[76px] items-center justify-center xl:h-[84px] xl:w-[84px]">
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
        <span className="relative text-xl font-bold tracking-tight text-[#13201F] xl:text-2xl">92%</span>
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#59682A]">
        Access Score
      </span>
    </div>
  );
}

function CollagePhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[16px] border-[4px] border-white bg-white shadow-[0_12px_32px_-16px_rgba(16,33,32,0.28)] ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

function HeroPhotoCollage() {
  return (
    <div className="relative mx-auto aspect-[29/36] w-full max-w-[290px] xl:max-w-[310px]" aria-hidden="true">
      <CollagePhoto
        src={CLOUDINARY_MEDIA.homepageVenueExterior}
        alt="Modern café entrance with accessible ramp"
        className="absolute left-0 top-0 z-10 h-[52%] w-full"
      />
      <CollagePhoto
        src={CLOUDINARY_MEDIA.homepageVenueInterior}
        alt="Cozy accessible café interior with ramp to counter"
        className="absolute bottom-[10%] right-0 z-20 h-[46%] w-[74%]"
      />
      <CollagePhoto
        src={CLOUDINARY_MEDIA.homepageMapPreview}
        alt="Stylised map with route and access pins"
        className="absolute bottom-0 left-0 z-30 h-[32%] w-[56%]"
      />
    </div>
  );
}

export function PlatformHeroGraphic() {
  return (
    <div className="relative w-full min-w-0 py-2 lg:py-0" aria-hidden="true">
      <div className="ml-auto w-full max-w-[720px]">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5 xl:gap-6">
          <div className="relative w-full min-w-0 lg:max-w-[400px]">
            <article className="rounded-[24px] border border-[#F1D8C7] bg-white p-6 shadow-[0_20px_48px_-24px_rgba(240,74,22,0.16)] sm:p-7 xl:p-8">
              <div className="flex items-start gap-4 sm:gap-5">
                <ScoreRing />

                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59682A]">
                    Access Report
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#13201F] xl:text-xl">
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
                className="mt-5 inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#F04A16] text-sm font-semibold text-white shadow-sm shadow-[#F04A16]/20 transition-all duration-200 hover:bg-[#D93E10] sm:mt-6 sm:h-[52px]"
              >
                View full report
                <span aria-hidden>→</span>
              </Link>
            </article>
          </div>

          <div className="relative w-full min-w-0 pt-2 lg:pt-6">
            <HeroPhotoCollage />
          </div>
        </div>
      </div>
    </div>
  );
}
