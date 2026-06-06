import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { HeroBackgroundWordmark } from "@/components/home/hero-background-wordmark";
import { PlatformHeroGraphic } from "@/components/home/platform-hero-graphic";
import { HOME_BTN_GHOST } from "@/components/home/home-theme";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#DBEAFE] via-[#EFF6FF] to-[#F8FBFF] text-[#0B1D3A]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.12),transparent_50%),radial-gradient(circle_at_88%_12%,rgba(8,145,178,0.1),transparent_42%),radial-gradient(circle_at_12%_88%,rgba(37,99,235,0.08),transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(147,197,253,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#EFF6FF] to-transparent"
        aria-hidden="true"
      />

      <HeroBackgroundWordmark />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0891B2]">
              UK accessibility platform
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-[#0B1D3A] sm:text-5xl lg:text-6xl">
              Find accessible places with confidence.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#1E3A5F] sm:text-xl">
              Search access-checked venues, plan visits, and get practical disability guidance across the UK.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#3B6B9A]">
              Built from lived experience and practical access needs.
            </p>

            <div className="mt-8">
              <AccessStampSearchBox integrated />
            </div>

            <div className="mt-5">
              <Link href="/advice" className={HOME_BTN_GHOST}>
                Explore disability guides
              </Link>
            </div>
          </div>

          <div className="relative z-10 lg:justify-self-end lg:pt-6">
            <PlatformHeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
