import { labelForFilterKey } from "@/lib/venue-finder-cro";

type Props = {
  selectedFilters: string[];
  onRemove?: (key: string) => void;
};

export function VenueFinderActiveFiltersSummary({ selectedFilters, onRemove }: Props) {
  if (!selectedFilters.length) return null;

  return (
    <div className="mt-4" role="region" aria-label="Active filters">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Active filters</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {selectedFilters.map((key) => {
          const label = labelForFilterKey(key);
          if (onRemove) {
            return (
              <li key={key}>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#17201C] bg-[#17201C] px-4 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 focus-visible:ring-offset-2"
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
              <span className="inline-flex min-h-11 items-center rounded-full border border-[#17201C] bg-[#17201C] px-4 text-sm font-medium text-white">
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
