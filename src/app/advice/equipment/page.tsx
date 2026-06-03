import Link from "next/link";
import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import { AdviceManualCard } from "@/components/advice/advice-manual-card";
import { EquipmentFundingAdvisor } from "@/components/advice/equipment-funding-advisor";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { getAdviceArticles } from "@/lib/content/advice";

const FEATURED = [
  "choosing-a-wheelchair",
  "nhs-wheelchair-services-equipment",
  "home-equipment-and-adaptations",
  "pressure-care-basics",
];

const EQUIPMENT_AREAS = [
  {
    title: "Mobility",
    desc: "Wheelchairs, powered chairs, scooters, cushions, seating, ramps, and safe setup checks.",
    href: "/advice/choosing-a-wheelchair",
  },
  {
    title: "Home",
    desc: "Grab rails, shower chairs, beds, hoists, transfer aids, stairlifts, and Disabled Facilities Grants.",
    href: "/advice/home-equipment-and-adaptations",
  },
  {
    title: "Tech",
    desc: "Smart home tools, phone settings, reminder systems, environmental controls, and low-cost independence aids.",
    href: "/advice/assistive-tech-at-home",
  },
] as const;

const SAFETY_CHECKS = [
  "Does the equipment solve the actual daily barrier, or only look useful in a brochure?",
  "Can the person use it safely on tired or painful days?",
  "Does it fit the home, vehicle, doorway, bathroom, or storage space?",
  "Who maintains it, repairs it, and pays if it breaks?",
];

const QUICK_ACTIONS = [
  {
    label: "Funding and grants",
    href: "/advice/home-equipment-and-adaptations",
  },
  {
    label: "Wheelchair decision guide",
    href: "/advice/choosing-a-wheelchair",
  },
  {
    label: "Pressure care basics",
    href: "/advice/pressure-care-basics",
  },
] as const;

export default async function EquipmentPage() {
  const articles = (await getAdviceArticles()).filter((a) => a.categorySlug === "equipment");
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
              { label: "Equipment" },
            ]}
          />

          <div className="max-w-4xl space-y-4">
            <Badge tone="amber" className="w-fit">
              Equipment
            </Badge>
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight text-heading sm:text-5xl">
              Equipment that actually works in real life
            </h1>
            <p className="max-w-[82ch] text-base leading-7 text-muted">
              Wheelchairs, home adaptations, assistive technology, vehicle adaptations, pressure care, and the
              practical checks that matter before you buy, accept, or request equipment.
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
                  <div className="text-sm font-semibold text-heading">Popular equipment guides</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {featured.map((a) => (
                      <AdviceArticleCard key={a!.slug} article={a!} badgeTone="blue" tagLimit={2} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] border border-border bg-amber-pale p-5">
                <div className="text-sm font-semibold text-heading">Before you say yes to equipment</div>
                <ul className="mt-3 space-y-3 text-sm text-text">
                  {SAFETY_CHECKS.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-card text-xs font-semibold text-amber">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/ai" variant="secondary" className="mt-5 w-full sm:w-auto">
                  Ask before you buy
                </Button>
              </div>
            </div>
          </Card>

          <EquipmentFundingAdvisor />

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Explore equipment areas</h2>
              <p className="text-sm text-muted">Choose the area you want to fix first, then follow practical steps.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {EQUIPMENT_AREAS.map((item) => (
                <AdviceManualCard
                  key={item.title}
                  href={item.href}
                  title={item.title}
                  description={item.desc}
                  categorySlug="equipment"
                  cta="Open guide"
                />
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Equipment guides</h2>
              <p className="text-sm text-muted">
                Practical checks, funding routes, and setup questions for everyday independence.
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
