import { labelForFilterKey } from "@/lib/venue-finder-cro";
import { SITE_FOCUS } from "@/lib/site-design";

type Props = {
  selectedFilters: string[];
  onRemove?: (key: string) => void;
};

export function VenueFinderActiveFiltersSummary({ selectedFilters, onRemove }: Props) {
  if (!selectedFilters.length) return null;

  const activePill =
    "inline-flex min-h-11 items-center rounded-full border border-heading bg-heading px-4 text-sm font-medium text-white";

  return (
    <div className="mt-4" role="region" aria-label="Active filters">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Active filters</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {selectedFilters.map((key) => {
          const label = labelForFilterKey(key);
          if (onRemove) {
            return (
              <li key={key}>
                <button
                  type="button"
                  className={`${activePill} gap-2 ${SITE_FOCUS}`}
                  aria-pressed={true}
                  onClick={() => onRemove(key)}
                >
                  {label}
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Remove {label} filter</span>
                </button>
              </li>
            );
          }

          return (
            <li key={key}>
              <span className={activePill}>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
