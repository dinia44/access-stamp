import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("ai");

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
