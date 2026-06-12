import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("scan");

export default function ScanPlaceholderPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-[#20242E]">Quick Scan</h1>
      <p className="mt-3 text-[#4A5263]">This internal tool is not indexed by search engines.</p>
    </div>
  );
}
