import Link from "next/link";
import { HomeRecentlyVerifiedCard } from "@/components/home/home-recently-verified-card";
import { HeroWillItFitChecker } from "@/components/home/hero-will-it-fit-checker";
import { PageContainer } from "@/components/layout/PageContainer";
import { getHomepageVenues, getVenueBySlug } from "@/data/venues";
import { mockVenueDistanceKm } from "@/lib/venue-access-score";
import { HOME_FOCUS } from "@/components/home/home-theme";

export function HomePopularVenues() {
  const featured = getHomepageVenues().slice(0, 3);
  const doorwayVenue = getVenueBySlug("harbour-kitchen-liverpool") ?? featured[0];
  const entranceCm = doorwayVenue?.measurements?.entranceWidthCm ?? 90;
  const toiletCm = doorwayVenue?.measurements?.toiletDoorWidthCm ?? 80;

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--background-2)] py-12 sm:py-14"
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

        {doorwayVenue ? (
          <div className="mt-10 grid items-start gap-6 border-t border-[var(--color-border)] pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="max-w-md">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">
                Would your chair fit at {doorwayVenue.name}?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                Measured entrance and toilet-door widths from this demonstration listing, used as an example of what venue
                evidence can tell you before you travel.
              </p>
              <Link
                href={`/venue/${doorwayVenue.slug}`}
                className={`mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] hover:underline ${HOME_FOCUS}`}
              >
                Open the {doorwayVenue.name} listing
              </Link>
            </div>
            <HeroWillItFitChecker
              venueName={doorwayVenue.name}
              entranceCm={entranceCm}
              toiletCm={toiletCm}
            />
          </div>
        ) : null}
      </PageContainer>
    </section>
  );
}
