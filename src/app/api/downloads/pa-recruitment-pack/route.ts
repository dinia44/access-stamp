import { NextResponse } from "next/server";
import { buildPaRecruitmentPackPlainText } from "@/lib/care-pa-employer-sections";

export async function GET() {
  const body = buildPaRecruitmentPackPlainText();
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="access-stamp-pa-recruitment-pack.txt"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
