import type { Metadata } from "next";
import { VenueFitPlannerTool } from "@/components/ai-toolkit/tools/venue-fit-planner-tool";
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
