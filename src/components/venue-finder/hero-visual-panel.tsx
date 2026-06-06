const PREVIEW_CARDS = [
  {
    label: "Step-free entrance",
    gradient: "linear-gradient(135deg, #0F766E 0%, #134E4A 100%)",
    icon: "↗",
  },
  {
    label: "Accessible toilet",
    gradient: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
    icon: "♿",
  },
  {
    label: "Blue Badge parking nearby",
    gradient: "linear-gradient(135deg, #0B2236 0%, #071827 100%)",
    icon: "P",
  },
] as const;

export function HeroVisualPanel() {
  return (
    <div
      className="hidden lg:block"
      aria-hidden="true"
    >
      <div
        className="rounded-[20px] border p-4"
        style={{
          background: "var(--vf-navy-soft)",
          borderColor: "rgba(214, 168, 79, 0.25)",
          boxShadow: "var(--vf-shadow)",
        }}
      >
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--vf-gold)" }}
        >
          Access report preview
        </p>
        <ul className="space-y-3">
          {PREVIEW_CARDS.map((card, i) => (
            <li
              key={card.label}
              className="flex items-center gap-3 rounded-[14px] border p-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(226, 232, 240, 0.12)",
                transform: `translateX(${i * 4}px)`,
              }}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-sm font-bold text-white"
                style={{ background: card.gradient }}
              >
                {card.icon}
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--vf-hero-heading)" }}>
                  {card.label}
                </p>
                <p className="text-xs" style={{ color: "var(--vf-hero-subtitle)" }}>
                  Practical detail · Photo evidence
                </p>
              </div>
              <span
                className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: i === 0 ? "var(--vf-teal-soft)" : i === 1 ? "var(--vf-blue-soft)" : "var(--vf-amber-soft)",
                  color: i === 0 ? "var(--vf-teal)" : i === 1 ? "var(--vf-blue-hover)" : "var(--vf-amber)",
                }}
              >
                {i === 0 ? "Checked" : i === 1 ? "Reported" : "Check"}
              </span>
            </li>
          ))}
        </ul>
        <div
          className="mt-3 rounded-[10px] px-3 py-2 text-center text-xs font-medium"
          style={{
            background: "rgba(214, 168, 79, 0.12)",
            color: "var(--vf-gold)",
          }}
        >
          Real measurements · Verification status · Confidence ratings
        </div>
      </div>
    </div>
  );
}

/** Simplified mobile accent — no full panel */
export function HeroMobileAccent() {
  return (
    <div
      className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-hidden="true"
    >
      {PREVIEW_CARDS.map((card) => (
        <span
          key={card.label}
          className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold"
          style={{
            borderColor: "rgba(214, 168, 79, 0.35)",
            color: "var(--vf-hero-subtitle)",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {card.label}
        </span>
      ))}
    </div>
  );
}
