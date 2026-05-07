/**
 * Care & Support hub — URL: /advice/care
 *
 * Article bodies: `src/lib/care-articles-detail.ts` and `src/lib/care-pa-employer-sections.ts`.
 * Legacy seeds: `src/lib/advice-extra-seeds.ts` (non-care topics). Each `slug` becomes `/advice/[slug]`.
 *
 * Edit this file for hub layout only: quick actions, featured slugs, pathways, scenarios, related links.
 * Slugs here must match articles in mock-data (run `npm run build` after adding articles).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import { AdviceManualCard } from "@/components/advice/advice-manual-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

const FEATURED = [
  "personal-budgets-and-direct-payments",
  "employing-a-personal-assistant-basics",
  "care-act-assessments-and-eligibility",
  "when-care-plans-break-down",
] as const;

const QUICK_ACTIONS = [
  { label: "Direct payments & budgets", href: "/advice/personal-budgets-and-direct-payments" },
  { label: "Employing a PA", href: "/advice/employing-a-personal-assistant-basics" },
  { label: "Care Act assessments", href: "/advice/care-act-assessments-and-eligibility" },
  { label: "When care breaks down", href: "/advice/when-care-plans-break-down" },
  { label: "Respite & carer breaks", href: "/advice/respite-carer-breaks-and-funded-support" },
  { label: "Advocacy & complaints", href: "/advice/advocacy-social-care-complaints-and-ombudsman" },
] as const;

const PATHWAYS = [
  {
    title: "Assessment & eligibility",
    desc: "Wellbeing outcomes, delays, and how to prepare evidence that reflects real life at home.",
    href: "/advice/care-act-assessments-and-eligibility",
  },
  {
    title: "Money & direct payments",
    desc: "Control over spend, payroll, insurance, and back-up plans when funding does not stretch.",
    href: "/advice/personal-budgets-and-direct-payments",
  },
  {
    title: "Employing & managing PAs",
    desc: "Mock job adverts, person specs, interview scorecards, induction forms, timesheets — plus safer recruitment and ending unsafe care.",
    href: "/advice/employing-a-personal-assistant-basics",
  },
  {
    title: "Crisis, safeguarding & discharge",
    desc: "When packages collapse, hospitals discharge too fast, or harm risk appears.",
    href: "/advice/when-care-plans-break-down",
  },
] as const;

const MORE_TOPICS = [
  {
    title: "Respite & funded breaks",
    desc: "Replacement care, waiting lists, and naming burnout before it becomes emergency.",
    href: "/advice/respite-carer-breaks-and-funded-support",
  },
  {
    title: "Advocacy & escalation",
    desc: "Complaints stages, LGSCO, and getting support to participate fairly.",
    href: "/advice/advocacy-social-care-complaints-and-ombudsman",
  },
  {
    title: "Agency churn & continuity",
    desc: "Handovers that actually transfer hoist plans, meds context, and triggers.",
    href: "/advice/continuity-when-agency-or-worker-changes",
  },
  {
    title: "Informal carers",
    desc: "Carer’s assessments, breaks, and trade-offs with benefits like Carer’s Allowance.",
    href: "/advice/informal-carers-assessment-and-support",
  },
] as const;

const SCENARIOS = [
  {
    title: "You’re waiting months for assessment",
    body: "Delays can leave you doing unsafe levels of care. Document risk, ask for interim measures, and use advocacy if you cannot navigate the process alone.",
    href: "/advice/care-act-assessments-and-eligibility",
    cta: "Assessment & delays guide",
  },
  {
    title: "Your PA or agency walked away",
    body: "Sudden gaps need temporary cover and clear escalation to commissioning. A written summary of routines buys time.",
    href: "/advice/continuity-when-agency-or-worker-changes",
    cta: "Continuity guide",
  },
  {
    title: "Hospital wants to discharge before care is ready",
    body: "Unsafe discharge is a known failure mode. Get the gap in writing, involve safeguarding if harm is likely, and copy relevant NHS teams.",
    href: "/advice/when-care-plans-break-down",
    cta: "Care breakdown guide",
  },
  {
    title: "The unpaid carer is burning out",
    body: "Ask for a carer’s assessment, explore respite, and check benefits rules — exhaustion is a safety issue for everyone in the home.",
    href: "/advice/informal-carers-assessment-and-support",
    cta: "Informal carers guide",
  },
] as const;

const PAPERWORK_HABITS = [
  "After every phone call, email a three-line summary: what was agreed, by whom, by when.",
  "Keep one chronology file with dates — councils respond better to timelines than anger alone.",
  "Store care plans, medication charts, and hoist instructions where relief carers can find them.",
  "Photograph unsafe conditions only where lawful and safe — evidence wins disputes.",
];

/** Avoid stale CDN/HTML cache hiding fresh deploys of this hub. */
export const dynamic = "force-dynamic";

/** Distinct tab title — if you still see only “Access Stamp”, you’re not on the latest deployment URL. */
export const metadata: Metadata = {
  title: "Care & Support hub",
  description:
    "Personal budgets, employing PAs, Care Act assessments, respite, advocacy, and escalation when social care fails — UK-focused guides.",
};

