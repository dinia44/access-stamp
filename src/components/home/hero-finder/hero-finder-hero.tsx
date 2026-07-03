import { HeroMapBackdrop } from "@/components/home/hero-finder/hero-map-backdrop";
import { HeroPopularSearches } from "@/components/home/hero-finder/hero-popular-searches";
import { HeroSearchConsole } from "@/components/home/hero-finder/hero-search-console";
import { HeroStampSeal } from "@/components/home/hero-finder/hero-stamp-seal";
import { MeasureTicker } from "@/components/measure-ticker";

export function HeroFinderHero() {
  return (
    <section className="hero-finder relative flex flex-col overflow-hidden bg-[var(--background)] pt-24 sm:pt-28 min-[880px]:min-h-[92vh]">
      <HeroMapBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[880px] flex-1 flex-col justify-center px-4 pb-10 text-center sm:px-6 sm:pb-12 min-[880px]:pb-14">
        <HeroStampSeal />

        <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.1rem,5.4vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--color-text)]">
          Where do you want{" "}
          <span className="hero-finder__heading-accent italic">to go?</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
          Search access-checked venues with real measurements, photos, and honest confidence labels.
        </p>

        <div className="mt-8 sm:mt-10">
          <HeroSearchConsole />
        </div>

        <HeroPopularSearches />

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-[var(--color-muted)] sm:mt-8">
          Every listing shows <strong className="font-semibold text-[var(--color-text)]">how we know</strong> — measured
          on site, verified with the venue, or honestly unknown.
        </p>
      </div>

      <MeasureTicker />
    </section>
  );
}
