import { VenueFinderProductHeader } from "./venue-finder-product-header";

function SearchSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8" aria-hidden="true">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-end">
        <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-11 w-28 animate-pulse rounded-xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}

function ResultCardSkeleton() {
  return (
    <li className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-hidden="true">
      <div className="flex flex-col sm:flex-row">
        <div className="h-44 w-full animate-pulse bg-slate-200 sm:w-44" />
        <div className="flex-1 space-y-3 p-5">
          <div className="h-5 w-2/3 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    </li>
  );
}

function SidebarSkeleton() {
  return (
    <div className="hidden space-y-4 lg:block" aria-hidden="true">
      <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
      <div className="h-36 animate-pulse rounded-2xl bg-slate-200" />
      <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />
    </div>
  );
}

export function VenueFinderSkeleton() {
  return (
    <main className="vf-page min-h-screen bg-slate-50 pb-28 lg:pb-8">
      <VenueFinderProductHeader />

      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <SearchSkeleton />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-6">
        <section aria-labelledby="venue-results-heading-skeleton" aria-busy="true">
          <div>
            <h2
              id="venue-results-heading-skeleton"
              className="text-2xl font-bold tracking-[-0.025em] leading-[1.15] text-slate-900"
            >
              Venues to explore
            </h2>
            <p className="mt-1 text-base leading-7 text-slate-600">Loading venue results…</p>
          </div>
          <ul className="mt-6 flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <ResultCardSkeleton key={index} />
            ))}
          </ul>
        </section>
        <SidebarSkeleton />
      </div>
    </main>
  );
}
