import Link from "next/link";
import { AS_BTN_PRIMARY, AS_BTN_SECONDARY, AS_FOCUS } from "@/lib/design-system";
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
    blue: "bg-[#DBEAFE] text-[#1D4ED8] ring-1 ring-[rgba(16,32,51,0.08)]",
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
  const base = `inline-flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${AS_FOCUS}`;
  const v =
    variant === "primary"
      ? AS_BTN_PRIMARY
      : variant === "secondary"
        ? AS_BTN_SECONDARY
        : variant === "premium"
          ? "bg-[#D4A84F] text-[#071826] hover:brightness-105 min-h-[48px] px-6 rounded-2xl font-semibold"
          : "bg-transparent text-[#2563EB] hover:underline min-h-[44px] px-2 rounded-2xl font-semibold underline-offset-4";

  const cls = cn(base, v, disabled && "pointer-events-none opacity-60", className);
  if (href && !disabled) return <Link className={cls} href={href}>{children}</Link>;
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
