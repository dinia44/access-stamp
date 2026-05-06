import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

const FEATURED = [
  "access-to-work-basics",
  "access-to-work-what-employer-pays-vs-grant",
  "access-to-work-application-walkthrough",
  "reasonable-adjustments-you-can-ask-for",
] as const;

const QUICK_ACTIONS = [
  { label: "Access to Work: what it can pay", href: "/advice/access-to-work-basics" },
  { label: "Who pays: employer vs grant", href: "/advice/access-to-work-what-employer-pays-vs-grant" },
  { label: "How to apply (step-by-step)", href: "/advice/access-to-work-application-walkthrough" },
  { label: "Reasonable adjustments", href: "/advice/reasonable-adjustments-you-can-ask-for" },
  { label: "Meeting script + email", href: "/advice/workplace-meeting-script-and-email-template" },
  { label: "Probation & disclosure", href: "/advice/probation-disability-disclosure-and-risk" },
] as const;

const PATHWAYS = [
  {
    title: "Access to Work funding",
    desc: "What it can fund, what your employer still must do, and how to avoid blurred responsibility.",
    href: "/advice/access-to-work-what-employer-pays-vs-grant",
  },
  {
    title: "Applying and evidence",
    desc: "Step-by-step application flow with practical evidence examples that speed up decisions.",
    href: "/advice/access-to-work-application-walkthrough",
  },
  {
    title: "Adjustments at work",
    desc: "Requests that focus on barriers, outcomes, and dates — not only medical labels.",
    href: "/advice/reasonable-adjustments-you-can-ask-for",
  },
  {
    title: "If things go wrong",
    desc: "Grievances, discrimination timelines, and escalation before deadlines close.",
    href: "/advice/disability-discrimination-and-grievances",
  },
] as const;

const MORE_TOPICS = [
  {
    title: "Return after illness or injury",
    desc: "Phased return plans that account for fatigue, pain, travel, and flare days.",
    href: "/advice/returning-to-work-after-disability",
  },
  {
    title: "Flexible working",
    desc: "Patterns and trial periods that protect your job without hiding your access needs.",
    href: "/advice/flexible-working-and-health",
  },
  {
    title: "Occupational Health reports",
    desc: "How to challenge inaccuracies and convert vague advice into practical actions.",
    href: "/advice/occupational-health-and-workplace-assessments",
  },
  {
    title: "Adjustment meetings",
    desc: "Simple script + follow-up email structure to keep decisions in writing.",
    href: "/advice/workplace-meeting-script-and-email-template",
  },
] as const;

const SCENARIOS = [
  {
    title: "You need Access to Work but don't know where to start",
    body: "Begin with task-level barriers, not diagnosis history. The strongest applications show what fails, what support fixes it, and what happens if support is missing.",
    href: "/advice/access-to-work-application-walkthrough",
    cta: "Application walkthrough",
  },
  {
    title: "HR says Access to Work should pay for everything",
    body: "That is a common misunderstanding. Employers still owe reasonable adjustments under Equality Act duties.",
    href: "/advice/access-to-work-what-employer-pays-vs-grant",
    cta: "Who pays guide",
  },
  {
    title: "Probation review starts before support is in place",
    body: "Document what was requested and when. Ask for targets to be reviewed once essential adjustments are active.",
    href: "/advice/probation-disability-disclosure-and-risk",
    cta: "Probation guide",
  },
  {
    title: "Manager keeps agreeing verbally then nothing happens",
    body: "Switch to a short, same-day summary email after every meeting so missed actions are obvious and traceable.",
    href: "/advice/workplace-meeting-script-and-email-template",
    cta: "Meeting + email template",
  },
] as const;

const PAPERWORK_HABITS = [
  "After each meeting, send a short summary: request, owner, due date, review date.",
  "Keep one timeline of requests, responses, and impact on your work outputs.",
  "Name barriers in work-task language (meetings, software, travel, concentration, fatigue).",
  "Track deadlines for grievances and tribunal limitation periods early.",
];

