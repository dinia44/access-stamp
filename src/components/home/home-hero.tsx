import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { PlatformHeroGraphic } from "@/components/home/platform-hero-graphic";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F1] pb-16 pt-8 text-[#13201F] sm:pb-20 sm:pt-10 lg:pb-24">
      {/* Map backdrop — pins and routes in upper-right, fades to cream on the left */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLOUDINARY_MEDIA.homepageHeroBackdrop}
          alt=""
          className="absolute right-0 top-0 h-full w-[115%] max-w-none object-cover object-right-top sm:w-[95%] lg:w-[78%] xl:w-[72%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F1] from-25% via-[#FFF8F1]/75 via-45% to-transparent to-80% sm:from-30% lg:from-20% lg:via-[#FFF8F1]/55 lg:via-40%" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-8 xl:gap-10">
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

          <div className="relative z-10 min-w-0 lg:pt-2">
            <PlatformHeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
