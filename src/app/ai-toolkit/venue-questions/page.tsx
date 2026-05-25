import type { Metadata } from "next";
import { VenueQuestionsTool } from "@/components/ai-toolkit/tools/venue-questions-tool";

export const metadata: Metadata = {
  title: "Venue Access Question Generator",
  description: "Practical questions and messages to ask venues before you visit.",
};

export default function Page() {
  return <VenueQuestionsTool />;
}
