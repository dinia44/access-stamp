const STEPS = [
  { title: "Choose a situation", icon: "1" },
  { title: "Save or print the card", icon: "2" },
  { title: "Use it in the moment", icon: "3" },
  { title: "Tailor it with AI if needed", icon: "4" },
] as const;

export function HelpCardsHowItWorks() {
  return (
    <section
      aria-labelledby="how-help-cards-work"
      className="rounded-2xl border border-[#F1D8C7] bg-[#FFF3E8]/60 p-5 sm:p-6"
    >
      <h2 id="how-help-cards-work" className="text-lg font-bold text-[#13201F] sm:text-xl">
        How Help Cards work
      </h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3">
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFE2D3] text-sm font-bold text-[#F04A16]"
              aria-hidden
            >
              {step.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-[#13201F]">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
