import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Button, Card } from "@/components/ui";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";
import { VenueDetailActions } from "@/components/venue-detail-actions";
import { VenuePhotoGallery } from "@/components/venue-photo-gallery";
import { VenueVisitPlanActions } from "@/components/venue-visit-plan-actions";
import { WillItFitCard } from "@/components/venue/will-it-fit-card";

export function generateStaticParams() {
  return SAMPLE_VENUES.map((v) => ({ slug: v.slug }));
}

const ACCESS_AREAS = [
  {
    title: "Entrance & approach",
    points: ["Step-free entrance", "Ramp access", "Automatic doors", "Wide doorways (80cm+)"],
  },
  {
    title: "Inside the venue",
    points: ["Turning space (150cm+)", "Lift access", "Quiet environment", "Powered wheelchair suitable"],
  },
  {
    title: "Toilets",
    points: ["Accessible toilet", "Changing Places toilet"],
  },
  {
    title: "Parking & support",
    points: ["Nearby Blue Badge parking", "Staff disability awareness"],
  },
] as const;

function statusDetails(v: "yes" | "no" | "unknown" | undefined) {
  if (v === "yes") return { icon: "✅", label: "Available", cls: "text-[#1f7a42]" };
  if (v === "no") return { icon: "❌", label: "Not available", cls: "text-[#8a2b2b]" };
  return { icon: "❓", label: "Unknown", cls: "text-muted" };
}

