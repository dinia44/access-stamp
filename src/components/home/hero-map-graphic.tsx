import Link from "next/link";
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

const MAP_PINS = [
  { cx: 48, cy: 108, color: "#2563EB" },
  { cx: 118, cy: 68, color: "#0891B2" },
  { cx: 188, cy: 44, color: "#2563EB" },
  { cx: 258, cy: 28, color: "#0891B2" },
] as const;

export function PlatformHeroGraphic() {
  const venuePhoto = SAMPLE_VENUE_PHOTOS["sample-cafe"];
  const exteriorPhoto = SAMPLE_VENUE_PHOTOS["harbour-kitchen-liverpool"];

  return (
    <div className="relative mx-auto min-h-[420px] w-full max-w-[440px] py-6 sm:min-h-[480px] lg:max-w-none lg:py-0" aria-hidden="true">
      {/* Background map pins & route */}
      <svg
        className="pointer-events-none absolute -right-6 -top-4 h-32 w-48 text-[#2563EB]/20"
        viewBox="0 0 200 100"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 80 C 60 40, 100 70, 192 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
        <circle cx="8" cy="80" r="5" fill="currentColor" opacity="0.6" />
        <circle cx="192" cy="20" r="5" fill="currentColor" opacity="0.6" />
      </svg>

      {/* Floating: step-free badge */}
      <div className="home-float-card absolute -left-2 top-8 z-20 hidden rounded-2xl border border-[#BFDBFE] bg-white px-3 py-2.5 shadow-lg shadow-[#2563EB]/10 sm:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0891B2]">Step-free entrance</p>
        <p className="mt-0.5 text-sm font-bold text-[#0B1D3A]">Yes</p>
      </div>

      {/* Floating: parking badge */}
      <div className="home-float-card home-float-card--delay absolute -right-1 top-24 z-20 hidden rounded-2xl border border-[#BFDBFE] bg-white px-3 py-2.5 shadow-lg shadow-[#2563EB]/10 sm:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0891B2]">Accessible parking</p>
        <p className="mt-0.5 text-sm font-bold text-[#0B1D3A]">2 bays</p>
      </div>

      {/* Floating: rating */}
      <div className="home-float-card home-float-card--delay-2 absolute -left-4 bottom-28 z-20 rounded-2xl border border-[#BFDBFE] bg-white px-3 py-2.5 shadow-lg shadow-[#2563EB]/10">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold text-[#0B1D3A]">4.8</span>
          <div className="flex gap-0.5 text-[#F59E0B]">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} className="h-3 w-3" />
            ))}
          </div>
        </div>
        <p className="mt-0.5 text-[11px] font-medium text-[#3B6B9A]">126 reviews</p>
      </div>

      {/* Main access report card */}
      <div className="relative z-10 overflow-hidden rounded-3xl border border-[#93C5FD]/50 bg-white shadow-xl shadow-[#2563EB]/12 transition-transform duration-300 hover:-translate-y-1">
        {/* Map header strip */}
        <div className="relative h-[120px] overflow-hidden border-b border-[#BFDBFE] bg-[#EFF6FF]">
          <svg viewBox="0 0 320 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <rect width="320" height="120" fill="#EFF6FF" />
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3, 4, 5].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={12 + col * 48}
                  y={10 + row * 32}
                  width="36"
                  height="22"
                  rx="4"
                  fill="#DBEAFE"
                  stroke="#BFDBFE"
                  strokeWidth="0.75"
                />
              )),
            )}
            <path
              d="M36 96 C 80 72, 124 36, 180 28 S 240 18, 288 14"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.55"
            />
            {MAP_PINS.map(({ cx, cy, color }) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="8" fill={color} opacity="0.15" />
                <circle cx={cx} cy={cy} r="4" fill={color} />
              </g>
            ))}
          </svg>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[#BFDBFE] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#0891B2] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2]" />
            Verified route
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0891B2]">Access Report</p>
              <h3 className="mt-1 text-lg font-bold text-[#0B1D3A]">The Riverside Café</h3>
              <p className="mt-0.5 text-sm text-[#3B6B9A]">12 River Street, Manchester M4 5AB</p>
            </div>
            <div className="flex shrink-0 flex-col items-center">
              <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-[5px] border-[#DBEAFE] bg-white">
                <svg viewBox="0 0 72 72" className="absolute inset-0 -rotate-90" aria-hidden>
                  <circle cx="36" cy="36" r="30" fill="none" stroke="#DBEAFE" strokeWidth="6" />
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${0.92 * 188.5} 188.5`}
                  />
                </svg>
                <span className="relative text-xl font-bold text-[#0B1D3A]">92%</span>
              </div>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#059669]">Access Score</span>
            </div>
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-semibold text-[#047857]">
            <CheckIcon className="h-3 w-3" />
            Verified
          </span>

          <ul className="mt-4 space-y-2">
            {ACCESS_FEATURES.map(({ label, value }) => (
              <li key={label} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-[#1E3A5F]">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#0891B2]">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {label}
                </span>
                <span className="shrink-0 font-semibold text-[#0B1D3A]">{value}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/venue-finder"
            tabIndex={-1}
            className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-[#2563EB] text-sm font-semibold text-white shadow-sm shadow-[#2563EB]/20 transition-all hover:bg-[#1D4ED8]"
          >
            View full report
          </Link>
        </div>
      </div>

      {/* Small venue photo cards */}
      <div className="absolute -right-2 bottom-4 z-20 flex gap-2 sm:-right-4">
        <div className="home-float-card overflow-hidden rounded-xl border border-[#BFDBFE] bg-white shadow-md shadow-[#2563EB]/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={venuePhoto.src} alt="" className="h-14 w-20 object-cover" />
        </div>
        <div className="home-float-card home-float-card--delay hidden overflow-hidden rounded-xl border border-[#BFDBFE] bg-white shadow-md shadow-[#2563EB]/10 sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={exteriorPhoto.src} alt="" className="h-14 w-20 object-cover" />
        </div>
      </div>

      {/* Mini map card */}
      <div className="home-float-card home-float-card--delay-2 absolute bottom-0 right-16 z-20 hidden overflow-hidden rounded-xl border border-[#BFDBFE] bg-white shadow-md shadow-[#2563EB]/10 sm:block">
        <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
          <rect width="80" height="56" fill="#EFF6FF" />
          <path d="M8 44 C 28 28, 48 36, 72 16" stroke="#2563EB" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="8" cy="44" r="3" fill="#2563EB" />
          <circle cx="72" cy="16" r="3" fill="#0891B2" />
        </svg>
      </div>
    </div>
  );
}
