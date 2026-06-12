import type { Metadata } from "next";
import { adviceCategoryMetadata } from "@/lib/seo/advice-categories";

import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import { AdviceManualCard } from "@/components/advice/advice-manual-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero, PageLayout, PageSectionTitle } from "@/components/page-layout";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { getAdviceArticles } from "@/lib/content/advice";

export const metadata: Metadata = adviceCategoryMetadata("workplace");

const QUICK_ACTIONS = [
  { label: "Access to Work: what can it pay for?", href: "/advice/access-to-work-what-employer-pays-vs-grant" },
  { label: "Access to Work: how to apply", href: "/advice/access-to-work-application-walkthrough" },
  { label: "Access to Work basics", href: "/advice/access-to-work-basics" },
  { label: "Reasonable adjustments", href: "/advice/reasonable-adjustments-you-can-ask-for" },
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

export default async function WorkplacePage() {
  const articles = (await getAdviceArticles()).filter((a) => a.categorySlug === "workplace").sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  function readMinutes(title: string) {
    return Math.max(2, Math.round(title.split(/\s+/).length / 2));
  }

  return (
    <PageLayout>
      <SetChatContext page={{ kind: "advice" }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Advice Hub", href: "/advice" }, { label: "Workplace" }]} />
      <PageHero badge={<Badge tone="blue">Workplace</Badge>} title="Workplace support you can actually use" />

      <Card className="border-border p-6 shadow-[var(--shadow-soft)] sm:p-7">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-wide text-muted">Quick actions</div>
          <div className="flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((item) => (
              <Button key={item.href} href={item.href} variant="ghost" className="border border-border bg-white hover:bg-blue-pale">
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <PageSectionTitle
          title="More workplace topics"
          description="Useful when support stalls, reports are vague, or role expectations shift."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {MORE_TOPICS.map((item) => (
            <AdviceManualCard
              key={item.href}
              href={item.href}
              title={item.title}
              description={item.desc}
              categorySlug="workplace"
              badge="Guide"
              variant="explore"
              cta="Open guide"
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <PageSectionTitle title="All Workplace guides" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <AdviceArticleCard
              key={a.slug}
              article={a}
              badgeTone="blue"
              showReadCta={false}
              tagLimit={0}
              meta={
                <div className="mt-2 text-xs font-semibold text-muted">
                  Updated: {a.updated} · {readMinutes(a.title)} min read
                </div>
              }
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
