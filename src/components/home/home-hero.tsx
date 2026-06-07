import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { PlatformHeroGraphic } from "@/components/home/platform-hero-graphic";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#DBEAFE] via-[#EFF6FF] to-[#F8FBFF] pb-16 pt-8 text-[#0B1D3A] sm:pb-20 sm:pt-10 lg:pb-24">
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <div className="relative z-10">
            <h1 className="max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#0B1D3A]">
              Find accessible places with confidence
              <span className="text-[#2563EB]">.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#1E3A5F] sm:text-xl">
              Search access-checked venues, ask our AI assistant, and plan visits with practical disability guidance
              built from lived experience.
            </p>

            <div className="mt-8 lg:mt-10">
              <AccessStampSearchBox integrated />
            </div>
          </div>

          <div className="relative z-10 lg:pt-4">
            <PlatformHeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
