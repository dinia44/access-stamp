import { FadeIn } from "@/components/fade-in";

export function VenueFinderHero() {
  return (
    <section
      aria-labelledby="venue-finder-heading"
      className="premium-section-hero relative overflow-hidden pb-24 pt-12 sm:pb-28 sm:pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full blur-3xl"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="page-hero-eyebrow">Venue finder</p>
          <h1
            id="venue-finder-heading"
            className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-[#0B1D3A] sm:text-5xl lg:text-[3.25rem]"
          >
            Find accessible venues with{" "}
            <span className="text-[#0891B2]">real access detail</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#3B6B9A] sm:text-lg">
            Search by step-free access, toilets, parking, and more — then open a full access report before you travel.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