export default function WorkplacePage() {
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === "workplace").sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const featured = FEATURED.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Advice Hub", href: "/advice" },
              { label: "Workplace" },
            ]}
          />

          <div className="max-w-4xl space-y-4">
            <Badge tone="amber" className="w-fit">
              Workplace
            </Badge>
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight text-heading sm:text-5xl">
              Workplace support you can actually use (DEPLOY TEST)
            </h1>
            <p className="max-w-[82ch] text-base leading-7 text-muted">
              Access to Work funding, who pays for what, step-by-step application help, reasonable adjustments, and
              what to do when support is delayed or blocked.
            </p>
          </div>

          <Card className="overflow-hidden border-navy/10 p-0 shadow-[var(--shadow-soft)]">
            <div
              className="border-b border-border px-6 py-5 sm:px-8 sm:py-6"
              style={{
                background:
                  "linear-gradient(135deg, var(--blue-pale) 0%, var(--background-2) 45%, var(--amber-pale) 100%)",
              }}
            >
              <p className="text-sm font-semibold text-navy">
                Start with the exact barrier at work, then choose the route below.
              </p>
            </div>
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.35fr_1fr]">
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-wide text-muted">Quick actions</div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((item) => (
                      <Button key={item.href} href={item.href} variant="ghost" className="border border-border bg-card">
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[var(--radius-card)] border border-border bg-background-2 p-4">
                  <div className="text-sm font-semibold text-heading">Most opened workplace guides</div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {featured.map((a) => (
                      <Link
                        key={a!.slug}
                        href={`/advice/${a!.slug}`}
                        className="rounded-[var(--radius-ui)] border border-border bg-card px-3 py-3 text-sm font-semibold text-heading transition-colors hover:bg-blue-pale hover:text-blue"
                      >
                        {a!.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] border border-border bg-amber-pale p-5">
                <div className="text-sm font-semibold text-heading">Workplace paperwork habits</div>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-text">
                  {PAPERWORK_HABITS.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-card text-xs font-semibold text-amber">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/ai" variant="secondary" className="mt-5 w-full sm:w-auto">
                  Ask the AI about your job situation
                </Button>
              </div>
            </div>
          </Card>

          <section className="space-y-4">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading sm:text-3xl">Pick your route</h2>
              <p className="mt-1 max-w-[75ch] text-sm text-muted">
                Each route below points to a real guide page — no dead ends.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PATHWAYS.map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full border-blue-pale/80 p-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow)]">
                    <div className="text-sm font-semibold text-heading">{item.title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
                    <div className="mt-4 text-sm font-semibold text-blue">Open guide →</div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading sm:text-3xl">More workplace topics</h2>
              <p className="mt-1 text-sm text-muted">Useful when support stalls, reports are vague, or role expectations shift.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {MORE_TOPICS.map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full p-5 transition-shadow group-hover:shadow-[var(--shadow)]">
                    <div className="text-sm font-semibold text-heading">{item.title}</div>
                    <p className="mt-2 text-sm text-muted">{item.desc}</p>
                    <div className="mt-4 text-sm font-semibold text-blue">Read guide →</div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading sm:text-3xl">Common workplace situations</h2>
              <p className="mt-1 text-sm text-muted">Quick routes when you are under pressure and need a next step now.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {SCENARIOS.map((s) => (
                <Card key={s.title} className="border-border bg-card p-5">
                  <div className="text-sm font-semibold text-heading">{s.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
                  <Link href={s.href} className="mt-4 inline-block text-sm font-semibold text-blue hover:underline">
                    {s.cta}
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">All Workplace guides</h2>
              <p className="text-sm text-muted">Everything in this section, alphabetical and clickable.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link key={a.slug} href={`/advice/${a.slug}`} className="group">
                  <Card className="h-full p-5 transition-shadow group-hover:shadow-[var(--shadow)]">
                    <div className="text-sm font-semibold text-heading">{a.title}</div>
                    <div className="mt-2 text-xs font-semibold text-muted">Updated: {a.updated}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a.tags.slice(0, 4).map((tag) => (
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

          <Card className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-heading">Need help wording your request?</div>
                <p className="mt-1 text-sm text-muted">
                  Tell the assistant your role, what barrier you hit, and what outcome you need. It can help you draft a
                  clear adjustments request and follow-up email.
                </p>
              </div>
              <Button href="/ai">Ask Access Stamp AI</Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
