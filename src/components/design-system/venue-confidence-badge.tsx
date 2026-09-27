import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

import { verificationBadgeMeta } from "@/lib/colors";
import { toVerificationType, type VerificationLabel } from "@/lib/venue-verification";

export type VenueConfidenceStatus = VerificationLabel;

export function VenueConfidenceBadge({
  status,
  className,
  showHint = false,
}: {
  status: VenueConfidenceStatus | string;
  className?: string;
  showHint?: boolean;
}) {
  const meta = verificationBadgeMeta(status);
  const hint = toVerificationType(status) === "demo"
    ? "Demonstrates how Access Stamp venue reports could work — not live venue data."
    : undefined;

  return (
    <span className={cn("inline-flex flex-col gap-1", className)}>
      <Badge tone={meta.tone} className="w-fit text-[11px]">
        {meta.label}
      </Badge>
      {showHint && hint ? (
        <span className="text-xs leading-5 text-muted">{hint}</span>
      ) : null}
    </span>
  );
}
