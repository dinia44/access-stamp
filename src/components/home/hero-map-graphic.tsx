function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

function MapPin({ cx, cy, color, glow }: { cx: number; cy: number; color: string; glow?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="14" fill={glow ?? color} opacity="0.22" />
      <circle cx={cx} cy={cy} r="7" fill={color} />
      <circle cx={cx} cy={cy - 1} r="2.5" fill="#04122B" />
    </g>
  );
}

export function HeroMapGraphic() {
  const checklist = [
    "Step-free access",
    "Accessible toilet",
    "Hearing loop",
    "Lift access",
    "Parking",
  ] as const;

  return (
    <div
      className="relative mx-auto h-[340px] w-full max-w-[520px] sm:h-[400px] lg:mx-0 lg:h-[440px] lg:max-w-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.16),transparent_42%),radial-gradient(circle_at_82%_72%,rgba(37,99,235,0.24),transparent_40%)]" />

      {/* Map surface */}
      <div className="absolute inset-x-4 top-6 bottom-20 overflow-hidden rounded-3xl border border-white/10 bg-[#04122B] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:inset-x-6">
        <svg viewBox="0 0 400 280" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="heroRouteGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
            </linearGradient>
            <filter id="heroPinGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="400" height="280" fill="#071E3D" />

          {[0, 1, 2, 3, 4, 5, 6].map((row) =>
            [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={18 + col * 46}
                y={16 + row * 36}
                width="32"
                height="20"
                rx="3"
                fill="#0B2747"
                stroke="#132F52"
                strokeWidth="0.75"
              />
            )),
          )}

          <path
            d="M52 210 C 98 182, 142 156, 188 132 S 276 88, 342 52"
            fill="none"
            stroke="url(#heroRouteGlow)"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#heroPinGlow)"
          />

          <MapPin cx={58} cy={198} color="#2563EB" glow="#2563EB" />
          <MapPin cx={188} cy={128} color="#22D3EE" glow="#22D3EE" />
          <MapPin cx={268} cy={88} color="#8B5CF6" glow="#8B5CF6" />
          <MapPin cx={332} cy={52} color="#34D399" glow="#34D399" />

          <text x="72" y="228" fill="#64748B" fontSize="9" fontWeight="600" letterSpacing="0.08em">
            CITY CENTRE
          </text>
          <text x="286" y="44" fill="#64748B" fontSize="9" fontWeight="600" letterSpacing="0.08em">
            WATERFRONT
          </text>
        </svg>

        {/* Parking pin badge */}
        <div className="absolute bottom-6 left-[38%] flex items-center gap-1.5 rounded-full border border-white/10 bg-[#04122B]/90 px-2.5 py-1 text-[10px] font-semibold text-[#CBD5E1] backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-[#34D399]" />
          Parking nearby
        </div>
      </div>

      {/* Access report card */}
      <div className="absolute bottom-0 left-0 w-[210px] rounded-2xl border border-white/12 bg-[#04122B]/95 p-3.5 shadow-2xl shadow-black/40 backdrop-blur-md sm:left-2 sm:w-[220px]">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#22D3EE]">Access report</p>
            <p className="mt-0.5 text-[10px] font-medium text-[#94A3B8]">Verified recently</p>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
            Verified report
          </span>
        </div>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-4xl font-bold leading-none text-white">92%</span>
          <div className="pb-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">Access Score</p>
            <p className="text-xs font-bold text-emerald-400">Excellent</p>
          </div>
        </div>

        <ul className="mt-2.5 space-y-1">
          {checklist.map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-[11px] text-[#CBD5E1]">
              <CheckIcon className="h-3 w-3 shrink-0 text-emerald-400" />
              {item}
            </li>
          ))}
        </ul>

        <span className="mt-2.5 inline-flex min-h-[36px] items-center text-xs font-semibold text-[#93C5FD]">
          View full report →
        </span>
      </div>

      {/* Supporting feature chip */}
      <div className="absolute right-2 top-4 rounded-xl border border-violet-400/25 bg-[#120826]/90 px-3 py-2 shadow-lg backdrop-blur-sm sm:right-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-violet-300">Hearing loop</p>
        <p className="mt-0.5 text-[11px] font-medium text-[#E2E8F0]">Available on site</p>
      </div>

      {/* Step-free route chip */}
      <div className="absolute right-6 top-[42%] rounded-xl border border-cyan-400/20 bg-white/5 px-3 py-2 text-[10px] font-semibold text-[#CBD5E1] backdrop-blur-sm">
        Step-free route
      </div>
    </div>
  );
}
