import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkVariant = "primary" | "secondary" | "ghost" | "outline" | "chip";
type ButtonLinkSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white shadow-sm shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-hover)]",
  secondary:
    "border border-[var(--color-border-mid)] bg-white text-[var(--color-ink)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--background-2)]",
  ghost:
    "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]",
  outline:
    "border border-[var(--color-border-mid)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--background-2)]",
  chip:
    "rounded-full border border-[var(--color-border)] bg-[var(--background-2)] text-[var(--color-ink)] hover:bg-white data-[selected=true]:border-[var(--color-secondary)] data-[selected=true]:bg-[#EDF7ED] data-[selected=true]:text-[var(--color-secondary)]",
};

const sizeClasses: Record<ButtonLinkSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "as-transition inline-flex items-center justify-center gap-2 rounded-2xl font-semibold",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--as-focus)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--as-bg)]",
        "active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
