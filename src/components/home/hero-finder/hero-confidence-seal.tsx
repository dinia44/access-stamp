type HeroConfidenceSealProps = {
  label: "Measured" | "Verified";
  className?: string;
};

/** Mini confidence seal for venue teaser cards — decorative, not the logo. */
export function HeroConfidenceSeal({ label, className = "" }: HeroConfidenceSealProps) {
  return (
    <div
      className={`pointer-events-none absolute right-3 top-3 z-[2] flex h-11 w-11 rotate-12 items-center justify-center rounded-full border-2 border-dashed border-[var(--color-border-mid)] bg-[var(--color-surface-warm)] shadow-sm ${className}`}
      aria-hidden="true"
    >
      <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--color-secondary)]">{label}</span>
    </div>
  );
}
