import { NextResponse } from "next/server";
import { runToolkitTool } from "@/lib/ai-toolkit/run";
import type { ToolkitInputMap, ToolkitToolId } from "@/lib/ai-toolkit/types";

const TOOL_IDS: ToolkitToolId[] = [
  "access-needs-profiler",
  "letter-builder",
  "evidence-checklist",
  "article-companion",
  "venue-questions",
  "tribunal-bundle-helper",
  "venue-fit-planner",
];

type Body = {
  tool: ToolkitToolId;
  input: ToolkitInputMap[ToolkitToolId];
};

function isToolId(v: unknown): v is ToolkitToolId {
  return typeof v === "string" && TOOL_IDS.includes(v as ToolkitToolId);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    if (!isToolId(body.tool) || !body.input || typeof body.input !== "object") {
      return NextResponse.json({ error: "Invalid tool or input" }, { status: 400 });
    }

    const result = await runToolkitTool(body.tool, body.input as ToolkitInputMap[typeof body.tool]);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Toolkit run failed" }, { status: 500 });
  }
}
