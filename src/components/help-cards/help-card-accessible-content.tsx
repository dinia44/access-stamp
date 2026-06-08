import type { HelpCard } from "@/lib/help-cards";

export function HelpCardAccessibleContent({ card }: { card: HelpCard }) {
  return (
    <article className="rounded-2xl border border-[#F1D8C7] bg-white p-5 sm:p-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F04A16]">Accessible text version</p>
        <h2 className="mt-2 text-2xl font-bold text-[#13201F]">{card.title}</h2>
        <p className="mt-2 text-base text-[#2A3836]">{card.summary}</p>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#13201F]">Quick checklist</h3>
          <ul className="mt-3 space-y-2 text-base text-[#2A3836]">
            {card.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#13201F]">Must ask</h3>
          <ul className="mt-3 space-y-2 text-base text-[#2A3836]">
            {card.mustAsk.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#13201F]">Carry</h3>
          <ul className="mt-3 space-y-2 text-base text-[#2A3836]">
            {card.documentsToCarry.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#13201F]">Escalate if</h3>
          <ul className="mt-3 space-y-2 text-base text-[#2A3836]">
            {card.escalateIf.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-[#59682A]/20 bg-[#59682A]/[0.06] p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#59682A]">Key line</h3>
        <p className="mt-2 text-base font-semibold leading-relaxed text-[#13201F]">{card.keyLine}</p>
      </section>

      <p className="mt-4 text-sm text-[#5E6A66]">Practical prompts, not legal advice.</p>
    </article>
  );
}
