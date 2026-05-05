import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { Card, Badge, Button } from "@/components/ui";
import { SectionLabel } from "@/components/home/section-label";
import { HeroSearchCard } from "@/components/home/hero-search";
import { RightsTabs } from "@/components/home/rights-tabs";
import { SAMPLE_VENUES } from "@/lib/mock-data";

type Pillar = {
  emoji: string;
  title: string;
  desc: string;
  href: string;
  highlight?: boolean;
};

const PILLARS: Pillar[] = [
  {
    emoji: "🔍",
    title: "Venue Finder",
    desc: "Search by step-free access, turning space, toilet quality, and parking.",
    href: "/venue-finder",
  },
  {
    emoji: "💬",
    title: "AI Assistant",
    desc: "Chat or speak. Venues, rights, equipment, trained on real detail.",
    href: "/ai",
    highlight: true,
  },
  {
    emoji: "🦽",
    title: "Equipment",
    desc: "Wheelchairs, cushions, slide sheets, hoists, ramps.",
    href: "/advice/equipment",
  },
  {
    emoji: "⚖️",
    title: "Your Rights",
    desc: "Benefits, Equality Act, legal protections.",
    href: "/advice/rights",
  },
  {
    emoji: "🤝",
    title: "Care & Support",
    desc: "Personal budgets, hiring PAs, templates.",
    href: "/advice/care",
  },
  {
    emoji: "🎓",
    title: "Education",
    desc: "DSA, EHC plans, university support.",
    href: "/advice/education",
  },
  {
    emoji: "🚂",
    title: "Transport",
    desc: "Trains, buses, flying, taxis, driving.",
    href: "/advice/transport",
  },
  {
    emoji: "💼",
    title: "Workplace",
    desc: "Access to Work, adjustments, discrimination.",
    href: "/advice/workplace",
  },
  {
    emoji: "📰",
    title: "Blog",
    desc: "Firsthand stories, tutorials, honest takes.",
    href: "/blog",
  },
];

