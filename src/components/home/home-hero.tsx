import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { HomeHeroGuidanceCta } from "@/components/home/home-hero-guidance-cta";
import { PlatformHeroGraphic } from "@/components/home/platform-hero-graphic";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#DBEAFE] via-[#EFF6FF] to-[#F8FBFF] pb-12 text-[#0B1D3A] sm:pb-14 lg:pb-20">
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

      <div className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-12">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-12">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0891B2]">
              UK accessibility platform
            </p>

            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-[#0B1D3A] sm:text-5xl lg:text-6xl">
              Find accessible places with confidence.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1E3A5F] sm:text-xl">
              Search access-checked venues, plan visits, and get practical disability guidance across the UK.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#3B6B9A]">
              Built from lived experience and practical access needs.
            </p>
          </div>

          <div className="relative z-10 lg:justify-self-end">
            <PlatformHeroGraphic />
          </div>
        </div>

        <div className="relative z-10 mt-10 w-full">
          <AccessStampSearchBox integrated />
        </div>

        <HomeHeroGuidanceCta />
      </div>

      {/* Soft wave transition into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-[#F8FBFF]" aria-hidden="true">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-10 w-full sm:h-12 lg:h-16">
          <path
            fill="currentColor"
            d="M0,32 C240,64 480,0 720,24 C960,48 1200,8 1440,32 L1440,64 L0,64 Z"
          />
        </svg>
      </div>
    </section>
  );
}
