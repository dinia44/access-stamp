import Link from "next/link";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";
import { HOME_SECTION_ALT } from "@/components/home/home-theme";

export function HomePopularGuides() {
  return (
    <section className={`${HOME_SECTION_ALT} py-16 sm:py-20`} aria-labelledby="popular-guides-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">Popular practical guides</p>
          <h2 id="popular-guides-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0B1D3A] sm:text-4xl">
            Popular practical guides
          </h2>
        </div>

        <div className="mt-10">
          <FeaturedPracticalGuides limit={3} hideHeading theme="light" />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/advice"
            className="inline-flex min-h-[44px] items-center text-sm font-bold text-[#2563EB] transition-colors hover:text-[#0891B2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0891B2] focus-visible:outline-offset-4"
          >
            Browse all guides →
          </Link>
        </div>
      </div>
    </section>
  );
}
