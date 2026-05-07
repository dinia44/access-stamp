import { NextResponse } from "next/server";
import { buildPaRecruitmentPackPdf } from "@/lib/build-pa-recruitment-pack-pdf";

export const runtime = "nodejs";

export async function GET() {
  const body = buildPaRecruitmentPackPdf();
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="access-stamp-pa-recruitment-pack.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
