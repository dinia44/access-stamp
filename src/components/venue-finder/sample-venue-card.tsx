import type { SampleVenueCard } from "@/lib/venue-finder-samples";

function verificationClass(status: SampleVenueCard["verification"]) {
  if (status === "Access Stamp checked") return "vf-badge-verified";
  if (status === "Community reported") return "vf-badge-community";
  return "vf-badge-unverified";
}

function confidenceClass(level: SampleVenueCard["confidence"]) {
  if (level === "High confidence") return "vf-badge-confidence-high";
  if (level === "Medium confidence") return "vf-badge-confidence-medium";
  return "vf-badge-confidence-low";
}

export function SampleVenueCardItem({ venue }: { venue: SampleVenueCard }) {
  return (
    <li>
      <article
        className="flex h-full flex-col p-5 sm:p-6"
        style={{
          background: "var(--vf-card)",
          border: "1px solid var(--vf-border)",
          borderRadius: "var(--vf-radius-card)",
          boxShadow: "var(--vf-shadow-soft)",
        }}
      >
        <header className="space-y-2">
          <h3
            className="font-[var(--font-heading)] text-lg font-semibold"
            style={{ color: "var(--vf-ink)" }}
          >
            {venue.name}
          </h3>
          <p className="text-sm" style={{ color: "var(--vf-muted)" }}>
            {venue.type}
          </p>
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${verificationClass(venue.verification)}`}
            >
              {venue.verification}
            </span>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${confidenceClass(venue.confidence)}`}
            >
              {venue.confidence}
            </span>
          </div>
        </header>

        <div className="mt-4 flex-1 space-y-3 text-sm" style={{ color: "var(--vf-muted)" }}>
          <p>
            <span className="font-semibold" style={{ color: "var(--vf-ink)" }}>
              Summary:{" "}
            </span>
            {venue.summary}
          </p>
          <div className="vf-warning-box">
            <span className="font-semibold">Check before visiting: </span>
            {venue.warning.replace(/^Check before visiting:\s*/i, "")}
          </div>
        </div>

        <footer className="mt-5 border-t pt-4" style={{ borderColor: "var(--vf-border)" }}>
          <button
            type="button"
            className="vf-btn-primary w-full sm:w-auto"
            aria-label={`View access report for ${venue.name}`}
          >
            View access report
          </button>
        </footer>
      </article>
    </li>
  );
}
