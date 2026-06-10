import type { Metadata } from "next";
import { VenueFinderHeader } from "@/components/venue-finder/venue-finder-header";
import "./venue-finder.css";

export const metadata: Metadata = {
  title: "Venue Finder",
  description:
    "Find accessible places with confidence. Search practical access information for cafés, restaurants, hotels, toilets, shops and public places across the UK.",
};

export default function VenueFinderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VenueFinderHeader />
      {children}
    </>
  );
}
