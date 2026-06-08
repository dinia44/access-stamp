import Link from "next/link";
import { HomeFeaturedVenueCard } from "@/components/home/home-featured-venue-card";
import {
  HOME_FEATURED_ACCESS_REPORTS,
  HOME_FEATURED_VENUE_LIMIT,
} from "@/components/home/home-featured-venues-data";
import {
  AS_BTN_GHOST,
  AS_CONTAINER,
  AS_EYEBROW,
  AS_SECTION_TIGHT,
  AS_SECTION_H2,
} from "@/lib/design-system";
import { SAMPLE_VENUES } from "@/lib/mock-data";

export function HomePopularVenues() {
  const bySlug = new Map(SAMPLE_VENUES.map((venue) => [venue.slug, venue]));
  const featured = HOME_FEATURED_ACCESS_REPORTS.slice(0, HOME_FEATURED_VENUE_LIMIT)
    .map((item) => ({
      ...item,
      venue: bySlug.get(item.slug),
    }))
    .filter((item) => item.venue);

  return (
    <section className={`${AS_SECTION_TIGHT} bg-white`} aria-labelledby="featured-reports-heading">
      <div className={AS_CONTAINER}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={AS_EYEBROW}>Featured venues</p>
            <h2 id="featured-reports-heading" className={`${AS_SECTION_H2} mt-3 text-[#102033]`}>
              Access-checked places to explore
            </h2>
          </div>
          <Link href="/venue-finder" className={AS_BTN_GHOST}>
            View all venues →
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={`${featured.length} featured venues`}>
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
