import type { Metadata } from "next";
import { EvidenceChecklistTool } from "@/components/ai-toolkit/tools/evidence-checklist-tool";

export const metadata: Metadata = {
  title: "Evidence Checklist Generator",
  description: "Tailored evidence checklist before a request or challenge.",
};

export default function Page() {
  return <EvidenceChecklistTool />;
}
