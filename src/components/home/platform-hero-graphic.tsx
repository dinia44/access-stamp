function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

function FloatCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#04122B]/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-md ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function PlatformHeroGraphic() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[480px] sm:h-[420px] lg:mx-0 lg:max-w-none" aria-hidden="true">
      <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.14),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.22),transparent_38%)]" />

      {/* Stylised map panel */}
      <div className="absolute inset-x-6 top-8 bottom-16 overflow-hidden rounded-3xl border border-white/10 bg-[#04122B] shadow-inner">
        <svg viewBox="0 0 360 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.85" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="360" height="260" fill="#071E3D" />
          {[0, 1, 2, 3, 4, 5].map((row) =>
            [0, 1, 2, 3, 4, 5, 6].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 48}
                y={18 + row * 40}
                width="34"
                height="22"
                rx="4"
                fill="#0B2747"
                stroke="#132F52"
                strokeWidth="1"
              />
            )),
          )}
          <path
            d="M48 198 C 92 170, 128 148, 168 132 S 248 92, 302 58"
            fill="none"
            stroke="url(#routeGlow)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {[
            [58, 188],
            [168, 128],
            [292, 62],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="12" fill="#2563EB" opacity="0.25" />
              <circle cx={cx} cy={cy} r="6" fill="#22D3EE" />
              <circle cx={cx} cy={cy} r="2.5" fill="#04122B" />
            </g>
          ))}
        </svg>
      </div>

      {/* Access report card */}
      <FloatCard className="absolute bottom-2 left-0 w-[188px] rotate-[-3deg] sm:left-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#22D3EE]">Access report</p>
        <div className="mt-1 flex items-end gap-2">
          <span className="text-3xl font-bold leading-none text-white">92%</span>
          <span className="pb-0.5 text-xs font-semibold text-emerald-400">Access score</span>
        </div>
        <ul className="mt-2 space-y-1 text-[11px] text-[#CBD5E1]">
          {["Step-free access", "Accessible toilet", "Parking nearby"].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
              {item}
            </li>
          ))}
        </ul>
      </FloatCard>

      {/* Planning card */}
      <FloatCard className="absolute right-0 top-2 w-[176px] rotate-[2deg] sm:right-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#93C5FD]">Plan your visit</p>
        <p className="mt-1.5 text-xs leading-5 text-[#E2E8F0]">
          Check entrance, toilets, parking and route before you go
        </p>
      </FloatCard>

      {/* Guidance card */}
      <FloatCard className="absolute right-4 top-[42%] w-[168px] rotate-[1deg] border-violet-400/20 bg-[#120826]/90">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-violet-300">Practical guide</p>
        <p className="mt-1.5 text-xs leading-5 text-[#E2E8F0]">Rights, travel, care and workplace support</p>
      </FloatCard>

      {/* Support module chip */}
      <div className="absolute bottom-[38%] right-8 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[10px] font-semibold text-[#CBD5E1] backdrop-blur-sm">
        Support tools
      </div>
    </div>
  );
}
