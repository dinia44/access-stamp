import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { HOME_FOCUS } from "@/components/home/home-theme";

const JOURNEYS = [
  {
    id: "venues",
    title: "Find an accessible venue",
    body: "Search access-checked places with step-free routes, toilets, parking, and hearing support — with scores and photos before you travel.",
    href: "/venue-finder",
    cta: "Find a venue",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    id: "advice",
    title: "Get practical advice",
    body: "Plain-English guides on rights, benefits, travel, care, equipment, and work — with steps you can follow today.",
    href: "/advice",
    cta: "Browse advice",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: "ai",
    title: "Use the AI tools",
    body: "Ask practical questions, plan visits, and get help with letters, checklists, and next steps — grounded in UK guidance.",
    href: "/ai",
    cta: "Open AI tools",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 3a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h1V7a4 4 0 0 1 4-4z" />
      </svg>
    ),
  },
] as const;

export function HomeJourneys() {
  return (
    <section className="border-t border-[#EFE5DA] bg-[#FDFBF8] py-16 sm:py-20" aria-labelledby="journeys-heading">
      <PageContainer>
        <h2 id="journeys-heading" className="sr-only">
          Three ways to use Access Stamp
        </h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {JOURNEYS.map((journey) => (
            <li key={journey.id}>
              <article className="flex h-full flex-col rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_12px_32px_-20px_rgba(122,80,48,0.12)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDE9DD] text-[#C8430F]">
                  {journey.icon}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-[#20242E]">{journey.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#4A5263]">{journey.body}</p>
                <Link
                  href={journey.href}
                  className={`mt-5 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline ${HOME_FOCUS}`}
                >
                  {journey.cta}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
