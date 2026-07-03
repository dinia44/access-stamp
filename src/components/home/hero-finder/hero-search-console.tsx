"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HOME_FOCUS } from "@/components/home/home-theme";
import { Button } from "@/components/ui/Button";

const ACCESS_NEEDS = [
  { label: "Step-free access", filter: "Step-free entrance" },
  { label: "Accessible toilet", filter: "Accessible toilet" },
  { label: "Blue Badge parking", filter: "Nearby Blue Badge parking" },
  { label: "Wide turning space", filter: "Turning space (150cm+)" },
  { label: "Hearing loop", filter: "Hearing loop" },
] as const;

export function HeroSearchConsole() {
  const router = useRouter();
  const trayId = useId();
  const needsButtonRef = useRef<HTMLButtonElement>(null);
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("");
  const [needsOpen, setNeedsOpen] = useState(false);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const needsSummary =
    selectedNeeds.length === 0
      ? "Any access needs"
      : `${selectedNeeds.length} need${selectedNeeds.length === 1 ? "" : "s"} selected`;

  const toggleNeed = (filter: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter],
    );
  };

  const submitSearch = () => {
    const params = new URLSearchParams();
    if (what.trim()) params.set("q", what.trim());
    if (where.trim()) params.set("location", where.trim());
    if (selectedNeeds.length) params.set("filters", selectedNeeds.join(","));
    router.push(params.toString() ? `/venue-finder?${params.toString()}` : "/venue-finder");
  };

  return (
    <div className="hero-finder__console relative z-10 w-full rounded-[1.25rem] border border-[var(--color-border)] bg-white/95 p-2 backdrop-blur-sm sm:rounded-[1.5rem] sm:p-2.5">
      <form
        className="grid gap-2 min-[880px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.95fr)_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          submitSearch();
        }}
      >
        <label className="hero-finder__segment flex min-h-[72px] flex-col justify-center rounded-xl border border-transparent px-3 py-2.5 sm:px-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">What</span>
          <input
            id="hero-search-what"
            type="search"
            value={what}
            onChange={(event) => setWhat(event.target.value)}
            placeholder="Café, restaurant, gallery…"
            autoComplete="off"
            className={`mt-1 w-full border-0 bg-transparent p-0 text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-0 ${HOME_FOCUS}`}
          />
        </label>

        <label className="hero-finder__segment flex min-h-[72px] flex-col justify-center rounded-xl border border-transparent px-3 py-2.5 sm:px-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">Where</span>
          <input
            id="hero-search-where"
            type="text"
            value={where}
            onChange={(event) => setWhere(event.target.value)}
            placeholder="City, town or postcode"
            autoComplete="postal-code"
            className={`mt-1 w-full border-0 bg-transparent p-0 text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-0 ${HOME_FOCUS}`}
          />
        </label>

        <div className="hero-finder__segment relative flex min-h-[72px] flex-col justify-center rounded-xl border border-transparent px-3 py-2.5 sm:px-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Access needs
          </span>
          <button
            ref={needsButtonRef}
            type="button"
            id="hero-search-needs-button"
            aria-expanded={needsOpen}
            aria-controls={trayId}
            onClick={() => setNeedsOpen((open) => !open)}
            className={`mt-1 flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg text-left text-base text-[var(--color-text)] ${HOME_FOCUS}`}
          >
            <span>{needsSummary}</span>
            {selectedNeeds.length > 0 ? (
              <span
                className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--color-primary-soft)] px-2 text-xs font-semibold text-[var(--color-primary)]"
                aria-hidden="true"
              >
                {selectedNeeds.length}
              </span>
            ) : null}
            <span className="sr-only">
              {selectedNeeds.length > 0
                ? `${selectedNeeds.length} access need${selectedNeeds.length === 1 ? "" : "s"} selected`
                : "No access needs selected"}
            </span>
          </button>
        </div>

        <div className="flex items-stretch min-[880px]:items-end">
          <Button type="submit" className="h-14 w-full min-h-[44px] rounded-xl min-[880px]:min-w-[132px] min-[880px]:rounded-2xl">
            Search
          </Button>
        </div>
      </form>

      {needsOpen ? (
        <div
          id={trayId}
          role="group"
          aria-labelledby="hero-search-needs-button"
          className="mt-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-warm)]/70 p-3"
        >
          <div className="flex flex-wrap gap-2">
            {ACCESS_NEEDS.map(({ label, filter }) => {
              const active = selectedNeeds.includes(filter);
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleNeed(filter)}
                  className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors ${HOME_FOCUS} ${
                    active
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-text)]"
                      : "border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-border-mid)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
