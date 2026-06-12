import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { PageHero, PageLayout, PageSectionTitle } from "@/components/page-layout";
import { SiteLogo } from "@/components/site-logo";
import { Badge, Button, Card } from "@/components/ui";
import { VerificationBadge } from "@/components/verification-badge";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("about");

const VALUES = [
  {
    title: "Treat people as capable adults",
    detail: "No pity framing. No inspiration stories. Just information you can act on.",
  },
  {
    title: "Be specific and useful",
    detail: "Measurements, photos, and plain-language checks — not vague accessibility claims.",
  },
  {
    title: "Be honest about system failures",
    detail: "When processes are broken, we say so — and show you practical workarounds.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageLayout stack="relaxed" hero>
      <PageHero
        badge={<Badge tone="blue">About</Badge>}
        title="Built for people who need access information that actually works"
        subtitle="A practical platform for disabled people, wheelchair users, carers, older people, and families across the UK — from lived experience, not corporate compliance."
      />

      <FadeIn delayMs={100}>
        <Card className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="premium-section-panel p-8 lg:p-10">
              <SiteLogo className="h-auto w-full max-w-[200px] object-contain" />
              <p className="mt-6 text-lg font-semibold leading-snug text-heading">
                Not a charity. Not a compliance tool. A serious product for real decisions.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                Access Stamp exists because finding out whether a place is actually accessible still takes too much
                guesswork — and official guidance rarely matches what you need on the ground.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/venue-finder">Explore venues</Button>
                <Button href="/advice" variant="secondary">
                  Read guides
                </Button>
              </div>
            </div>
            <div className="space-y-4 p-8 lg:p-10">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-background-2 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="text-sm font-semibold text-heading">{value.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted">{value.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </FadeIn>

      <div id="listings" className="scroll-mt-28 space-y-6">
        <PageSectionTitle
          title="Listings & verification"
          description="Every venue label describes how strong the evidence is — not whether a place is good or bad."
        />
        <FadeIn delayMs={120}>
          <Card className="p-6 sm:p-8">
            <ul className="grid gap-4 md:grid-cols-3">
              <li className="rounded-2xl border border-border bg-verified-pale p-5">
                <VerificationBadge status="Access Stamp checked" />
                <p className="mt-3 text-sm leading-6 text-muted">
                  Reviewed against our field-style checklist; priority for filters like verified venues only.
                </p>
              </li>
              <li className="rounded-2xl border border-border bg-blue-pale p-5">
                <VerificationBadge status="Community reported" />
                <p className="mt-3 text-sm leading-6 text-muted">
                  Submitted or corroborated detail from disabled people and allies — worth confirming hours and layout.
                </p>
              </li>
              <li className="rounded-2xl border border-border bg-amber-pale p-5">
                <VerificationBadge status="Not yet verified" />
                <p className="mt-3 text-sm leading-6 text-muted">
                  Early or partial information — still useful, especially if you phone ahead or visit off-peak.
                </p>
              </li>
            </ul>
            <p className="mt-6 text-sm leading-7 text-muted">
              Open listings include <strong className="font-semibold text-heading">Will it fit?</strong> where
              measurements exist. The AI uses the same listing context when you chat from that page.{" "}
              <Link href="/about#listings" className="font-semibold text-blue hover:underline">
                Learn more in our verification guide →
              </Link>
            </p>
          </Card>
        </FadeIn>
      </div>
    </PageLayout>
  );
}
