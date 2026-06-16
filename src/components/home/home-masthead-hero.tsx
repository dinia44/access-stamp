import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { RouteDecoration } from "@/components/home/route-decoration";
import { HOME_FOCUS } from "@/components/home/home-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HomeMastheadHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF8] via-[#FBEDE2] to-[#F7E0CE] px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:pb-24">
      <RouteDecoration className="right-[-5%] top-8 h-28 w-[min(55vw,420px)] opacity-80" />
      <RouteDecoration className="bottom-12 left-[-8%] h-24 w-[min(45vw,360px)] opacity-60" flip />

      <div className="relative mx-auto max-w-4xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.1em] text-[#C8430F]">
          Disability-led access platform
        </p>

        <h1 className="mx-auto mt-6 max-w-4xl text-center font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#20242E]">
          Access information you can actually use before you travel, work, study, or ask for support.
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-[#4A5263] sm:text-lg">
          Access Stamp helps disabled people, families, carers, venues, and organisations turn vague accessibility
          claims into practical decisions through venue information, plain-English guides, copyable templates, and
          structured tools.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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

        <div className="mx-auto mt-10 max-w-3xl text-left">
          <AccessStampSearchBox integrated />
        </div>
      </div>
    </section>
  );
}
