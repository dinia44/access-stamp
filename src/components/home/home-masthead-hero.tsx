import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { RouteDecoration } from "@/components/home/route-decoration";
import { HOME_FOCUS } from "@/components/home/home-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SiteLogoMark } from "@/components/site-logo-mark";

export function HomeMastheadHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF8] via-[#FBEDE2] to-[#F7E0CE] px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:pb-24">
      <RouteDecoration className="right-[-5%] top-8 h-28 w-[min(55vw,420px)] opacity-80" />
      <RouteDecoration className="bottom-12 left-[-8%] h-24 w-[min(45vw,360px)] opacity-60" flip />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C8430F]">
            Disability-led access platform
          </p>

          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#20242E]">
            Access Stamp
          </h1>

          <p className="mt-5 text-[clamp(1.125rem,2.5vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-[#20242E]">
            Access information you can actually use before you travel, work, study, or ask for support.
          </p>

          <p className="mt-4 text-base leading-7 text-[#4A5263] sm:text-lg">
            Access Stamp helps disabled people, families, carers, venues, and organisations turn vague accessibility
            claims into practical decisions through venue information, plain-English guides, copyable templates, and
            structured tools.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/venue-finder" className="w-full sm:w-auto">
              Find accessible venues
            </ButtonLink>
            <ButtonLink href="/advice" variant="secondary" className="w-full sm:w-auto">
              Browse practical guides
            </ButtonLink>
            <Link
              href="/ai-toolkit"
              className={`inline-flex min-h-[44px] w-full items-center justify-center text-sm font-semibold text-[#C8430F] hover:underline sm:w-auto ${HOME_FOCUS}`}
            >
              Use Access Stamp tools
            </Link>
          </div>

          <div className="mt-10 max-w-xl text-left">
            <AccessStampSearchBox integrated />
          </div>
        </div>

        <figure
          className="mx-auto flex w-full max-w-[min(100%,320px)] items-center justify-center lg:max-w-[380px] lg:justify-end"
          aria-label="Access Stamp mark"
        >
          <div className="relative rounded-[2rem] border border-[#F6CFB8]/80 bg-white/70 p-8 shadow-[0_24px_60px_-28px_rgba(122,80,48,0.28)] backdrop-blur-sm sm:p-10">
            <SiteLogoMark className="mx-auto max-h-[min(52vw,280px)] lg:max-h-[320px]" />
          </div>
        </figure>
      </div>
    </section>
  );
}
