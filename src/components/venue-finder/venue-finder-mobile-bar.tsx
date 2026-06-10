"use client";

import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";

type Props = {
  onOpenChange: (open: boolean) => void;
  filterCount: number;
  onSearch: () => void;
};

export function VenueFinderMobileBar({ onOpenChange, filterCount, onSearch }: Props) {
  return (
    <div
      className="vf-mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-7xl gap-2 px-4 py-3">
        <button
          type="button"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-border bg-card px-4 text-sm font-semibold text-heading shadow-sm"
          onClick={() => onOpenChange(true)}
          aria-controls="vf-filter-drawer-title"
        >
          Filters · {filterCount}
        </button>
        <button type="button" className={`${VF_BTN_PRIMARY} min-h-11 flex-1`} onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
