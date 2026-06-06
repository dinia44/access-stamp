export function VenueFinderHero() {
  return (
    <section aria-labelledby="venue-finder-heading" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Venue finder</p>
        <h1
          id="venue-finder-heading"
          className="mt-2 text-4xl font-bold tracking-[-0.035em] leading-[1.05] text-slate-900 lg:text-5xl"
        >
          Find accessible venues
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Search UK venues with practical access detail. Open a full access report before you travel.
        </p>
      </div>
    </section>
  );
}
