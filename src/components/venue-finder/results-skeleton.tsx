export function ResultsSkeleton() {
  return (
    <ul className="mt-6 grid gap-4" aria-busy="true" aria-label="Loading venue results">
      {[1, 2, 3].map((i) => (
        <li
          key={i}
          className="p-5 sm:p-6"
          style={{
            background: "var(--vf-card)",
            border: "1px solid var(--vf-border)",
            borderRadius: "var(--vf-radius-card)",
          }}
        >
          <div className="vf-skeleton mb-3 h-5 w-2/3 max-w-xs" />
          <div className="vf-skeleton mb-4 h-4 w-1/3 max-w-[10rem]" />
          <div className="mb-2 flex gap-2">
            <div className="vf-skeleton h-6 w-28 rounded-full" />
            <div className="vf-skeleton h-6 w-32 rounded-full" />
          </div>
          <div className="vf-skeleton mt-4 h-4 w-full" />
          <div className="vf-skeleton mt-2 h-4 w-4/5" />
          <div className="vf-skeleton mt-4 h-16 w-full" />
          <div className="vf-skeleton mt-4 h-11 w-40" />
        </li>
      ))}
    </ul>
  );
}
