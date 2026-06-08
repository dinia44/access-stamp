import Link from "next/link";
import { AS_BTN_PRIMARY_GOLD, AS_CONTAINER, AS_SECTION_TIGHT } from "@/lib/design-system";

export function HomeFinalCta() {
  return (
    <section className={`${AS_SECTION_TIGHT} bg-[#071826] text-white`} aria-labelledby="final-cta-heading">
      <div className={`${AS_CONTAINER} text-center`}>
        <h2 id="final-cta-heading" className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">
          Plan your next accessible visit
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#CBD5E1] sm:text-lg">
          Search access-checked venues, read a full report, and know what to expect before you travel.
        </p>
        <Link href="/venue-finder" className={`${AS_BTN_PRIMARY_GOLD} mt-8 inline-flex`}>
          Search accessible places
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
