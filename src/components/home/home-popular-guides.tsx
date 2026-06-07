import Link from "next/link";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";
import { HOME_SECTION_ALT } from "@/components/home/home-theme";

export function HomePopularGuides() {
  return (
    <section
      className={`${HOME_SECTION_ALT} relative z-20 -mt-8 border-t-0 pt-10 sm:-mt-10 sm:pt-12 lg:-mt-16 lg:pt-8`}
      aria-labelledby="popular-guides-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#0891B2]">Practical guidance</p>
            <h2 id="popular-guides-heading" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#0B1D3A]">
              Popular practical guides
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3B6B9A]">
              High-intent topics people search when they need urgent, practical next steps across rights, travel, care,
              and daily life.
            </p>
          </div>
          <Link
            href="/advice"
            className="inline-flex min-h-[44px] shrink-0 items-center text-sm font-bold text-[#2563EB] transition-colors hover:text-[#0891B2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0891B2] focus-visible:outline-offset-4"
          >
            Browse all guides →
          </Link>
        </div>

        <div className="mt-8">
          <FeaturedPracticalGuides limit={3} hideHeading theme="light" />
        </div>
      </div>
    </section>
  );
}
