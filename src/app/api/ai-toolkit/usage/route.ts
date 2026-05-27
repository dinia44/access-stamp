import { NextResponse } from "next/server";
import type { ToolkitResultSource, ToolkitToolId } from "@/lib/ai-toolkit/types";

type UsageBody = {
  tool: ToolkitToolId;
  source: ToolkitResultSource;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as UsageBody;
    if (!body?.tool || !body?.source) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Privacy-safe analytics: no personal form content is captured.
    console.info(
      "[ai-toolkit-usage]",
      JSON.stringify({
        tool: body.tool,
        source: body.source,
        ts: new Date().toISOString(),
      }),
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Usage logging failed" }, { status: 500 });
  }
}
