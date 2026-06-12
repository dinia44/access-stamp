import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("submitVenue");

export default function SubmitVenueLayout({ children }: { children: React.ReactNode }) {
  return children;
}
