import { NextResponse } from "next/server";
import { getHelpCard } from "@/data/helpCards";
import { resolveHelpCardDownloadDocument, helpCardDownloadFilename } from "@/lib/help-cards/download-document";
import { buildHelpCardDownloadPdf } from "@/lib/help-cards/download-pdf";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const card = getHelpCard(slug);
  const resolved = resolveHelpCardDownloadDocument(card);

  if (!card || card.publicationState !== "published") {
    return NextResponse.json({ error: "Help Card not found." }, { status: 404 });
  }

  if (!resolved.ok) {
    return NextResponse.json(
      {
        error: "Designed PDF is unavailable because curated Help Card download content has not been approved.",
        reason: resolved.reason,
        issues: resolved.issues,
      },
      { status: 409 },
    );
  }

  const pdf = buildHelpCardDownloadPdf(resolved.document);
  const filename = helpCardDownloadFilename(resolved.document.slug, resolved.document.reviewedAt, "pdf");

  return new NextResponse(Buffer.from(pdf.arrayBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      ETag: `"${resolved.document.slug}-${resolved.document.version}-${resolved.document.reviewedAt}"`,
      "X-Help-Card-Pages": String(pdf.pageCount),
    },
  });
}