function venueEmoji(type: string) {
  if (type === "Restaurant" || type === "Café" || type === "Pub & Bar") return "🍽️";
  if (type === "Hotel") return "🏨";
  if (type === "Shopping") return "🛍️";
  if (type === "Arts & Culture") return "🎭";
  if (type === "Entertainment") return "🎬";
  if (type === "Sports & Fitness") return "🏋️";
  if (type === "Outdoor") return "🌳";
  if (type === "Healthcare") return "🏥";
  return "📍";
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
      "Harbour Kitchen is one of the stronger central Liverpool options for a practical wheelchair-friendly meal stop, especially for mixed groups. The key positives are step-free access, wider internal routes, and a ground-floor accessible toilet.",
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
      "Riverside Cinema is one of the stronger Access Stamp checked venues. Automatic doors, lift to every screen, clearly marked wheelchair spaces with companion seating, and a hearing loop in all auditoriums. The accessible toilet is on the ground floor near the main foyer.",
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
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const v = SAMPLE_VENUES.find((x) => x.slug === resolved.slug);
  if (!v) return {};
  return {
    title: `${v.name} accessibility guide`,
    description: v.summary,
    openGraph: {
      title: `${v.name} accessibility guide`,
      description: v.summary,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${v.name} accessibility guide`,
      description: v.summary,
    },
  };
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved = await Promise.resolve(params);
  const v = SAMPLE_VENUES.find((x) => x.slug === resolved.slug);
  if (!v) return notFound();
  const yesCount = Object.values(v.features).filter((x) => x === "yes").length;
  const unknownCount = Object.values(v.features).filter((x) => x === "unknown").length;
  const confirmedFeatures = Object.entries(v.features)
    .filter(([, value]) => value === "yes")
    .map(([feature]) => feature);
  const custom = VENUE_COPY[v.slug];
  const beforeYouGo = custom?.beforeYouGo ?? [
    "Call ahead to confirm current layout and staff support.",
    "Check Blue Badge parking and nearest drop-off before leaving.",
    "Confirm toilet access and doorway widths for your equipment.",
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: v.name,
    description: v.summary,
    address: { "@type": "PostalAddress", addressLocality: v.location, addressCountry: "GB" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: v.rating.toFixed(1), reviewCount: 1 },
    keywords: v.tags.join(", "),
  };

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "venue", slug: v.slug, name: v.name }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Container className="py-10">
        <div className="space-y-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Venue Finder", href: "/venue-finder" },
              { label: v.name },
            ]}
          />

          <Card className="overflow-hidden p-0">
            <div
              className="border-b border-border px-5 py-6 sm:px-7"
              style={{
                background:
                  "linear-gradient(135deg, var(--blue-pale) 0%, var(--background-2) 45%, var(--amber-pale) 100%)",
              }}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-ui)] bg-card text-2xl">
                      {venueEmoji(v.type)}
                    </span>
                    <div>
                      <h1 className="font-[var(--font-heading)] text-4xl text-heading">{v.name}</h1>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-muted">{v.location}</span>
                        <span className="rounded-full bg-blue-pale px-3 py-1 text-xs font-semibold text-blue">{v.type}</span>
                        <span className="rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-amber">
                          Rating {v.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="max-w-[80ch] text-sm leading-6 text-text">{v.summary}</p>
                </div>
                <VenueDetailActions slug={v.slug} venueName={v.name} />
              </div>
            </div>

            <div className="grid gap-3 px-5 py-5 text-xs sm:grid-cols-2 lg:grid-cols-4 sm:px-7">
              <div className="rounded-[var(--radius-ui)] border border-border bg-background p-3">
                <span className="font-semibold text-heading">Verification:</span> {v.verification}
              </div>
              <div className="rounded-[var(--radius-ui)] border border-border bg-background p-3">
                <span className="font-semibold text-heading">Last updated:</span> {v.lastUpdated}
              </div>
              <div className="rounded-[var(--radius-ui)] border border-border bg-background p-3">
                <span className="font-semibold text-heading">Confidence:</span> {v.confidence}
              </div>
              <div className="rounded-[var(--radius-ui)] border border-border bg-background p-3">
                <span className="font-semibold text-heading">Known access features:</span> {yesCount} confirmed
                {confirmedFeatures.length ? (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-[11px] font-semibold text-blue">
                      Show all confirmed features ({confirmedFeatures.length})
                    </summary>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {confirmedFeatures.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-semibold text-heading"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
            </div>
          </Card>

          {v.photos?.length ? (
            <Card className="p-5">
              <div className="mb-3 text-sm font-semibold text-heading">Photo guide with measurements</div>
              <p className="mb-4 text-sm text-muted">
                Click through images of the venue, entrance, doorway width, bathroom, and internal layout.
              </p>
              <VenuePhotoGallery photos={v.photos} />
            </Card>
          ) : null}

          <WillItFitCard venue={v} />

          <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">What this means for your visit</div>
              <p className="mt-2 text-sm text-muted">
                This venue currently has <span className="font-semibold text-heading">{yesCount}</span> confirmed access points.
                {unknownCount > 0 ? (
                  <>
                    {" "}
                    <span className="font-semibold text-heading">{unknownCount}</span> details are still unknown, so it is worth
                    calling ahead for exact measurements and on-the-day setup.
                  </>
                ) : (
                  " Key details are mostly documented, but confirming current layout before travel is still sensible."
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {v.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-heading"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <VenueVisitPlanActions
                venueName={v.name}
                location={v.location}
                summary={v.summary}
                tags={v.tags}
                beforeYouGo={beforeYouGo}
              />
            </Card>

            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">Location snapshot</div>
              {v.locationSnapshot ? (
                <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-background">
                  <Image
                    src={v.locationSnapshot.src}
                    alt={v.locationSnapshot.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
              ) : (
                <div className="mt-3 grid h-44 place-items-center rounded-[var(--radius-card)] border border-border bg-background text-sm font-semibold text-muted">
                  Map preview coming soon
                </div>
              )}
              <p className="mt-3 text-xs text-muted">
                Address area: <span className="font-semibold text-heading">{v.location}</span>. Use this with your route planner and
                check Blue Badge options or drop-off points before leaving.
              </p>
            </Card>
          </div>

          {custom ? (
            <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
              <Card className="p-5">
                <div className="text-sm font-semibold text-heading">About this location</div>
                <p className="mt-2 text-sm leading-6 text-muted">{custom.about}</p>
              </Card>
              <Card className="p-5">
                <div className="text-sm font-semibold text-heading">Before you go</div>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted">
                  {beforeYouGo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </div>
          ) : null}

          <section className="space-y-4">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Accessibility breakdown</h2>
              <p className="mt-1 text-sm text-muted">
                Feature-by-feature status so you can decide quickly whether this place fits your access needs.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {ACCESS_AREAS.map((area) => (
                <Card key={area.title} className="p-5">
                  <div className="text-sm font-semibold text-heading">{area.title}</div>
                  <div className="mt-3 grid gap-2">
                    {area.points.map((key) => {
                      const s = statusDetails(v.features[key]);
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between rounded-[var(--radius-ui)] border border-border bg-background px-3 py-2"
                        >
                          <span className="text-sm text-heading">{key}</span>
                          <span className={`text-xs font-semibold ${s.cls}`} aria-label={s.label}>
                            {s.icon} {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">Contact details</div>
              <div className="mt-3 grid gap-2 text-sm text-muted">
                <div>
                  <span className="font-semibold text-heading">Address area:</span> {v.location}
                </div>
                <div>
                  <span className="font-semibold text-heading">Phone:</span> Coming soon
                </div>
                <div>
                  <span className="font-semibold text-heading">Website:</span> Coming soon
                </div>
                <div>
                  <span className="font-semibold text-heading">Opening hours:</span> Coming soon
                </div>
              </div>
              <div className="mt-4">
                <Button href={`/submit-venue?suggested=${encodeURIComponent(v.slug)}`} variant="secondary">
                  Suggest an update
                </Button>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-heading">Reviews</div>
                  <p className="mt-1 text-sm text-muted">
                    Reviews coming soon (Phase 2). For now, this listing combines community reports and practical checks.
                  </p>
                </div>
                <Link href="/venue-finder" className="text-sm font-semibold text-blue">
                  Back to search →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
