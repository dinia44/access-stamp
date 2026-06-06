import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "About Access Stamp",
  description: "Who we are, how we verify venue listings, and why Access Stamp exists \u2014 built from lived experience.",
};
import { SiteLogo } from "@/components/site-logo";
import { Badge, Card } from "@/components/ui";
import { VerificationBadge } from "@/components/verification-badge";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">About</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">About Access Stamp</h1>
            <p className="max-w-[85ch] text-muted">
              Access Stamp is a practical resource platform for disabled people, wheelchair users, carers, older people,
              and families in the UK. Built from lived experience.
            </p>
          </div>

          <Card className="p-6">
            <div className="grid gap-6 md:grid-cols-[200px_1fr] md:items-start">
              <SiteLogo className="h-auto w-full max-w-[190px] object-contain" />
              <div className="space-y-3">
                <div className="text-sm font-semibold text-heading">What we are</div>
                <p className="text-sm leading-7 text-text">
                  Not a charity. Not a corporate compliance tool. A serious platform for people who need accurate,
                  practical information.
                </p>
                <div className="grid gap-3 md:grid-cols-3">
                  {["Treat people as capable adults", "Be specific and useful", "Be honest about system failures"].map(
                    (v) => (
                      <div key={v} className="rounded-[var(--radius-card)] border border-border bg-background p-4">
                        <div className="text-sm font-semibold text-heading">{v}</div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div id="listings" className="scroll-mt-24">
            <Card className="p-6">
              <div className="text-sm font-semibold text-heading">Listings &amp; verification</div>
              <p className="mt-2 max-w-[85ch] text-sm leading-7 text-muted">
                Venue pages combine structured feature checks with photos and measurements where we have them. Labels describe how
                strong the evidence is—not whether a place is &quot;good&quot; or &quot;bad.&quot;
              </p>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-text md:grid-cols-3">
                <li className="rounded-[var(--radius-ui)] border border-border bg-verified-pale p-4">
                  <VerificationBadge status="Access Stamp checked" />
                  <span className="mt-2 block text-sm text-muted">
                    Reviewed against our field-style checklist; priority for filters like &quot;verified venues only.&quot;
                  </span>
                </li>
                <li className="rounded-[var(--radius-ui)] border border-border bg-blue-pale p-4">
                  <VerificationBadge status="Community reported" />
                  <span className="mt-2 block text-sm text-muted">
                    Submitted or corroborated detail from disabled people and allies—useful, but treat opening hours and layout as
                    worth confirming.
                  </span>
                </li>
                <li className="rounded-[var(--radius-ui)] border border-border bg-amber-pale p-4">
                  <VerificationBadge status="Not yet verified" />
                  <span className="mt-2 block text-sm text-muted">
                    Early or partial information—still worth a look, especially if you phone ahead or visit off-peak.
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted">
                Open listings include <strong className="font-semibold text-heading">Will it fit?</strong> where measurements exist,
                and the AI uses the same listing context when you chat from that page.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

