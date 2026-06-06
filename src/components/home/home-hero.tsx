import Link from "next/link";
import { PlatformHeroGraphic } from "@/components/home/platform-hero-graphic";

function ValueBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-sm font-semibold text-[#CBD5E1] sm:text-[15px]">
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
    <section className="relative overflow-hidden bg-[#061A3A] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_88%_18%,rgba(37,99,235,0.28),transparent_40%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04122B] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:pb-32 sm:pt-10 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#22D3EE]">Accessibility platform</p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Navigate accessibility{" "}
              <span className="text-[#22D3EE]">with confidence.</span>
            </h1>

            <p className="mt-5 text-lg leading-8 text-[#E2E8F0] sm:text-xl sm:leading-8">
              Find accessible venues, plan visits, understand your rights, and get practical guidance across the UK.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-1">
              <ValueBullet>Find accessible places</ValueBullet>
              <ValueBullet>Plan before you go</ValueBullet>
              <ValueBullet>Get practical guidance</ValueBullet>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/venue-finder"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2563EB] px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]"
              >
                Explore the platform
              </Link>
              <Link
                href="/advice"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]"
              >
                Browse guides
              </Link>
            </div>
          </div>

          <div>
            <PlatformHeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
