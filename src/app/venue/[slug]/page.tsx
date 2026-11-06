import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ACCESS_AREAS } from "@/lib/venue-access-features";
import { VenueBackLink } from "@/components/venue/venue-back-link";
import { VenueContact } from "@/components/venue/venue-contact";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { AccessCheckedMethodology } from "@/components/venue/access-checked-methodology";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { getVenueBySlug } from "@/data/venues";
import { SetChatContext } from "@/components/chat/set-context";
import { VenueDetailActions } from "@/components/venue-detail-actions";
import { VenuePhotoGallery } from "@/components/venue-photo-gallery";
import { VenueVisitPlanActions } from "@/components/venue-visit-plan-actions";
import { VenueNeedsCheck } from "@/components/venue/venue-needs-check";
import { VenueDetailSectionNav } from "@/components/venue/venue-detail-section-nav";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import {
  buildBreadcrumbJsonLd,
  buildVenueLocalBusinessJsonLd,
} from "@/lib/seo/venue-jsonld";
import { BeforeYouGo } from "@/components/venue/BeforeYouGo";
import { VenueDecisionSummary } from "@/components/venue/VenueDecisionSummary";
import { VenueNextSteps } from "@/components/venue/venue-next-steps";
import "./venue-report.css";
import { isDemoVenue } from "@/lib/venue-card";
import { suggestVenueMailto } from "@/lib/venue-submission";

export function generateStaticParams() {
  return SAMPLE_VENUES.map((v) => ({ slug: v.slug }));
}

function statusDetails(v: "yes" | "no" | "unknown" | undefined, demo: boolean) {
  if (demo)
    return {
      icon: "·",
      label:
        v === "yes"
          ? "Example: present"
          : v === "no"
            ? "Example: unavailable"
            : "Example: unknown",
      cls: "text-muted",
    };
  if (v === "yes")
    return { icon: "✓", label: "Reported present", cls: "text-verified" };
  if (v === "no")
    return { icon: "×", label: "Not available", cls: "text-error" };
  return { icon: "!", label: "Check before visiting", cls: "text-warning" };
}

const VENUE_COPY: Record<
  string,
  {
    about: string;
    beforeYouGo: string[];
  }
