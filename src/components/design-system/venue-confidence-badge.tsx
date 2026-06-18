import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

export type VenueConfidenceStatus =
  | "On-site audited"
  | "Desk reviewed"
  | "Community reported"
  | "Venue submitted"
  | "Demo listing"
  | "Not yet verified";

const STATUS_META: Record<
  VenueConfidenceStatus,
  { label: string; tone: "verified" | "community" | "warning" | "neutral" | "blue"; hint?: string }
> = {
  "On-site audited": { label: "On-site audited", tone: "verified" },
  "Desk reviewed": { label: "Desk reviewed", tone: "verified" },
  "Community reported": { label: "Community reported", tone: "community" },
  "Venue submitted": { label: "Venue submitted", tone: "blue" },
  "Demo listing": {
    label: "Demo listing",
    tone: "warning",
    hint: "Demonstrates how Access Stamp venue reports could work — not live venue data.",
  },
  "Not yet verified": { label: "Not yet verified", tone: "warning" },
};

export function VenueConfidenceBadge({
  status,
  className,
  showHint = false,
}: {
  status: VenueConfidenceStatus | string;
  className?: string;
  showHint?: boolean;
}) {
  const meta = STATUS_META[status as VenueConfidenceStatus] ?? {
    label: status,
    tone: "neutral" as const,
  };

  return (
    <span className={cn("inline-flex flex-col gap-1", className)}>
      <Badge tone={meta.tone} className="w-fit text-[11px]">
        {meta.label}
      </Badge>
      {showHint && meta.hint ? (
        <span className="text-xs leading-5 text-muted">{meta.hint}</span>
      ) : null}
    </span>
  );
}
