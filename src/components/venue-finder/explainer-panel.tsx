const STATUS_ROWS = [
  { color: "var(--vf-teal)", label: "On-site audited", bg: "var(--vf-teal-soft)" },
  { color: "var(--vf-blue)", label: "Community reported", bg: "var(--vf-blue-soft)" },
  { color: "var(--vf-amber)", label: "Demo listing", bg: "var(--vf-amber-soft)" },
  { color: "var(--vf-red)", label: "Not yet verified", bg: "var(--vf-red-soft)" },
] as const;

export function ExplainerPanel({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`vf-explainer-panel p-5 sm:p-6 ${className}`}
      aria-labelledby="explainer-heading"
    >
      <h2
        id="explainer-heading"
        className="font-[var(--font-heading)] text-lg font-semibold"
        style={{ color: "var(--vf-ink)" }}
      >
        How to read venue labels
      </h2>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--vf-muted)" }}>
        Access information can change. We show verification status, confidence level, and known unknowns so people can
        plan and confirm before travelling.
      </p>
      <ul className="mt-5 space-y-3">
        {STATUS_ROWS.map((row) => (
          <li key={row.label} className="flex items-center gap-3 text-sm">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ background: row.color }}
              aria-hidden="true"
            />
            <span
              className="inline-flex flex-1 items-center rounded-[10px] px-3 py-2 font-semibold"
              style={{ background: row.bg, color: row.color }}
            >
              {row.label}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
