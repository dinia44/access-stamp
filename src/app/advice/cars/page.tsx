import Link from "next/link";
import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

const FEATURED = [
  "driving-adaptations-products-library",
  "motability",
  "blue-badge",
  "parking-rights",
  "wavs",
  "licence-conditions",
];

export default function CarsPage() {
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === "cars");
  const featured = FEATURED.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-8">
          <div className="space-y-3 max-w-4xl">
            <Badge tone="amber">Cars</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Cars, parking, and driving support</h1>
            <p className="max-w-[80ch] text-muted">
              Everything to do with private vehicles in one place: Blue Badge, Motability, driving adaptations, WAVs,
              parking enforcement, and licensing requirements.
            </p>
          </div>

          <Card className="p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_.9fr] lg:items-start">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-heading">Schemes and legal essentials</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link href="/advice/blue-badge" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                      Blue Badge
                    </Link>
                    <Link href="/advice/motability" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                      Motability
                    </Link>
                    <Link href="/advice/vehicle-tax-exemption" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                      Vehicle tax
                    </Link>
                    <Link href="/advice/licence-conditions" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                      Licence conditions
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-heading">Adaptations and practical setup</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link href="/advice/driving-adaptations-products-library" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                      Adaptations library
                    </Link>
                    <Link href="/advice/wavs" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                      WAVs
                    </Link>
                    <Link href="/advice/parking-rights" className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue">
                      Parking rights
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/advice/transport" className="rounded-full bg-amber-pale px-3 py-2 text-xs font-semibold text-amber">
                    Also see Transport
                  </Link>
                  <Link href="/advice/rights" className="rounded-full bg-amber-pale px-3 py-2 text-xs font-semibold text-amber">
                    Also see Rights
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

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Featured cars topics</h2>
              <p className="text-sm text-muted">The most useful places to start for private vehicle support.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((a) => (
                <AdviceArticleCard key={a!.slug} article={a!} badgeTone="blue" />
              ))}
            </div>
          </section>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((a) => (
              <AdviceArticleCard key={a.slug} article={a} badgeTone="amber" showReadCta={false} />
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
