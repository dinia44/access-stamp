import Link from "next/link";
import { HomeFeaturedVenueCard } from "@/components/home/home-featured-venue-card";
import { PageContainer } from "@/components/layout/PageContainer";
import { getHomepageVenues } from "@/data/venues";
import { toLegacyVenue } from "@/lib/venue-legacy";
import { mockVenueDistanceKm } from "@/lib/venue-access-score";

export function HomePopularVenues() {
  const featured = getHomepageVenues().map((venue) => toLegacyVenue(venue));

  return (
    <section className="border-t border-[#EFE5DA] bg-[#FAF4ED] py-16 sm:py-20" aria-labelledby="featured-venues-heading">
      <PageContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Featured venues</p>
            <h2 id="featured-venues-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl">
              Access-checked venues
            </h2>
          </div>
          <Link
            href="/venue-finder"
            className="inline-flex min-h-[44px] shrink-0 items-center text-sm font-semibold text-[#C8430F] hover:underline"
          >
            View all venues
          </Link>
        </div>

        <ul
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={`${featured.length} featured access-checked venues`}
        >
          {featured.map((venue, index) => (
            <HomeFeaturedVenueCard
              key={venue.slug}
              venue={venue}
              distance={mockVenueDistanceKm(venue.slug)}
              index={index}
            />
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
