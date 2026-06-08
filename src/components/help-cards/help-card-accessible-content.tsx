import type { HelpCard } from "@/lib/help-cards";
import { HC_BODY, HC_EYEBROW, HC_INNER_CARD, HC_MUTED_SM, HC_SECTION_TITLE } from "@/components/help-cards/help-cards-theme";

export function HelpCardAccessibleContent({ card }: { card: HelpCard }) {
  return (
    <article className={`${HC_INNER_CARD} p-5 sm:p-6`}>
      <header>
        <p className={HC_EYEBROW}>Accessible text version</p>
        <h2 className={`${HC_SECTION_TITLE} mt-3 text-[clamp(1.4rem,2vw,2rem)]`}>{card.title}</h2>
        <p className={`${HC_BODY} mt-3 text-[#5f6b76]`}>{card.summary}</p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#17212b]">Check once</h3>
          <ul className="mt-4 space-y-2.5 text-base leading-7 text-[#17212b]">
            {card.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#17212b]">Helpful ask</h3>
          <ul className="mt-4 space-y-2.5 text-base leading-7 text-[#17212b]">
            {card.mustAsk.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#17212b]">Carry</h3>
          <ul className="mt-4 space-y-2.5 text-base leading-7 text-[#17212b]">
            {card.documentsToCarry.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#17212b]">Escalate if</h3>
          <ul className="mt-4 space-y-2.5 text-base leading-7 text-[#17212b]">
            {card.escalateIf.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-2xl bg-[#fff6ef] p-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#c8953d]">Key line</h3>
        <p className="mt-3 text-base font-semibold leading-7 text-[#17212b]">{card.keyLine}</p>
      </section>

      <p className={`${HC_MUTED_SM} mt-5`}>Practical prompts, not legal advice.</p>
    </article>
  );
}
