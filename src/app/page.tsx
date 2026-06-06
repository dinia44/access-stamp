import Link from "next/link";
import { HomeWaitlistForm } from "@/components/home-waitlist-form";
import { SiteLogo } from "@/components/site-logo";
import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { Card, Badge, Button } from "@/components/ui";
import { SectionLabel } from "@/components/home/section-label";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";
import { HomeAccessCategories } from "@/components/home/home-hero-extras";
import { PremiumHomeHero } from "@/components/home/premium-home-hero";
import { VenueFinderPromoVideo } from "@/components/venue-finder-promo-video";
import { ConfidenceBadge, VerificationBadge } from "@/components/verification-badge";
import { RightsTabs } from "@/components/home/rights-tabs";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { FEATURED_HELP_CARD_SLUGS, HELP_CARDS } from "@/lib/help-cards";

type Pillar = {
  icon:
    | "venue"
    | "ai"
    | "equipment"
    | "rights"
    | "care"
    | "education"
    | "transport"
    | "work"
    | "blog";
  title: string;
  desc: string;
  href: string;
  highlight?: boolean;
};

const PILLARS: Pillar[] = [
  {
    icon: "venue",
    title: "Venue Finder",
    desc: "Search by step-free access, turning space, toilet quality, and parking.",
    href: "/venue-finder",
  },
  {
    icon: "ai",
    title: "AI Assistant",
    desc: "Chat or speak — asks the questions generic AI skips, grounded in verified listings and UK routes.",
    href: "/ai",
    highlight: true,
  },
  {
    icon: "equipment",
    title: "Equipment",
    desc: "Wheelchairs, cushions, slide sheets, hoists, ramps.",
    href: "/advice/equipment",
  },
  {
    icon: "rights",
    title: "Your Rights",
    desc: "Benefits, Equality Act, legal protections.",
    href: "/advice/rights",
  },
  {
    icon: "care",
    title: "Care & Support",
    desc: "Personal budgets, hiring PAs, templates.",
    href: "/advice/care",
  },
  {
    icon: "education",
    title: "Education",
    desc: "DSA, EHC plans, university support.",
    href: "/advice/education",
  },
  {
    icon: "transport",
    title: "Transport",
    desc: "Trains, buses, flying, taxis, driving.",
    href: "/advice/transport",
  },
  {
    icon: "work",
    title: "Workplace",
    desc: "Access to Work, adjustments, discrimination.",
    href: "/advice/workplace",
  },
  {
    icon: "blog",
    title: "Blog",
    desc: "Firsthand stories, tutorials, honest takes.",
    href: "/blog",
  },
];

