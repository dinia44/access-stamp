import { VenueFinderHero } from "./venue-finder-hero";

function FinderBoxSkeleton() {
  return (
    <div
      className="relative z-20 mx-auto max-w-6xl -mt-10 rounded-3xl border border-border bg-white p-4 shadow-2xl shadow-[#13201F]/10 sm:p-5"
      aria-hidden="true"
    >
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_260px_auto] md:items-end">
        <div className="h-14 animate-pulse rounded-2xl bg-[#F1D8C7]" />
        <div className="h-14 animate-pulse rounded-2xl bg-[#F1D8C7]" />
        <div className="h-14 animate-pulse rounded-2xl bg-[#F1D8C7]" />
      </div>
      <div className="mt-4 flex gap-2 overflow-hidden border-t border-border pt-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-11 w-28 shrink-0 animate-pulse rounded-full bg-[#F1D8C7]" />
        ))}
      </div>
    </div>
  );
}

function ResultCardSkeleton() {
  return (
    <li className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm" aria-hidden="true">
      <div className="flex flex-col sm:flex-row">
        <div className="h-44 w-full animate-pulse bg-[#F1D8C7] sm:w-44" />
        <div className="flex-1 space-y-3 p-5">
          <div className="h-5 w-2/3 animate-pulse rounded-2xl bg-[#F1D8C7]" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-[#F1D8C7]" />
          <div className="h-16 w-full animate-pulse rounded-2xl bg-[#F1D8C7]" />
        </div>
      </div>
    </li>
  );
}

function SidebarSkeleton() {
  return (
    <div className="hidden space-y-4 lg:block" aria-hidden="true">
      <div className="h-72 animate-pulse rounded-2xl bg-[#F1D8C7]" />
      <div className="h-36 animate-pulse rounded-2xl bg-[#F1D8C7]" />
      <div className="h-48 animate-pulse rounded-2xl bg-[#F1D8C7]" />
    </div>
  );
}

export function VenueFinderSkeleton() {
  return (
    <main className="vf-page min-h-screen">
      <VenueFinderHero />

      <div className="bg-background-2">
        <div className="px-4 sm:px-6 lg:px-8">
          <FinderBoxSkeleton />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-28 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8 lg:pb-8">
          <section aria-labelledby="venue-results-heading-skeleton" aria-busy="true">
            <div>
              <h2
                id="venue-results-heading-skeleton"
                className="text-2xl font-bold tracking-[-0.025em] leading-[1.15] text-heading"
              >
                Venues to explore
              </h2>
              <p className="mt-1 text-base leading-7 text-muted">Loading venue results…</p>
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <ResultCardSkeleton key={index} />
              ))}
            </ul>
          </section>
          <SidebarSkeleton />
        </div>
      </div>
    </main>
  );
}
