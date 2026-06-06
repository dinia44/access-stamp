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
    <ul className="mt-2.5 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-1.5 text-[11px] text-[#CBD5E1]">
          <CheckIcon className="h-3 w-3 shrink-0 text-[#22D3EE]" />
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
      className={`rounded-2xl border border-white/10 bg-slate-900/70 p-3.5 shadow-xl shadow-black/20 backdrop-blur-md ${className}`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${labelClass}`}>{label}</p>
      {children}
    </div>
  );
}

export function PlatformHeroGraphic() {
  return (
    <div
      className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[400px] lg:mx-0 lg:h-[440px] lg:max-w-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.1),transparent_40%)]" />

      {/* Map surface */}
      <div className="absolute inset-x-4 top-6 bottom-24 overflow-hidden rounded-3xl border border-white/10 bg-[#04122B]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm sm:inset-x-6">
        <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="heroRouteGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="#071E3D" />
          {[0, 1, 2, 3, 4, 5].map((row) =>
            [0, 1, 2, 3, 4, 5, 6].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 52}
                y={18 + row * 38}
                width="36"
                height="22"
                rx="3"
                fill="#0B2747"
                stroke="#132F52"
                strokeWidth="0.75"
                opacity="0.85"
              />
            )),
          )}
          <path
            d="M48 200 C 120 165, 180 130, 248 95 S 320 55, 358 38"
            fill="none"
            stroke="url(#heroRouteGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {(
            [
              [62, 188, "#2563EB"],
              [178, 118, "#22D3EE"],
              [268, 78, "#8B5CF6"],
              [342, 42, "#2563EB"],
            ] as const
          ).map(([cx, cy, color]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="11" fill={color} opacity="0.18" />
              <circle cx={cx} cy={cy} r="5.5" fill={color} />
              <circle cx={cx} cy={cy - 1} r="2" fill="#04122B" />
            </g>
          ))}
        </svg>
      </div>

      <FloatCard
        className="absolute bottom-0 left-0 w-[196px] sm:left-1 sm:w-[208px]"
        label="Access report"
        labelClass="text-[#22D3EE]"
      >
        <div className="mt-1.5 flex items-end gap-2">
          <span className="text-3xl font-bold leading-none text-[#F8FAFC]">92%</span>
          <span className="pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">Access Score</span>
        </div>
        <MiniList items={["Step-free access", "Accessible toilet", "Parking nearby"]} />
      </FloatCard>

      <FloatCard
        className="absolute right-0 top-4 w-[160px] sm:right-1"
        label="Visit planner"
        labelClass="text-[#8B5CF6]"
      >
        <MiniList items={["Entrance", "Toilet", "Parking", "Route"]} />
      </FloatCard>

      <FloatCard
        className="absolute left-[32%] top-[36%] w-[148px]"
        label="Practical guide"
        labelClass="text-[#22D3EE]"
      >
        <MiniList items={["Rights", "Travel", "Care", "Work"]} />
      </FloatCard>

      <FloatCard
        className="absolute bottom-16 right-6 w-[170px] border-[#8B5CF6]/20 sm:right-10"
        label="Ask Access Stamp AI"
        labelClass="text-[#8B5CF6]"
      >
        <p className="mt-2 text-xs font-medium leading-5 text-[#CBD5E1]">&ldquo;Get practical next steps&rdquo;</p>
      </FloatCard>
    </div>
  );
}
