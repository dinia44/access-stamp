import Link from "next/link";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";
import { AS_BTN_GHOST, AS_CONTAINER, AS_EYEBROW, AS_SECTION, AS_SECTION_H2, AS_BODY } from "@/lib/design-system";

export function HomePopularGuides() {
  return (
    <section className={`${AS_SECTION} bg-[#F8F5EE]`} aria-labelledby="popular-guides-heading">
      <div className={AS_CONTAINER}>
        <p className={AS_EYEBROW}>Popular guides</p>
        <h2 id="popular-guides-heading" className={`${AS_SECTION_H2} mt-3 max-w-2xl text-[#102033]`}>
          Practical guidance you can use straight away
        </h2>
        <p className={`${AS_BODY} mt-3 max-w-2xl text-[#617080]`}>
          Three starting points — each shows what it covers upfront, with steps and templates where helpful.
        </p>

        <div className="mt-10">
          <FeaturedPracticalGuides limit={3} hideHeading theme="warm" />
        </div>

        <div className="mt-8">
          <Link href="/advice" className={AS_BTN_GHOST}>
            Browse all guides →
          </Link>
        </div>
      </div>
    </section>
  );
}
