import Link from "next/link";
import { HeroMapGraphic } from "@/components/home/hero-map-graphic";

const HERO_BTN_PRIMARY =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]";

const HERO_BTN_SECONDARY =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#061A3A] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_88%_18%,rgba(37,99,235,0.28),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(4,18,43,0.8),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04122B] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-300">
              Accessibility platform
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Navigate accessibility with confidence.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Find accessible venues, plan visits, understand your rights, and get practical guidance across the UK.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#platform-search" className={HERO_BTN_PRIMARY}>
                Search Access Stamp
              </Link>
              <Link href="/advice" className={HERO_BTN_SECONDARY}>
                Explore guides
              </Link>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <HeroMapGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
