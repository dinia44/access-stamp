import { Button as SharedButton } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
  /** @deprecated Accents removed — use semantic badges instead */
  accent?: "blue" | "amber" | "navy" | "none";
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-card/95 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-mid)] hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type BadgeTone =
  | "blue"
  | "navy"
  | "neutral"
  | "verified"
  | "community"
  | "warning"
  | "error"
  | "gold";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone | "amber";
  className?: string;
}) {
  const resolved = tone === "amber" ? "warning" : tone;
  const toneClass: Record<BadgeTone, string> = {
    blue: "bg-[#FFE2D3] text-[#D93E10] ring-1 ring-[#F1D8C7]",
    navy: "bg-[#FFF3E8] text-[var(--color-ink)] ring-1 ring-[var(--color-border)]",
    neutral: "bg-[#FFF3E8] text-[var(--color-muted)] ring-1 ring-[var(--color-border)]",
    verified: "bg-[#EDF7ED] text-[#2F7D32] ring-1 ring-[#C8E6C9]",
    community: "bg-[#FFE2D3] text-[#D93E10] ring-1 ring-[#F1D8C7]",
    warning: "bg-amber-pale text-warning ring-1 ring-[#fde68a]",
    error: "bg-error-pale text-error ring-1 ring-[#fecaca]",
    gold: "bg-[#13201F] text-[#f8fafc] ring-1 ring-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]",
  };

  return (
    <span
      className={cn(
        "inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-snug",
        toneClass[resolved],
        className,
      )}
    >
      {children}
    </span>
  );
}

export { Button as UiButton } from "@/components/ui/Button";
export { ButtonLink } from "@/components/ui/ButtonLink";

type LegacyButtonVariant = "primary" | "secondary" | "premium" | "ghost";

function mapLinkVariant(variant: LegacyButtonVariant): "primary" | "secondary" | "ghost" {
  if (variant === "ghost") return "ghost";
  if (variant === "secondary") return "secondary";
  return "primary";
}

/** @deprecated Prefer `@/components/ui/Button` or `ButtonLink` directly */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: LegacyButtonVariant;
  className?: string;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  if (href && !disabled) {
    return (
      <ButtonLink href={href} variant={mapLinkVariant(variant)} className={className}>
        {children}
      </ButtonLink>
    );
  }

  const mappedVariant = variant === "premium" ? "primary" : variant;

  return (
    <SharedButton
      variant={mappedVariant as "primary" | "secondary" | "ghost"}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </SharedButton>
  );
}
