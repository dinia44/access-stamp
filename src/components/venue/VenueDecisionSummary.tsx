import {
  ConfidenceBadge,
  VerificationBadge,
} from "@/components/verification-badge";
import type { Venue } from "@/lib/mock-data";
import { getVenueBySlug } from "@/data/venues";
import { isDemoVenue } from "@/lib/venue-card";
import {
  getMeasurementLabel,
  toVerificationType,
} from "@/lib/venue-verification";

type Props = {
  venue: Venue;
  confirmedFeatures: string[];
  unavailableFeatures: string[];
  unknownFeatures?: string[];
  unknownCount: number;
};

export type DecisionOutcome = "likely" | "needs_confirmation" | "may_not_meet";

export function getDecisionOutcome(
  venue: Venue,
  unknownCount: number,
  unavailableCount: number,
): DecisionOutcome {
  const type = toVerificationType(venue.verification);
  const isDemoOrWeak = type === "demo" || type === "unverified";
  const yesCount = Object.values(venue.features).filter(
    (x) => x === "yes",
  ).length;

  if (unavailableCount >= 3 && yesCount < unavailableCount)
    return "may_not_meet";
  if (isDemoOrWeak || unknownCount >= 3 || venue.confidence === "Low")
    return "needs_confirmation";
  if (
    venue.confidence === "High" &&
    unknownCount <= 1 &&
    type === "onsite_audited"
  )
    return "likely";
  if (yesCount >= 4 && unknownCount <= 2 && !isDemoOrWeak) return "likely";
  return "needs_confirmation";
}

const OUTCOME_COPY: Record<DecisionOutcome, string> = {
  likely: "Likely suitable based on current evidence",
  needs_confirmation: "Needs confirmation before travelling",
  may_not_meet: "May not meet these needs",
};

/** Data and evidence remain intact; presentation is deliberately quiet and factual. */
export function VenueDecisionSummary({
  venue,
  confirmedFeatures,
  unavailableFeatures,
  unknownFeatures = [],
  unknownCount,
}: Props) {
  const demo = isDemoVenue(venue);
  const canonical = getVenueBySlug(venue.slug);
  const measurementLabel = getMeasurementLabel(
    toVerificationType(venue.verificationType ?? venue.verification),
  );
  const measurements = canonical?.measurements;
  const rows: Array<{ label: string; value: string; note?: string }> = [];
  if (measurements?.entranceWidthCm)
    rows.push({
      label: "Entrance clear opening",
      value: `${measurements.entranceWidthCm} cm`,
      note: measurementLabel,
    });
  if (measurements?.toiletDoorWidthCm)
    rows.push({
      label: "Toilet door opening",
      value: `${measurements.toiletDoorWidthCm} cm`,
      note: measurementLabel,
    });
  if (!rows.length) {
    const photo = venue.photos?.find((item) => item.measurement);
    if (photo?.measurement)
      rows.push({
        label: photo.label,
        value: photo.measurement.replace(/^Door width measured:\s*/i, ""),
        note: measurementLabel,
      });
    else rows.push({ label: "Door measurements", value: "Not recorded" });
  }
  for (const feature of ["Step-free entrance", "Accessible toilet"]) {
    const status = venue.features[feature];
    rows.push({
      label: feature,
      value:
        status === "yes"
          ? demo
            ? "Example: present"
            : "Reported present"
          : status === "no"
            ? demo
              ? "Example: unavailable"
              : "Reported unavailable"
            : "Not confirmed",
    });
  }
  const unknowns = unknownFeatures.length
    ? unknownFeatures
    : Object.entries(venue.features)
        .filter(([, value]) => value === "unknown")
        .map(([feature]) => feature);
  const outcome = getDecisionOutcome(
    venue,
    unknownCount,
    unavailableFeatures.length,
  );
  return (
    <section
      id="venue-summary"
      className="venue-report-summary"
      aria-labelledby="decision-summary-heading"
    >
      <h2 id="decision-summary-heading">Accessibility overview</h2>
      <p className="venue-report-muted">
        {demo
          ? "Example venue report. Measurements and features are illustrative, not verified information."
          : OUTCOME_COPY[outcome]}
      </p>
      <dl id="venue-measurements" className="venue-report-measurements">
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>
              <span>{row.value}</span>
              {row.note ? <small>{row.note}</small> : null}
            </dd>
          </div>
        ))}
      </dl>
      <div id="venue-unknowns" className="venue-report-evidence">
        <p className="venue-report-evidence-count">
          <span className="venue-report-status-dot" aria-hidden="true" />
          <strong>
            {unknownCount === 0
              ? "No unknowns flagged"
              : `${unknownCount} to confirm`}
          </strong>
          <span>{demo ? "in this example" : "before travelling"}</span>
        </p>
        <details>
          <summary>Evidence and missing information</summary>
          <dl className="venue-report-evidence-meta">
            <div>
              <dt>Evidence state</dt>
              <dd>
                <VerificationBadge status={venue.verification} />
              </dd>
            </div>
            <div>
              <dt>Last checked</dt>
              <dd>{demo ? "Not independently checked" : venue.lastUpdated}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>
                {demo ? (
                  "Example data — not assessed"
                ) : (
                  <ConfidenceBadge level={venue.confidence} />
                )}
              </dd>
            </div>
          </dl>
          <h3>{demo ? "Illustrative features" : "Reported present"}</h3>
          <p>{confirmedFeatures.join(" · ") || "No features documented yet"}</p>
          <h3>
            {demo ? "Illustrated as unavailable" : "Reported unavailable"}
          </h3>
          <p>
            {unavailableFeatures.join(" · ") || "None listed as unavailable"}
          </p>
          <h3>Unknown — confirm before you go</h3>
          {unknowns.length ? (
            <ul>
              {unknowns.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : (
            <p>No unknowns flagged</p>
          )}
        </details>
      </div>
    </section>
  );
}
