import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

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

export default function EquipmentPage() {
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === "equipment");
  const featured = FEATURED.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-8">
          <div className="max-w-4xl space-y-3">
            <Badge tone="amber">Equipment</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">
              Equipment that actually works in real life
            </h1>
            <p className="max-w-[82ch] text-muted">
              Wheelchairs, home adaptations, assistive technology, vehicle adaptations, pressure care, and the
              practical checks that matter before you buy, accept, or request equipment.
            </p>
          </div>

          <Card className="p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.35fr_.9fr] lg:items-start">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-muted">
                  Search equipment topics
                  <input
                    className="mt-2 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                    placeholder="Search wheelchairs, ramps, hoists, cushions, smart home..."
                  />
                </label>

                <div>
                  <div className="text-sm font-semibold text-heading">Popular equipment guides</div>
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

              <div className="rounded-[var(--radius-card)] border border-border bg-amber-pale p-4">
                <div className="text-sm font-semibold text-heading">Before you say yes to equipment</div>
                <ul className="mt-3 space-y-2 text-sm text-text">
                  {SAFETY_CHECKS.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="font-semibold text-amber">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button href="/ai" variant="secondary">
                    Ask before you buy
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <section className="grid gap-3 md:grid-cols-3">
            {EQUIPMENT_AREAS.map((item) => (
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
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Equipment guides</h2>
              <p className="text-sm text-muted">
                Practical checks, funding routes, and setup questions for everyday independence.
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
