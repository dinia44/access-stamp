import { Badge } from "@/components/ui";
import { confidenceBadgeMeta, verificationBadgeMeta, type VerificationStatus } from "@/lib/colors";
import { cn } from "@/lib/utils";

export function VerificationBadge({
  status,
  className,
}: {
  status: VerificationStatus;
  className?: string;
}) {
  const { label, tone } = verificationBadgeMeta(status);
  return (
    <Badge tone={tone} className={cn("text-[11px]", className)}>
      {label}
    </Badge>
  );
}

export function ConfidenceBadge({ level, className }: { level: string; className?: string }) {
  const { label, tone } = confidenceBadgeMeta(level);
  return (
    <Badge tone={tone} className={cn("text-[11px]", className)}>
      {label}
    </Badge>
  );
}
