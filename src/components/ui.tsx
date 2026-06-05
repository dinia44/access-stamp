import Link from "next/link";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  accent,
}: {
  className?: string;
  children: React.ReactNode;
  /** Subtle top accent from logo palette */
  accent?: "blue" | "amber" | "navy" | "none";
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-card shadow-[var(--shadow-soft)] card-surface",
        accent === "blue" && "card-accent-blue",
        accent === "amber" && "card-accent-amber",
        accent === "navy" && "card-accent-navy",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "amber",
  className,
}: {
  children: React.ReactNode;
  tone?: "amber" | "blue" | "navy";
  className?: string;
}) {
  const toneClass =
    tone === "blue"
      ? "bg-blue-pale text-blue ring-1 ring-blue/15"
      : tone === "navy"
        ? "bg-navy-pale text-navy ring-1 ring-navy/10"
        : "bg-amber-pale text-[#8b5e14] ring-1 ring-amber/20";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        toneClass,
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
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius-ui)] px-4 py-2 text-sm font-semibold transition-colors";
  const v =
    variant === "primary"
      ? "bg-blue text-white shadow-[0_2px_8px_-2px_rgba(36,120,208,0.45)] hover:bg-[#1f6bb8]"
      : variant === "secondary"
        ? "bg-amber text-navy shadow-[0_2px_8px_-2px_rgba(212,149,42,0.35)] hover:bg-[#c48824]"
        : "bg-transparent text-blue hover:bg-blue-pale/80";

  const cls = cn(base, v, className);
  if (href) return <Link className={cls} href={href}>{children}</Link>;
  return (
    <button className={cls} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
