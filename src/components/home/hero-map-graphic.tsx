import Link from "next/link";
import type { ReactNode } from "react";
import { SAMPLE_VENUE_PHOTOS } from "@/lib/venue-finder-images";

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
      <div className="relative flex h-[84px] w-[84px] items-center justify-center">
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
        <span className="relative text-2xl font-bold tracking-tight text-[#13201F]">92%</span>
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

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#F1D8C7] bg-white shadow-md shadow-[#F04A16]/8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
    </div>
  );
}

function MiniMapCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#F1D8C7] bg-white shadow-md shadow-[#F04A16]/8">
      <svg viewBox="0 0 188 120" className="h-[88px] w-full" aria-hidden>
        <rect width="188" height="120" fill="#FFF8F1" />
        <path
          d="M16 92 C 52 68, 88 72, 124 48 S 160 28, 172 20"
          stroke="#F04A16"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <circle cx="16" cy="92" r="5" fill="#F04A16" opacity="0.2" />
        <circle cx="16" cy="92" r="2.5" fill="#F04A16" />
        <circle cx="172" cy="20" r="5" fill="#F04A16" opacity="0.2" />
        <circle cx="172" cy="20" r="2.5" fill="#F04A16" />
      </svg>
    </div>
  );
}

export function PlatformHeroGraphic() {
  const interiorPhoto = SAMPLE_VENUE_PHOTOS["sample-cafe"];
  const exteriorPhoto = SAMPLE_VENUE_PHOTOS["harbour-kitchen-liverpool"];

  return (
    <div className="relative w-full py-4 lg:py-0" aria-hidden="true">
      {/* Faint route accent — column only, not inside the card */}
      <svg
        className="pointer-events-none absolute -right-8 top-6 hidden h-40 w-56 text-[#F04A16]/10 lg:block"
        viewBox="0 0 220 140"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 112 C 64 72, 108 88, 168 36 S 204 16, 212 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto flex max-w-[680px] flex-col items-center gap-5 sm:gap-6 lg:mx-0 lg:max-w-none lg:flex-row lg:items-start lg:justify-end lg:gap-5 xl:gap-6">
        {/* Main access report card */}
        <div className="relative w-full max-w-[455px] shrink-0 lg:w-[455px]">
          {/* Floating badges — desktop only, anchored to card edges */}
          <FloatingBadge className="absolute -right-2 top-3 z-20 hidden max-w-[168px] lg:block xl:-right-4">
            <p className="text-[11px] font-semibold leading-snug text-[#13201F]">
              Step-free entrance — <span className="text-[#59682A]">Yes</span>
            </p>
          </FloatingBadge>

          <FloatingBadge className="absolute -left-2 bottom-[5.5rem] z-20 hidden lg:block xl:-left-4">
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

          <FloatingBadge className="absolute -right-2 bottom-6 z-20 hidden lg:block xl:-right-4">
            <p className="text-[11px] font-semibold leading-snug text-[#13201F]">
              Accessible parking — <span className="text-[#59682A]">2 bays</span>
            </p>
          </FloatingBadge>

          <article className="relative z-10 rounded-[24px] border border-[#F1D8C7] bg-white/95 p-7 shadow-[0_20px_48px_-24px_rgba(240,74,22,0.18)] backdrop-blur-sm sm:p-8">
            <div className="flex items-start gap-5 sm:gap-6">
              <ScoreRing />

              <div className="min-w-0 flex-1 pt-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59682A]">
                  Access Report
                </p>
                <h3 className="mt-1.5 text-xl font-bold tracking-[-0.02em] text-[#13201F]">The Riverside Café</h3>
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

            <ul className="mt-6 divide-y divide-[#F1D8C7] border-y border-[#F1D8C7]">
              {ACCESS_FEATURES.map(({ label, value }) => (
                <li key={label} className="flex items-center justify-between gap-4 py-3 first:pt-3.5 last:pb-3.5">
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
              className="mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#F04A16] text-sm font-semibold text-white shadow-sm shadow-[#F04A16]/20 transition-all duration-200 hover:bg-[#D93E10] hover:shadow-md hover:shadow-[#F04A16]/25"
            >
              View full report
              <span aria-hidden>→</span>
            </Link>
          </article>

          {/* Mobile-only summary chips — no overlap on small screens */}
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

        {/* Venue imagery + mini map — separate column, not attached to card */}
        <div className="grid w-full max-w-[455px] grid-cols-2 gap-3 sm:grid-cols-3 lg:w-[172px] lg:max-w-none lg:grid-cols-1 lg:pt-2 xl:w-[188px]">
          <PhotoCard src={exteriorPhoto.src} alt={exteriorPhoto.alt} />
          <PhotoCard src={interiorPhoto.src} alt={interiorPhoto.alt} />
          <MiniMapCard />
        </div>
      </div>
    </div>
  );
}
