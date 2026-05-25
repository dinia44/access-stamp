import type { Metadata } from "next";
import { AccessNeedsProfilerTool } from "@/components/ai-toolkit/tools/access-needs-profiler-tool";

export const metadata: Metadata = {
  title: "Access Needs Profiler",
  description: "Get a personalised action plan, evidence list, and related Access Stamp guides.",
};

export default function Page() {
  return <AccessNeedsProfilerTool />;
}