export default function CarePage() {
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === "care").sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const featured = FEATURED.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <div className="bg-background" data-access-stamp-care-hub="expanded">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Advice Hub", href: "/advice" },
              { label: "Care & Support" },
            ]}
          />

          <div className="max-w-4xl space-y-4">
            <Badge tone="amber" className="w-fit">
              Care & Support
            </Badge>
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight text-heading sm:text-5xl">
              Care and support that survives councils, agencies, and exhausted families
            </h1>
            <p className="max-w-[82ch] text-base leading-7 text-muted">
              Personal budgets, employing PAs, Care Act assessments, respite, advocacy, and escalation when packages
              fail — practical routes for disabled people and carers navigating stretched systems in England (similar
              frameworks apply elsewhere in the UK with different names).
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
                Start here — pick the pressure point that matches your week, not a perfect legal category.
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
                  <div className="text-sm font-semibold text-heading">Guides people open first</div>
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
                <div className="text-sm font-semibold text-heading">Paperwork habits that actually help</div>
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
                  Talk it through with the AI
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border border-border bg-background-2 p-5 sm:p-6">
            <div className="text-sm font-semibold text-heading">UK hubs for PA recruitment & direct payment tools</div>
            <p className="mt-2 text-sm leading-6 text-text">
              Many people use{" "}
              <a href="https://www.independentlives.org/" className="font-semibold text-blue hover:underline" target="_blank" rel="noreferrer">
                independentlives.org
              </a>{" "}
              (direct payment support and recruitment information) and{" "}
              <a href="https://pa-pages.org/" className="font-semibold text-blue hover:underline" target="_blank" rel="noreferrer">
                pa-pages.org
              </a>{" "}
              (PA matching and employer tools). Access Stamp is not affiliated — we cite them as useful inspiration alongside our own mock templates in the{" "}
              <Link href="/advice/employing-a-personal-assistant-basics" className="font-semibold text-blue hover:underline">
                employing a PA guide
              </Link>
              .
            </p>
          </Card>

          <section className="space-y-4">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading sm:text-3xl">Pick your pathway</h2>
              <p className="mt-1 max-w-[75ch] text-sm text-muted">
                Four common routes through social care — each links to a focused guide you can read in one sitting.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PATHWAYS.map((item) => (
                <AdviceManualCard
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  description={item.desc}
                  categorySlug="care"
                  cta="Open guide"
                />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading sm:text-3xl">More support topics</h2>
              <p className="mt-1 text-sm text-muted">Respite, advocacy, continuity when staff churn, and unpaid carers.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {MORE_TOPICS.map((item) => (
                <AdviceManualCard
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  description={item.desc}
                  categorySlug="care"
                  cta="Read guide"
                />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading sm:text-3xl">Common situations</h2>
              <p className="mt-1 text-sm text-muted">Short routes when you do not have bandwidth for a long read.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {SCENARIOS.map((s) => (
                <AdviceManualCard
                  key={s.title}
                  href={s.href}
                  title={s.title}
                  description={s.body}
                  categorySlug="care"
                  cta={s.cta}
                  variant="explore"
                />
              ))}
            </div>
          </section>

          <Card className="border-blue-pale bg-blue-pale/35 p-6 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-muted">Also useful</div>
                <h3 className="mt-2 font-[var(--font-heading)] text-xl text-heading">Related elsewhere on Access Stamp</h3>
                <p className="mt-2 text-sm text-text">
                  Benefits, home adaptations, and equipment sit in other hubs — they often intersect with care packages.
                </p>
                <ul className="mt-4 grid gap-2 text-sm font-semibold text-blue">
                  <li>
                    <Link href="/advice/carers-allowance" className="hover:underline">
                      Carer’s Allowance: eligibility and trade-offs →
                    </Link>
                  </li>
                  <li>
                    <Link href="/advice/home-equipment-and-adaptations" className="hover:underline">
                      Home equipment and adaptations →
                    </Link>
                  </li>
                  <li>
                    <Link href="/advice/family-support-after-disability" className="hover:underline">
                      Family support when needs change →
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
                <div className="text-sm font-semibold text-heading">If care feels unsafe right now</div>
                <p className="mt-2 text-sm text-muted">
                  Write who is at risk, what care was promised, and what failed. Safeguarding is for harm risk, not
                  inconvenience — use it when the threshold is met.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button href="/advice/when-care-plans-break-down">Escalation guide</Button>
                  <Button href="/advice/emergency" variant="secondary">
                    Emergency & quick help
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">All Care & Support guides</h2>
              <p className="text-sm text-muted">Alphabetical list — every article in this section.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <AdviceArticleCard key={a.slug} article={a} badgeTone="blue" tagLimit={4} showReadCta={false} />
              ))}
            </div>
          </section>

          <Card className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-heading">Still stuck in the maze?</div>
                <p className="mt-1 text-sm text-muted">
                  Describe your council area, what you have been promised, and what fell apart — the assistant can help
                  you phrase complaints and plan next steps.
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
