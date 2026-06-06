import Link from "next/link";
import { VenueResultCard } from "@/components/venue-finder/venue-result-card";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { FEATURED_VENUE_SLUGS } from "@/lib/venue-finder-featured";
import { VENUE_GRID_CLASS, VENUE_GRID_SIZE } from "@/lib/venue-grid-layout";

export function HomePopularVenues() {
  const venues = FEATURED_VENUE_SLUGS.map((slug) => SAMPLE_VENUES.find((v) => v.slug === slug))
    .filter(Boolean)
    .slice(0, VENUE_GRID_SIZE);

  return (
    <section className="border-b border-slate-200 bg-white py-16" aria-labelledby="popular-venues-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Venue access reports</p>
            <h2 id="popular-venues-heading" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-slate-900">
              Popular venue reports
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Real listings with practical access detail — step-free routes, toilets, parking and more.
            </p>
          </div>
          <Link
            href="/venue-finder"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 px-5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
          >
            Search all venues
          </Link>
        </div>

        <ul className={`mt-8 ${VENUE_GRID_CLASS}`}>
          {venues.map((venue, index) => (
            <VenueResultCard key={venue!.slug} venue={venue!} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