> = {
  "harbour-kitchen-liverpool": {
    about:
      "This example restaurant report demonstrates how entrance widths, internal routes and toilet information can be presented together.",
    beforeYouGo: [
      "Ask staff to reserve a route-side table if you use a larger powered chair or travel with a PA.",
      "Check where the nearest Blue Badge spaces or drop-off points are before leaving.",
      "If visiting at peak times, call ahead to confirm aisle space remains clear around your seating area.",
    ],
  },
  "botanical-gardens-manchester": {
    about:
      "Botanical Gardens has mostly flat tarmac paths on the main loop with several sheltered rest areas. The visitor centre has ramp access and an accessible toilet. Gravel side paths and steeper slopes exist but are avoidable if you stick to the marked accessible route.",
    beforeYouGo: [
      "Check the weather — paths can be slippery in wet conditions and powered chairs may lose traction on gravel edges.",
      "Ask at the visitor centre for the accessible route map if signage is unclear.",
      "Plan rest stops — the full loop is roughly 800 m with benches every 150–200 m.",
    ],
  },
  "gluckberry-woods-cafe-liverpool": {
    about:
      "Gluckberry Woods Cafe is usually quieter outside peak brunch times and has a layout that can often be adjusted by staff. Seating flexibility and circulation space are the key strengths in this listing.",
    beforeYouGo: [
      "Call ahead for the best time window if you need more space around tables.",
      "Confirm where the nearest Blue Badge spaces are that day.",
      "Ask staff to reserve a table with clear turning space if possible.",
    ],
  },
  "gallery-cafe-manchester": {
    about:
      "Gallery Café is a smaller independent venue with level access via the side entrance. The main limitation is tight turning space near the counter—staff can often move tables to help, but it is worth asking when you arrive or calling ahead.",
    beforeYouGo: [
      "Use the side entrance for level access — the front step is too high for most chairs.",
      "Ask staff to move the table nearest the counter if you need more turning room.",
      "Accessible toilet status is unconfirmed — phone ahead or have a backup plan.",
    ],
  },
  "riverside-cinema-leeds": {
    about:
      "Riverside Cinema has automatic doors, lift access to every screen, clearly marked wheelchair spaces with companion seating, and a hearing loop in all auditoriums. The accessible toilet is on the ground floor near the main foyer.",
    beforeYouGo: [
      "Book wheelchair spaces online or by phone — walk-up availability depends on showtime.",
      "If you use a powered chair wider than 70 cm, confirm the wheelchair space width matches your needs.",
      "Hearing loop coverage varies by seat position — ask the box office which rows work best.",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const v = SAMPLE_VENUES.find((x) => x.slug === resolved.slug);
  if (!v) return {};
  const canonical = getVenueBySlug(resolved.slug);
  const leadImage = v.photos?.[0]?.src ?? canonical?.images[0]?.src;
  const title = `${v.name} accessibility guide`;
  return buildPageMetadata({
    title,
    description: isDemoVenue(v)
      ? `Example Access Stamp venue report for ${v.name}. Demonstration data, not a travel recommendation.`
      : v.summary,
    path: `/venue/${v.slug}`,
    image: leadImage,
    type: "article",
  });
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  const v = SAMPLE_VENUES.find((x) => x.slug === resolved.slug);
  if (!v) return notFound();
  const unknownFeatures = Object.entries(v.features)
    .filter(([, value]) => value === "unknown")
    .map(([feature]) => feature);
  const unknownCount = unknownFeatures.length;
  const confirmedFeatures = Object.entries(v.features)
    .filter(([, value]) => value === "yes")
    .map(([feature]) => feature);
  const unavailableFeatures = Object.entries(v.features)
    .filter(([, value]) => value === "no")
    .map(([feature]) => feature);
  const isDemo = isDemoVenue(v);
  const custom = isDemo ? undefined : VENUE_COPY[v.slug];
  const summary = isDemo
    ? "Example Access Stamp venue report. Measurements and features demonstrate the product and must not be used to plan a visit."
    : v.summary;
  const canonical = getVenueBySlug(v.slug);
  const hasPhotos = Boolean(v.photos?.length);
  // Use the existing seating photograph as this demo's opening view. Preserve all photos.
  const initialPhoto = isDemo
    ? Math.max(
        0,
        v.photos?.findIndex((photo) => photo.src.endsWith("/seating.webp")) ??
          0,
      )
    : 0;
  const beforeYouGo = custom?.beforeYouGo ?? [
    "Call ahead to confirm current layout and staff support.",
    "Check Blue Badge parking and nearest drop-off before leaving.",
    "Confirm toilet access and doorway widths for your equipment.",
  ];

  const schema = canonical ? buildVenueLocalBusinessJsonLd(canonical) : null;
  const breadcrumbSchema = buildBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Venue Finder", href: "/venue-finder" },
    { name: v.name },
  ]);

  return (
    <div className="venue-report">
      <SetChatContext page={{ kind: "venue", slug: v.slug, name: v.name }} />
      <JsonLdScript data={schema} />
      <JsonLdScript data={breadcrumbSchema} />
      <Container className="venue-report-container">
        <div className="venue-report-breadcrumbs">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Venue Finder", href: "/venue-finder" },
              { label: v.name },
            ]}
          />
        </div>

        <header className="venue-report-heading">
          <div>
            <h1>{v.name}</h1>
            <p className="venue-report-meta">
              <span>{v.type}</span>
              <span aria-hidden="true">·</span>
              <span>{v.location}</span>
              {isDemo ? (
                <span className="venue-report-label">Example listing</span>
              ) : null}
            </p>
          </div>
          <VenueDetailActions slug={v.slug} venueName={v.name} />
          <p className="venue-report-intro">
            {isDemo
              ? "This demonstration listing uses example photos and access details. It has not been independently audited and must not be used to plan a real visit."
              : summary}
          </p>
        </header>

        {hasPhotos ? (
          <section
            id="venue-photos"
            className="venue-report-gallery"
            aria-labelledby="venue-photos-heading"
          >
            <h2 id="venue-photos-heading" className="sr-only">
              {isDemo ? "Example access photos" : "Venue photos"}
            </h2>
            <VenuePhotoGallery
              key={v.slug}
              photos={v.photos!}
              isExample={isDemo}
              initialIndex={initialPhoto}
            />
            {isDemo ? (
              <div className="venue-report-photo-note">
                <p>
                  Example photos from different locations. They do not show this
                  venue or verify the sample measurements.
                </p>
                <Link href="/for-venues/photo-guide">
                  How to take access photos
                </Link>
              </div>
            ) : null}
          </section>
        ) : null}

        <VenueDetailSectionNav hasPhotos={hasPhotos} />

        <div className="venue-report-layout">
          <div className="venue-report-content">
            <VenueDecisionSummary
              venue={v}
              confirmedFeatures={confirmedFeatures}
              unavailableFeatures={unavailableFeatures}
              unknownFeatures={unknownFeatures}
              unknownCount={unknownCount}
            />

            <section
              className="venue-report-section"
              aria-labelledby="before-visit-heading"
            >
              <h2 id="before-visit-heading">Before you visit</h2>
              <ul className="venue-report-tips">
                {beforeYouGo.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
              <Link href="/methodology" className="venue-report-text-link">
                How we describe access
              </Link>
            </section>

            <section
              className="venue-report-section"
              aria-labelledby="access-breakdown-heading"
            >
              <h2 id="access-breakdown-heading">Access in detail</h2>
              <p className="venue-report-muted">
                {isDemo
                  ? "Illustrative features for this demonstration. These are not verified details about a real venue."
                  : "Reported features, limitations and information that still needs checking."}
              </p>
              {ACCESS_AREAS.map((area, index) => (
                <section
                  key={area.title}
                  id={
                    [
                      "venue-entrance",
                      "venue-inside",
                      "venue-toilets",
                      "venue-arrival",
                    ][index]
                  }
                  className="venue-report-access-area"
                  aria-labelledby={`access-area-${index}`}
                >
                  <h3 id={`access-area-${index}`}>{area.title}</h3>
                  <dl className="venue-report-feature-rows">
                    {area.points.map((key) => {
                      const status = statusDetails(v.features[key], isDemo);
                      return (
                        <div key={key}>
                          <dt>{key}</dt>
                          <dd className={status.cls}>
                            <span aria-hidden="true">{status.icon} </span>
                            {status.label}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </section>
              ))}
            </section>

            <VenueNeedsCheck venue={v} />

            <section
              id="venue-plan"
              className="venue-report-section"
              aria-labelledby="venue-plan-heading"
            >
              <h2 id="venue-plan-heading">Questions for the venue</h2>
              <BeforeYouGo demo={isDemo} />
              <VenueContact venue={v} />
              {v.locationSnapshot ? (
                <div className="venue-report-location">
                  <Image
                    src={v.locationSnapshot.src}
                    alt={v.locationSnapshot.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 800px) 100vw, 720px"
                  />
                </div>
              ) : null}
              {custom && !isDemo ? (
                <p className="venue-report-muted">{custom.about}</p>
              ) : null}
            </section>

            <AccessCheckedMethodology
              verification={v.verificationType}
              confidence={v.confidence}
              lastUpdated={v.lastUpdated}
            />
          </div>

          <aside className="venue-report-sidebar" aria-label="Visit planning">
            <div className="venue-report-planner">
              <h2>Plan your visit</h2>
              <p>
                {isDemo
                  ? "Try the comparison with example data, then save questions to use with a real venue."
                  : "Compare the details with your access needs, then save any questions for the venue."}
              </p>
              <a href="#venue-fit" className="venue-report-primary">
                Compare my needs
              </a>
              <div className="venue-report-planner-links">
                <a href="#venue-plan">Prepare questions</a>
                <VenueVisitPlanActions
                  venueName={v.name}
                  location={v.location}
                  summary={summary}
                  tags={v.tags}
                  beforeYouGo={beforeYouGo}
                />
              </div>
              <VenueDetailActions
                slug={v.slug}
                venueName={v.name}
                variant="planning"
              />
            </div>
            <div className="venue-report-sidebar-section">
              <h2>Something missing?</h2>
              <p>
                {isDemo
                  ? "Tell us how this example could be more useful."
                  : "Share a correction or an access detail that would help the next visitor."}
              </p>
              <Link href={`/corrections?venue=${encodeURIComponent(v.slug)}`}>
                Suggest a correction
              </Link>
              <a
                href={suggestVenueMailto({
                  venueName: v.name,
                  subject: `Venue update: ${v.name}`,
                  body: `Venue: ${v.name}\nArea: ${v.location}\n\nUpdate or suggestion:\n`,
                })}
              >
                Send an update by email
              </a>
            </div>
            <VenueNextSteps
              unknownFeatures={unknownFeatures}
              confirmedFeatures={confirmedFeatures}
              unavailableFeatures={unavailableFeatures}
            />
          </aside>
        </div>
        <div className="venue-report-return">
          <VenueBackLink />
          <Link href="/for-venues">List your venue</Link>
        </div>
      </Container>
    </div>
  );
}
