import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ABOUT_CONTAINER,
  ABOUT_SECTION,
  ABOUT_SECTION_ALT,
  ABOUT_SECTION_PANEL,
} from "@/components/about/about-theme";

type AboutSectionTone = "default" | "alt" | "panel";

const TONE_CLASS: Record<AboutSectionTone, string> = {
  default: "",
  alt: ABOUT_SECTION_ALT,
  panel: ABOUT_SECTION_PANEL,
};

export function AboutSection({
  id,
  tone = "default",
  className,
  containerClassName,
  children,
  "aria-labelledby": ariaLabelledby,
}: {
  id?: string;
  tone?: AboutSectionTone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      className={cn(ABOUT_SECTION, TONE_CLASS[tone], className)}
      aria-labelledby={ariaLabelledby}
    >
      <div className={cn(ABOUT_CONTAINER, containerClassName)}>{children}</div>
    </section>
  );
}

export function AboutSectionHeader({
  id,
  eyebrow,
  title,
  description,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string | ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#59682A]">{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#13201F] sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        typeof description === "string" ? (
          <p className="text-[1.0625rem] leading-[1.65] text-[#5E6A66]">{description}</p>
        ) : (
          description
        )
      ) : null}
    </div>
  );
}

export function AboutTextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-1 font-semibold text-[#F04A16] underline decoration-[#F04A16]/30 underline-offset-4 transition hover:decoration-[#F04A16]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F04A16]/25 focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </a>
  );
}
