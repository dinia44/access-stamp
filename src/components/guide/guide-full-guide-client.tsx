"use client";

import { GuideReadAloud } from "@/components/guide/guide-read-aloud";

export function GuideFullGuideToolbar() {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#E8C4A8] bg-white px-4 text-sm font-semibold text-heading transition-colors hover:bg-[#FFF3E8] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2 print:hidden"
      >
        Print guide
      </button>
    </div>
  );
}

export function GuideFullGuideReadAloud({ text }: { text: string }) {
  return <GuideReadAloud text={text} />;
}
