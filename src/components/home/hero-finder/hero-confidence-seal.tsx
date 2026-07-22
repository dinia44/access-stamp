import type { ConfidenceSealLabel } from "@/lib/venue-lead-measurement";

type HeroConfidenceSealProps = {
  label: ConfidenceSealLabel;
  className?: string;
};

/** Mini evidence seal for venue teaser cards — decorative, not the logo. */
export function HeroConfidenceSeal({ label, className = "" }: HeroConfidenceSealProps) {
  const isDemo = label === "Demo example" || label === "Needs check";
  const border = isDemo ? "border-[var(--color-information)]" : "border-[var(--color-trust)]";
  const text = isDemo ? "text-[var(--color-information)]" : "text-[var(--color-trust)]";
  const bg = isDemo ? "bg-[var(--color-information-soft)]" : "bg-[var(--color-trust-soft)]";

  return (
    <div
      className={`pointer-events-none absolute right-3 top-3 z-[2] flex h-11 min-w-11 max-w-[4.5rem] rotate-6 items-center justify-center rounded-full border-2 border-dashed px-1 ${border} ${bg} shadow-sm ${className}`}
      aria-hidden="true"
    >
      <span className={`text-center text-[7px] font-bold uppercase leading-tight tracking-[0.08em] ${text}`}>{label}</span>
    </div>
  );
}
