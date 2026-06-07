import { HOME_PANEL, HOME_SECTION_ALT } from "@/components/home/home-theme";

const STEPS = [
  {
    number: 1,
    title: "Search venues",
    description: "Find places that matter to you using powerful filters and location search.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Check access reports",
    description: "Read detailed, access-checked reports with photos and verified information.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Ask AI",
    description: "Get instant, practical answers about accessibility, benefits and your rights.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Plan with confidence",
    description: "Save favourites, plan your visit and share access info with your group.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
] as const;

export function HomeHowItWorks() {
  return (
    <section className={HOME_SECTION_ALT} aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">How it works</p>
          <h2 id="how-it-works-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0B1D3A] sm:text-4xl">
            Simple steps, better experiences.
          </h2>
        </div>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* Dotted connector — desktop only */}
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[52px] hidden border-t-2 border-dashed border-[#BFDBFE] lg:block"
            aria-hidden
          />

          {STEPS.map((step) => (
            <li key={step.number} className="relative">
              <article
                className={`group flex h-full flex-col items-center p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#93C5FD] hover:shadow-xl hover:shadow-[#2563EB]/10 ${HOME_PANEL}`}
              >
                <div className="relative">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB] transition-colors group-hover:border-[#93C5FD] group-hover:bg-[#DBEAFE]">
                    {step.icon}
                  </span>
                  <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white shadow-sm">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-[#0B1D3A]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#3B6B9A]">{step.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
