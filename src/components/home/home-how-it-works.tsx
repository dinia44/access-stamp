import { HOME_PANEL, HOME_SECTION } from "@/components/home/home-theme";

const STEPS = [
  {
    number: 1,
    title: "Search venues",
    description: "Find places that match your access needs, from step access to hearing support.",
  },
  {
    number: 2,
    title: "Check access reports",
    description: "Read detailed access-checked reports with photos and verified information.",
  },
  {
    number: 3,
    title: "Ask AI",
    description: "Get instant, practical answers about accessibility, benefits and your rights.",
  },
  {
    number: 4,
    title: "Plan with confidence",
    description: "Save favourites, plan your visit and share access info with your group.",
  },
] as const;

export function HomeHowItWorks() {
  return (
    <section className={`${HOME_SECTION} bg-[#FFF8F1] py-16 sm:py-20`} aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-[-0.03em] text-[#13201F] sm:text-4xl">
            Simple steps, better experiences.
          </h2>
        </div>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[28px] hidden border-t-2 border-dashed border-[#F1D8C7] lg:block"
            aria-hidden
          />

          {STEPS.map((step) => (
            <li key={step.number} className="relative">
              <article
                className={`group flex h-full flex-col items-center p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#E8C4A8] hover:shadow-xl hover:shadow-[#F04A16]/8 ${HOME_PANEL}`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#59682A] text-sm font-bold text-white shadow-sm">
                  {step.number}
                </span>
                <h3 className="mt-5 text-base font-bold text-[#13201F]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5E6A66]">{step.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
