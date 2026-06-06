import Link from "next/link";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";

export function HomePopularGuides() {
  return (
    <section className="bg-slate-50 py-16" aria-labelledby="popular-guides-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Practical guidance</p>
            <h2 id="popular-guides-heading" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-slate-900">
              Popular practical guides
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              High-intent topics people search when they need urgent, practical next steps across rights, travel, care,
              and daily life.
            </p>
          </div>
          <Link
            href="/advice"
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-bold text-blue-700 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
          >
            Browse all guides →
          </Link>
        </div>

        <div className="mt-8">
          <FeaturedPracticalGuides limit={3} hideHeading />
        </div>
      </div>
    </section>
  );
}
