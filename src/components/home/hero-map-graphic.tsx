
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

const ACCESS_FEATURES = ["Step-free access", "Accessible toilet", "Parking nearby"] as const;

export function PlatformHeroGraphic() {
  return (
    <div className="relative mx-auto hidden w-full max-w-[400px] lg:block" aria-hidden="true">
      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.12),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(8,145,178,0.1),transparent_50%)]" />

      <div className="relative overflow-hidden rounded-3xl border border-[#93C5FD]/60 bg-white p-6 shadow-xl shadow-[#2563EB]/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(135deg, rgba(219,234,254,0.8) 0%, transparent 45%, rgba(239,246,255,0.9) 100%)",
          }}
        />

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#0891B2]">Access Report</p>

          <div className="mt-3 flex items-end gap-3">
            <span className="text-5xl font-bold leading-none tracking-tight text-[#0B1D3A]">92%</span>
            <div className="pb-1">
              <span className="block text-base font-semibold text-[#0B1D3A]">Access Score</span>
              <span className="mt-0.5 block text-sm leading-snug text-[#3B6B9A]">Harbour Kitchen, Liverpool</span>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#DBEAFE]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0891B2] to-[#2563EB]"
              style={{ width: "92%" }}
            />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#3B6B9A]">
            Based on step-free route, toilet access, parking, seating, and support information.
          </p>

          <ul className="mt-5 space-y-2.5">
            {ACCESS_FEATURES.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#1E3A5F]">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#0891B2]">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-[#93C5FD] bg-[#EFF6FF] px-5 py-3 text-base font-semibold text-[#1E3A5F]">
            View report
          </div>
        </div>
      </div>
    </div>
  );
}
