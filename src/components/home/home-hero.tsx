import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { PlatformHeroGraphic } from "@/components/home/platform-hero-graphic";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFE8D6] via-[#FFF8F1] to-[#FFF3E8] pb-16 pt-8 text-[#13201F] sm:pb-20 sm:pt-10 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(240,74,22,0.1),transparent_50%),radial-gradient(circle_at_88%_12%,rgba(89,104,42,0.08),transparent_42%),radial-gradient(circle_at_12%_88%,rgba(240,74,22,0.06),transparent_45%)]"
        aria-hidden="true"
      />
      {/* Subtle map texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(241,216,199,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(241,216,199,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Faint route lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          d="M80 480 C 280 320, 420 380, 620 220 S 920 120, 1120 80"
          stroke="#F04A16"
          strokeWidth="2"
          strokeDasharray="10 12"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:gap-12">
          <div className="relative z-20 min-w-0">
            <h1 className="max-w-2xl font-[family-name:var(--font-heading)] text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.03em] text-[#13201F]">
              Find accessible places with confidence.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#2A3836] sm:text-xl">
              Search access-checked venues, ask our AI assistant, and plan visits with practical disability guidance
              built from lived experience.
            </p>

            <div className="mt-8 lg:mt-10">
              <AccessStampSearchBox integrated />
            </div>
          </div>

          <div className="relative z-10 min-w-0 overflow-hidden lg:overflow-visible">
            <PlatformHeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
