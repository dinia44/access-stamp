import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import { AdviceManualCard } from "@/components/advice/advice-manual-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { getAdviceArticles } from "@/lib/content/advice";

const FEATURED = [
  "dsa-disabled-students-allowance",
  "ehc-plan-basics",
  "reasonable-adjustments-at-school",
  "exam-access-arrangements",
];

const EDUCATION_AREAS = [
  {
    title: "Funding & assessment",
    desc: "DSA needs assessments, evidence for funding, equipment and non-medical helper recommendations.",
    href: "/advice/dsa-disabled-students-allowance",
  },
  {
    title: "School & college",
    desc: "EHC plans, reasonable adjustments, transport to education, and getting support written clearly enough to rely on.",
    href: "/advice/ehc-plan-basics",
  },
  {
    title: "Higher education",
    desc: "University support plans, deadlines, sharing adjustments with departments, and exams access arrangements.",
    href: "/advice/university-support-plan",
  },
] as const;

const PLANNING_CHECKS = [
  "Is the barrier named clearly enough that someone else could recognise it on a bad day?",
  "Who owns the next action—the school, college, university disability team, local authority, or NHS?",
  "Are deadlines for exams, appeals, or funding applications on your calendar with reminders?",
  "Do you have dated notes from meetings, emails that confirm agreements, and copies of forms submitted?",
];

const QUICK_ACTIONS = [
  {
    label: "DSA funding guide",
    href: "/advice/dsa-disabled-students-allowance",
  },
  {
    label: "EHC plan basics",
    href: "/advice/ehc-plan-basics",
  },
  {
    label: "Exam arrangements",
    href: "/advice/exam-access-arrangements",
  },
] as const;

export default async function EducationPage() {
  const articles = (await getAdviceArticles()).filter((a) => a.categorySlug === "education");
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
              { label: "Education" },
            ]}
          />

          <div className="max-w-4xl space-y-4">
            <Badge tone="amber" className="w-fit">
              Education
            </Badge>
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight text-heading sm:text-5xl">
              Education support that holds up in real life
            </h1>
            <p className="max-w-[82ch] text-base leading-7 text-muted">
              Disabled Students’ Allowance, EHC plans, reasonable adjustments, university support plans, exam access
              arrangements, and transport—practical steps and the paperwork habits that make support enforceable.
            </p>
          </div>

          <Card className="p-6 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_.9fr]">
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-wide text-muted">Quick actions</div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((item) => (
                      <Button key={item.href} href={item.href} variant="ghost" className="border border-border">
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[var(--radius-card)] border border-border bg-background-2 p-4">
                  <div className="text-sm font-semibold text-heading">Popular education guides</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {featured.map((a) => (
                      <AdviceArticleCard key={a!.slug} article={a!} badgeTone="blue" tagLimit={2} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] border border-border bg-amber-pale p-5">
                <div className="text-sm font-semibold text-heading">Before meetings and deadlines</div>
                <ul className="mt-3 space-y-3 text-sm text-text">
                  {PLANNING_CHECKS.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-card text-xs font-semibold text-amber">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/ai" variant="secondary" className="mt-5 w-full sm:w-auto">
                  Ask about education support
                </Button>
              </div>
            </div>
          </Card>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Explore education areas</h2>
              <p className="text-sm text-muted">
                Pick the stage you are in—then follow steps you can share with school, college, or university.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {EDUCATION_AREAS.map((item) => (
                <AdviceManualCard
                  key={item.title}
                  href={item.href}
                  title={item.title}
                  description={item.desc}
                  categorySlug="education"
                  cta="Open guide"
                />
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Education guides</h2>
              <p className="text-sm text-muted">
                Funding routes, planning language, and adjustments—from early years through university.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <AdviceArticleCard key={a.slug} article={a} badgeTone="blue" />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
