export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-[2px] w-6 bg-blue rounded-full" aria-hidden />
      <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
      <span className="text-[11px] font-semibold tracking-[0.18em] text-blue uppercase">{children}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
      <span className="h-[2px] w-6 bg-blue rounded-full" aria-hidden />
    </div>
  );
}
