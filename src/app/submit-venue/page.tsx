import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { SubmitVenueForm } from "@/components/submit-venue-form";
import { SubmissionQueuePreview } from "@/components/submission-queue-preview";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { CONTACT_EMAIL, suggestVenueMailto } from "@/lib/venue-submission";
import { QUICK_SCAN_BETA_NOTE, QUICK_SCAN_STEPS } from "@/lib/venue-quick-scan";

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
              { label: "For venues", href: "/for-venues" },
              { label: "Submit your venue" },
            ]}
          />

          <Card className="border-blue-pale bg-blue-pale/30 p-5 text-sm leading-6 text-text">
            Visited somewhere that works well for access?{" "}
            <a href={suggestVenueMailto()} className="font-semibold text-blue underline-offset-2 hover:underline">
              Email us to suggest a venue
            </a>{" "}
            — that&apos;s for community recommendations. This page is for organisations and venue owners submitting
            their own place.
          </Card>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">For organisations &amp; venues</Badge>
              <Badge tone="amber">Beta</Badge>
            </div>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Submit your own venue</h1>
            <p className="max-w-[85ch] text-muted">
              Use <strong className="font-semibold text-heading">Quick Feature Scan</strong> to scan areas or upload
              photos of your venue. We&apos;ll show what already looks accessible, what may need improvement, and small
              practical steps you could take — then you submit your listing for review.
            </p>
            <p className="max-w-[85ch] text-sm text-muted">{QUICK_SCAN_BETA_NOTE}</p>
          </div>

          <ol className="grid gap-4 md:grid-cols-3">
            {QUICK_SCAN_STEPS.map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-[#EFE5DA] bg-[#FDFBF8] p-5"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FDE9DD] text-sm font-bold text-[#C8430F]">
                  {item.step}
                </span>
                <h2 className="mt-3 text-base font-semibold text-heading">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </li>
            ))}
          </ol>

          <Card className="p-6 sm:p-8">
            <SubmitVenueForm defaultVenueName={presetVenue?.name} />
          </Card>
          <Card className="p-6 sm:p-8">
            <SubmissionQueuePreview />
          </Card>

          <p className="text-sm text-muted">
            Want a verified Access Stamp review instead?{" "}
            <Link href="/for-venues" className="font-semibold text-blue hover:underline">
              See Access Snapshot and audit options
            </Link>
            . Questions?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-blue hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>

          <Card className="border-blue-pale bg-blue-pale/40 p-5">
            <div className="text-sm font-semibold text-heading">Need help wording your listing?</div>
            <p className="mt-2 text-sm text-text">
              The AI assistant can help you phrase access features or explain scan results before you submit.
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
