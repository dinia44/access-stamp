export function ResultsSkeleton() {
  return (
    <ul
      className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2"
      aria-busy="true"
      aria-label="Loading venue results"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          aria-hidden="true"
        >
          <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-6 w-2/3 animate-pulse rounded-2xl bg-slate-200" />
          <div className="mt-3 h-6 w-36 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="mt-5 h-12 animate-pulse rounded-xl bg-slate-200" />
        </li>
      ))}
    </ul>
  );
}
