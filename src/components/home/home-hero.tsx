import { HeroMapGraphic } from "@/components/home/hero-map-graphic";

function ValueBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-sm text-slate-200 sm:text-base">
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

            <h1 className="mt-4 text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">
              Find accessible places.
              <span className="mt-1 block text-[#22D3EE]">Travel with confidence.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Real access reports, smart filters, and practical guidance for planning accessible trips across the UK.
            </p>

            <ul className="mt-8 flex flex-wrap gap-4 sm:gap-6">
              <ValueBullet>Trusted access reports</ValueBullet>
              <ValueBullet>Step-free planning</ValueBullet>
              <ValueBullet>Built for real life</ValueBullet>
            </ul>

            <p className="mt-6 text-sm text-[#CBD5E1]">Trusted by real users across the UK</p>
          </div>

          <div className="lg:justify-self-end">
            <HeroMapGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
