"use client";

import { TextInput } from "@/components/ui/TextInput";
import { VF_BTN_PRIMARY, VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";

type Props = {
  query: string;
  location: string;
  locating: boolean;
  locationError?: string | null;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
  onUseLocation: () => void;
};

export function VenueSearchPanel({
  query,
  location,
  locating,
  locationError,
  onQueryChange,
  onLocationChange,
  onSearch,
  onUseLocation,
}: Props) {
  const searchValue = query || location;

  return (
    <div className="relative z-20 mx-auto -mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-border bg-card p-4 shadow-[var(--shadow-lift)]">
        <form
          role="search"
          aria-label="Search accessible venues"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <TextInput
              name="search"
              label="Search by town, postcode or venue name"
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                onQueryChange(value);
                onLocationChange(value);
              }}
              placeholder="Search by town, postcode or venue name"
              autoComplete="off"
              error={locationError ?? undefined}
              className="h-16 rounded-2xl border-border px-5 text-base focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/15"
            />

            <button
              type="button"
              className={`${VF_BTN_SECONDARY} h-16 w-full whitespace-nowrap lg:w-auto`}
              disabled={locating}
              onClick={onUseLocation}
            >
              {locating ? "Finding location…" : "Use my location"}
            </button>

            <button type="submit" className={`${VF_BTN_PRIMARY} h-16 w-full whitespace-nowrap lg:w-auto`}>
              Search venues →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
