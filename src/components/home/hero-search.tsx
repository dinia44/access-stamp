"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card } from "@/components/ui";

const FILTERS = [
  "Step-free access",
  "Accessible toilet",
  "Hearing loop",
  "Lift access",
  "Parking",
  "Sensory support",
  "Wide doorways",
  "Turning space",
  "Changing Places",
] as const;

const DEFAULT_ACTIVE = new Set<string>([
  "Step-free access",
  "Accessible toilet",
  "Parking",
]);

export function HeroSearchCard() {
  const [active, setActive] = useState<Set<string>>(new Set(DEFAULT_ACTIVE));

  const chips = useMemo(() => FILTERS.map((t) => ({ t, on: active.has(t) })), [active]);

  function toggle(t: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  return (
    <Card className="overflow-hidden border border-[#d8dfea] bg-[#f7f7f8] shadow-[0_28px_64px_-20px_rgba(0,0,0,0.35)]">
      <div className="p-4 sm:p-5">
        <div className="grid gap-3">
          <div className="grid gap-2 lg:grid-cols-[1.4fr_1fr_220px]">
            <label htmlFor="hero-search" className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[10px] border border-[#d8dfea] bg-white px-3">
              <span aria-hidden className="text-lg text-[#184080]">⌕</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-heading">Search for a venue or place</div>
                <input
                  id="hero-search"
                  className="w-full border-0 bg-transparent p-0 text-xs text-muted outline-none"
                  placeholder="e.g. museum, library, cinema, restaurant"
                  aria-label="Search for a venue or place"
                />
              </div>
            </label>

            <label htmlFor="hero-location" className="grid h-12 grid-cols-[auto_1fr] items-center gap-2 rounded-[10px] border border-[#d8dfea] bg-white px-3">
              <span aria-hidden className="text-lg text-[#184080]">⌖</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-heading">Location</div>
                <input
                  id="hero-location"
                  className="w-full border-0 bg-transparent p-0 text-xs text-muted outline-none"
                  placeholder="Enter city, town or postcode"
                  autoComplete="postal-code"
                  inputMode="search"
                />
              </div>
            </label>

            <Button className="h-12 w-full justify-center rounded-[10px] bg-[#0d4bb3] text-white hover:bg-[#0a3f97]" aria-label="Search venues">
              Search venues →
            </Button>
          </div>

          <Link
            href="/ai"
            className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[10px] border border-[#d8dfea] bg-white px-3 py-2 hover:bg-[#f5f8ff]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-blue text-xs text-white" aria-hidden>
              ✦
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-heading">Ask Access Stamp AI</span>
                <span className="rounded-full bg-blue px-2 py-0.5 text-[10px] font-bold text-white">BETA</span>
              </div>
              <div className="truncate text-xs text-muted">
                Get help finding venues, understanding accessibility, and planning your visit.
              </div>
            </div>
            <span className="text-[#184080]" aria-hidden>›</span>
          </Link>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5f6f86]">Access filters</div>
              <button type="button" className="text-xs font-semibold text-[#184080] hover:underline cursor-pointer">
                View all filters ˅
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {chips.map(({ t, on }) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggle(t)}
                  className={
                    "rounded-[10px] border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer " +
                    (on
                      ? "border-[#0d4bb3] bg-[#e8f0ff] text-[#184080]"
                      : "border-[#d8dfea] bg-white text-[#184080] hover:bg-[#f5f8ff]")
                  }
                  aria-pressed={on}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-[10px] bg-[#eef2f7] px-3 py-2 text-sm text-muted">
            <span className="text-base leading-none text-[#184080]" aria-hidden>◌</span>
            <div>
              Or describe what you need, for example:{" "}
              <span className="italic text-[#184080]">
                wheelchair-friendly museum in Liverpool with accessible toilets
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

