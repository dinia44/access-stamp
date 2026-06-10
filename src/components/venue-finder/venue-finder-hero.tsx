import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";

const TRUST_POINTS = [
  "Real access detail",
  "Checked before travel",
  "Built by disabled people",
] as const;

const FLOATING_LABELS = [
  { label: "Step-free entrance", className: "left-6 top-8" },
  { label: "Accessible toilet", className: "bottom-16 right-8" },
  { label: "Blue Badge parking", className: "bottom-8 left-10" },
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
            className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-heading md:text-6xl lg:text-7xl"
          >
            Find accessible venues with{" "}
            <em className="font-serif italic text-[var(--color-secondary)]">real</em> access detail
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Search by step-free access, toilets, parking, quiet spaces and more. Open a full access report
            before you travel.
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

        <div className="relative">
          <div className="aspect-[1.45/1] overflow-hidden rounded-[2rem] bg-background-2 shadow-[var(--shadow-lift)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CLOUDINARY_MEDIA.homepageVenueInterior}
              alt="Warm café interior with accessible layout and spacious seating"
              className="h-full w-full object-cover"
            />
          </div>

          {FLOATING_LABELS.map((item) => (
            <span
              key={item.label}
              className={`absolute ${item.className} rounded-full bg-card/95 px-4 py-2 text-sm font-semibold text-heading shadow-lg ring-1 ring-border backdrop-blur`}
            >
              {item.label}
            </span>
          ))}

          <span
            className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-secondary)] text-xs font-bold uppercase tracking-wide text-white shadow-lg"
            aria-hidden="true"
          >
            AS
          </span>
        </div>
      </div>
    </section>
  );
}
