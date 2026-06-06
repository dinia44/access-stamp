import { VENUE_GRID_CLASS } from "@/lib/venue-grid-layout";

export function ResultsSkeleton() {
  return (
    <ul className={`mt-6 ${VENUE_GRID_CLASS}`} aria-busy="true" aria-label="Loading venue results">
      {Array.from({ length: 8 }).map((_, index) => (
        <li
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          aria-hidden="true"
        >
          <div className="aspect-[4/3] animate-pulse bg-slate-200" />
          <div className="p-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 flex gap-2">
              <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="h-11 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-11 animate-pulse rounded-xl bg-slate-200" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