export default function HomePage() {
  const featured = [
    "the-botanist-kitchen-manchester",
    "riverside-arts-centre-bristol",
    "greenfield-shopping-village-leeds",
  ].map((slug) => SAMPLE_VENUES.find((v) => v.slug === slug)).filter(Boolean);

  return (
    <div>
      <SetChatContext page={{ kind: "home" }} />

      {/* Section 1: Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(700px 500px at 20% 60%, rgba(122,155,138,0.10), transparent 60%), radial-gradient(700px 500px at 80% 20%, rgba(196,162,101,0.08), transparent 60%)",
          }}
        />

        <Container className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-[700px] text-center">
            <FadeIn>
              <span className="inline-flex items-center rounded-full bg-amber-pale px-4 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--amber-light)]">
                UK accessibility platform
              </span>
            </FadeIn>

            <FadeIn delayMs={120}>
              <h1 className="mt-5 font-[var(--font-heading)] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-[#e8e2d8]">
                Find places that actually work for your access needs
              </h1>
            </FadeIn>

            <FadeIn delayMs={240}>
              <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.7] text-[#a0998f]">
                Search practical access details before you go - including step-free entry, toilets, parking, door
                width, turning space, seating and quiet-space information.
              </p>
            </FadeIn>

            <FadeIn delayMs={300}>
              <p className="mx-auto mt-4 max-w-[700px] text-sm font-medium text-[#c8b38a]">
                Built from lived experience · Practical UK guidance · Real access detail, not vague labels
              </p>
            </FadeIn>
          </div>

          <div className="mx-auto mt-10 max-w-[880px]">
            <FadeIn delayMs={360}>
              <HeroSearchCard />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Section 2: New to Disability */}
      <section className="bg-background py-24">
        <Container>
          <FadeIn>
            <div className="relative">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full"
                aria-hidden
                style={{ background: "var(--amber-pale)", opacity: 0.4 }}
              />
              <Card className="relative border border-amber/25 shadow-[var(--shadow-soft)]">
                <div className="p-10 sm:p-12">
                  <div className="flex flex-col gap-10 md:flex-row md:items-center">
                    <div className="flex-1 space-y-3">
                      <Badge tone="amber">🧭 Starting point</Badge>
                      <h2 className="font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                        New to disability or wheelchair use?
                      </h2>
                      <p className="text-[16px] leading-[1.7] text-text">
                        Whether you’ve just had a diagnosis, a recent injury, or you’re supporting someone, it’s
                        overwhelming. We’ve been there. Start here.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button href="/advice/new-to-disability" variant="secondary">
                          Where to begin
                        </Button>
                        <Button href="/ai" variant="ghost">
                          Ask the AI
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          ["🦽", "Choosing your first wheelchair"],
                          ["💷", "Benefits you can claim"],
                          ["🏠", "Adapting your home"],
                          ["🤝", "Getting care support"],
                          ["🚗", "Driving & Motability"],
                          ["💬", "Talking to others"],
                        ].map(([e, label]) => (
                          <Link
                            key={label}
                            href="/advice/new-to-disability"
                            className="flex items-center gap-2 rounded-[var(--radius-ui)] bg-amber-pale px-4 py-3 text-[13px] font-semibold text-heading hover:bg-[#efe3c7]"
                          >
                            <span className="text-[18px]" aria-hidden>
                              {e}
                            </span>
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Section 3: Platform Pillars — backgrounds inline so production always picks them up (Tailwind v4 + globals ordering) */}
      <section className="relative isolate overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(168deg, #fcf9f4 0%, #eef4ef 38%, #f4ece0 72%, #e9e2d5 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 130% 85% at 12% 18%, rgba(109, 143, 127, 0.16), transparent 52%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 110% 70% at 88% 82%, rgba(184, 146, 79, 0.13), transparent 48%)",
          }}
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-[560px] text-center">
            <FadeIn>
              <SectionLabel>What you’ll find here</SectionLabel>
              <h2 className="mt-3 font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                Everything in one place
              </h2>
              <p className="mt-3 text-[16px] leading-[1.7] text-text">
                From accessible venues to workplace rights, plus an AI assistant that understands access needs.
              </p>
            </FadeIn>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((c, idx) => (
              <FadeIn key={c.href} delayMs={Math.min(idx * 50, 250)}>
                <Link href={c.href} className="group block h-full">
                  <Card
                    className={
                      "h-full p-7 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)] " +
                      (c.highlight ? "border-blue shadow-[0_0_0_1px_rgba(122,155,138,0.4)]" : "")
                    }
                  >
                    <div className="text-[28px]" aria-hidden>
                      {c.emoji}
                    </div>
                    <div className="mt-4 font-[var(--font-heading)] text-[19px] tracking-[-0.025em] text-heading">
                      {c.title}
                    </div>
                    <div className="mt-2 text-[14px] leading-[1.6] text-text">{c.desc}</div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 4: Featured Venues */}
      <section className="bg-background py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <SectionLabel>Venue finder</SectionLabel>
                <h2 className="font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                  Real venues, real detail
                </h2>
                <p className="max-w-[60ch] text-[16px] leading-[1.7] text-text">
                  Listings focus on the things that decide whether a place is actually usable.
                </p>
              </div>
              <Link
                href="/venue-finder"
                className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-blue px-4 py-2 text-sm font-semibold text-white"
              >
                Search all →
              </Link>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((v, idx) => (
              <FadeIn key={v!.slug} delayMs={idx * 80}>
                <Link href={`/venue/${v!.slug}`} className="group block">
                  <Card className="overflow-hidden transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)]">
                    <div
                      className="relative grid h-[190px] place-items-center"
                      style={{
                        background:
                          "linear-gradient(155deg, #f0ece5 0%, #e8f0ec 60%)",
                      }}
                    >
                      <div className="text-[60px]" aria-hidden>
                        {v!.type === "Shopping"
                          ? "🛍️"
                          : v!.type === "Arts & Culture"
                            ? "🎭"
                            : "🍽️"}
                      </div>
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex rounded-full bg-navy px-3 py-1 text-xs font-semibold text-[#e8e2d8]">
                          {v!.type}
                        </span>
                      </div>
                      <div className="absolute right-4 top-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-heading backdrop-blur">
                          <span className="text-amber" aria-hidden>
                            ★
                          </span>
                          {v!.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="p-7">
                      <div className="text-[12px] font-semibold tracking-[0.06em] text-[#9a9590]">
                        📍 {v!.location}
                      </div>
                      <div className="mt-2 font-[var(--font-heading)] text-[19px] leading-[1.3] tracking-[-0.025em] text-heading">
                        {v!.name}
                      </div>
                      <div className="mt-2 text-[14px] leading-[1.65] text-text">{v!.summary}</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {v!.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-2 rounded-full bg-blue-pale px-3 py-1 text-xs font-semibold text-[#4a7060]"
                          >
                            <span aria-hidden>✓</span>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 grid gap-1 border-t border-border pt-3 text-xs text-muted">
                        <div>
                          <span className="font-semibold text-heading">Verification:</span> {v!.verification}
                        </div>
                        <div>
                          <span className="font-semibold text-heading">Last updated:</span> {v!.lastUpdated}
                        </div>
                        <div>
                          <span className="font-semibold text-heading">Confidence:</span> {v!.confidence}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: AI Assistant Showcase */}
      <section className="bg-background py-24">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:items-center">
            <div className="flex-1">
              <FadeIn>
                <SectionLabel>AI-powered help</SectionLabel>
                <h2 className="mt-3 font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                  An assistant that <span className="italic text-blue">understands</span> access
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-text">
                  Ask in your own words. Get practical steps, clear definitions, and guidance that respects your time.
                </p>
              </FadeIn>

              <div className="mt-6 grid gap-3">
                {[
                  ["🤖", "AI Chatbot", "Ask in plain language. Venues, rights, equipment."],
                  ["🎤", "Voice Assistant", "Hands-free search. Helpful if typing is difficult."],
                  ["🧠", "Trained on real detail", "Turning space, toilets, PIP basics, not generic fluff."],
                ].map(([e, t, d], idx) => (
                  <FadeIn key={t} delayMs={idx * 60}>
                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-pale text-xl" aria-hidden>
                          {e}
                        </div>
                        <div>
                          <div className="font-[var(--font-heading)] text-[18px] text-heading">{t}</div>
                          <div className="mt-1 text-[13px] leading-[1.6] text-text">{d}</div>
                        </div>
                      </div>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <FadeIn>
                <Card className="overflow-hidden shadow-[0_32px_72px_-16px_rgba(0,0,0,0.2)]">
                  <div
                    className="flex items-center justify-between gap-3 px-4 py-3 text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #0f1a2b 0%, #1a2740 100%)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10" aria-hidden>
                        💬
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Access Stamp AI</div>
                        <div className="text-xs text-[#a0998f]">Online</div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#a0998f]">Voice enabled</div>
                  </div>

                  <div className="bg-background p-4">
                    <div className="grid gap-2">
                      <div className="max-w-[85%] rounded-[var(--radius-card)] border border-border bg-white px-3 py-2 text-sm text-text">
                        How can I help with your access needs today?
                      </div>
                      <div className="ml-auto max-w-[85%] rounded-[var(--radius-card)] bg-blue px-3 py-2 text-sm font-semibold text-white">
                        Wheelchair-friendly restaurant in Leeds with parking
                      </div>
                      <div className="max-w-[85%] rounded-[var(--radius-card)] border border-border bg-white px-3 py-2 text-sm text-text">
                        Found 3 results. Top match:
                        <div className="mt-2 rounded-[var(--radius-ui)] border border-border bg-background px-3 py-2">
                          <div className="text-sm font-semibold text-heading">Greenfield Shopping Village</div>
                          <div className="mt-1 text-xs text-muted">Step-free · Parking · Power chair OK</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                      <div className="grid h-9 w-9 place-items-center rounded-[var(--radius-ui)] border border-border bg-background" aria-hidden>
                        🎤
                      </div>
                      <div className="flex-1 rounded-[var(--radius-ui)] border border-border bg-background px-3 py-2 text-sm text-muted">
                        Ask me anything…
                      </div>
                      <div className="grid h-9 w-9 place-items-center rounded-[var(--radius-ui)] bg-blue text-white" aria-hidden>
                        ➤
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 6: Education */}
      <section className="bg-background-2 py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <FadeIn>
              <Link href="/advice/education" className="block">
                <Card className="p-7 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[var(--shadow)]">
                  <div className="font-[var(--font-heading)] text-[24px] text-heading">Guides</div>
                  <div className="mt-4 grid gap-2">
                    {[
                      "DSA — Disabled Students’ Allowance",
                      "EHC plans explained",
                      "Your rights in school",
                      "University disability support",
                      "Transport to education",
                    ].map((t) => (
                      <div key={t} className="flex items-center gap-3 rounded-[var(--radius-ui)] bg-background px-4 py-3">
                        <span className="text-blue" aria-hidden>
                          📄
                        </span>
                        <span className="text-sm font-semibold text-heading">{t}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Link>
            </FadeIn>

            <FadeIn delayMs={80}>
              <Link href="/advice/education" className="block">
                <Card className="p-7 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[var(--shadow)]">
                  <div className="grid place-items-center text-3xl" aria-hidden>
                    🎓
                  </div>
                  <div className="mt-3 text-center font-[var(--font-heading)] text-[24px] text-heading">
                    DSA Quick Guide
                  </div>
                  <div className="mt-5 grid gap-2">
                    {[
                      "Who can apply",
                      "Equipment you can get",
                      "Support workers",
                      "How to apply",
                      "After approval",
                      "Common problems",
                    ].map((t, i) => (
                      <div key={t} className="flex items-center gap-3 rounded-[var(--radius-ui)] bg-background px-4 py-3">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-amber text-white text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-heading">{t}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Section 7: Transport */}
      <section className="bg-background py-24">
        <Container>
          <div className="mx-auto max-w-[640px] text-center">
            <FadeIn>
              <SectionLabel>Transport</SectionLabel>
              <h2 className="mt-3 font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                Getting around with confidence
              </h2>
              <p className="mt-3 text-[16px] leading-[1.7] text-text">
                Clear guidance, and what to do when the system lets you down.
              </p>
            </FadeIn>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["🚂", "Trains", "Passenger Assist, step-free stations."],
              ["🚌", "Buses", "Ramps, driver responsibilities, complaints."],
              ["🚗", "Driving", "Blue Badge, Motability, WAVs."],
              ["✈️", "Flying", "Airline policies, airport assistance."],
              ["🚕", "Taxis", "Refusal, legal rights, how to complain."],
              ["🛵", "Scooters", "Rules, insurance, transport restrictions."],
            ].map(([e, t, d], idx) => (
              <FadeIn key={t} delayMs={idx * 60}>
                <Link href="/advice/transport" className="group block">
                  <Card className="h-full p-6 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)]">
                    <div className="text-2xl" aria-hidden>
                      {e}
                    </div>
                    <div className="mt-3 font-[var(--font-heading)] text-[18px] text-heading">{t}</div>
                    <div className="mt-2 text-[13px] leading-[1.6] text-text">{d}</div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 8: Workplace (Dark) */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(700px 500px at 20% 50%, rgba(122,155,138,0.10), transparent 60%)",
          }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-[640px] text-center">
            <FadeIn>
              <div className="flex items-center justify-center gap-3">
                <span className="h-[2px] w-8 bg-amber" aria-hidden />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-amber">
                  Workplace
                </span>
              </div>
              <h2 className="mt-3 font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-[#e8e2d8]">
                Your rights at work
              </h2>
            </FadeIn>
          </div>

          <div className="mx-auto mt-10 grid max-w-[800px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["💷", "Access to Work", "Equipment, support, travel funding."],
              ["⚖️", "Adjustments", "What the law requires from employers."],
              ["🛡️", "Discrimination", "Your legal protections."],
              ["🔄", "Returning to work", "Phased return, role changes."],
              ["🏠", "Working from home", "When it counts as an adjustment."],
              ["🏆", "Disability Confident", "What the scheme really means."],
            ].map(([e, t, d], idx) => (
              <FadeIn key={t} delayMs={idx * 60}>
                <Link href="/advice/workplace" className="group block">
                  <Card className="h-full p-6 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)]">
                    <div className="text-2xl" aria-hidden>
                      {e}
                    </div>
                    <div className="mt-3 font-[var(--font-heading)] text-[18px] text-heading">{t}</div>
                    <div className="mt-2 text-[13px] leading-[1.6] text-text">{d}</div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 9: Equipment */}
      <section className="bg-background-2 py-24">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex-1">
              <FadeIn>
                <SectionLabel>Equipment</SectionLabel>
                <h2 className="mt-3 font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                  Honest, practical <span className="italic text-amber">equipment</span> advice
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-text">
                  What works in real life, plus safety warnings when it matters.
                </p>
              </FadeIn>

              <div className="mt-6 grid gap-2">
                {[
                  ["🦽", "Wheelchairs & Seating"],
                  ["🔄", "Transfers & Handling"],
                  ["🏠", "Home & Daily Living"],
                  ["🚗", "Vehicle & Outdoor"],
                  ["📱", "Tech & Independence"],
                ].map(([e, t], idx) => (
                  <FadeIn key={t} delayMs={idx * 60}>
                    <Link
                      href="/advice/equipment"
                      className="flex items-center gap-3 rounded-[var(--radius-ui)] border border-border bg-white px-4 py-3 text-sm font-semibold text-heading hover:bg-background"
                    >
                      <span className="text-lg" aria-hidden>
                        {e}
                      </span>
                      {t}
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["🦽", "Start here", "Wheelchair basics"],
                  ["🔧", "Practical", "Maintenance"],
                  ["🏠", "Living", "Home adaptations"],
                  ["🚗", "Driving", "Motability"],
                ].map(([e, badge, title], idx) => (
                  <FadeIn key={title} delayMs={idx * 60}>
                    <Link href="/advice/equipment" className="group block">
                      <Card className="p-6 text-center transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)]">
                        <div className="text-3xl" aria-hidden>
                          {e}
                        </div>
                        <div className="mt-3">
                          <span className="inline-flex rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-amber">
                            {badge}
                          </span>
                        </div>
                        <div className="mt-2 text-sm font-semibold text-heading">{title}</div>
                      </Card>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 10: Your Rights (Tabbed) */}
      <section className="bg-background py-24">
        <Container>
          <div className="mx-auto max-w-[680px] text-center">
            <FadeIn>
              <SectionLabel>Your rights</SectionLabel>
              <h2 className="mt-3 font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                Know what you’re entitled to
              </h2>
            </FadeIn>
          </div>

          <div className="mt-8">
            <FadeIn>
              <RightsTabs />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Section 11: Care & Support */}
      <section className="bg-background-2 py-24">
        <Container>
          <div className="mx-auto max-w-[640px] text-center">
            <FadeIn>
              <SectionLabel>Care & support</SectionLabel>
              <h2 className="mt-3 font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                Personal care, demystified
              </h2>
              <p className="mt-3 text-[16px] leading-[1.7] text-text">
                Practical explanations and templates that help you get unstuck.
              </p>
            </FadeIn>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["💷", "Personal budgets", "Direct payments, what you can spend.", "Money"],
              ["📋", "How to apply", "Needs assessments, step by step.", "Process"],
              ["👤", "Hiring PAs", "Finding, interviewing, contracts.", "Employment"],
              ["🤝", "Managing care", "Rotas, backup plans, payroll.", "Practical"],
            ].map(([e, t, d, b], idx) => (
              <FadeIn key={t} delayMs={idx * 60}>
                <Link href="/advice/care" className="group block">
                  <Card className="h-full p-6 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)]">
                    <div className="inline-flex rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-amber">
                      {b}
                    </div>
                    <div className="mt-4 text-2xl" aria-hidden>
                      {e}
                    </div>
                    <div className="mt-3 font-[var(--font-heading)] text-[18px] text-heading">{t}</div>
                    <div className="mt-2 text-[13px] leading-[1.6] text-text">{d}</div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 12: Emergency & Quick Help */}
      <section className="bg-background py-16">
        <Container>
          <FadeIn>
            <Card className="p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>
                      🚨
                    </span>
                    <div className="font-[var(--font-heading)] text-[24px] text-heading">Emergency & quick help</div>
                  </div>
                  <div className="mt-2 text-sm text-muted">
                    Practical contacts for when things go wrong.
                  </div>
                </div>
                <Button href="/advice/emergency">Open</Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["🔧", "Wheelchair breakdown", "Emergency repairs, temporary replacement"],
                  ["📞", "Key helplines", "Rights, benefits, mental health, crisis"],
                  ["🏥", "NHS wheelchair services", "Referrals, what they cover, delays"],
                  ["🛡️", "Quick rights cards", "Transport, workplace, complaints"],
                ].map(([e, t, d]) => (
                  <Link
                    key={t}
                    href="/advice/emergency"
                    className="rounded-[var(--radius-ui)] border border-border bg-background px-4 py-4 hover:bg-background-2"
                  >
                    <div className="text-xl" aria-hidden>
                      {e}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-heading">{t}</div>
                    <div className="mt-1 text-sm text-text">{d}</div>
                  </Link>
                ))}
              </div>
            </Card>
          </FadeIn>
        </Container>
      </section>

      {/* Section 13: Blog Preview */}
      <section className="bg-background-2 py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <SectionLabel>Blog & videos</SectionLabel>
                <h2 className="font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                  Firsthand experience
                </h2>
                <p className="max-w-[60ch] text-[16px] leading-[1.7] text-text">
                  Tutorials, honest takes, and practical walkthroughs.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-blue px-4 py-2 text-sm font-semibold text-white"
              >
                View all →
              </Link>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                kind: "blog",
                title: "What I wish I'd known in my first year as a wheelchair user",
                excerpt:
                  "The things nobody tells you, from choosing the right cushion to dealing with people's reactions.",
                tag: "Personal",
                date: "March 2026",
                slug: "what-i-wish-id-known",
              },
              {
                kind: "video",
                title: "Wheelchair basics: daily transfers",
                excerpt:
                  "A practical walkthrough of transfer techniques, positioning, and building confidence.",
                tag: "Tutorial",
                date: "February 2026",
                slug: "wheelchair-basics-daily-transfers",
              },
              {
                kind: "blog",
                title: "Why 'wheelchair accessible' means almost nothing",
                excerpt:
                  "The gap between what venues claim and what you actually find when you arrive.",
                tag: "Opinion",
                date: "January 2026",
                slug: "why-accessible-means-nothing",
              },
            ].map((p, idx) => (
              <FadeIn key={p.slug} delayMs={idx * 80}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <Card className="overflow-hidden transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)]">
                    <div
                      className="relative grid h-[150px] place-items-center"
                      style={{
                        background:
                          p.kind === "video"
                            ? "linear-gradient(135deg, #0f1a2b 0%, #1a2740 100%)"
                            : "linear-gradient(155deg, #f0ece5 0%, #e8f0ec 60%)",
                      }}
                    >
                      <div className="text-4xl" aria-hidden>
                        {p.kind === "video" ? "▶️" : "📝"}
                      </div>
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-amber">
                          {p.kind === "video" ? "Video" : "Blog"}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="inline-flex rounded-full bg-amber-pale px-3 py-1 text-amber">
                          {p.tag}
                        </span>
                        <span className="text-[#9a9590]">{p.date}</span>
                      </div>
                      <div className="mt-3 font-[var(--font-heading)] text-[16px] leading-[1.3] text-heading">
                        {p.title}
                      </div>
                      <div className="mt-2 text-[14px] leading-[1.6] text-text">{p.excerpt}</div>
                      <div className="mt-4 text-sm font-semibold text-blue">
                        {p.kind === "video" ? "Watch →" : "Read →"}
                      </div>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 14: Directory & Glossary */}
      <section className="bg-background py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <FadeIn>
              <Link href="/directory" className="group block">
                <Card className="h-full p-8 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)]">
                  <div className="text-3xl" aria-hidden>
                    📋
                  </div>
                  <div className="mt-3 font-[var(--font-heading)] text-[24px] text-heading">Directory</div>
                  <div className="mt-2 text-sm text-muted">Who to actually call</div>
                  <p className="mt-3 text-sm leading-[1.7] text-text">
                    Wheelchair services by region, local authorities, PA agencies, equipment suppliers, repair services,
                    and more.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "Wheelchair services",
                      "Local authorities",
                      "PA agencies",
                      "Equipment suppliers",
                      "Support orgs",
                    ].map((t) => (
                      <span key={t} className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </Link>
            </FadeIn>

            <FadeIn delayMs={80}>
              <Link href="/glossary" className="group block">
                <Card className="h-full p-8 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:shadow-[var(--shadow)]">
                  <div className="text-3xl" aria-hidden>
                    📖
                  </div>
                  <div className="mt-3 font-[var(--font-heading)] text-[24px] text-heading">Glossary & Jargon Buster</div>
                  <div className="mt-2 text-sm text-muted">Disability terms explained</div>
                  <p className="mt-3 text-sm leading-[1.7] text-text">
                    Acronyms and jargon, in plain English, with links back to the relevant guides.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "PIP",
                      "CHC",
                      "DSA",
                      "DFG",
                      "EHC",
                      "Blue Badge",
                      "Motability",
                      "WAV",
                      "LCWRA",
                      "Access to Work",
                      "Equality Act",
                    ].map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-amber"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Section 15: Community Coming Soon */}
      <section className="bg-background-2 py-16">
        <Container>
          <FadeIn>
            <Card className="mx-auto max-w-3xl border border-blue-pale p-12 text-center">
              <div className="text-4xl" aria-hidden>
                💬
              </div>
              <div className="mt-4 font-[var(--font-heading)] text-[24px] text-heading">Community coming soon</div>
              <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-[1.7] text-text">
                A space for disabled people, wheelchair users, carers, and families to connect. Real conversations, not
                inspiration posts.
              </p>
              <div className="mt-5">
                <span className="inline-flex rounded-full bg-amber-pale px-4 py-2 text-xs font-semibold text-amber">
                  Coming 2026
                </span>
              </div>
            </Card>
          </FadeIn>
        </Container>
      </section>

      {/* Section 16: Newsletter Signup */}
      <section className="bg-background py-16">
        <Container>
          <FadeIn>
            <Card className="mx-auto max-w-3xl p-12 text-center">
              <div className="text-2xl" aria-hidden>
                📬
              </div>
              <div className="mt-3 font-[var(--font-heading)] text-[24px] text-heading">Join the Access Stamp waitlist</div>
              <p className="mx-auto mt-2 max-w-[520px] text-[15px] leading-[1.7] text-text">
                Get practical accessibility updates, new guides, and early access to venue search features.
              </p>
              <div className="mx-auto mt-5 flex w-full max-w-[400px] gap-2">
                <input
                  className="h-11 flex-1 rounded-[var(--radius-ui)] border border-border bg-background px-3 text-sm text-heading"
                  placeholder="Your email address"
                />
                <button
                  type="button"
                  aria-label="Join waitlist coming soon"
                  className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-amber px-4 py-2 text-sm font-semibold text-navy opacity-80"
                >
                  Join the waitlist (Coming soon)
                </button>
              </div>
            </Card>
          </FadeIn>
        </Container>
      </section>

      {/* Section 17: Mission */}
      <section className="bg-background py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-[640px] text-center">
              <div className="mx-auto mb-6 inline-flex max-w-full justify-center rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-soft)]">
                <SiteLogo className="h-auto max-h-12 w-auto max-w-full object-contain" />
              </div>
              <h2 className="font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                Built from real experience
              </h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-text">
                Access Stamp exists because disabled people deserve better. Every guide, every recommendation comes
                from actually living it.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
                {[
                  ["Practical", "Real detail, not labels"],
                  ["Honest", "From lived experience"],
                  ["Independent", "No sponsorship bias"],
                ].map(([t, d]) => (
                  <div key={t} className="text-center">
                    <div className="text-[18px] font-bold text-blue">{t}</div>
                    <div className="mt-1 text-[13px] text-muted">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Section 18: Final CTA */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(700px 500px at 30% 50%, rgba(122,155,138,0.10), transparent 60%)",
          }}
        />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-[520px] text-center">
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-[#e8e2d8]">
                Your access needs, <span className="italic text-amber">taken seriously</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-[#a0998f]">
                Search venues, ask our AI, explore guides, understand your rights, all in one place.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/venue-finder">Search venues</Button>
                <Link
                  href="/advice"
                  className="inline-flex items-center justify-center rounded-[var(--radius-ui)] border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#e8e2d8]"
                >
                  Explore guides →
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
