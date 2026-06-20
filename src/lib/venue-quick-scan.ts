/** Structured output from the venue Quick Feature Scan (photo / AI). */

export type QuickScanMeasurement = {
  label: string;
  value: string;
  confidence: "estimate" | "unclear";
};

export type QuickScanResult = {
  /** Plain-text summary for the listing form. */
  features: string;
  alreadyAccessible: string[];
  needsImprovement: string[];
  smallSteps: string[];
  measurements?: QuickScanMeasurement[];
  notes?: string;
};

export const QUICK_SCAN_BETA_LABEL = "Beta";

export const QUICK_SCAN_BETA_NOTE =
  "Free during beta while we refine the scanner and listing flow. Paid verified reviews and listing options will come later.";

export const QUICK_SCAN_STEPS = [
  {
    step: "1",
    title: "Scan your venue",
    body: "Take or upload photos of entrances, routes, toilets, parking, and signage.",
  },
  {
    step: "2",
    title: "See what we find",
    body: "Quick Scan highlights what already looks accessible and what may need work — with small, practical next steps.",
  },
  {
    step: "3",
    title: "Submit your listing",
    body: "Send your venue details for review. We check submissions before anything goes live on Access Stamp.",
  },
] as const;

export function formatQuickScanForSubmission(result: QuickScanResult): string {
  const sections: string[] = ["--- Quick Feature Scan (beta) ---"];

  if (result.alreadyAccessible.length) {
    sections.push("Already looks accessible:", ...result.alreadyAccessible.map((item) => `• ${item}`));
  }
  if (result.needsImprovement.length) {
    sections.push("May need improvement:", ...result.needsImprovement.map((item) => `• ${item}`));
  }
  if (result.smallSteps.length) {
    sections.push("Suggested small steps:", ...result.smallSteps.map((item) => `• ${item}`));
  }
  if (result.measurements?.length) {
    sections.push(
      "Visible measurements (estimates only):",
      ...result.measurements.map((m) => `• ${m.label}: ${m.value} (${m.confidence})`),
    );
  }
  if (result.notes) sections.push(`Scan note: ${result.notes}`);

  return sections.join("\n");
}
