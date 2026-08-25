import { NextResponse } from "next/server";
import { getHelpCard } from "@/data/helpCards";
import { resolveHelpCardDownloadDocument, helpCardDownloadFilename } from "@/lib/help-cards/download-document";
import { buildHelpCardDownloadPlainText } from "@/lib/help-cards/download-plain-text";

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
        error: "Plain-text download is unavailable because curated Help Card download content has not been approved.",
        reason: resolved.reason,
        issues: resolved.issues,
      },
      { status: 409 },
    );
  }

  const body = buildHelpCardDownloadPlainText(resolved.document);
  const filename = helpCardDownloadFilename(resolved.document.slug, resolved.document.reviewedAt, "txt");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      ETag: `"${resolved.document.slug}-${resolved.document.version}-${resolved.document.reviewedAt}-txt"`,
    },
  });
}
