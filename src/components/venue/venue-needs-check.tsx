"use client";
import { useState } from "react";
import type { Venue } from "@/lib/mock-data";
import { WillItFitCard } from "@/components/venue/will-it-fit-card";
import { isDemoVenue } from "@/lib/venue-card";
const NEEDS = [
  "Step-free entrance",
  "Accessible toilet",
  "Changing Places toilet",
  "Left-side transfer",
  "Right-side transfer",
  "Nearby Blue Badge parking",
  "Quiet environment",
  "Staff disability awareness",
  "PA / companion space",
];
export function VenueNeedsCheck({ venue }: { venue: Venue }) {
  const [needs, setNeeds] = useState<string[]>([]);
  return (
    <section
      id="venue-fit"
      className="scroll-mt-44 space-y-4 border-y border-border py-7"
    >
      <h2 className="text-2xl font-semibold">
        Check this venue against my needs
      </h2>
      <p className="text-sm text-muted">
        {isDemoVenue(venue)
          ? "This is an example comparison using demo data, not a recommendation for a real visit."
          : "Compare your requirements with the recorded evidence. Unknown details need confirmation."}
      </p>
      <WillItFitCard venue={venue} />
      <fieldset>
        <legend className="font-semibold">What else do you need?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {NEEDS.map((n) => (
            <label key={n} className="flex min-h-11 items-center gap-3">
              <input
                type="checkbox"
                checked={needs.includes(n)}
                onChange={(e) =>
                  setNeeds(
                    e.target.checked
                      ? [...needs, n]
                      : needs.filter((x) => x !== n),
                  )
                }
              />
              {n}
            </label>
          ))}
        </div>
      </fieldset>
      <div role="status" aria-live="polite">
        <ul className="space-y-2">
          {needs.map((n) => (
            <li key={n}>
              <strong>{n}:</strong>{" "}
              {venue.features[n] === "yes"
                ? "Recorded as present"
                : venue.features[n] === "no"
                  ? "Recorded as unavailable"
                  : "Unknown — ask the venue"}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm">
        Width alone cannot establish suitability. Check turning space, approach
        angles, equipment length and transfer space directly with the venue.
      </p>
    </section>
  );
}
