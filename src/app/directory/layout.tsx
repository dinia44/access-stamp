import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("directory");

export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
