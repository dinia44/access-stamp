import Link from "next/link";
import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import { RightsCommonIssuesGrid } from "@/components/advice/rights-common-issues-grid";
import { RightsEssentials } from "@/components/advice/rights-essentials";
import { RightsGuidesExplorer } from "@/components/advice/rights-guides-explorer";
import { RightsPocketCards } from "@/components/advice/rights-pocket-cards";
import { RightsSituationPaths } from "@/components/advice/rights-situation-paths";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageLayout } from "@/components/page-layout";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { RIGHTS_COMMON_ISSUES } from "@/lib/rights-hub-common-issues";
import { getAdviceArticles } from "@/lib/content/advice";

const FEATURED = [
  "equality-act",
  "reasonable-adjustments",
  "formal-complaints",
  "advocacy",
  "eass",
  "nhs-complaints",
  "gp-access",
  "public-services",
];

const START_HERE = [
  "Name the barrier: what is harder for you than it should be, and where does it happen?",
  "Decide what you need: a change to process, equipment, communication, timing, or access?",
  "Put it in writing: short, dated, and with a clear request and reasonable deadline.",
  "Keep a one-page timeline: who you spoke to, what was promised, and what actually happened.",
  "If you are unsafe or in crisis, use urgent NHS or emergency routes first, then document.",
];

const TRUSTED_LINKS = [
  { label: "Citizens Advice", href: "https://www.citizensadvice.org.uk/" },
  { label: "Acas (workplace)", href: "https://www.acas.org.uk/" },
  { label: "Equality and Human Rights Commission", href: "https://www.equalityhumanrights.com/" },
  { label: "Equality Advisory and Support Service (EASS)", href: "https://www.equalityadvisoryservice.com/" },
  { label: "Legal aid checker", href: "https://www.gov.uk/check-legal-aid" },
] as const;

const URGENT = [
  { label: "Urgent mental health help (NHS)", href: "https://www.nhs.uk/nhs-services/mental-health-services/get-urgent-help-for-mental-health/" },
  { label: "Samaritans", href: "https://www.samaritans.org/how-we-can-help/contact-samaritan/" },
  { label: "Emergency: 999", href: "https://www.gov.uk/contact-police" },
] as const;

