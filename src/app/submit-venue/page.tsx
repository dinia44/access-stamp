import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { SubmitVenueForm } from "@/components/submit-venue-form";
import { SubmissionQueuePreview } from "@/components/submission-queue-preview";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { CONTACT_EMAIL, suggestVenueMailto } from "@/lib/venue-submission";

export default async function SubmitVenuePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const raw = sp.suggested;
  const suggestedSlug = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  const presetVenue = suggestedSlug ? SAMPLE_VENUES.find((v) => v.slug === suggestedSlug) : undefined;

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "submit-venue" }} />
      <Container className="py-10">
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "For Venues", href: "/for-venues" },
              { label: "List your venue" },
            ]}
          />

          <Card className="border-blue-pale bg-blue-pale/30 p-5 text-sm leading-6 text-text">
            Visited somewhere that works well for access?{" "}
            <a href={suggestVenueMailto()} className="font-semibold text-blue underline-offset-2 hover:underline">
              Email us to suggest a venue
            </a>{" "}
            — we also share these requests on social media. This page is for venue owners listing their own place.
          </Card>

          <div className="space-y-2">
            <Badge tone="blue">For venue owners</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">List your venue here</h1>
            <p className="max-w-[85ch] text-muted">
              Add your venue to Access Stamp with the access details you know today. Upload photos and our AI can help
              scan entrances, routes, toilets, and parking before you submit. We review listings before publishing.
            </p>
          </div>

          <Card className="p-6 sm:p-8">
            <SubmitVenueForm defaultVenueName={presetVenue?.name} />
          </Card>
          <Card className="p-6 sm:p-8">
            <SubmissionQueuePreview />
          </Card>

          <p className="text-sm text-muted">
            Want a full Access Stamp audit instead?{" "}
            <Link href="/for-venues" className="font-semibold text-blue hover:underline">
              See certification for venues
            </Link>
            . Questions?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-blue hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>

          <Card className="border-blue-pale bg-blue-pale/40 p-5">
            <div className="text-sm font-semibold text-heading">Ask the AI instead</div>
            <p className="mt-2 text-sm text-text">
              Describe what you need in plain language — the assistant can help you phrase access features before you
              submit your listing.
            </p>
            <Button href="/?openChat=1" className="mt-3">
              Open AI Assistant
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
}
