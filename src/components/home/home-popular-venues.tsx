import Link from "next/link";
import { HomeRecentlyVerifiedCard } from "@/components/home/home-recently-verified-card";
import { PageContainer } from "@/components/layout/PageContainer";
import { getHomepageVenues } from "@/data/venues";
import { mockVenueDistanceKm } from "@/lib/venue-access-score";

function formatHomeVenueDistance(slug: string): string {
  return `${mockVenueDistanceKm(slug)} km`;
}

export function HomePopularVenues() {
  const featured = getHomepageVenues().slice(0, 3);

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--background-2)] py-14 sm:py-16" aria-labelledby="recently-verified-heading">
      <PageContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">Recently verified</p>
            <h2 id="recently-verified-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-text)] sm:text-4xl">
              Fresh from the tape measure
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
              Demo listings while we grow venue coverage. Access information can change — check the confidence label and
              confirm important details with the venue before travelling.
            </p>
          </div>
          <Link
            href="/venue-finder"
            className="link-arrow inline-flex min-h-[44px] shrink-0 items-center text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Browse all venues
          </Link>
        </div>

        <ul
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={`${featured.length} recently verified venue listings`}
        >
          {featured.map((venue) => (
            <HomeRecentlyVerifiedCard
              key={venue.slug}
              venue={venue}
              distance={formatHomeVenueDistance(venue.slug)}
            />
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
