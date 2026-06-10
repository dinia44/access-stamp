"use client";

import { useEffect, useRef } from "react";
import { VenueFinderFilters } from "./venue-finder-filters";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFilters: string[];
  onToggleFilter: (key: string) => void;
  onClearFilters: () => void;
};

export function VenueFinderFilterDrawer({
  open,
  onOpenChange,
  selectedFilters,
  onToggleFilter,
  onClearFilters,
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-heading/40"
        aria-label="Close filters"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vf-filter-drawer-title"
        className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] border-t border-border bg-card p-6 shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[80vh] sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:border"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border sm:hidden" aria-hidden />
        <h2 id="vf-filter-drawer-title" className="text-xl font-semibold text-heading">
          More access filters
        </h2>
        <p className="mt-1 text-sm text-muted">Refine venues by mobility, facilities and sensory support.</p>
        <div className="mt-5">
          <VenueFinderFilters
            idPrefix="vf-drawer"
            selectedFilters={selectedFilters}
            onToggleFilter={onToggleFilter}
            onClearFilters={onClearFilters}
            showApply
            onApply={() => onOpenChange(false)}
          />
        </div>
      </div>
    </div>
  );
}
