import type { SampleVenueCard } from "@/lib/venue-finder-samples";

function verificationClass(status: SampleVenueCard["verification"]) {
  if (status === "Access Stamp checked") return "vf-badge-verified";
  if (status === "Community reported") return "vf-badge-community-orange";
  return "vf-badge-unverified";
}

function confidenceClass(level: SampleVenueCard["confidence"]) {
  if (level === "High confidence") return "vf-badge-confidence-high";
  if (level === "Medium confidence") return "vf-badge-confidence-medium";
  return "vf-badge-confidence-low";
}

export function SampleVerificationBadge({ status }: { status: SampleVenueCard["verification"] }) {
  return (
    <span className={`vf-badge ${verificationClass(status)}`}>
      <span className="vf-badge-dot" aria-hidden="true" />
      {status}
    </span>
  );
}

export function SampleConfidenceBadge({ level }: { level: SampleVenueCard["confidence"] }) {
  return (
    <span className={`vf-badge ${confidenceClass(level)}`}>
      <span className="vf-badge-dot" aria-hidden="true" />
      {level}
    </span>
  );
}

export function VenueFinderVerificationBadge({
  status,
}: {
  status: "Access Stamp checked" | "Community reported" | "Not yet verified" | "Major access concern";
}) {
  const cls =
    status === "Access Stamp checked"
      ? "vf-badge-verified"
      : status === "Community reported"
        ? "vf-badge-community"
        : status === "Major access concern"
          ? "vf-badge-concern"
          : "vf-badge-unverified";

  return (
    <span className={`vf-badge ${cls}`}>
      <span className="vf-badge-dot" aria-hidden="true" />
      {status}
    </span>
  );
}

export function VenueFinderConfidenceBadge({ level }: { level: string }) {
  const normalized =
    level === "High" ? "High confidence" : level === "Medium" ? "Medium confidence" : level === "Low" ? "Low confidence" : level;

  const cls =
    normalized === "High confidence"
      ? "vf-badge-confidence-high"
      : normalized === "Medium confidence"
        ? "vf-badge-confidence-medium"
        : "vf-badge-confidence-low";

  return (
    <span className={`vf-badge ${cls}`}>
      <span className="vf-badge-dot" aria-hidden="true" />
      {normalized}
    </span>
  );
}

export function CategoryBadge({ label, accent, soft }: { label: string; accent: string; soft: string }) {
  return (
    <span
      className="vf-category-badge"
      style={{ color: accent, background: soft, borderColor: `${accent}33` }}
    >
      {label}
    </span>
  );
}
