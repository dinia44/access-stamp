import Link from "next/link";
import { HomeRecentlyVerifiedCard } from "@/components/home/home-recently-verified-card";
import { PageContainer } from "@/components/layout/PageContainer";
import { getHomepageVenues } from "@/data/venues";
import { mockVenueDistanceKm } from "@/lib/venue-access-score";

export function HomePopularVenues() {
  const featured = getHomepageVenues().slice(0, 3);

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--background-2)] py-14 sm:py-16"
      aria-labelledby="demo-venues-heading"
    >
      <PageContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-information)]">
              Demo examples
            </p>
            <h2
              id="demo-venues-heading"
              className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl"
            >
              Evidence-led venue examples
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
              Demonstration listings while we grow venue coverage. Check the evidence label and confirm important details
              with the venue before travelling.
            </p>
          </div>
          <Link
            href="/venue-finder"
            className="link-arrow inline-flex min-h-[44px] shrink-0 items-center text-sm font-semibold text-[var(--color-brand)] hover:underline"
          >
            Browse all venues
          </Link>
        </div>

        <ul
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={`${featured.length} demo venue example listings`}
        >
          {featured.map((venue) => (
            <HomeRecentlyVerifiedCard
              key={venue.slug}
              venue={venue}
              distance={mockVenueDistanceKm(venue.slug)}
            />
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
