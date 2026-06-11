import { SetChatContext } from "@/components/chat/set-context";
import { VenueFinderClient } from "@/components/venue-finder/venue-finder-client";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { parseVenueFinderSearchParams } from "@/lib/venue-finder-params";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VenueFinderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initial = parseVenueFinderSearchParams(params);

  return (
    <>
      <SetChatContext page={{ kind: "venue-finder" }} />
      <VenueFinderClient venues={SAMPLE_VENUES} initial={initial} />
    </>
  );
}
