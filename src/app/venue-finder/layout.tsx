import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venue Finder",
  description: "Search accessible venues across the UK with real measurements, photos, and verified access details.",
};

export default function VenueFinderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