function PillarIcon({ name }: { name: Pillar["icon"] }) {
  const cls = "h-6 w-6 text-blue";
  if (name === "venue") {
    return (
      <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  if (name === "ai") {
    return (
      <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <rect x="4" y="8" width="16" height="11" rx="3" />
        <path d="M12 4v4m-3 5h.01M15 13h.01M8 19v2m8-2v2" />
      </svg>
    );
  }
  if (name === "equipment") {
    return (
      <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <circle cx="7" cy="17" r="3" />
        <path d="M10 17h5l3-7h-6m-4 1 2-3h3" />
      </svg>
    );
  }
  if (name === "rights") {
    return (
      <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <path d="M12 3v18M5 7h14M7 7l-3 5h6l-3-5Zm10 0-3 5h6l-3-5Z" />
      </svg>
    );
  }
  if (name === "care") {
    return (
      <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <path d="M12 21s-7-4.7-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 11c0 5.3-7 10-7 10Z" />
      </svg>
    );
  }
  if (name === "education") {
    return (
      <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M6 11v5c0 1.8 2.7 3 6 3s6-1.2 6-3v-5" />
      </svg>
    );
  }
  if (name === "transport") {
    return (
      <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <rect x="4" y="4" width="16" height="13" rx="2" />
        <path d="M7 17v3m10-3v3M7 9h10M9 13h.01M15 13h.01" />
      </svg>
    );
  }
  if (name === "work") {
    return (
      <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5h6v2m-12 5h18" />
      </svg>
    );
  }
  return (
    <svg data-as-icon="true" viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path d="M5 5h14v14H5z" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

export default function HomePage() {
  const featured = [
    "the-botanist-kitchen-manchester",
    "riverside-arts-centre-bristol",
    "greenfield-shopping-village-leeds",
  ].map((slug) => SAMPLE_VENUES.find((v) => v.slug === slug)).filter(Boolean);
  const featuredCards = FEATURED_HELP_CARD_SLUGS
    .map((slug) => HELP_CARDS.find((card) => card.slug === slug))
    .filter(Boolean);

  return (
    <div>
      <SetChatContext page={{ kind: "home" }} />

      <PremiumHomeHero />
      <HomeAccessCategories />

      {/* Section 2: New to Disability */}
      <section className="section-band-cool py-24">
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
                      <Badge tone="warning">🧭 Starting point</Badge>
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
                        {(
                          [
                            ["🦽", "Choosing your first wheelchair", "/advice/choosing-a-wheelchair"],
                            ["💷", "Benefits you can claim", "/advice/pip-in-plain-english"],
                            ["🏠", "Adapting your home", "/advice/home-equipment-and-adaptations"],
                            ["🤝", "Getting care support", "/advice/care"],
                            ["🚗", "Driving & Motability", "/advice/cars"],
                            ["💬", "Talking to others", "/blog"],
                          ] as const
                        ).map(([e, label, href]) => (
                          <Link
                            key={label}
                            href={href}
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

      <section className="section-band-warm py-20">
        <Container>
          <FadeIn>
            <FeaturedPracticalGuides />
          </FadeIn>
        </Container>
      </section>

      {/* Section 3: Platform Pillars */}
      <section className="section-band-blend relative isolate overflow-hidden py-24">
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
                      (c.highlight ? "ring-1 ring-blue/25" : "")
                    }
                  >
                    <div className={"icon-well h-11 w-11 " + (c.highlight ? "icon-well-blue" : "icon-well-neutral")}>
                      <PillarIcon name={c.icon} />
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
      <section className="section-band-cool py-24">
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

          <FadeIn delayMs={80}>
            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
              <VenueFinderPromoVideo />
              <div className="space-y-4">
                <h3 className="font-[var(--font-heading)] text-[22px] tracking-[-0.02em] text-heading">
                  See how Access Stamp Venue Finder works
                </h3>
                <p className="text-[15px] leading-[1.7] text-text">
                  This short video walks through why generic accessibility labels fail — and how Access Stamp helps you
                  search by the practical features you need before you leave home.
                </p>
                <p className="text-sm text-muted">
                  Filter by step-free entry, accessible toilets, Changing Places, Blue Badge parking, turning space, and
                  more — then open a listing for feature-by-feature detail.
                </p>
                <Link
                  href="/venue-finder"
                  className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-blue px-4 py-2 text-sm font-semibold text-white"
                >
                  Try Venue Finder
                </Link>
              </div>
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
                          <span className="text-warning" aria-hidden>
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
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
                        <VerificationBadge status={v!.verification} />
                        <ConfidenceBadge level={v!.confidence} />
                      </div>
                      <div className="mt-2 text-xs text-muted">Last updated: {v!.lastUpdated}</div>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: Education */}
      <section className="bg-background py-16">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <SectionLabel>Downloadable help cards</SectionLabel>
              <h2 className="font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                Quick support cards for real scenarios
              </h2>
              <p className="max-w-[70ch] text-[15px] leading-[1.7] text-text">
                Carry these in meetings, interviews, airports, school handovers, or when something goes wrong.
              </p>
            </div>
            <Link
              href="/help-cards"
              className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-blue px-4 py-2 text-sm font-semibold text-white"
            >
              View all cards →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredCards.map((card) => (
              <Link key={card!.slug} href={`/help-cards?concern=${encodeURIComponent(card!.tags[0] ?? card!.title)}`}>
                <Card className="h-full p-5 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[var(--shadow)]">
                  <Badge tone="blue">{card!.category}</Badge>
                  <div className="mt-3 text-sm font-semibold text-heading">{card!.title}</div>
                  <p className="mt-2 text-sm text-muted">{card!.summary}</p>
                  <div className="mt-3 text-xs font-semibold text-blue">Open card set</div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: Education */}
      <section className="section-band-warm py-24">
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
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-blue text-white text-xs font-bold">
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
      <section className="section-band-cool py-24">
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
                <span className="h-[2px] w-8 bg-gold" aria-hidden />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gold">
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
      <section className="section-band-warm py-24">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex-1">
              <FadeIn>
                <SectionLabel>Equipment</SectionLabel>
                <h2 className="mt-3 font-[var(--font-heading)] text-[30px] tracking-[-0.025em] text-heading">
                  Honest, practical <span className="italic text-blue">equipment</span> advice
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
                          <span className="inline-flex rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-warning">
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
      <section className="section-band-cool py-24">
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
      <section className="section-band-warm py-24">
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
                    <div className="inline-flex rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-warning">
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
      <section className="section-band-warm py-24">
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
                        <span className="inline-flex rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-warning">
                          {p.kind === "video" ? "Video" : "Blog"}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="inline-flex rounded-full bg-amber-pale px-3 py-1 text-warning">
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
      <section className="section-band-cool py-24">
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
                        className="rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-warning"
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
                <span className="inline-flex rounded-full bg-amber-pale px-4 py-2 text-xs font-semibold text-warning">
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
              <HomeWaitlistForm />
            </Card>
          </FadeIn>
        </Container>
      </section>

      {/* Section 17: Mission */}
      <section className="section-band-cool py-24">
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
                Your access needs, <span className="italic text-gold">taken seriously</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-[#a0998f]">
                Search venues, ask our AI, explore guides, understand your rights, all in one place.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/venue-finder">Search venues</Button>
                <Button href="/advice" variant="premium">
                  Explore guides →
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
