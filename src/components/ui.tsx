import Link from "next/link";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-card shadow-[var(--shadow-soft)]",
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
      ? "bg-blue-pale text-blue"
      : tone === "navy"
        ? "bg-background-2 text-navy"
        : "bg-amber-pale text-amber";
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
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius-ui)] px-4 py-2 text-sm font-semibold transition-colors";
  const v =
    variant === "primary"
      ? "bg-blue text-white hover:bg-[#6b8c7c]"
      : variant === "secondary"
        ? "bg-amber text-navy hover:bg-[#b39258]"
        : "bg-transparent text-blue hover:bg-blue-pale";

  const cls = cn(base, v, className);
  if (href) return <Link className={cls} href={href}>{children}</Link>;
  return (
    <button className={cls} type="button">
      {children}
    </button>
  );
}
