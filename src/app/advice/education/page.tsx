import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

const FEATURED = [
  "dsa-disabled-students-allowance",
  "ehc-plan-basics",
  "reasonable-adjustments-at-school",
  "university-support-plan",
];

const PATHWAYS = [
  {
    title: "School and college",
    desc: "EHC plans, SEN support, attendance, transport, reasonable adjustments, and what to ask for in meetings.",
    href: "/advice/ehc-plan-basics",
  },
  {
    title: "University",
    desc: "Disabled Students' Allowance, support plans, accommodation, field trips, and making support workable.",
    href: "/advice/dsa-disabled-students-allowance",
  },
  {
    title: "Exams and assessments",
    desc: "Extra time, rest breaks, scribes, separate rooms, practical exams, and evidence that helps.",
    href: "/advice/exam-access-arrangements",
  },
] as const;

const START_HERE = [
  "Write down what learning, travel, fatigue, pain, communication, or care barriers affect education.",
  "Ask what support is already recorded and who owns the plan.",
  "Get decisions in writing after meetings, even if you send the summary yourself.",
  "Separate urgent access needs from longer-term funding or assessment processes.",
];

export default function EducationPage() {
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === "education");
  const featured = FEATURED.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-8">
          <div className="max-w-4xl space-y-3">
            <Badge tone="amber">Education</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">
              Education support without the jargon
            </h1>
            <p className="max-w-[82ch] text-muted">
              Practical guidance for school, college, and university: EHC plans, Disabled Students&apos; Allowance,
              reasonable adjustments, transport, exams, and how to keep support from becoming another job.
            </p>
          </div>

          <Card className="p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.35fr_.9fr] lg:items-start">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-muted">
                  Search education topics
                  <input
                    className="mt-2 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                    placeholder="Search DSA, EHC plans, school transport, exams..."
                  />
                </label>

                <div>
                  <div className="text-sm font-semibold text-heading">Common starting points</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {featured.map((a) => (
                      <Link
                        key={a!.slug}
                        href={`/advice/${a!.slug}`}
                        className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue"
                      >
                        {a!.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] border border-border bg-background-2 p-4">
                <div className="text-sm font-semibold text-heading">Start here</div>
                <ol className="mt-3 space-y-2 text-sm text-text">
                  {START_HERE.map((item, index) => (
                    <li key={item} className="flex gap-2">
                      <span className="font-semibold text-blue">{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4">
                  <Button href="/ai" variant="secondary">
                    Ask the AI
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <section className="grid gap-3 md:grid-cols-3">
            {PATHWAYS.map((item) => (
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
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Education guides</h2>
              <p className="text-sm text-muted">
                Plain-language routes through the support systems that affect learning.
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
