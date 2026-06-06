import Link from "next/link";
import { HeroBackgroundWordmark } from "@/components/home/hero-background-wordmark";
import { PlatformHeroGraphic } from "@/components/home/platform-hero-graphic";
import { HOME_BTN_GHOST, HOME_BTN_PRIMARY } from "@/components/home/home-theme";

function ValueBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-[#CBD5E1] sm:text-base">
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22D3EE]/15 text-[#22D3EE]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
          <path d="m5 13 4 4 10-10" />
        </svg>
      </span>
      {children}
    </li>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#04122B] via-[#061A3A] to-[#0B1D46] text-[#F8FAFC]">
      {/* Ambient glow layers */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(34,211,238,0.14),transparent_42%),radial-gradient(circle_at_12%_88%,rgba(37,99,235,0.18),transparent_45%),radial-gradient(circle_at_72%_62%,rgba(139,92,246,0.08),transparent_38%)]"
        aria-hidden="true"
      />
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#030B1A] to-transparent"
        aria-hidden="true"
      />

      <HeroBackgroundWordmark />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-8 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#22D3EE]">
              Accessibility platform
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-[#F8FAFC] sm:text-5xl lg:text-7xl">
              Navigate accessibility
              <span className="mt-1 block text-[#22D3EE]">with confidence.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#CBD5E1] sm:text-xl">
              Find accessible venues, plan visits, understand your rights, and get practical guidance across the UK.
            </p>

            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              <ValueBullet>Find accessible places</ValueBullet>
              <ValueBullet>Plan before you go</ValueBullet>
              <ValueBullet>Get practical guidance</ValueBullet>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#platform-search" className={HOME_BTN_PRIMARY}>
                Search Access Stamp
              </Link>
              <Link href="/advice" className={HOME_BTN_GHOST}>
                Explore guides
              </Link>
            </div>
          </div>

          <div className="relative z-10 lg:justify-self-end">
            <PlatformHeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
