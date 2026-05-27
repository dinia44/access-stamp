import type { Metadata } from "next";
import { VenueFitPlannerTool } from "@/components/ai-toolkit/tools/venue-fit-planner-tool";

export const metadata: Metadata = {
  title: "Venue Fit Planner",
  description: "Generate a practical fit summary and call script for a specific venue visit.",
};

export default function Page() {
  return <VenueFitPlannerTool />;
}
