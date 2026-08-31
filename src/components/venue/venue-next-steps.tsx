"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { mapVenueNextSteps, type VenueNextStepInput } from "@/lib/venue-next-steps";

export function VenueNextSteps({
  unknownFeatures,
  confirmedFeatures,
  unavailableFeatures,
}: VenueNextStepInput) {
  const steps = mapVenueNextSteps({ unknownFeatures, confirmedFeatures, unavailableFeatures });
  if (steps.length === 0) return null;

  return (
    <section
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
      aria-labelledby="venue-next-steps-heading"
    >
      <h2 id="venue-next-steps-heading" className="text-lg font-semibold text-heading">
        Useful next steps
      </h2>
      <ul className="mt-3 grid gap-3">
        {steps.map((step) => (
          <li key={step.id}>
            <p className="text-sm leading-6 text-muted">{step.reason}</p>
            <Link
              href={step.href}
              onClick={() => track("venue_next_step_opened", { source: "venue", category: step.id })}
              className="mt-1 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] hover:underline"
            >
              {step.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
