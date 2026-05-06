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
  { label: "Access to Work: what can it pay for?", href: "/advice/access-to-work-what-employer-pays-vs-grant" },
  { label: "Access to Work: how to apply", href: "/advice/access-to-work-application-walkthrough" },
  { label: "Access to Work basics", href: "/advice/access-to-work-basics" },
  { label: "Reasonable adjustments", href: "/advice/reasonable-adjustments-you-can-ask-for" },
  { label: "Meeting script + email", href: "/advice/workplace-meeting-script-and-email-template" },
  { label: "Probation & disclosure", href: "/advice/probation-disability-disclosure-and-risk" },
] as const;

const MORE_TOPICS = [
  { title: "Return after illness or injury", desc: "Phased return plans that account for fatigue, pain, travel, and flare days.", href: "/advice/returning-to-work-after-disability" },
  { title: "Flexible working", desc: "Patterns and trial periods that protect your job without hiding your access needs.", href: "/advice/flexible-working-and-health" },
  { title: "Occupational Health reports", desc: "How to challenge inaccuracies and convert vague advice into practical actions.", href: "/advice/occupational-health-and-workplace-assessments" },
  { title: "Adjustment meetings", desc: "Simple script + follow-up email structure to keep decisions in writing.", href: "/advice/workplace-meeting-script-and-email-template" },
] as const;

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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Advice Hub", href: "/advice" }, { label: "Workplace" }]} />

          <div className="max-w-4xl space-y-4">
            <Badge tone="amber" className="w-fit">Workplace</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight text-heading sm:text-5xl">Workplace support you can actually use</h1>
            <p className="max-w-[82ch] text-base leading-7 text-muted">Access to Work funding, who pays for what, step-by-step application help, reasonable adjustments, and what to do when support is delayed or blocked.</p>
          </div>

          <Card className="p-6 sm:p-7">
            <div className="space-y-4">
              <div className="text-sm font-semibold uppercase tracking-wide text-muted">Quick actions</div>
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((item) => (
                  <Button key={item.href} href={item.href} variant="ghost" className="border border-border">{item.label}</Button>
                ))}
              </div>
              <div className="rounded-[var(--radius-card)] border border-border bg-background-2 p-4">
                <div className="text-sm font-semibold text-heading">Most opened workplace guides</div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {featured.map((a) => (
                    <Link key={a!.slug} href={`/advice/${a!.slug}`} className="rounded-[var(--radius-ui)] border border-border bg-card px-3 py-3 text-sm font-semibold text-heading transition-colors hover:bg-blue-pale hover:text-blue">
                      {a!.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Card>

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
                        <Badge key={tag} tone="blue">{tag}</Badge>
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
