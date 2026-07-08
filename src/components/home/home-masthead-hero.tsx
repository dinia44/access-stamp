import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { HomeMastheadEntranceGate } from "@/components/home/home-masthead-entrance-gate";
import { HeroWillItFitChecker } from "@/components/home/hero-will-it-fit-checker";
import { RouteDecoration } from "@/components/home/route-decoration";
import { HOME_FOCUS } from "@/components/home/home-theme";

const PROOF_CHIPS = ["Built by disabled people", "Measured, not claimed", "Free for visitors"] as const;

function StampedBefore() {
  return (
    <span className="hero-stamp-word relative inline-block whitespace-nowrap">
      <span className="italic text-[#EF5B25]">before</span>
      <svg
        className="hero-stamp-outline pointer-events-none absolute"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          className="hero-stamp-outline__path"
          x="2"
          y="2"
          width="96"
          height="36"
          rx="6"
          ry="6"
          fill="none"
          stroke="#EF5B25"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

export function HomeMastheadHero() {
  return (
    <section className="home-masthead-hero relative overflow-hidden bg-[#FDFBF8] pb-28 pt-8 sm:pb-32 sm:pt-10 lg:pb-36 lg:pt-12">
      <HomeMastheadEntranceGate />
      <RouteDecoration className="right-[-5%] top-8 h-28 w-[min(55vw,420px)] opacity-80" />
      <RouteDecoration className="bottom-32 left-[-8%] h-24 w-[min(45vw,360px)] opacity-60" flip />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 text-left">
            <p className="home-masthead-hero__enter home-masthead-hero__enter--0 inline-flex items-center rounded-full border border-[#F6CFB8] bg-[#FDE9DD] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">
              Disability-led access platform
            </p>

            <h1 className="home-masthead-hero__enter home-masthead-hero__enter--1 mt-4 max-w-xl font-[family-name:var(--font-heading)] text-[clamp(2.25rem,5.2vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#20242E]">
              Know what access looks like <StampedBefore /> you arrive.
            </h1>

            <p className="home-masthead-hero__enter home-masthead-hero__enter--2 mt-5 max-w-xl text-base leading-7 text-[#4A5263] sm:text-lg">
              Access Stamp gives disabled people and families practical venue details, clear guidance, and tools for
              asking the right questions — without vague accessibility claims or hidden unknowns.
            </p>

            <div className="home-masthead-hero__enter home-masthead-hero__enter--3 mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/venue-finder"
                className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#EF5B25] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(239,91,37,0.45)] transition hover:bg-[#D93E10] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#EF5B25]/35 focus-visible:ring-offset-2 sm:w-auto ${HOME_FOCUS}`}
              >
                Check venue access
              </Link>
              <Link
                href="/advice"
                className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-full border-[1.5px] border-[#EF5B25] bg-transparent px-6 text-sm font-semibold text-[#EF5B25] transition hover:bg-[#FDE9DD] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#EF5B25]/35 focus-visible:ring-offset-2 sm:w-auto ${HOME_FOCUS}`}
              >
                Find practical guidance
              </Link>
              <Link
                href="/ai-toolkit"
                className={`inline-flex min-h-[44px] w-full items-center justify-center text-sm font-semibold text-[#5F7444] underline-offset-4 hover:underline sm:w-auto ${HOME_FOCUS}`}
              >
                Use Access Stamp tools →
              </Link>
            </div>

            <ul className="home-masthead-hero__enter home-masthead-hero__enter--3 mt-5 flex max-w-xl flex-wrap items-center gap-x-2 gap-y-2 text-[13px] text-[#76808F]">
              {PROOF_CHIPS.map((chip, index) => (
                <li key={chip} className="inline-flex items-center gap-2">
                  {index > 0 ? <span aria-hidden className="text-[#C9B8A8]">·</span> : null}
                  <span className="rounded-full bg-[#FAF4ED] px-2.5 py-1">{chip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="home-masthead-hero__enter home-masthead-hero__enter--4 mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto lg:max-w-none">
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
