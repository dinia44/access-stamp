
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
      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.18),transparent_50%)]" />

      <div className="relative overflow-hidden rounded-3xl border border-[#22D3EE]/20 bg-[#103B6E]/80 p-6 shadow-2xl shadow-[#030B1A]/35 backdrop-blur-xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, transparent 45%, rgba(37,99,235,0.1) 100%)",
          }}
        />

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#22D3EE]">Access Report</p>

          <div className="mt-3 flex items-end gap-3">
            <span className="text-5xl font-bold leading-none tracking-tight text-[#E0F7FF]">92%</span>
            <div className="pb-1">
              <span className="block text-base font-semibold text-[#E0F7FF]">Access Score</span>
              <span className="mt-0.5 block text-sm leading-snug text-[#7DD3FC]">Harbour Kitchen, Liverpool</span>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#0A2A52]/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#2563EB]"
              style={{ width: "92%" }}
            />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#7DD3FC]">
            Based on step-free route, toilet access, parking, seating, and support information.
          </p>

          <ul className="mt-5 space-y-2.5">
            {ACCESS_FEATURES.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#BAE6FD]">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22D3EE]/20 text-[#22D3EE]">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-[#22D3EE]/30 bg-[#2563EB]/15 px-5 py-3 text-base font-semibold text-[#E0F7FF]">
            View report
          </div>
        </div>
      </div>
    </div>
  );
}
