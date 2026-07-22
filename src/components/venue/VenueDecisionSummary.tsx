import { ConfidenceBadge, VerificationBadge } from "@/components/verification-badge";
import type { Venue } from "@/lib/mock-data";
import { getVenueBySlug } from "@/data/venues";
import { isDemoVenue } from "@/lib/venue-card";
import { toVerificationType } from "@/lib/venue-verification";

type Props = {
  venue: Venue;
  confirmedFeatures: string[];
  unavailableFeatures: string[];
  unknownCount: number;
};

export type DecisionOutcome = "likely" | "needs_confirmation" | "may_not_meet";

export function getDecisionOutcome(venue: Venue, unknownCount: number, unavailableCount: number): DecisionOutcome {
  const type = toVerificationType(venue.verification);
  const isDemoOrWeak = type === "demo" || type === "unverified";
  const yesCount = Object.values(venue.features).filter((x) => x === "yes").length;

  if (unavailableCount >= 3 && yesCount < unavailableCount) return "may_not_meet";
  if (isDemoOrWeak || unknownCount >= 3 || venue.confidence === "Low") return "needs_confirmation";
  if (venue.confidence === "High" && unknownCount <= 1 && type === "onsite_audited") return "likely";
  if (yesCount >= 4 && unknownCount <= 2 && !isDemoOrWeak) return "likely";
  return "needs_confirmation";
}

const OUTCOME_COPY: Record<
  DecisionOutcome,
  { title: string; tone: string; iconLabel: string }
> = {
  likely: {
    title: "Likely suitable based on current evidence",
    tone: "border-[var(--color-trust)] bg-[var(--color-trust-soft)] text-[var(--color-trust)]",
    iconLabel: "Confirmed",
  },
  needs_confirmation: {
    title: "Needs confirmation before travelling",
    tone: "border-[var(--color-warning)] bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
    iconLabel: "Check before visiting",
  },
  may_not_meet: {
    title: "May not meet these needs",
    tone: "border-[var(--color-danger)] bg-[var(--color-danger-soft)] text-[var(--color-danger)]",
    iconLabel: "Not available",
  },
};

/** Compact evidence-based decision summary for the top of a venue report. */
export function VenueDecisionSummary({
  venue,
  confirmedFeatures,
  unavailableFeatures,
  unknownCount,
}: Props) {
  const outcome = getDecisionOutcome(venue, unknownCount, unavailableFeatures.length);
  const copy = OUTCOME_COPY[outcome];
  const demo = isDemoVenue(venue);
  const canonical = getVenueBySlug(venue.slug);
  const measurements: string[] = [];
  if (canonical?.measurements?.entranceWidthCm) {
    measurements.push(`Entrance width ${canonical.measurements.entranceWidthCm} cm`);
  }
  if (canonical?.measurements?.toiletDoorWidthCm) {
    measurements.push(`Toilet door ${canonical.measurements.toiletDoorWidthCm} cm`);
  }
  if (measurements.length === 0) {
    const measuredPhoto = venue.photos?.find((photo) => photo.measurement);
    if (measuredPhoto?.measurement) {
      measurements.push(measuredPhoto.measurement.replace(/^Door width measured:\s*/i, measuredPhoto.label + ": "));
    }
  }

  return (
    <aside
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-soft)]"
      aria-labelledby="decision-summary-heading"
    >
      <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${copy.tone}`}>
        <StatusGlyph outcome={outcome} />
        <span>{copy.iconLabel}</span>
      </div>

      <h2 id="decision-summary-heading" className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
        {copy.title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
        {demo
          ? "This is a demonstration listing. Treat measurements and features as examples while we grow audited coverage."
          : "This outcome is based on current evidence only. Access can change — confirm important details before you travel."}
      </p>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Evidence state</dt>
          <dd className="mt-1.5">
            <VerificationBadge status={venue.verification} />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Last checked</dt>
          <dd className="mt-1.5 text-sm font-semibold text-[var(--color-ink)]">{venue.lastUpdated}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Confidence</dt>
          <dd className="mt-1.5">
            <ConfidenceBadge level={venue.confidence} />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Important unknowns</dt>
          <dd className="mt-1.5 text-sm font-semibold text-[var(--color-ink)]">
            {unknownCount === 0 ? "None flagged" : `${unknownCount} to confirm`}
          </dd>
        </div>
      </dl>

      {measurements.length > 0 ? (
        <div className="mt-4 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-mid)] bg-[var(--color-surface-subtle)] px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">Critical measurements</p>
          <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-ink)]">
            {measurements.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <FeatureList title="Confirmed" items={confirmedFeatures.slice(0, 6)} tone="trust" empty="No confirmed features yet" />
        <FeatureList
          title="Unavailable"
          items={unavailableFeatures.slice(0, 6)}
          tone="danger"
          empty="None listed as unavailable"
        />
      </div>

      <p className="mt-4 border-t border-[var(--color-border)] pt-3 text-xs leading-5 text-[var(--color-text-muted)]">
        Always confirm changeable information (temporary works, staffing, equipment) with the venue on the day of travel.
      </p>
    </aside>
  );
}

function FeatureList({
  title,
  items,
  tone,
  empty,
}: {
  title: string;
  items: string[];
  tone: "trust" | "danger";
  empty: string;
}) {
  const color = tone === "trust" ? "text-[var(--color-trust)]" : "text-[var(--color-danger)]";
  const dot = tone === "trust" ? "bg-[var(--color-trust)]" : "bg-[var(--color-danger)]";
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${color}`}>{title}</p>
      {items.length === 0 ? (
        <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{empty}</p>
      ) : (
        <ul className="mt-1.5 space-y-1 text-sm text-[var(--color-ink)]">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusGlyph({ outcome }: { outcome: DecisionOutcome }) {
  if (outcome === "likely") {
    return (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 10.5 8 14.5 16 5.5" />
      </svg>
    );
  }
  if (outcome === "may_not_meet") {
    return (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M5 5l10 10M15 5 5 15" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v5M10 14h.01" />
    </svg>
  );
}