export default async function RightsPage() {
  const articles = (await getAdviceArticles()).filter((a) => a.categorySlug === "rights");
  const featured = FEATURED.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);
  const situationCount = RIGHTS_COMMON_ISSUES.length;

  return (
    <PageLayout stack="relaxed">
      <SetChatContext page={{ kind: "advice" }} />
      <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Advice Hub", href: "/advice" }, { label: "Rights" }]}
          />

          <div className="relative overflow-hidden rounded-[var(--radius-ui)] border border-border bg-gradient-to-br from-blue-pale/40 via-background to-amber-pale/30 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue/5 blur-3xl" aria-hidden />
            <div className="relative max-w-4xl space-y-4">
              <Badge tone="blue">Your rights</Badge>
              <h1 className="font-[var(--font-heading)] text-4xl text-heading md:text-[2.75rem] md:leading-tight">
                Your rights: built around what actually goes wrong
              </h1>
              <p className="max-w-[80ch] text-base text-muted md:text-lg">
                Across the UK the same friction points show up in search logs, advice centres, and community groups: reasonable
                adjustments ignored or delayed, inaccessible booking systems, benefit decisions that do not match real life,
                NHS pathways that are hard to navigate, housing and adaptations stuck in process, and complaints that go
                nowhere without a clear paper trail. This hub links practical Access Stamp guides with those scenarios, pocket
                cards you can download, and national services when you need backup.
              </p>
              <p className="max-w-[80ch] text-sm text-muted">
                Access Stamp is practical information, not legal advice. For court claims, complex discrimination cases, or
                urgent safeguarding, use specialist advisers or solicitors. External links open in a new tab.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button href="/help-cards">Help cards (download)</Button>
                <Button href="/ai" variant="secondary">
                  Ask the AI
                </Button>
                <Button href="#rights-essentials" variant="secondary">
                  Plain-English overview
                </Button>
                <Button href="/advice/cars" variant="ghost">
                  Car & parking guides
                </Button>
                <Button href="/advice/equipment" variant="ghost">
                  Equipment & DFG
                </Button>
              </div>
            </div>
          </div>

          <Card className="border-amber/25 bg-amber-pale/40 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-heading">If you need help right now</div>
                <p className="mt-1 text-sm text-muted">
                  Rights processes matter — but safety comes first. Use urgent and emergency routes when someone is at risk.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {URGENT.map((u) => (
                  <a
                    key={u.href}
                    href={u.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-heading underline-offset-2 hover:underline"
                  >
                    {u.label}
                  </a>
                ))}
                <Link
                  href="/advice/mental-health-crisis"
                  className="rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-blue underline-offset-2 hover:underline"
                >
                  Our crisis & rights guide →
                </Link>
              </div>
            </div>
          </Card>

          <section className="space-y-6 scroll-mt-8" id="rights-essentials" aria-labelledby="rights-essentials-heading">
            <h2 id="rights-essentials-heading" className="sr-only">
              How UK disability rights work
            </h2>
            <RightsEssentials />
          </section>

          <section className="space-y-4">
            <div className="max-w-3xl space-y-2">
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Pick a situation (guided tracks)</h2>
              <p className="text-sm text-muted md:text-base">
                Six common “where do I even start?” paths. Each opens a hub or a strong entry guide; you can still search all
                rights articles below.
              </p>
            </div>
            <RightsSituationPaths />
          </section>

          <Card className="overflow-hidden border border-border p-0 sm:p-0">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_.85fr]">
              <div className="space-y-5 p-5 sm:p-6 lg:p-8">
                <div>
                  <h2 className="font-[var(--font-heading)] text-xl font-semibold text-heading">Common sticking points</h2>
                  <p className="mt-1 text-sm text-muted">
                    {situationCount} topics that mirror what people search for and what advice services see under the Equality
                    Act, NHS, housing, benefits, and public services — each links to an on-site guide (or focused hub) plus
                    independent references where helpful.
                  </p>
                </div>
                <RightsCommonIssuesGrid />
              </div>
              <div className="border-t border-border bg-background-2 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
                <div className="text-sm font-semibold text-heading">Start here</div>
                <ol className="mt-3 space-y-2.5 text-sm text-text">
                  {START_HERE.map((item, idx) => (
                    <li key={item} className="flex gap-2">
                      <span className="font-semibold text-blue">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 rounded-[var(--radius-ui)] border border-border bg-card p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">National pointers</div>
                  <ul className="mt-2 space-y-2">
                    {TRUSTED_LINKS.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue underline-offset-2 hover:underline"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <section className="space-y-4">
            <div className="max-w-3xl space-y-2">
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Pocket cards you can carry</h2>
              <p className="text-sm text-muted md:text-base">
                Printable PNG cards — the same generator as our{" "}
                <Link href="/help-cards" className="font-semibold text-blue underline-offset-2 hover:underline">
                  Help Cards
                </Link>{" "}
                library — grouped for rights, work, education, health, housing, benefits, and transport. Save to your phone or
                print at A6.
              </p>
            </div>
            <RightsPocketCards />
          </section>

          <section className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-[var(--font-heading)] text-2xl text-heading">Featured guides</h2>
                <p className="text-sm text-muted">
                  Strong starting points for core protections, NHS access, complaints, advocacy, and services.
                </p>
              </div>
              <Button href="/help-cards?concern=Equality%20Act%20rights" variant="ghost">
                More Equality Act cards →
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((a) => (
                <AdviceArticleCard key={a!.slug} article={a!} badgeTone="blue" />
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">All rights guides (A–Z search)</h2>
              <p className="text-sm text-muted">
                Reference library: every article in the Rights category. For context first, read the{" "}
                <Link href="#rights-essentials" className="font-semibold text-blue underline-offset-2 hover:underline">
                  plain-English overview
                </Link>{" "}
                above. Car, parking, and major vehicle topics live under{" "}
                <Link href="/advice/cars" className="font-semibold text-blue underline-offset-2 hover:underline">
                  Cars
                </Link>
                ; equipment grants under{" "}
                <Link href="/advice/equipment" className="font-semibold text-blue underline-offset-2 hover:underline">
                  Equipment
                </Link>
                ; PIP primer under{" "}
                <Link href="/advice/new-to-disability" className="font-semibold text-blue underline-offset-2 hover:underline">
                  New to disability
                </Link>
                .
              </p>
            </div>
            <RightsGuidesExplorer articles={articles} />
          </section>
    </PageLayout>
  );
}
