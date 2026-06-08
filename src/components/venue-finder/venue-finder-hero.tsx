import { FadeIn } from "@/components/fade-in";
import { AS_CONTAINER, AS_PAGE_H1 } from "@/lib/design-system";

export function VenueFinderHero() {
  return (
    <section aria-labelledby="venue-finder-heading" className="relative overflow-hidden bg-[#071826] pb-28 pt-12 text-white sm:pb-32 sm:pt-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 30%, rgba(37,99,235,0.2) 0%, transparent 45%), radial-gradient(circle at 85% 10%, rgba(212,168,79,0.1) 0%, transparent 35%)",
        }}
      />
      <div className={`${AS_CONTAINER} relative`}>
        <FadeIn>
          <p className="page-hero-eyebrow">Venue finder</p>
          <h1 id="venue-finder-heading" className={`${AS_PAGE_H1} mt-4 max-w-3xl text-white`}>
            Find accessible venues with{" "}
            <span className="text-[#60A5FA]">real access detail</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#CBD5E1] sm:text-lg">
            Search by step-free access, toilets, parking, and more — then open a full access report before you travel.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
