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
      <span className="italic text-[var(--color-brand)]">before</span>
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
          stroke="var(--color-brand)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

export function HomeMastheadHero() {
  return (
    <section className="home-masthead-hero relative overflow-hidden bg-[var(--color-canvas)] pb-10 pt-5 sm:pb-12 sm:pt-6 lg:pb-14 lg:pt-8">
      <HomeMastheadEntranceGate />
      <RouteDecoration className="right-[-5%] top-8 hidden h-28 w-[min(55vw,420px)] opacity-70 sm:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <p className="home-masthead-hero__enter home-masthead-hero__enter--0 inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-pressed)]">
            Disability-led access platform
          </p>

          <h1 className="home-masthead-hero__enter home-masthead-hero__enter--1 mt-3 max-w-xl font-[family-name:var(--font-heading)] text-[clamp(1.75rem,4.8vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
            Know what access looks like <StampedBefore /> you arrive.
          </h1>

          <p className="home-masthead-hero__enter home-masthead-hero__enter--2 mt-3 max-w-xl text-base leading-6 text-[var(--color-text-muted)] sm:leading-7">
            Practical venue measurements, photos and honest unknowns — so disabled people, families and carers can decide
            before travelling.
          </p>
        </div>

        {/* Primary action: venue search must sit in the first viewport */}
        <div className="home-masthead-hero__enter home-masthead-hero__enter--3 relative z-20 mt-5 max-w-5xl sm:mt-6">
          <AccessStampSearchBox integrated />
        </div>

        <ul
          className="home-masthead-hero__enter home-masthead-hero__enter--3 mt-4 flex max-w-3xl flex-wrap items-center gap-x-2 gap-y-2 text-[13px] text-[var(--color-text-muted)]"
          aria-label="Evidence proof points"
        >
          {PROOF_CHIPS.map((chip, index) => (
            <li key={chip} className="inline-flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden className="text-[var(--color-border-mid)]">
                  ·
                </span>
              ) : null}
              <span className="rounded-full bg-[var(--color-surface-subtle)] px-2.5 py-1">{chip}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Looking for guidance instead?{" "}
          <Link href="/advice" className={`font-semibold text-[var(--color-brand)] hover:underline ${HOME_FOCUS}`}>
            Browse guides
          </Link>
          {" · "}
          <Link href="/help-cards" className={`font-semibold text-[var(--color-brand)] hover:underline ${HOME_FOCUS}`}>
            Help cards
          </Link>
        </p>

        {/* Doorway checker demonstrates value after the primary search */}
        <div className="mt-8 grid items-start gap-8 border-t border-[var(--color-border)] pt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-trust)]">Signature tool</p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">
              Will your chair fit the doorway?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
              Compare your chair width with measured entrance widths from our demo listings. This is a planning aid — always
              confirm changeable details with the venue before you travel.
            </p>
          </div>
          <div className="home-masthead-hero__enter home-masthead-hero__enter--4 mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none">
            <HeroWillItFitChecker />
          </div>
        </div>
      </div>
    </section>
  );
}
