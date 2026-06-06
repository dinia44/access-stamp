import { Suspense } from "react";
import { VenueFinderClient } from "@/components/venue-finder/venue-finder-client";
import { VenueFinderStaticPage } from "@/components/venue-finder/venue-finder-shell";
import { SAMPLE_VENUES } from "@/lib/mock-data";

export default function VenueFinderPage() {
  return (
    <Suspense fallback={<VenueFinderStaticPage />}>
      <VenueFinderClient venues={SAMPLE_VENUES} />
    </Suspense>
  );
}
