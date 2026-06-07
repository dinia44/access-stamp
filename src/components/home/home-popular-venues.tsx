import Link from "next/link";
import { HomeFeaturedVenueCard } from "@/components/home/home-featured-venue-card";
import { HOME_FEATURED_ACCESS_REPORTS } from "@/components/home/home-featured-venues-data";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { HOME_SECTION_ALT } from "@/components/home/home-theme";

export function HomePopularVenues() {
  const bySlug = new Map(SAMPLE_VENUES.map((venue) => [venue.slug, venue]));
  const featured = HOME_FEATURED_ACCESS_REPORTS.map((item) => ({
    ...item,
    venue: bySlug.get(item.slug),
  })).filter((item) => item.venue);

  return (
    <section className={`${HOME_SECTION_ALT} py-16 sm:py-20`} aria-labelledby="featured-reports-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#F04A16]">
              Featured access-checked venues
            </p>
            <h2 id="featured-reports-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#13201F] sm:text-4xl">
              Highly rated, access-checked venues
            </h2>
          </div>
          <Link
            href="/venue-finder"
            className="inline-flex min-h-[44px] shrink-0 items-center text-sm font-bold text-[#59682A] transition-colors hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4"
          >
            View all venues →
          </Link>
        </div>

        <ul
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          aria-label={`${featured.length} featured access-checked venues`}
        >
          {featured.map((item, index) => (
            <HomeFeaturedVenueCard
              key={item.slug}
              venue={item.venue!}
              displayName={item.displayName}
              city={item.city}
              scoreOverride={item.score}
              distance={item.distance}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
