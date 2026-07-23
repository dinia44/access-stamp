import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { helpCardPacks } from "@/data/helpCardPacks";
import { RenderHelpCard } from "@/components/help-cards/HelpCardComponents";
import { HelpCardPackActionBar } from "@/components/help-cards/help-card-pack-actions";
import { HelpCardAiPanel } from "@/components/help-cards/help-card-ai-panel";
import { HelpCardReviewMetadata } from "@/components/help-cards/help-card-review-metadata";
import { HelpCardPrintFooter } from "@/components/help-cards/help-card-print-footer";
import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import "../help-cards.css";

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return helpCardPacks.map((pack) => ({
    slug: pack.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const pack = helpCardPacks.find((item) => item.slug === slug);

  if (!pack) {
    return {};
  }

  return buildPageMetadata({
    title: pack.title,
    description: pack.description,
    path: `/help-cards/${pack.slug}`,
  });
}

export default async function HelpCardPackPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const pack = helpCardPacks.find((item) => item.slug === slug);

  if (!pack) {
    notFound();
  }

  const relatedPacks = helpCardPacks.filter((item) => item.slug !== pack.slug && item.categoryKey === pack.categoryKey).slice(0, 2);
  const allSources = pack.cards.flatMap((card) => card.sources ?? []);

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
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">{pack.category}</p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
              {pack.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">{pack.description}</p>

            <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">Use this when</p>
              <p className="mt-2 text-base font-medium leading-7 text-[var(--color-ink)]">{pack.useWhen}</p>
            </div>

            <div className="mt-5">
              <HelpCardReviewMetadata pack={pack} />
            </div>

            <div className="mt-6">
              <HelpCardPackActionBar pack={pack} />
            </div>
          </header>

          <section className="mt-12" aria-labelledby="cards-in-pack-heading">
            <h2 id="cards-in-pack-heading" className="text-2xl font-semibold text-[var(--color-ink)]">
              Cards in this pack
            </h2>
            <div className="mt-6 grid gap-6">
              {pack.cards.map((card) => (
                <RenderHelpCard key={card.id} card={card} />
              ))}
            </div>
          </section>

          {allSources.length > 0 ? (
            <section id="official-sources" className="mt-12 max-w-3xl" aria-labelledby="official-sources-heading">
              <h2 id="official-sources-heading" className="text-xl font-semibold text-[var(--color-ink)]">
                Official sources
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5" role="list">
                {allSources.map((source) => (
                  <li key={`${source.label}-${source.href ?? "nolink"}`}>
                    {source.href ? (
                      <a
                        href={source.href}
                        className="text-sm font-semibold text-[var(--color-brand)] underline underline-offset-4"
                      >
                        {source.label}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-[var(--color-ink)]">{source.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-10 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm leading-7 text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-ink)]">Important:</strong> Access Stamp provides practical prompts and
            source-backed summaries. It does not provide medical, legal or financial advice. Always check the official
            source before relying on a card. This pack is not an official document.
            <HelpCardPrintFooter packSlug={pack.slug} />
          </section>

          <div className="mt-10 max-w-3xl">
            <HelpCardAiPanel pack={pack} />
          </div>

          {relatedPacks.length > 0 ? (
            <section className="no-print mt-12" aria-labelledby="related-packs-heading">
              <h2 id="related-packs-heading" className="text-xl font-semibold text-[var(--color-ink)]">
                Related packs
              </h2>
              <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2" role="list">
                {relatedPacks.map((item) => (
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
