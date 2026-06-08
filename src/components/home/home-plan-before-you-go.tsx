import Link from "next/link";
import { HOME_BTN_SECONDARY, HOME_FOCUS, HOME_PANEL, HOME_SECTION } from "@/components/home/home-theme";

const PLAN_TOOLS = [
  {
    title: "Venue fit planner",
    summary: "Match your access needs to what a venue can realistically offer before you book or travel.",
    highlights: ["Step-free & toilet needs", "Distance and fatigue", "Shareable summary"],
    href: "/ai-toolkit/venue-fit-planner",
    cta: "Plan a visit",
  },
  {
    title: "Venue questions",
    summary: "Generate the right questions to ask staff about access, seating, toilets, and support.",
    highlights: ["Phone or email wording", "Covers common gaps", "Print-friendly list"],
    href: "/ai-toolkit/venue-questions",
    cta: "Get question list",
  },
  {
    title: "Access needs profiler",
    summary: "Build a clear profile of your practical requirements for carers, employers, or services.",
    highlights: ["Mobility & sensory needs", "Energy and pacing", "Export-friendly notes"],
    href: "/ai-toolkit/access-needs-profiler",
    cta: "Build your profile",
  },
] as const;

export function HomePlanBeforeYouGo() {
  return (
    <section className={`${HOME_SECTION} bg-[#FFF8F1] py-16 sm:py-20`} aria-labelledby="plan-before-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#F04A16]">Plan before you go</p>
            <h2 id="plan-before-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#13201F] sm:text-4xl">
              Tools to reduce surprises on the day
            </h2>
            <p className="mt-3 text-base leading-7 text-[#5E6A66]">
              Use these before visiting somewhere new — each tool shows what it covers without opening a hidden menu.
            </p>
          </div>
          <Link href="/ai-toolkit" className={`${HOME_BTN_SECONDARY} shrink-0 ${HOME_FOCUS}`}>
            View all AI tools
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {PLAN_TOOLS.map((tool) => (
            <li key={tool.title} className="h-full">
              <Link
                href={tool.href}
                className={`group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E8C4A8] hover:shadow-xl hover:shadow-[#F04A16]/8 ${HOME_PANEL} ${HOME_FOCUS}`}
              >
                <h3 className="text-lg font-bold text-[#13201F] group-hover:text-[#F04A16]">{tool.title}</h3>
                <p className="mt-2 text-base leading-7 text-[#5E6A66]">{tool.summary}</p>
                <ul className="mt-4 space-y-2">
                  {tool.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#2A3836]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04A16]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex min-h-[44px] items-center pt-6 text-sm font-bold text-[#59682A] group-hover:text-[#F04A16]">
                  {tool.cta} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
