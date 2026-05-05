"use client";

import { useMemo, useState } from "react";
import { Button, Card } from "@/components/ui";

const FILTERS = [
  "Step-free entrance",
  "Accessible toilet",
  "Wide doorways",
  "Nearby parking",
  "Automatic doors",
  "Turning space",
  "Changing Places",
  "Space for carers",
] as const;

const DEFAULT_ACTIVE = new Set<string>([
  "Step-free entrance",
  "Accessible toilet",
  "Wide doorways",
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
    <Card className="border border-border shadow-[0_32px_72px_-16px_rgba(0,0,0,0.2)]">
      <div className="p-7 sm:p-8">
        <div className="grid gap-4">
          {/* Row 1 */}
          <div className="grid gap-3 lg:grid-cols-[1fr_190px_160px]">
            <label className="text-sm font-semibold text-muted">
              <span className="sr-only">Location</span>
              <input
                className="h-11 w-full rounded-[var(--radius-ui)] border border-border bg-background px-3 text-heading"
                placeholder="📍 City, town, or postcode"
              />
            </label>
            <label className="text-sm font-semibold text-muted">
              <span className="sr-only">Venue type</span>
              <select className="h-11 w-full rounded-[var(--radius-ui)] border border-border bg-background px-3 text-heading">
                <option>Restaurant</option>
                <option>Café</option>
                <option>Hotel</option>
                <option>Shopping</option>
                <option>Leisure</option>
                <option>Arts & Culture</option>
              </select>
            </label>
            <div className="flex items-end">
              <Button className="w-full justify-center">Search</Button>
            </div>
          </div>

          <div className="h-px w-full bg-border" aria-hidden />

          {/* Row 2 */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9a9590]">
              Access filters
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {chips.map(({ t, on }) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggle(t)}
                  className={
                    "rounded-[10px] px-4 py-2 text-[13px] font-medium transition-colors " +
                    (on
                      ? "bg-blue text-white"
                      : "border border-border bg-white text-heading hover:bg-background-2")
                  }
                  aria-pressed={on}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-border" aria-hidden />

          {/* Row 3 */}
          <div className="flex items-start gap-3 text-sm text-muted">
            <div className="text-xl leading-none" aria-hidden>
              💬
            </div>
            <div>
              Or describe what you need, for example:{" "}
              <span className="italic text-text">
                “wheelchair-friendly pub in Liverpool with good parking”
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

