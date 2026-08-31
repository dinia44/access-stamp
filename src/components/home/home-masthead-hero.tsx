import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { RouteDecoration } from "@/components/home/route-decoration";
import { HOME_FOCUS } from "@/components/home/home-theme";

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
    <section className="home-masthead-hero relative overflow-hidden bg-[var(--color-canvas)] pb-8 pt-5 sm:pb-10 sm:pt-6 lg:pb-12 lg:pt-8">
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
            Find a venue. Check the evidence. Get help planning what happens next.
          </p>
        </div>

        <div className="home-masthead-hero__enter home-masthead-hero__enter--3 relative z-20 mt-5 max-w-5xl sm:mt-6">
          <AccessStampSearchBox integrated />
        </div>

        <p className="home-masthead-hero__enter home-masthead-hero__enter--3 mt-4 text-sm text-[var(--color-text-muted)]">
          Measured, not claimed. Free for visitors.
        </p>

        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Need guidance instead?{" "}
          <Link href="#more-help" className={`font-semibold text-[var(--color-brand)] hover:underline ${HOME_FOCUS}`}>
            Explore Access Stamp resources
          </Link>
        </p>

        <p className="mt-4 max-w-2xl border-l-2 border-[var(--color-brand)] pl-3 text-sm leading-6 text-[var(--color-text-muted)]">
          <strong className="font-semibold text-[var(--color-ink)]">Early access.</strong> Trying Access Stamp today?{" "}
          <Link
            href="/contact"
            className={`inline-flex min-h-[44px] items-center font-semibold text-[var(--color-brand)] hover:underline ${HOME_FOCUS}`}
          >
            Tell us what worked or what was missing.
          </Link>
        </p>
      </div>
    </section>
  );
}
