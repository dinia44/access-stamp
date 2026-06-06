import Link from "next/link";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";
import { HOME_SECTION_ALT } from "@/components/home/home-theme";

export function HomePopularGuides() {
  return (
    <section className={HOME_SECTION_ALT} aria-labelledby="popular-guides-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#22D3EE]">Practical guidance</p>
            <h2 id="popular-guides-heading" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#E0F7FF]">
              Popular practical guides
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7DD3FC]">
              High-intent topics people search when they need urgent, practical next steps across rights, travel, care,
              and daily life.
            </p>
          </div>
          <Link
            href="/advice"
            className="inline-flex min-h-[44px] shrink-0 items-center text-sm font-bold text-[#22D3EE] transition-colors hover:text-[#67E8F9] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/20"
          >
            Browse all guides →
          </Link>
        </div>

        <div className="mt-8">
          <FeaturedPracticalGuides limit={3} hideHeading theme="dark" />
        </div>
      </div>
    </section>
  );
}
