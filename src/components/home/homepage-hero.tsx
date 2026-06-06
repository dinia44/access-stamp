import Link from "next/link";
import { HOME_HERO_IMAGE } from "@/lib/site";

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function HomepageHero() {
  return (
    <section className="relative overflow-hidden bg-[#061A3A] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(37,99,235,0.38),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-45 lg:block" aria-hidden="true">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${HOME_HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061A3A] via-[#061A3A]/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">
            All-in-one accessibility platform
          </p>

          <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Find, plan and share accessible places
            <span className="block text-cyan-300">with confidence.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Access Stamp brings together venue access reports, practical travel planning tools, accessibility guides and
            venue information so disabled people, carers and organisations can make better decisions before they arrive.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/venue-finder"
              className="inline-flex h-12 min-h-11 items-center justify-center rounded-xl bg-blue-700 px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]"
            >
              Find accessible venues
            </Link>

            <Link
              href="/advice"
              className="inline-flex h-12 min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]"
            >
              Explore guides
            </Link>
          </div>

          <div className="mt-8 grid gap-4 text-sm font-semibold text-slate-200 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-cyan-300" />
              <span>Real access information</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-cyan-300" />
              <span>Built around practical accessibility needs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-cyan-300" />
              <span>UK-focused guidance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
