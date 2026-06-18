import type { SampleVenueCard } from "@/lib/venue-finder-samples";

function verificationClass(status: SampleVenueCard["verification"]) {
  if (status === "On-site audited" || status === "Desk reviewed") return "vf-badge-verified";
  if (status === "Community reported") return "vf-badge-community-orange";
  if (status === "Demo listing") return "vf-badge-neutral";
  return "vf-badge-neutral";
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

const VERIFICATION_STYLES: Record<
  "On-site audited" | "Desk reviewed" | "Community reported" | "Demo listing" | "Not yet verified" | "Major access concern",
  string
> = {
  "On-site audited": "border-emerald-200 bg-emerald-50 text-emerald-800",
  "Desk reviewed": "border-emerald-200 bg-emerald-50 text-emerald-800",
  "Community reported": "border-amber-200 bg-amber-50 text-amber-800",
  "Demo listing": "border-amber-200 bg-amber-50 text-amber-900",
  "Not yet verified": "border-border bg-background-2 text-muted",
  "Major access concern": "border-red-200 bg-red-50 text-red-800",
};

export function VenueFinderVerificationBadge({
  status,
}: {
  status: string;
}) {
  const style =
    VERIFICATION_STYLES[status as keyof typeof VERIFICATION_STYLES] ??
    VERIFICATION_STYLES["Not yet verified"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />
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
