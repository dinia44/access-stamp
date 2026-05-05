import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

const PRIORITIES = [
  {
    title: "Get safe at home",
    desc: "Spot immediate risks around washing, toileting, stairs, transfers, cooking, and leaving the house.",
    href: "/advice/home-access-quick-check",
  },
  {
    title: "Sort the paperwork",
    desc: "Start a simple folder for letters, appointments, evidence, benefits, care notes, and access requests.",
    href: "/advice/newly-disabled-paperwork",
  },
  {
    title: "Build your support map",
    desc: "Work out who handles healthcare, care support, education or work, benefits, equipment, and transport.",
    href: "/advice/talking-to-services",
  },
] as const;

const FIRST_WEEK = [
  "Write a one-page summary of what changed and what help is needed day to day.",
  "List urgent access barriers: bathroom, bedroom, entrance, transport, appointments, food, medication.",
  "Keep a diary of fatigue, pain, falls, near-misses, support needs, and what happens without help.",
  "Pick one person to help keep track of calls, letters, passwords, forms, and appointment notes.",
];

const QUICK_LINKS = [
  ["PIP overview", "/advice/pip-in-plain-english"],
  ["Equipment", "/advice/equipment"],
  ["Care & support", "/advice/care"],
  ["Education", "/advice/education"],
  ["Workplace", "/advice/workplace"],
  ["Emergency help", "/advice/emergency"],
] as const;

export default function NewToDisabilityPage() {
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === "new-to-disability");

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-8">
          <div className="max-w-4xl space-y-3">
            <Badge tone="amber">New to disability</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">
              A calm starting point when everything feels too much
            </h1>
            <p className="max-w-[85ch] text-muted">
              If you are newly disabled, newly using a wheelchair, or supporting someone whose needs have changed, this
              page helps you get oriented without pretending the system is simple.
            </p>
          </div>

          <Card className="p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_.9fr] lg:items-start">
              <div>
                <div className="text-sm font-semibold text-heading">Your first week checklist</div>
                <ol className="mt-3 space-y-3 text-sm text-text">
                  {FIRST_WEEK.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-pale text-xs font-bold text-blue">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button href="/ai">Ask what to do next</Button>
                  <Button href="/advice/first-30-days-disabled" variant="secondary">
                    First 30 days guide
                  </Button>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] border border-border bg-background-2 p-4">
                <div className="text-sm font-semibold text-heading">Quick links</div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {QUICK_LINKS.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="rounded-[var(--radius-ui)] border border-border bg-white p-3 text-sm font-semibold text-heading hover:bg-background"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted">
                  You do not need to solve everything today. Start with safety, paperwork, and one support route.
                </p>
              </div>
            </div>
          </Card>

          <section className="grid gap-3 md:grid-cols-3">
            {PRIORITIES.map((item) => (
              <Link key={item.title} href={item.href} className="group">
                <Card className="h-full p-5 transition-shadow group-hover:shadow-[var(--shadow)]">
                  <div className="text-sm font-semibold text-heading">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
                  <div className="mt-4 text-sm font-semibold text-blue">Open guide →</div>
                </Card>
              </Link>
            ))}
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">New to disability guides</h2>
              <p className="text-sm text-muted">
                Practical routes for the early stage: paperwork, home access, services, family, and confidence outside.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link key={a.slug} href={`/advice/${a.slug}`} className="group">
                  <Card className="h-full p-5 transition-shadow group-hover:shadow-[var(--shadow)]">
                    <div className="text-sm font-semibold text-heading">{a.title}</div>
                    <div className="mt-2 text-xs font-semibold text-muted">Updated: {a.updated}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} tone="blue">
                          {tag}
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
