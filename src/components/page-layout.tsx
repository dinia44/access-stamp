import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";

const STACK = {
  hub: "space-y-8",
  tight: "space-y-10",
  default: "space-y-12",
  relaxed: "space-y-16",
} as const;

export type PageStack = keyof typeof STACK;

export function PageLayout({
  children,
  className,
  stack = "default",
  containerClassName,
  hero = false,
}: {
  children: React.ReactNode;
  className?: string;
  stack?: PageStack;
  containerClassName?: string;
  /** Adds premium gradient hero band at top */
  hero?: boolean;
}) {
  return (
    <div className={cn(hero ? "premium-section-hero" : "bg-background", className)}>
      <Container className="py-12 md:py-16 lg:py-20">
        <div className={cn(STACK[stack], containerClassName)}>{children}</div>
      </Container>
    </div>
  );
}

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
    <FadeIn>
      <div className={cn("max-w-3xl", className)}>
        <div className="page-hero-panel space-y-5">
          <div className="w-fit">{badge}</div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-heading sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-[65ch] text-base leading-7 text-muted sm:text-lg">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </FadeIn>
  );
}

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
    <FadeIn delayMs={80}>
      <div className={cn("space-y-2", className)}>
        <h2 className={cn("text-2xl font-bold tracking-[-0.02em] text-heading sm:text-3xl", titleClassName)}>
          {title}
        </h2>
        {description ? <p className="max-w-[65ch] text-base leading-7 text-muted">{description}</p> : null}
      </div>
    </FadeIn>
  );
}
