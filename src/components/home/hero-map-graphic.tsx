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
  { cx: 72, cy: 168, color: "#2563EB" },
  { cx: 168, cy: 108, color: "#0891B2" },
  { cx: 248, cy: 72, color: "#2563EB" },
  { cx: 312, cy: 48, color: "#0891B2" },
] as const;

export function PlatformHeroGraphic() {
  const venuePhoto = SAMPLE_VENUE_PHOTOS["harbour-kitchen-liverpool"];

  return (
    <div className="relative mx-auto hidden h-[440px] w-full max-w-[480px] lg:block" aria-hidden="true">
      <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.1),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(8,145,178,0.08),transparent_50%)]" />

      {/* Map surface */}
      <div className="absolute inset-x-2 top-0 h-[280px] overflow-hidden rounded-3xl border border-[#BFDBFE] bg-white/80 shadow-lg shadow-[#2563EB]/[0.06] backdrop-blur-sm">
        <svg viewBox="0 0 360 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="360" height="220" fill="#EFF6FF" />
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4, 5, 6].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={16 + col * 46}
                y={14 + row * 36}
                width="34"
                height="24"
                rx="4"
                fill="#DBEAFE"
                stroke="#BFDBFE"
                strokeWidth="0.75"
              />
            )),
          )}
          <path
            d="M56 178 C 110 148, 168 108, 228 78 S 300 48, 328 32"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M56 178 C 110 148, 168 108, 228 78 S 300 48, 328 32"
            fill="none"
            stroke="#0891B2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="6 8"
            opacity="0.45"
          />
          {MAP_PINS.map(({ cx, cy, color }) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="10" fill={color} opacity="0.15" />
              <circle cx={cx} cy={cy} r="5" fill={color} />
              <circle cx={cx} cy={cy - 1.5} r="1.5" fill="white" />
            </g>
          ))}
        </svg>

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[#BFDBFE] bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#0891B2] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2]" />
          Live route
        </div>
      </div>

      {/* Floating venue thumbnail card */}
      <div className="absolute left-0 top-8 w-[168px] rotate-[-3deg] overflow-hidden rounded-2xl border border-[#BFDBFE] bg-white shadow-xl shadow-[#2563EB]/10">
        <div className="relative h-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={venuePhoto.src} alt="" className="h-full w-full object-cover" />
          <span className="absolute left-2 top-2 rounded-full bg-[#2563EB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Verified
          </span>
        </div>
        <div className="p-2.5">
          <p className="text-xs font-bold text-[#0B1D3A]">Harbour Kitchen</p>
          <p className="text-[11px] text-[#3B6B9A]">Liverpool · Restaurant</p>
        </div>
      </div>

      {/* Access badges */}
      <div className="absolute right-4 top-16 flex flex-col gap-1.5">
        {["Step-free", "Toilet"].map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-1 rounded-full border border-[#BFDBFE] bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#1E3A5F] shadow-sm"
          >
            <CheckIcon className="h-3 w-3 text-[#0891B2]" />
            {badge}
          </span>
        ))}
      </div>

      {/* Access report card */}
      <div className="absolute bottom-0 right-0 w-[min(100%,300px)] rounded-3xl border border-[#93C5FD]/60 bg-white p-5 shadow-xl shadow-[#2563EB]/10">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#0891B2]">Access Report</p>

        <div className="mt-2 flex items-end gap-2.5">
          <span className="text-4xl font-bold leading-none text-[#0B1D3A]">92%</span>
          <div className="pb-0.5">
            <span className="block text-sm font-semibold text-[#0B1D3A]">Access Score</span>
            <span className="text-xs text-[#3B6B9A]">Harbour Kitchen</span>
          </div>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#DBEAFE]">
          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#0891B2] to-[#2563EB]" />
        </div>

        <ul className="mt-3 space-y-1.5">
          {ACCESS_FEATURES.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-[#1E3A5F]">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#DBEAFE] text-[#0891B2]">
                <CheckIcon className="h-2.5 w-2.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
