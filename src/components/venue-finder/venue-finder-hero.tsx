import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";

const TRUST_POINTS = [
  "Real access detail",
  "Plan and confirm before travel",
  "Built by disabled people",
] as const;

export function VenueFinderHero() {
  return (
    <section
      aria-labelledby="venue-finder-heading"
      className="bg-background px-4 pb-20 pt-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex items-center rounded-full border border-border bg-background-2 px-4 py-2 text-sm font-medium text-[var(--color-secondary)]">
            Find with confidence
          </p>

          <h1
            id="venue-finder-heading"
            className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-heading sm:text-5xl lg:text-6xl"
          >
            Find access information before you travel
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Search for practical venue access details, confidence labels, and key information before deciding whether a
            place may work for you.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3" aria-label="Why trust Access Stamp">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-heading">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-verified-pale text-[var(--color-secondary)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="aspect-[1.45/1] overflow-hidden rounded-[2rem] bg-background-2 shadow-[var(--shadow-lift)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CLOUDINARY_MEDIA.homepageVenueInterior}
            alt="Warm café interior with accessible layout and spacious seating"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
