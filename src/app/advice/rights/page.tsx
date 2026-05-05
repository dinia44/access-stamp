import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { ADVICE_ARTICLES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";

const FEATURED = [
  "pip-in-plain-english",
  "blue-badge",
  "motability",
  "reasonable-adjustments",
  "nhs-complaints",
  "equality-act",
];

const START_HERE = [
  "What benefit or right are you trying to understand?",
  "What happened, and what do you need to change?",
  "What evidence do you already have?",
  "Do you need a complaint, an application, or a request for adjustment?",
];

export default function RightsPage() {
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === "rights");
  const featured = FEATURED.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-8">
          <div className="space-y-3 max-w-4xl">
            <Badge tone="amber">Your rights</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Your Rights</h1>
            <p className="max-w-[80ch] text-muted">
              Practical guides to benefits, legal protections, healthcare, housing, driving, and family support. Start
              with the thing you need to fix, not the category name.
            </p>
          </div>

          <Card className="p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_.9fr] lg:items-start">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-muted">
                  Search
                  <input
                    className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                    placeholder="Search PIP, Blue Badge, Motability, complaints..."
                  />
                </label>

                <div>
                  <div className="text-sm font-semibold text-heading">Popular guides</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {featured.map((a) => (
                      <Link
                        key={a!.slug}
                        href={`/advice/${a!.slug}`}
                        className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue"
                      >
                        {a!.title.replace(/\s*\(.+\)$/, "")}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Card className="border border-border bg-background-2 p-4">
                <div className="text-sm font-semibold text-heading">Start here</div>
                <ol className="mt-3 space-y-2 text-sm text-text">
                  {START_HERE.map((item, idx) => (
                    <li key={item} className="flex gap-2">
                      <span className="font-semibold text-blue">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4">
                  <Button href="/ai" variant="secondary">
                    Ask the AI
                  </Button>
                </div>
              </Card>
            </div>
          </Card>

          <section className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="font-[var(--font-heading)] text-2xl text-heading">Featured rights topics</h2>
                <p className="text-sm text-muted">The most useful places to begin.</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((a) => (
                <Link key={a!.slug} href={`/advice/${a!.slug}`} className="group">
                  <Card className="h-full p-5 transition-shadow group-hover:shadow-[var(--shadow)]">
                    <div className="text-sm font-semibold text-heading">{a!.title}</div>
                    <div className="mt-2 text-xs font-semibold text-muted">Updated: {a!.updated}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a!.tags.slice(0, 3).map((t) => (
                        <Badge key={t} tone="blue">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 text-sm font-semibold text-blue">Read →</div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">All guides</h2>
              <p className="text-sm text-muted">A simple list, no duplicate category panels.</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link key={a.slug} href={`/advice/${a.slug}`} className="group">
                  <Card className="h-full p-5 transition-shadow group-hover:shadow-[var(--shadow)]">
                    <div className="text-sm font-semibold text-heading">{a.title}</div>
                    <div className="mt-2 text-xs font-semibold text-muted">Updated: {a.updated}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a.tags.slice(0, 3).map((t) => (
                        <Badge key={t} tone="amber">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
