"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GuideHeroIllustration } from "@/components/guide/guide-hero-illustration";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export type GuideHeroHeaderProps = {
  title?: string;
  subtitle?: string;
  categoryLabel?: string;
  secondaryLabel?: string;
  lastUpdated?: string;
  lastUpdatedLabel?: string;
  readTime?: string;
  guideType?: string;
  factChecked?: boolean;
  backgroundImageUrl?: string;
  heroImageUrl?: string;
  backHref?: string;
  fullGuideHref?: string;
  onStartGuide?: () => void;
  onListen?: () => void;
  className?: string;
};

export const ACCESS_TO_WORK_HERO_DEFAULTS: Required<
  Pick<GuideHeroHeaderProps, "title" | "subtitle" | "categoryLabel" | "secondaryLabel" | "lastUpdated" | "readTime" | "guideType">
> = {
  title: "Access to Work: What You Can Ask For and How to Apply",
  subtitle:
    "A practical, step-by-step guide to what Access to Work can fund, how to apply, and how to ask for the right support with confidence.",
  categoryLabel: "Practical guide",
  secondaryLabel: "Popular guide",
  lastUpdated: "2026-05-12",
  readTime: "11 min read",
  guideType: "UK support guide",
};

type MetaItem = {
  icon: string;
  label: string;
};

function MetaRow({ items, reducedMotion }: { items: MetaItem[]; reducedMotion: boolean }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
      {items.map((item, i) => (
        <li
          key={item.label}
          className={cn(
            "flex items-center gap-2 text-sm text-[#5E6A66]",
            !reducedMotion && "guide-hero-meta-in",
          )}
          style={!reducedMotion ? { animationDelay: `${120 + i * 70}ms` } : undefined}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/80 text-xs shadow-sm ring-1 ring-[#F1D8C7]">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function GuideHeroHeader({
  title = ACCESS_TO_WORK_HERO_DEFAULTS.title,
  subtitle = ACCESS_TO_WORK_HERO_DEFAULTS.subtitle,
  categoryLabel = ACCESS_TO_WORK_HERO_DEFAULTS.categoryLabel,
  secondaryLabel = ACCESS_TO_WORK_HERO_DEFAULTS.secondaryLabel,
  lastUpdated = ACCESS_TO_WORK_HERO_DEFAULTS.lastUpdated,
  lastUpdatedLabel = "Last updated",
  readTime = ACCESS_TO_WORK_HERO_DEFAULTS.readTime,
  guideType = ACCESS_TO_WORK_HERO_DEFAULTS.guideType,
  factChecked = true,
  backgroundImageUrl,
  heroImageUrl,
  backHref = "/advice",
  fullGuideHref,
  onStartGuide,
  onListen,
  className,
}: GuideHeroHeaderProps) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const meta: MetaItem[] = [
    { icon: "📅", label: `${lastUpdatedLabel} ${lastUpdated}` },
    { icon: "⏱", label: readTime },
    { icon: "🇬🇧", label: guideType },
  ];
  if (factChecked) meta.push({ icon: "✓", label: "Fact checked" });

  return (
    <header className={cn("mx-auto w-full max-w-7xl", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-[32px] border border-[#F1D8C7] bg-[#FFF8F1] shadow-[0_20px_48px_-24px_rgba(240,74,22,0.18)]",
          mounted && !reducedMotion && "guide-hero-rise",
        )}
      >
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 bg-[#FFF8F1]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_85%_20%,rgba(255,226,211,0.75),transparent_55%)]"
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full bg-[#FFE2D3]/40 blur-3xl",
            !reducedMotion && "guide-hero-drift-a",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-[#EDF7ED]/50 blur-3xl",
            !reducedMotion && "guide-hero-drift-b",
          )}
          aria-hidden
        />
        <svg
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 w-full text-[#FFE2D3]/30",
            !reducedMotion && "guide-hero-drift-c",
          )}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,64 C200,120 400,0 600,48 C800,96 1000,24 1200,64 L1200,120 L0,120 Z"
          />
        </svg>
        {backgroundImageUrl ? (
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            aria-hidden
          />
        ) : null}

        <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          {/* Top row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={backHref}
              className="inline-flex min-h-[44px] w-fit items-center text-sm font-semibold text-[#59682A] underline-offset-2 transition-colors hover:text-[#F04A16] hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4"
            >
              ← Back to guides
            </Link>
            <div
              className={cn(
                "flex flex-wrap gap-2",
                mounted && !reducedMotion && "guide-hero-badge-in",
              )}
              style={!reducedMotion ? { animationDelay: "80ms" } : undefined}
            >
              <span className="inline-flex min-h-[32px] items-center rounded-full border border-[#F1D8C7] bg-white/90 px-3 py-1 text-xs font-semibold text-[#13201F] shadow-sm">
                {categoryLabel}
              </span>
              <span className="inline-flex min-h-[32px] items-center rounded-full bg-[#EDF7ED] px-3 py-1 text-xs font-semibold text-[#2F7D32] ring-1 ring-[#C8E6C9]">
                {secondaryLabel}
              </span>
            </div>
          </div>

          {/* Main hero grid */}
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:gap-10">
            <div className="min-w-0">
              <h1 className="font-[var(--font-heading)] text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#13201F] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5E6A66] sm:text-lg">{subtitle}</p>
              <MetaRow items={meta} reducedMotion={reducedMotion} />

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={onStartGuide}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#F04A16] px-5 text-sm font-semibold text-white shadow-sm shadow-[#F04A16]/20 transition-colors hover:bg-[#D93E10] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
                >
                  Start the guide
                </button>
                {fullGuideHref ? (
                  <Link
                    href={fullGuideHref}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#59682A] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#45521F] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
                  >
                    View full guide
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={onListen}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-2xl px-3 text-sm font-semibold text-[#59682A] underline-offset-2 transition-colors hover:text-[#F04A16] hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
                >
                  Listen to guide
                </button>
              </div>
            </div>

            <GuideHeroIllustration heroImageUrl={heroImageUrl} reducedMotion={reducedMotion} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
}
