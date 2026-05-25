import type { Metadata } from "next";
import { LetterBuilderTool } from "@/components/ai-toolkit/tools/letter-builder-tool";

export const metadata: Metadata = {
  title: "Letter Builder",
  description: "Draft letters and emails for PIP, work adjustments, school support, care, and more.",
};

export default function Page() {
  return <LetterBuilderTool />;
}
