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
      className="bg-[var(--color-canvas)] px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        <div>
          <p className="mb-3 inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-trust)]">
            Venue finder
          </p>

          <h1
            id="venue-finder-heading"
            className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-heading sm:text-4xl lg:text-5xl"
          >
            Find access information before you travel
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Search practical venue details, evidence labels, and known unknowns — then confirm changeable information
            before you go.
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Evidence principles">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-heading">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-trust-soft)] text-[var(--color-trust)]"
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

        <div className="aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]">
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
