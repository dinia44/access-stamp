import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { HeroWillItFitChecker } from "@/components/home/hero-will-it-fit-checker";
import { RouteDecoration } from "@/components/home/route-decoration";
import { HOME_FOCUS } from "@/components/home/home-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HomeMastheadHero() {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF8] pb-28 pt-8 sm:pb-32 sm:pt-10 lg:pb-36 lg:pt-12">
      <RouteDecoration className="right-[-5%] top-8 h-28 w-[min(55vw,420px)] opacity-80" />
      <RouteDecoration className="bottom-32 left-[-8%] h-24 w-[min(45vw,360px)] opacity-60" flip />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">
              Disability-led access platform
            </p>

            <h1 className="mt-4 max-w-xl font-[family-name:var(--font-heading)] text-[clamp(2.25rem,5.2vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#20242E]">
              Know what access looks like before you arrive.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#4A5263] sm:text-lg">
              Access Stamp gives disabled people and families practical venue details, clear guidance, and tools for
              asking the right questions — without vague accessibility claims or hidden unknowns.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href="/venue-finder" className="w-full rounded-full sm:w-auto">
                Check venue access
              </ButtonLink>
              <Link
                href="/advice"
                className={`link-arrow inline-flex min-h-[44px] w-full items-center justify-center text-sm font-semibold text-[#C8430F] hover:underline sm:w-auto ${HOME_FOCUS}`}
              >
                Find practical guidance
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto lg:max-w-none">
            <HeroWillItFitChecker />
          </div>
        </div>

        <div className="relative z-20 mx-auto mt-10 max-w-5xl lg:-mt-14 xl:-mt-16">
          <AccessStampSearchBox integrated />
        </div>
      </div>
    </section>
  );
}
