import Link from "next/link";
import { HOME_FOCUS, HOME_PANEL, HOME_SECTION_ALT } from "@/components/home/home-theme";

const HELP_AREAS = [
  {
    title: "Venue access reports",
    summary: "See step-free routes, toilets, parking, seating, and hearing support before you visit.",
    highlights: ["Access scores", "Photo evidence", "Community-checked details"],
    cta: "Check venue access",
    href: "/venue-finder",
  },
  {
    title: "Disability rights & benefits",
    summary: "Understand PIP, Blue Badge, reasonable adjustments, Access to Work, and what you can ask for.",
    highlights: ["Plain-English explainers", "Template wording", "Official links"],
    cta: "Read guide",
    href: "/advice/rights",
  },
  {
    title: "Plan before you go",
    summary: "Use checklists, venue questions, and fit planners so visits match your access needs.",
    highlights: ["Venue fit planner", "Question lists", "Visit planning tools"],
    cta: "Plan a visit",
    href: "/ai-toolkit/venue-fit-planner",
  },
  {
    title: "Templates & help cards",
    summary: "Create quick summaries for carers, employers, schools, or services when you need support fast.",
    highlights: ["Downloadable templates", "Help cards", "Escalation guidance"],
    cta: "Use a template",
    href: "/help-cards",
  },
] as const;

export function HomeWhatWeHelpWith() {
  return (
    <section className={`${HOME_SECTION_ALT} py-16 sm:py-20`} aria-labelledby="what-we-help-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#F04A16]">What Access Stamp helps with</p>
          <h2 id="what-we-help-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#13201F] sm:text-4xl">
            Practical support you can see upfront
          </h2>
          <p className="mt-3 text-base leading-7 text-[#5E6A66]">
            Every card below shows what you get — no clicking just to discover whether it is useful.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {HELP_AREAS.map((area) => (
            <li key={area.title} className="h-full">
              <article className={`flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#F04A16]/8 ${HOME_PANEL}`}>
                <h3 className="text-lg font-bold text-[#13201F]">{area.title}</h3>
                <p className="mt-2 text-base leading-7 text-[#5E6A66]">{area.summary}</p>
                <ul className="mt-4 space-y-2">
                  {area.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#2A3836]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#59682A]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={area.href}
                  className={`mt-auto inline-flex min-h-[44px] items-center pt-6 text-sm font-bold text-[#59682A] transition-colors hover:text-[#F04A16] ${HOME_FOCUS}`}
                >
                  {area.cta} →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
