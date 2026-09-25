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

export function VenueFinderFilterDrawer({ open, onOpenChange, selectedFilters, onToggleFilter, onClearFilters }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="vf-filter-drawer-title"
      aria-describedby="vf-filter-drawer-description"
      onCancel={(event) => { event.preventDefault(); onOpenChange(false); }}
      onClick={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}
      className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border border-border bg-card p-0 text-heading shadow-2xl backdrop:bg-black/40"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 id="vf-filter-drawer-title" className="text-xl font-semibold">More access filters</h2>
          <button ref={closeRef} type="button" onClick={() => onOpenChange(false)} className="min-h-11 rounded-xl border border-border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2">Close filters</button>
        </div>
        <p id="vf-filter-drawer-description" className="mt-2 text-sm text-muted">Refine venues by mobility, facilities and sensory support.</p>
        <div className="mt-5">
          <VenueFinderFilters idPrefix="vf-drawer" selectedFilters={selectedFilters} onToggleFilter={onToggleFilter} onClearFilters={onClearFilters} showApply onApply={() => onOpenChange(false)} />
        </div>
      </div>
    </dialog>
  );
}
