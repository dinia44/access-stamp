import { SAMPLE_VENUE_PHOTOS } from "@/lib/venue-finder-images";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

const ACCESS_FEATURES = ["Step-free access", "Accessible toilet", "Parking nearby"] as const;

const MAP_PINS = [
  { cx: 56, cy: 118, color: "#2563EB" },
  { cx: 128, cy: 78, color: "#0891B2" },
  { cx: 198, cy: 52, color: "#2563EB" },
  { cx: 268, cy: 36, color: "#0891B2" },
] as const;

export function PlatformHeroGraphic() {
  const venuePhoto = SAMPLE_VENUE_PHOTOS["harbour-kitchen-liverpool"];

  return (
    <div className="relative mx-auto hidden w-full max-w-[400px] lg:block" aria-hidden="true">
      <div className="overflow-hidden rounded-3xl border border-[#93C5FD]/50 bg-white shadow-xl shadow-[#2563EB]/10">
        {/* Map preview */}
        <div className="relative h-[168px] overflow-hidden border-b border-[#BFDBFE] bg-[#EFF6FF]">
          <svg viewBox="0 0 320 168" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <rect width="320" height="168" fill="#EFF6FF" />
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3, 4, 5].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={12 + col * 48}
                  y={12 + row * 34}
                  width="36"
                  height="24"
                  rx="4"
                  fill="#DBEAFE"
                  stroke="#BFDBFE"
                  strokeWidth="0.75"
                />
              )),
            )}
            <path
              d="M44 132 C 88 108, 132 72, 188 48 S 248 28, 288 20"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            {MAP_PINS.map(({ cx, cy, color }) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="9" fill={color} opacity="0.15" />
                <circle cx={cx} cy={cy} r="4.5" fill={color} />
                <circle cx={cx} cy={cy - 1} r="1.5" fill="white" />
              </g>
            ))}
          </svg>

          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[#BFDBFE] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0891B2] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2]" aria-hidden="true" />
            Live route
          </div>
        </div>

        {/* Venue + access report — single row, no overlap */}
        <div className="grid grid-cols-[132px_minmax(0,1fr)]">
          <div className="border-r border-[#BFDBFE] p-3">
            <div className="relative overflow-hidden rounded-xl border border-[#BFDBFE]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={venuePhoto.src} alt="" className="aspect-[4/3] w-full object-cover" />
              <span className="absolute left-1.5 top-1.5 rounded-full bg-[#2563EB] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                Verified
              </span>
            </div>
            <p className="mt-2 text-xs font-bold leading-snug text-[#0B1D3A]">Harbour Kitchen</p>
            <p className="mt-0.5 text-[11px] leading-snug text-[#3B6B9A]">Liverpool · Restaurant</p>
          </div>

          <div className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0891B2]">Access Report</p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-bold leading-none text-[#0B1D3A]">92%</span>
              <div className="pb-0.5">
                <span className="block text-sm font-semibold text-[#0B1D3A]">Access Score</span>
                <span className="text-[11px] text-[#3B6B9A]">Based on verified checks</span>
              </div>
            </div>

            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#DBEAFE]">
              <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#0891B2] to-[#2563EB]" />
            </div>

            <ul className="mt-3 space-y-1.5">
              {ACCESS_FEATURES.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[11px] text-[#1E3A5F]">
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#0891B2]">
                    <CheckIcon className="h-2.5 w-2.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
