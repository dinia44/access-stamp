import Link from "next/link";
import { HeroConfidenceSeal } from "@/components/home/hero-finder/hero-confidence-seal";
import { HOME_FOCUS } from "@/components/home/home-theme";
import type { Venue } from "@/data/venues";
import { getVenueConfidenceSealLabel, getVenueLeadMeasurement } from "@/lib/venue-lead-measurement";

type Props = {
  venue: Venue;
  distance: string;
};

export function HomeRecentlyVerifiedCard({ venue, distance }: Props) {
  const href = `/venue/${venue.slug}`;
  const town = venue.town;
  const sealLabel = getVenueConfidenceSealLabel(venue);
  const leadLine = getVenueLeadMeasurement(venue);

  return (
    <li className="h-full">
      <article className="venue-card group relative flex h-full flex-col rounded-[1.25rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]">
        <HeroConfidenceSeal label={sealLabel} />

        <p className="pr-12 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-primary)]">
          {venue.category}
          {distance ? <span className="font-normal normal-case tracking-normal text-[var(--color-muted)]"> · {distance}</span> : null}
        </p>

        <h3 className="mt-2 text-lg font-semibold text-[var(--color-text)]">
          <Link href={href} className={`venue-link text-[var(--color-text)] hover:text-[var(--color-primary)] ${HOME_FOCUS}`}>
            {venue.name}
            <span className="sr-only"> in {town}</span>
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{leadLine}</p>
      </article>
    </li>
  );
}
