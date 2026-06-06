import Link from "next/link";
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
        "rounded-[var(--radius-card)] border border-border bg-card transition-shadow duration-200",
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
    blue: "bg-blue-pale text-[#1e40af] ring-1 ring-[#bfdbfe]",
    navy: "bg-navy-pale text-[var(--color-ink)] ring-1 ring-[var(--color-border)]",
    neutral: "bg-[#f1f5f9] text-[var(--color-muted)] ring-1 ring-[var(--color-border)]",
    verified: "bg-verified-pale text-verified ring-1 ring-[#99f6e4]",
    community: "bg-blue-pale text-[#1e40af] ring-1 ring-[#bfdbfe]",
    warning: "bg-amber-pale text-warning ring-1 ring-[#fde68a]",
    error: "bg-error-pale text-error ring-1 ring-[#fecaca]",
    gold: "bg-[#071827] text-[#f8fafc] ring-1 ring-[color-mix(in_srgb,var(--color-gold)_50%,transparent)]",
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
  variant?: "primary" | "secondary" | "premium" | "ghost";
  className?: string;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius-ui)] px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-[3px]";
  const v =
    variant === "primary"
      ? "bg-blue text-white hover:bg-[var(--color-primary-hover)]"
      : variant === "secondary"
        ? "border border-border bg-card text-[var(--color-ink)] hover:bg-background-2"
        : variant === "premium"
          ? "bg-gold text-[var(--color-navy)] hover:brightness-95"
          : "bg-transparent text-blue hover:bg-blue-pale";

  const cls = cn(base, v, disabled && "pointer-events-none opacity-60", className);
  if (href && !disabled) return <Link className={cls} href={href}>{children}</Link>;
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
