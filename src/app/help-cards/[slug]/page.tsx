import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getHelpCard, getPublishedHelpCards, HELP_CARDS } from "@/data/helpCards";
import { HelpCardDetailBody } from "@/components/help-cards/help-card-detail-body";
import { HelpCardAiPanel } from "@/components/help-cards/help-card-ai-panel";
import { OfficialSourceList } from "@/components/help-cards/official-source-list";
import { HelpCardPrintFooter } from "@/components/help-cards/help-card-print-footer";
import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import "../help-cards.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return HELP_CARDS.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getHelpCard(slug);
  if (!card) return {};
  return buildPageMetadata({
    title: card.title,
    description: card.summary,
    path: `/help-cards/${card.slug}`,
  });
}

export default async function HelpCardDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getHelpCard(slug);

  if (!card || card.publicationState !== "published") {
    notFound();
  }

  const related = getPublishedHelpCards()
    .filter((item) => item.slug !== card.slug && item.categoryKey === card.categoryKey)
    .slice(0, 2);

  return (
    <>
      <SetChatContext page={{ kind: "none" }} />
      <div className="hc-landing help-cards-page min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
        <Container className="help-cards-content py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="no-print">
            <Link
              href="/help-cards"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              ← Back to Help Cards
            </Link>
          </nav>

          <header className="mt-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">{card.category}</p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
              {card.title}
            </h1>
            <p className="mt-4 max-w-[68ch] text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
              {card.summary}
            </p>
          </header>

          <div className="mt-8 max-w-3xl">
            <HelpCardDetailBody card={card} />
          </div>

          <section id="official-sources" className="mt-12 max-w-3xl" aria-labelledby="official-sources-heading">
            <h2 id="official-sources-heading" className="text-2xl font-semibold text-[var(--color-ink)]">
              Official rules and sources
            </h2>
            <div className="mt-4">
              <OfficialSourceList sources={card.sources} headingId="official-sources-heading" />
            </div>
          </section>

          <section className="mt-10 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm leading-7 text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-ink)]">Important:</strong>{" "}
            {card.disclaimer ||
              "Access Stamp provides practical prompts and source-backed summaries. It does not provide medical, legal or financial advice. Always check the official source before relying on a card."}
            <HelpCardPrintFooter packSlug={card.slug} />
          </section>

          <div className="mt-10 max-w-3xl">
            <HelpCardAiPanel card={card} />
          </div>

          {related.length > 0 ? (
            <section className="no-print mt-12" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-xl font-semibold text-[var(--color-ink)]">
                Related help cards
              </h2>
              <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2" role="list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/help-cards/${item.slug}`}
                      className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] underline-offset-4 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </Container>
      </div>
    </>
  );
}
