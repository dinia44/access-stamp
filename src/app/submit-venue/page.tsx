import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { SubmitVenueForm } from "@/components/submit-venue-form";
import { SAMPLE_VENUES } from "@/lib/mock-data";

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
              { label: "Venue Finder", href: "/venue-finder" },
              { label: "Suggest a venue" },
            ]}
          />

          <div className="space-y-2">
            <Badge tone="blue">Venue Finder</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Suggest a venue</h1>
            <p className="max-w-[85ch] text-muted">
              Help grow Access Stamp by telling us about a place you&apos;ve visited. We review suggestions before
              publishing listings.
            </p>
          </div>

          <Card className="p-6 sm:p-8">
            <SubmitVenueForm defaultVenueName={presetVenue?.name} />
          </Card>

          <p className="text-sm text-muted">
            Prefer to browse first?{" "}
            <Link href="/venue-finder" className="font-semibold text-blue hover:underline">
              Back to Venue Finder
            </Link>
          </p>

          <Card className="border-blue-pale bg-blue-pale/40 p-5">
            <div className="text-sm font-semibold text-heading">Ask the AI instead</div>
            <p className="mt-2 text-sm text-text">
              Describe what you need in plain language — the assistant can point you to similar venues or explain access
              terms.
            </p>
            <Button href="/ai" className="mt-3">
              Open AI Assistant
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
}
