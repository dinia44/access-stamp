import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { HeroBackgroundWordmark } from "@/components/home/hero-background-wordmark";
import { PlatformHeroGraphic } from "@/components/home/platform-hero-graphic";
import { HOME_BTN_GHOST } from "@/components/home/home-theme";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2A52] via-[#0D3568] to-[#0F3D75] text-[#E0F7FF]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.2),transparent_50%),radial-gradient(circle_at_88%_12%,rgba(34,211,238,0.14),transparent_42%),radial-gradient(circle_at_12%_88%,rgba(37,99,235,0.2),transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071E3D] to-transparent"
        aria-hidden="true"
      />

      <HeroBackgroundWordmark />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#22D3EE]">
              UK accessibility platform
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-[#E0F7FF] sm:text-5xl lg:text-6xl">
              Find accessible places with confidence.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#BAE6FD] sm:text-xl">
              Search access-checked venues, plan visits, and get practical disability guidance across the UK.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#7DD3FC]">
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
