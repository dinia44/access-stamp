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
              Know the rules for a real situation
            </h1>
            <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
              Each Help Card explains what the rules say in one situation — what you can do, what conditions apply,
              which region it covers, and the official source behind it.
            </p>
          </div>

          <div className="mt-8">
            <HelpCardsDiscovery />
          </div>

          <section className="mt-14 max-w-3xl space-y-3" aria-labelledby="help-cards-trust-heading">
            <h2 id="help-cards-trust-heading" className="text-lg font-semibold text-[var(--color-ink)]">
              How cards are researched and reviewed
            </h2>
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Every factual rule is linked to a source and labelled with the kind of authority behind it — law,
              government guidance, provider policy or an Access Stamp practical suggestion. Access Stamp does not
              provide medical, legal or financial advice. Cards are not official documents and do not prove
              entitlement or eligibility. Always check the official source before you rely on a card.
            </p>
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Need more detail?{" "}
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
