import Link from "next/link";
import { VenueResultCard } from "@/components/venue-finder/venue-result-card";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { getHomepageVenues, HOME_VENUE_LIMIT } from "@/lib/venue-finder-featured";
import { HOME_VENUE_GRID_CLASS } from "@/lib/venue-grid-layout";
import { HOME_BTN_PRIMARY, HOME_SECTION_PANEL } from "@/components/home/home-theme";

export function HomePopularVenues() {
  const venues = getHomepageVenues(SAMPLE_VENUES).slice(0, HOME_VENUE_LIMIT);

  return (
    <section className={HOME_SECTION_PANEL} aria-labelledby="popular-venues-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#0891B2]">Venue access reports</p>
            <h2 id="popular-venues-heading" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#0B1D3A]">
              Featured & new venue reports
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[#1E3A5F]">
              A hand-picked selection of featured access reports and recently added venues — search the full directory
              for more.
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3B6B9A]">
              Access scores are based on step-free route, toilet access, parking, seating, and support information.
            </p>
          </div>
          <Link href="/venue-finder" className={`${HOME_BTN_PRIMARY} shrink-0 px-5`}>
            Search all venues
          </Link>
        </div>

        <ul className={`mt-8 ${HOME_VENUE_GRID_CLASS}`} aria-label={`${venues.length} featured venue reports`}>
          {venues.slice(0, HOME_VENUE_LIMIT).map((venue, index) => (
            <VenueResultCard key={venue.slug} venue={venue} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
