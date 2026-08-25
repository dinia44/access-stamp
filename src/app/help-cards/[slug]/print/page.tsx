import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHelpCard, HELP_CARDS } from "@/data/helpCards";
import { HelpCardDownloadDocumentView } from "@/components/help-cards/help-card-download-document";
import { resolveHelpCardDownloadDocument } from "@/lib/help-cards/download-document";
import "../../help-cards.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return HELP_CARDS.filter((card) => card.publicationState === "published").map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getHelpCard(slug);
  const download = resolveHelpCardDownloadDocument(card);
  if (!card || !download.ok) return {};
  return {
    title: `Print ${download.document.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function HelpCardPrintPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getHelpCard(slug);
  const download = resolveHelpCardDownloadDocument(card);

  if (!card || card.publicationState !== "published" || !download.ok) {
    notFound();
  }

  return (
    <div className="help-cards-page help-card-print-page bg-[var(--color-canvas)] px-4 py-8 text-[var(--color-ink)]">
      <HelpCardDownloadDocumentView document={download.document} forPrint={false} />
    </div>
  );
}
