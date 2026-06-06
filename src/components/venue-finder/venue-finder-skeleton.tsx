import { VenueFinderHero } from "./venue-finder-hero";

function SearchSkeleton() {
  return (
    <div
      className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8"
      aria-hidden="true"
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="mb-1.5 h-3 w-16 animate-pulse rounded bg-slate-200" />
          <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />
        </div>
        <div>
          <div className="mb-1.5 h-3 w-20 animate-pulse rounded bg-slate-200" />
          <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />
        </div>
        <div className="flex flex-col gap-2 lg:min-w-[148px]">
          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-11 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function FilterSidebarSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-11 w-28 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-11 animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

function ResultCardSkeleton() {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-hidden="true">
      <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-6 w-2/3 animate-pulse rounded-2xl bg-slate-200" />
      <div className="mt-3 h-6 w-36 animate-pulse rounded-full bg-slate-200" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mt-5 h-12 animate-pulse rounded-xl bg-slate-200" />
    </li>
  );
}

export function VenueFinderSkeleton() {
  return (
    <main className="vf-page min-h-screen bg-slate-50 pb-28 lg:pb-0">
      <VenueFinderHero />

      <div className="sticky top-0 z-30 border-y border-slate-200 bg-white/95 backdrop-blur">
        <SearchSkeleton />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <FilterSidebarSkeleton />
          </div>
        </aside>

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

          <ul className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <ResultCardSkeleton key={index} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
