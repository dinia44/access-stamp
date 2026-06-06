export function VenueFinderHero() {
  return (
    <section
      aria-labelledby="venue-finder-heading"
      className="relative overflow-hidden bg-[#061A3A] pb-20 pt-10 sm:pb-24 sm:pt-12"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(640px 360px at 20% 30%, rgba(103,232,249,0.1), transparent 60%), radial-gradient(520px 300px at 80% 20%, rgba(29,78,216,0.16), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Venue finder</p>
        <h1
          id="venue-finder-heading"
          className="mt-3 max-w-2xl text-3xl font-bold tracking-[-0.035em] leading-[1.05] text-white sm:text-4xl lg:text-5xl"
        >
          Find accessible venues with{" "}
          <span className="text-[#67E8F9]">real access detail</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Search by step-free access, toilets, parking, and more — then open a full access report before you travel.
        </p>
      </div>
    </section>
  );
}
