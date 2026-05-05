export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-[2px] w-8 bg-blue" aria-hidden />
      <span className="text-[11px] font-semibold tracking-[0.18em] text-blue uppercase">
        {children}
      </span>
    </div>
  );
}

