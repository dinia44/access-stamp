"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { VenueFinderFilters } from "./venue-finder-filters";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterCount: number;
  selectedFilters: string[];
  onToggleFilter: (key: string) => void;
  onClearFilters: () => void;
  onSearch: () => void;
};

export function VenueFinderMobileBar({
  open,
  onOpenChange,
  filterCount,
  selectedFilters,
  onToggleFilter,
  onClearFilters,
  onSearch,
}: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  return (
    <>
      <div
        className="vf-mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-7xl gap-2 px-4 py-3">
          <button
            type="button"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#E8C4A8] bg-white px-4 text-sm font-semibold text-text"
            onClick={() => onOpenChange(true)}
            aria-expanded={open}
            aria-controls="vf-mobile-filter-drawer"
          >
            Filters · {filterCount}
          </button>
          <Button type="button" className="min-h-11 flex-1" onClick={onSearch}>
            Search
          </Button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-[#13201F]/40"
            aria-label="Close filters"
            onClick={() => onOpenChange(false)}
          />
          <div
            id="vf-mobile-filter-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vf-mobile-filter-title"
            className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-white p-4 shadow-2xl"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" aria-hidden />
            <h2 id="vf-mobile-filter-title" className="text-lg font-semibold text-heading">
              Filter venues
            </h2>
            <div className="mt-4">
              <VenueFinderFilters
                idPrefix="vf-mobile"
                selectedFilters={selectedFilters}
                onToggleFilter={onToggleFilter}
                onClearFilters={onClearFilters}
                showApply
                onApply={() => onOpenChange(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
