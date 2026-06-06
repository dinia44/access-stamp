import type { ReactNode } from "react";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

function MiniList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2 space-y-1">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-1.5 text-[11px] text-[#CBD5E1]">
          <CheckIcon className="h-3 w-3 shrink-0 text-emerald-400" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function FloatCard({
  className,
  label,
  labelClass,
  children,
}: {
  className: string;
  label: string;
  labelClass: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/12 bg-[#04122B]/95 p-3.5 shadow-2xl shadow-black/40 backdrop-blur-md ${className}`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${labelClass}`}>{label}</p>
      {children}
    </div>
  );
}

export function HeroMapGraphic() {
  return (
    <div
      className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[420px] lg:mx-0 lg:h-[460px] lg:max-w-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.16),transparent_42%),radial-gradient(circle_at_82%_72%,rgba(37,99,235,0.24),transparent_40%)]" />

      {/* Platform hub surface */}
      <div className="absolute inset-x-6 top-8 bottom-28 overflow-hidden rounded-3xl border border-white/10 bg-[#04122B] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="platformRouteGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="#071E3D" />
          <path
            d="M40 180 C 110 140, 170 110, 240 80 S 330 40, 360 28"
            fill="none"
            stroke="url(#platformRouteGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
          {(
            [
              [72, 168, "#2563EB"],
              [168, 112, "#22D3EE"],
              [268, 72, "#8B5CF6"],
              [340, 36, "#34D399"],
            ] as const
          ).map(([cx, cy, color]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="10" fill={color} opacity="0.2" />
              <circle cx={cx} cy={cy} r="5" fill={color} />
            </g>
          ))}
        </svg>
      </div>

      {/* 1. Access report */}
      <FloatCard
        className="absolute bottom-0 left-0 w-[200px] sm:left-1 sm:w-[210px]"
        label="Access report"
        labelClass="text-[#22D3EE]"
      >
        <div className="mt-1.5 flex items-end gap-2">
          <span className="text-3xl font-bold leading-none text-white">92%</span>
          <span className="pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">Access Score</span>
        </div>
        <MiniList items={["Step-free access", "Accessible toilet", "Parking nearby"]} />
      </FloatCard>

      {/* 2. Visit planner */}
      <FloatCard
        className="absolute right-0 top-6 w-[168px] sm:right-1"
        label="Visit planner"
        labelClass="text-violet-300"
      >
        <MiniList items={["Entrance", "Toilet", "Parking", "Route"]} />
      </FloatCard>

      {/* 3. Practical guide */}
      <FloatCard
        className="absolute left-[34%] top-[38%] w-[156px]"
        label="Practical guide"
        labelClass="text-emerald-300"
      >
        <MiniList items={["Rights", "Travel", "Care", "Work"]} />
      </FloatCard>

      {/* 4. Ask Access Stamp AI */}
      <FloatCard
        className="absolute bottom-14 right-4 w-[178px] border-violet-400/25 bg-[#120826]/95 sm:right-8"
        label="Ask Access Stamp AI"
        labelClass="text-violet-300"
      >
        <p className="mt-2 text-xs font-medium leading-5 text-[#E2E8F0]">&ldquo;Get practical next steps&rdquo;</p>
      </FloatCard>
    </div>
  );
}
