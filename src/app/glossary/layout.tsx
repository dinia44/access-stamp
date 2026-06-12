import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("glossary");

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
