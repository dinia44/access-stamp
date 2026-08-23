"use client";

const SECTIONS = [
  { id: "venue-summary", label: "Summary" },
  { id: "venue-measurements", label: "Measurements" },
  { id: "venue-photos", label: "Photos" },
  { id: "venue-unknowns", label: "Unknowns" },
  { id: "venue-plan", label: "Plan" },
] as const;

/** Compact in-page navigator for mobile venue task hierarchy. */
export function VenueDetailSectionNav({ hasPhotos = true }: { hasPhotos?: boolean }) {
  const items = SECTIONS.filter((s) => hasPhotos || s.id !== "venue-photos");

  return (
    <nav
      aria-label="On this page"
      className="sticky top-0 z-20 -mx-1 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-1 py-2 backdrop-blur-sm lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
    >
      <ul className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1">
            {index > 0 ? (
              <span className="text-[var(--color-text-muted)]" aria-hidden>
                ·
              </span>
            ) : null}
            <a
              href={`#${item.id}`}
              className="rounded-md px-1.5 py-1 font-semibold text-[var(--color-ink)] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
