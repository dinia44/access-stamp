import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Button, Card } from "@/components/ui";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";
import { VenueDetailActions } from "@/components/venue-detail-actions";

export default function VenueDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const v = SAMPLE_VENUES.find((x) => x.slug === params.slug);
  if (!v) return notFound();

  const rows: Array<{ area: string; key: string }[]> = [
    [
      { area: "Entrance & Approach", key: "Step-free entrance" },
      { area: "Entrance & Approach", key: "Ramp access" },
      { area: "Entrance & Approach", key: "Automatic doors" },
      { area: "Entrance & Approach", key: "Wide doorways (80cm+)" },
    ],
    [
      { area: "Interior", key: "Turning space (150cm+)" },
      { area: "Interior", key: "Quiet environment" },
      { area: "Interior", key: "Powered wheelchair suitable" },
    ],
    [
      { area: "Toilets", key: "Accessible toilet" },
      { area: "Toilets", key: "Changing Places toilet" },
    ],
    [
      { area: "Parking", key: "Nearby Blue Badge parking" },
    ],
    [
      { area: "Staff", key: "Staff disability awareness" },
    ],
  ];

  function statusIcon(s: string | undefined) {
    if (s === "yes") return "✅";
    if (s === "no") return "❌";
    return "❓";
  }

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "venue", slug: v.slug, name: v.name }} />
      <Container className="py-10">
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Venue Finder", href: "/venue-finder" },
              { label: v.name },
            ]}
          />

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="font-[var(--font-heading)] text-4xl text-heading">{v.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-muted">{v.location}</span>
                <span className="rounded-full bg-blue-pale px-3 py-1 text-xs font-semibold text-blue">{v.type}</span>
                <span className="rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-amber">
                  Rating {v.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <VenueDetailActions slug={v.slug} venueName={v.name} />
          </div>

          <Card className="p-5">
            <div className="text-sm font-semibold text-heading">Practical summary</div>
            <p className="mt-2 text-sm text-muted">{v.summary}</p>
            <div className="mt-4 grid gap-1 border-t border-border pt-3 text-xs text-muted sm:grid-cols-3">
              <div>
                <span className="font-semibold text-heading">Verification:</span> {v.verification}
              </div>
              <div>
                <span className="font-semibold text-heading">Last updated:</span> {v.lastUpdated}
              </div>
              <div>
                <span className="font-semibold text-heading">Confidence:</span> {v.confidence}
              </div>
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">Accessibility breakdown</div>
              <div className="mt-4 grid gap-3">
                {rows.flat().map((r) => (
                  <div
                    key={`${r.area}-${r.key}`}
                    className="grid gap-1 rounded-[var(--radius-card)] border border-border bg-background p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-heading">{r.key}</div>
                      <div className="text-sm" aria-label={v.features[r.key] ?? "unknown"}>
                        {statusIcon(v.features[r.key])}
                      </div>
                    </div>
                    <div className="text-xs text-muted">{r.area}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-4">
              <Card className="p-5">
                <div className="text-sm font-semibold text-heading">Map</div>
                <div className="mt-3 grid h-56 place-items-center rounded-[var(--radius-card)] border border-border bg-background text-sm font-semibold text-muted">
                  Map placeholder
                </div>
                <div className="mt-3 text-xs text-muted">
                  Location mapping will be expanded over time. For now, check the practical access details listed on
                  this page before visiting.
                </div>
              </Card>

              <Card className="p-5">
                <div className="text-sm font-semibold text-heading">Contact details</div>
                <div className="mt-3 grid gap-2 text-sm text-muted">
                  <div>
                    <span className="font-semibold text-heading">Address:</span> {v.location}
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
            </div>
          </div>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-heading">Reviews</div>
                <p className="mt-1 text-sm text-muted">Reviews coming soon (Phase 2).</p>
              </div>
              <Link href="/venue-finder" className="text-sm font-semibold text-blue">
                Back to search →
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
