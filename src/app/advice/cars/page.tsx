import Link from "next/link";
import { AdviceIllustratedCard } from "@/components/advice/advice-manual-card";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";

const TOPICS = [
  ["Blue Badge", "Eligibility, renewal, and how to use it properly."],
  ["Motability", "How the scheme works and what to compare."],
  ["Driving adaptations", "Hand controls, seat aids, and licence conditions."],
  ["Parking", "Loading, unloading, and avoiding fines."],
  ["WAVs", "Wheelchair Accessible Vehicles and what to check."],
  ["Ownership", "Insurance, servicing, and day-to-day running costs."],
] as const;

export default function CarsPage() {
  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-8">
          <div className="space-y-3 max-w-4xl">
            <Badge tone="amber">Cars</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Cars, parking, and driving support</h1>
            <p className="max-w-[80ch] text-muted">
              Everything to do with private vehicles: Blue Badge, Motability, driving adaptations, WAVs, and day-to-day
              ownership.
            </p>
          </div>

          <Card className="p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_.9fr] lg:items-start">
              <div>
                <div className="text-sm font-semibold text-heading">Search cars topics</div>
                <input
                  className="mt-2 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                  placeholder="Search Blue Badge, Motability, WAVs..."
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/advice/blue-badge-and-parking-for-cars" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                    Blue Badge
                  </Link>
                  <Link href="/advice/motability-and-wavs" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                    Motability
                  </Link>
                  <Link href="/advice/driving-adaptations-and-licence-conditions" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                    Driving adaptations
                  </Link>
                </div>
              </div>

              <Card className="border border-border bg-background-2 p-4">
                <div className="text-sm font-semibold text-heading">Start here</div>
                <ol className="mt-3 space-y-2 text-sm text-text">
                  <li>1. Decide whether you need parking help, driving support, or a vehicle change.</li>
                  <li>2. Check the rules before you buy or order anything.</li>
                  <li>3. Keep evidence for the scheme, insurer, or dealer.</li>
                </ol>
                <div className="mt-4">
                  <Button href="/ai" variant="secondary">Ask the AI</Button>
                </div>
              </Card>
            </div>
          </Card>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {TOPICS.map(([title, desc]) => (
              <AdviceIllustratedCard key={title} title={title} description={desc} categorySlug="cars" />
            ))}
          </div>

          <Card className="p-5">
            <div className="text-sm font-semibold text-heading">Good next reads</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/advice/transport" className="rounded-full bg-amber-pale px-3 py-2 text-xs font-semibold text-amber">Transport</Link>
              <Link href="/advice/equipment" className="rounded-full bg-amber-pale px-3 py-2 text-xs font-semibold text-amber">Equipment</Link>
              <Link href="/advice/rights" className="rounded-full bg-amber-pale px-3 py-2 text-xs font-semibold text-amber">Your Rights</Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
