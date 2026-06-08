import {
  HC_PAGE_SECTION,
  HC_SECTION_PADDING,
  HC_SECTION_TITLE,
  HC_STEP_CARD,
} from "@/components/help-cards/help-cards-theme";

const STEPS = [
  {
    number: "1",
    title: "Choose the moment",
    body: "Pick work, travel, care, education, rights, or emergency support.",
  },
  {
    number: "2",
    title: "Save the card",
    body: "Download it to your phone or print it before you need it.",
  },
  {
    number: "3",
    title: "Use the wording",
    body: "Show it, read it, or use it as a prompt when speaking.",
  },
  {
    number: "4",
    title: "Tailor if needed",
    body: "Adjust the wording to your situation without starting from scratch.",
  },
] as const;

export function HelpCardsHowItWorks() {
  return (
    <section aria-labelledby="how-help-cards-work" className={`${HC_PAGE_SECTION} ${HC_SECTION_PADDING}`}>
      <h2 id="how-help-cards-work" className={HC_SECTION_TITLE}>
        How Help Cards work
      </h2>
      <ol className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className={`${HC_STEP_CARD} flex h-full flex-col`}>
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0e8] text-sm font-black text-[#ef5b2a]">
              {step.number}
            </span>
            <h3 className="text-base font-black text-[#17212b]">{step.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#5f6b76]">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
