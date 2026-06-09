import type { HelpCard } from "@/lib/help-cards";
import { HelpCardSources } from "@/features/help-cards/HelpCardSources";
import {
  HC_BODY,
  HC_EYEBROW,
  HC_IMPORTANT_SECTION,
  HC_INNER_CARD,
  HC_MUTED_SM,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

function BulletSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h3 className="text-sm font-bold uppercase tracking-wide text-[#17212b]">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-base leading-7 text-[#17212b]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function HelpCardDetail({ card }: { card: HelpCard }) {
  const sayThisFirst = card.sayThisFirst ?? [];
  const whatToAskFor = card.whatToAskFor ?? card.mustAsk;
  const questions = card.questionsToAsk ?? card.mustAsk;
  const evidence = card.evidenceToHaveReady ?? card.documentsToCarry;
  const after = card.afterTheConversation ?? card.escalateIf;
  const limits = card.importantLimits ?? [];

  return (
    <article className={`${HC_INNER_CARD} space-y-8 p-5 sm:p-6`}>
      <header>
        <p className={HC_EYEBROW}>{card.badge ?? card.category}</p>
        <h2 className={`${HC_SECTION_TITLE} mt-3 text-[clamp(1.4rem,2vw,2rem)]`}>{card.title}</h2>
        <p className={`${HC_BODY} mt-3 text-[#5f6b76]`}>{card.useThisWhen ?? card.summary}</p>
        {card.lastReviewed ? (
          <p className={`${HC_MUTED_SM} mt-3`}>Last reviewed: {card.lastReviewed}</p>
        ) : null}
      </header>

      <section className="rounded-2xl bg-[#fff6ef] p-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#c8953d]">Quick line</h3>
        <p className="mt-3 text-base font-semibold leading-7 text-[#17212b]">
          {card.quickLine ?? card.keyLine}
        </p>
      </section>

      {card.keyRightsLine ? (
        <section className="rounded-2xl border border-[#ead2bf]/80 bg-[#fffaf4] p-5">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#17212b]">Useful rights line</h3>
          <p className="mt-3 text-base leading-7 text-[#17212b]">{card.keyRightsLine}</p>
        </section>
      ) : null}

      <div className="grid gap-8 md:grid-cols-2">
        <BulletSection title="Say this first" items={sayThisFirst} />
        <BulletSection title="What to ask for" items={whatToAskFor} />
        <BulletSection title="Questions to ask" items={questions} />
        <BulletSection title="Evidence to have ready" items={evidence} />
        <BulletSection title="After the conversation" items={after} />
      </div>

      {limits.length > 0 ? (
        <section className={`${HC_IMPORTANT_SECTION} p-5 sm:p-6`}>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#17212b]">Important limits</h3>
          <ul className="mt-4 space-y-2.5 text-base leading-7 text-[#17212b]">
            {limits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {card.sources && card.sources.length > 0 ? (
        <HelpCardSources sources={card.sources} lastReviewed={card.lastReviewed} />
      ) : (
        <p className={`${HC_MUTED_SM}`}>Practical prompts, not legal advice.</p>
      )}
    </article>
  );
}
