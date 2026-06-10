import { FadeIn } from "@/components/fade-in";

export function VenueFinderHero() {
  return (
    <section
      aria-labelledby="venue-finder-heading"
      className="relative overflow-hidden bg-[#F7F3EA] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full blur-3xl"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(237,246,239,0.9) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <p className="mb-4 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#17201C] shadow-sm">
            Venue Finder
          </p>
          <h1
            id="venue-finder-heading"
            className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#17201C] sm:text-5xl lg:text-6xl"
          >
            Find accessible venues with real access detail
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4F5A53]">
            Search by step-free access, toilets, parking, quiet spaces and more — then open a practical
            access report before you travel.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
