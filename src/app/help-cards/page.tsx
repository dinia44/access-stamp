import type { Metadata } from "next";
import Link from "next/link";
import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { HelpCardsDiscovery } from "@/components/help-cards/help-cards-discovery";
import { staticPageMetadata } from "@/lib/seo/static-pages";
import "./help-cards.css";

export const metadata: Metadata = staticPageMetadata("helpCards");

export default function HelpCardsPage() {
  return (
    <>
      <SetChatContext page={{ kind: "none" }} />
      <div className="hc-landing help-cards-page min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
        <Container className="help-cards-content py-10 md:py-14">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">Help cards</p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
              Help cards for real access situations
            </h1>
            <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
              A calm card wallet for stressful moments — find the situation, copy useful wording, and check sources
              before you rely on it.
            </p>
          </div>

          <div className="mt-8">
            <HelpCardsDiscovery />
          </div>

          <section className="mt-14 max-w-3xl space-y-3" aria-labelledby="help-cards-trust-heading">
            <h2 id="help-cards-trust-heading" className="text-lg font-semibold text-[var(--color-ink)]">
              How these cards are reviewed
            </h2>
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Access Stamp provides practical prompts and source-backed summaries. It does not provide medical, legal
              or financial advice. High-stakes packs should be checked against the official sources listed on each pack
              page. Cards are not official documents and do not prove entitlement or eligibility.
            </p>
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Prefer longer checklists and templates?{" "}
              <Link href="/advice" className="font-semibold text-[var(--color-brand)] underline-offset-2 hover:underline">
                Browse guides
              </Link>{" "}
              or{" "}
              <Link href="/ai-toolkit" className="font-semibold text-[var(--color-brand)] underline-offset-2 hover:underline">
                use Access Stamp tools
              </Link>
              .
            </p>
          </section>
        </Container>
      </div>
    </>
  );
}
