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
    "inline-flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0891B2] focus-visible:outline-offset-4";
  const v =
    variant === "primary"
      ? "bg-blue text-white shadow-sm shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-blue-600/25"
      : variant === "secondary"
        ? "border border-[#93C5FD] bg-white text-[#1E3A5F] hover:border-[#2563EB]/40 hover:bg-[#EFF6FF]"
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
