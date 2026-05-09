import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

/** Shared vertical rhythm between major blocks on marketing/advice pages */
const STACK = {
  hub: "space-y-6",
  tight: "space-y-8",
  default: "space-y-10",
  relaxed: "space-y-12",
} as const;

export type PageStack = keyof typeof STACK;

/**
 * Standard page shell: site background, centred container, consistent vertical padding.
 * Use across Advice Hub, category landings, and similar pages for visual consistency.
 */
export function PageLayout({
  children,
  className,
  stack = "default",
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  stack?: PageStack;
  /** Extra classes on the inner stack wrapper */
  containerClassName?: string;
}) {
  return (
    <div className={cn("bg-background", className)}>
      <Container className="py-10 md:py-12">
        <div className={cn(STACK[stack], containerClassName)}>{children}</div>
      </Container>
    </div>
  );
}

/** Hero block: badge + title + optional subtitle — matches Advice Hub / category pages */
export function PageHero({
  badge,
  title,
  subtitle,
  className,
}: {
  badge: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-4xl space-y-4", className)}>
      <div className="w-fit">{badge}</div>
      <h1 className="font-[var(--font-heading)] text-4xl leading-tight text-heading sm:text-5xl">{title}</h1>
      {subtitle ? <p className="max-w-[82ch] text-base leading-7 text-muted">{subtitle}</p> : null}
    </div>
  );
}

/** Section title row used above grids on hub/category pages */
export function PageSectionTitle({
  title,
  description,
  className,
  titleClassName,
}: {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className={cn("font-[var(--font-heading)] text-2xl text-heading", titleClassName)}>{title}</h2>
      {description ? <p className="text-sm text-muted">{description}</p> : null}
    </div>
  );
}
