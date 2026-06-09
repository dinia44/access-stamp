import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageContainer } from "@/components/layout/PageContainer";
import { HOME_SECTION } from "@/components/home/home-theme";

const JOURNEYS = [
  {
    id: "venues",
    title: "Find an accessible venue",
    summary: "Search access-checked places, filter by step-free access, toilets, parking, and hearing support.",
    highlights: ["Verified access reports", "Photos and scores", "Plan with confidence"],
    cta: "Search accessible places",
    href: "/venue-finder",
    kind: "link" as const,
  },
  {
    id: "guides",
    title: "Explore disability guides",
    summary: "Plain-English guidance on rights, travel, care, equipment, education, and workplace support.",
    highlights: ["Step-by-step workflows", "Templates and checklists", "UK-focused advice"],
    cta: "Explore disability guides",
    href: "/advice",
    kind: "link" as const,
  },
  {
    id: "ai",
    title: "Ask Access Stamp AI",
    summary: "Get practical answers about venues, benefits, adjustments, and what to do next — anytime.",
    highlights: ["Instant guidance", "Voice or text", "Built for real situations"],
    cta: "Ask Access Stamp AI",
    href: "/ai",
    kind: "link" as const,
  },
] as const;

export function HomeUserJourneys() {
  return (
    <section className={`${HOME_SECTION} bg-[#13201F] py-12 sm:py-14`} aria-labelledby="user-journeys-heading">
      <PageContainer>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#22D3EE]">Start here</p>
          <h2 id="user-journeys-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
            Three clear ways to get help
          </h2>
          <p className="mt-3 text-base leading-7 text-[#94A3B8]">
            No digging through menus — pick the journey that matches what you need right now.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {JOURNEYS.map((journey) => (
            <li key={journey.id} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#1A2E2D]/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white">{journey.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">{journey.summary}</p>
                <ul className="mt-4 space-y-2">
                  {journey.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#E2E8F0]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22D3EE]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <ButtonLink href={journey.href} className="w-full" aria-label={journey.cta}>
                    {journey.cta}
                  </ButtonLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
