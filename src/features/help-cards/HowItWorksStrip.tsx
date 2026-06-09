const STEPS = [
  {
    number: "01",
    title: "Pick the situation",
    text: "Choose the access moment you are preparing for.",
  },
  {
    number: "02",
    title: "Save the card",
    text: "Keep the wording ready on your phone or print it.",
  },
  {
    number: "03",
    title: "Show, print or tailor",
    text: "Use the card as-is or personalise it with AI.",
  },
] as const;

export function HowItWorksStrip() {
  return (
    <section aria-labelledby="how-it-works-title" className="bg-[#FFF7EF] px-5 py-8 sm:px-8 lg:px-10">
      <h2 id="how-it-works-title" className="sr-only">
        How help cards work
      </h2>
      <div className="mx-auto grid max-w-[1200px] gap-4 rounded-[32px] border border-[#EAD5C2] bg-white/62 p-4 shadow-sm backdrop-blur md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="rounded-[24px] border border-[#F0DED0] bg-[#FFFDF9] p-6"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F05A1A]">{step.number}</p>
            <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-[#132033]">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#68717E]">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
