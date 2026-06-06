import type { Venue } from "@/lib/mock-data";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { VenueGridCard } from "./venue-grid-card";

type Props = {
  venue: Venue;
  index?: number;
  userCenter?: VenueCoordinates | null;
  selected?: boolean;
  onSelect?: () => void;
};

export function VenueResultCard({ venue, index = 0, userCenter, selected, onSelect }: Props) {
  return (
    <li className="h-full">
      <VenueGridCard
        venue={venue}
        index={index}
        userCenter={userCenter}
        selected={selected}
        onSelect={onSelect}
      />
    </li>
  );
}
