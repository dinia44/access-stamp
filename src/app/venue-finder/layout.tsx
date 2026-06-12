import type { Metadata } from "next";
import "./venue-finder.css";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("venueFinder");

export default function VenueFinderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
