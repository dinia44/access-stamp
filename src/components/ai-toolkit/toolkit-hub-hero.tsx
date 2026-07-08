import { RouteDecoration } from "@/components/home/route-decoration";

function DraftPreviewCard() {
  return (
    <div
      className="mx-auto w-full max-w-sm rounded-[18px] border border-[#EFE5DA] bg-white p-5 shadow-[0_20px_48px_-24px_rgba(122,80,48,0.24)] sm:p-6"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#EF5B25]">Letter draft</p>
          <p className="mt-2 font-[family-name:var(--font-heading)] text-lg font-medium text-[#20242E]">
            Reasonable adjustments request
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#EFF3E7] px-2.5 py-1 text-xs font-semibold text-[#5F7444]">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3.5 8.5 3 3 6-6" />
          </svg>
          Draft created
        </span>
      </div>
      <div className="mt-5 space-y-2.5">
        <div className="h-2.5 w-full rounded-full bg-[#F5EBE3]" />
        <div className="h-2.5 w-[88%] rounded-full bg-[#F5EBE3]" />
        <div className="h-2.5 w-[72%] rounded-full bg-[#F5EBE3]" />
      </div>
      <div className="mt-5 rounded-[14px] border border-[#EFE5DA] bg-[#FDFBF8] p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#76808F]">Suggested opening</p>
        <div className="mt-2 space-y-2">
          <div className="h-2 w-full rounded-full bg-[#EFE5DA]" />
          <div className="h-2 w-[64%] rounded-full bg-[#EFE5DA]" />
        </div>
      </div>
    </div>
  );
}

export function ToolkitHubHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF8] via-[#FBEDE2] to-[#F7E0CE] px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12">
      <RouteDecoration className="right-[-4%] top-10 h-28 w-[min(50vw,400px)] opacity-80" />
      <RouteDecoration className="bottom-16 left-[-6%] h-24 w-[min(42vw,340px)] opacity-60" flip />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div>
          <span className="inline-flex items-center rounded-full border border-[#F6CFB8] bg-[#FDE9DD] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">
            Access Stamp tools
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[36px] font-medium leading-[1.05] tracking-[-0.03em] text-[#20242E] sm:text-[52px]">
            Access Stamp <span className="italic text-[#EF5B25]">tools</span>
          </h1>
          <p className="mt-4 max-w-[58ch] text-base leading-7 text-[#4A5263]">
            Turn your disability problem into a practical action plan, letter, checklist, or support request. Each tool
            starts with a short guided form — not a blank chat box.
          </p>
        </div>

        <div className="hidden md:block">
          <DraftPreviewCard />
        </div>
      </div>
    </section>
  );
}
