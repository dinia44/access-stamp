import Link from "next/link";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";
import { HOME_SECTION } from "@/components/home/home-theme";

export function HomePopularGuides() {
  return (
    <section className={`${HOME_SECTION} bg-[#FFF8F1] py-16 sm:py-20`} aria-labelledby="popular-guides-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 id="popular-guides-heading" className="text-3xl font-bold tracking-[-0.03em] text-[#13201F] sm:text-4xl">
            Popular accessibility guides
          </h2>
          <p className="mt-3 text-base leading-7 text-[#5E6A66]">
            Each guide shows what it covers upfront — summaries, steps, and templates you can use straight away.
          </p>
        </div>

        <div className="mt-10">
          <FeaturedPracticalGuides limit={3} hideHeading theme="warm" />
        </div>

        <div className="mt-10">
          <Link
            href="/advice"
            className="inline-flex min-h-[44px] items-center text-sm font-bold text-[#59682A] transition-colors hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4"
          >
            Browse all guides →
          </Link>
        </div>
      </div>
    </section>
  );
}
