import type { Metadata } from "next";
import { TribunalBundleHelperTool } from "@/components/ai-toolkit/tools/tribunal-bundle-helper-tool";

export const metadata: Metadata = {
  title: "Tribunal Bundle Helper",
  description: "Build a chronology, evidence bundle checklist, and hearing-day plan for appeals.",
};

export default function Page() {
  return <TribunalBundleHelperTool />;
}
