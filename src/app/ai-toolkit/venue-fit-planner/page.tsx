import type { Metadata } from "next";
import { VenueFitPlannerTool } from "@/components/ai-toolkit/tools/venue-fit-planner-tool";
import Link from "next/link";
import { isDemoVenue } from "@/lib/venue-card";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Venue Fit Planner",
  description: "Generate a practical fit summary and call script for a specific venue visit.",
  path: "/ai-toolkit/venue-fit-planner",
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const venueSlug = typeof params.venue === "string" ? params.venue : undefined;
  const venue = venueSlug ? SAMPLE_VENUES.find((item) => item.slug === venueSlug) : undefined;

  if (venue && isDemoVenue(venue)) {
    return <div className="mx-auto max-w-3xl space-y-4 px-6 py-12"><h1 className="text-3xl font-semibold">Demonstration venue</h1><p>{venue.name} has no independently verified access evidence. Its example features cannot establish whether it meets your needs.</p><Link href="/ai-toolkit/venue-questions" className="inline-flex min-h-11 items-center text-blue underline">Prepare questions for a real venue</Link><p><Link href="/ai-toolkit/venue-fit-planner" className="inline-flex min-h-11 items-center text-blue underline">Start a plan with information you have confirmed</Link></p></div>;
  }

  const prefill = venue
    ? {
        venueName: venue.name,
        location: venue.location,
        venueSummary: venue.summary,
        confirmedFeatures: Object.entries(venue.features)
          .filter(([, value]) => value === "yes")
          .map(([feature]) => feature),
        unknownFeatureCount: Object.values(venue.features).filter((value) => value === "unknown").length,
      }
    : undefined;

  return <VenueFitPlannerTool prefill={prefill} />;
}
