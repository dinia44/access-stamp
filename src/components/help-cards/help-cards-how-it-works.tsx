import {
  HC_GRID_CARD,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

const STEPS = [
  {
    number: "01",
    title: "Choose the moment",
    body: "Pick work, travel, care, education, rights, or emergency support.",
    icon: "◎",
  },
  {
    number: "02",
    title: "Save the card",
    body: "Download it to your phone or print it before you need it.",
    icon: "↓",
  },
  {
    number: "03",
    title: "Use the wording",
    body: "Show it, read it, or use it as a prompt when speaking.",
    icon: "☰",
  },
  {
    number: "04",
    title: "Tailor if needed",
    body: "Adjust the wording to your situation without starting from scratch.",
    icon: "✦",
  },
] as const;

export function HelpCardsHowItWorks() {
  return (
    <section aria-labelledby="how-help-cards-work">
      <h2 id="how-help-cards-work" className={HC_SECTION_TITLE}>
        How Help Cards work
      </h2>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className={`${HC_GRID_CARD} flex h-full flex-col`}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#ef5b2a]">{step.number}</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff6ef] text-sm text-[#ef5b2a]" aria-hidden>
                {step.icon}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-extrabold tracking-[-0.03em] text-[#17212b]">{step.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5f6b76]">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
