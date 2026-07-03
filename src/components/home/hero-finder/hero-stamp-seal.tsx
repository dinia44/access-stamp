/** Decorative brand seal — not the Access Stamp logo. */
export function HeroStampSeal() {
  return (
    <div className="hero-finder__seal mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center sm:mb-8" aria-hidden="true">
      <div className="relative flex h-full w-full rotate-[-12deg] items-center justify-center rounded-full border-[3px] border-dashed border-[var(--color-border-mid)] bg-[var(--color-surface-warm)] shadow-[inset_0_2px_8px_rgba(19,32,31,0.06)]">
        <div className="text-center leading-none">
          <p className="text-[8px] font-bold tracking-[0.22em] text-[var(--color-secondary)]">VERIFIED</p>
          <p className="mt-1 text-[10px] font-bold tracking-[0.12em] text-[var(--color-primary)]">ACCESS</p>
          <p className="text-[8px] font-semibold tracking-[0.18em] text-[var(--color-muted)]">INFO</p>
        </div>
      </div>
    </div>
  );
}
