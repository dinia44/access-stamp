import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("lawsGuidance");

export default function LawsGuidanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
