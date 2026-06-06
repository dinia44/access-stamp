export function VenueFinderProductHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Venue finder</p>
          <h1 className="mt-1 text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
            Search accessible venues
          </h1>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-slate-600 sm:block">
          Filter by practical access features and open full reports before you travel.
        </p>
      </div>
    </header>
  );
}
