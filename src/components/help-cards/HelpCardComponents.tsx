import Link from "next/link";
import type { HelpCard, HelpCardPack } from "@/data/helpCardPacks";

const typeStyles: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  "quick-script": {
    label: "Quick Script",
    className: "border-[#F2D1BE] bg-[#FFF7EF] text-[#F05A1A]",
  },
  "adjustment-request": {
    label: "Adjustment Request",
    className: "border-[#D7E5F0] bg-[#F4FAFF] text-[#255C7E]",
  },
  "evidence-summary": {
    label: "Evidence Summary",
    className: "border-[#D8C3AF] bg-[#FFFDF8] text-[#132033]",
  },
  "carry-with": {
    label: "Carry-With Checklist",
    className: "border-[#DCEAD7] bg-[#F8FFF5] text-[#2D6A3E]",
  },
  emergency: {
    label: "Emergency Card",
    className: "border-[#132033] bg-[#132033] text-white",
  },
  "follow-up": {
    label: "Follow-Up",
    className: "border-[#EAD5C2] bg-white text-[#132033]",
  },
};

export function CardTypePill({ type }: { type: HelpCard["type"] }) {
  const style = typeStyles[type];

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.13em] ${style.className}`}
    >
      {style.label}
    </span>
  );
}

export function HelpCardPackPreview({ pack }: { pack: HelpCardPack }) {
  return (
    <Link
      href={`/help-cards/${pack.slug}`}
      className="group block rounded-[32px] border border-[#EAD5C2] bg-white/76 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#F2B895] hover:bg-white hover:shadow-[0_24px_60px_rgba(19,32,51,0.10)] focus:outline-none focus:ring-4 focus:ring-[#F97316]/20"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full border border-[#F2D1BE] bg-[#FFF3EA] px-3 py-1 text-xs font-black uppercase tracking-[0.13em] text-[#F05A1A]">
          {pack.category}
        </span>

        <span className="text-sm font-black text-[#F05A1A]">
          {pack.cards.length} cards
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-black leading-tight tracking-[-0.045em] text-[#132033]">
        {pack.title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-[#68717E]">
        {pack.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {pack.cards.slice(0, 4).map((card) => (
          <span
            key={card.id}
            className="rounded-full border border-[#EAD5C2] bg-[#FFFDF9] px-3 py-1 text-xs font-bold text-[#68717E]"
          >
            {card.label}
          </span>
        ))}
      </div>

      <div className="mt-7 border-t border-[#F0DED0] pt-5 text-sm font-black text-[#F05A1A]">
        Open pack →
      </div>
    </Link>
  );
}

export function QuickScriptCard({ card }: { card: HelpCard }) {
  return (
    <article className="rounded-[32px] border border-[#F2D1BE] bg-[#FFF7EF] p-6 shadow-sm sm:p-8">
      <CardTypePill type={card.type} />

      <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.045em] text-[#132033]">
        {card.title}
      </h3>

      <p className="mt-3 text-base leading-7 text-[#68717E]">
        {card.shortDescription}
      </p>

      {card.keyLine && (
        <div className="mt-7 rounded-[28px] border border-[#F2D1BE] bg-white/80 p-6 text-xl font-black leading-9 tracking-[-0.025em] text-[#132033]">
          <span className="mr-2 text-3xl text-[#F05A1A]">“</span>
          {card.keyLine}
        </div>
      )}

      {card.body && (
        <p className="mt-5 text-sm leading-7 text-[#68717E]">
          {card.body}
        </p>
      )}

      <CardActions />
    </article>
  );
}

export function AdjustmentRequestCard({ card }: { card: HelpCard }) {
  return (
    <article className="rounded-[32px] border border-[#D7E5F0] bg-[#F7FBFF] p-6 shadow-sm sm:p-8">
      <CardTypePill type={card.type} />

      <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.045em] text-[#132033]">
        {card.title}
      </h3>

      <p className="mt-3 text-base leading-7 text-[#68717E]">
        {card.shortDescription}
      </p>

      {card.keyPoints && (
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {card.keyPoints.map((point) => (
            <li
              key={point}
              className="rounded-2xl border border-[#D7E5F0] bg-white/78 p-4 text-sm font-semibold leading-6 text-[#132033]"
            >
              {point}
            </li>
          ))}
        </ul>
      )}

      <CardActions />
    </article>
  );
}

export function EvidenceSummaryCard({ card }: { card: HelpCard }) {
  return (
    <article className="relative overflow-hidden rounded-[32px] border border-[#D8C3AF] bg-[#FFFDF8] p-6 shadow-[0_24px_70px_rgba(19,32,51,0.12)] sm:p-8 print:rounded-none print:border-black print:bg-white print:shadow-none">
      <div className="mb-6 flex flex-col gap-4 border-b border-[#E8D5C3] pb-5 sm:flex-row sm:items-start sm:justify-between print:border-black">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F05A1A] print:text-black">
            Access Stamp
          </p>
          <p className="mt-2 text-sm font-bold text-[#68717E] print:text-black">
            Evidence Summary Card
          </p>
        </div>

        <div className="inline-flex w-fit rounded-full border border-[#D8C3AF] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#132033] print:border-black">
          Not a legal document
        </div>
      </div>

      <CardTypePill type={card.type} />

      <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.045em] text-[#132033] sm:text-4xl print:text-black">
        {card.title}
      </h3>

      {card.body && (
        <div className="mt-6 rounded-3xl border border-[#EAD5C2] bg-[#FFF7EF] p-5 print:border-black print:bg-white">
          <p className="text-base font-semibold leading-7 text-[#132033] print:text-black">
            {card.body}
          </p>
        </div>
      )}

      {card.keyPoints && (
        <div className="mt-6">
          <h4 className="text-sm font-black uppercase tracking-[0.16em] text-[#132033] print:text-black">
            Key points
          </h4>

          <ul className="mt-4 space-y-3">
            {card.keyPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-base leading-7 text-[#132033] print:text-black"
              >
                <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F05A1A] text-xs font-black text-white print:border print:border-black print:bg-white print:text-black">
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(card.sources || card.lastChecked) && (
        <div className="mt-7 grid gap-4 rounded-[28px] border border-[#EAD5C2] bg-white/75 p-5 sm:grid-cols-[1fr_auto] print:border-black print:bg-white">
          {card.sources && (
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.16em] text-[#132033] print:text-black">
                Sources
              </h4>

              <ul className="mt-3 space-y-2">
                {card.sources.map((source) => (
                  <li key={source.label}>
                    {source.href ? (
                      <a
                        href={source.href}
                        className="text-sm font-bold leading-6 text-[#F05A1A] underline underline-offset-4 print:text-black"
                      >
                        {source.label}
                      </a>
                    ) : (
                      <span className="text-sm font-bold leading-6 text-[#132033] print:text-black">
                        {source.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {card.lastChecked && (
            <div className="rounded-2xl border border-[#EAD5C2] bg-[#FFF7EF] p-4 print:border-black print:bg-white">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#68717E] print:text-black">
                Last checked
              </p>
              <p className="mt-2 text-sm font-black text-[#132033] print:text-black">
                {card.lastChecked}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-[#F2D1BE] bg-[#FFF7EF] p-4 text-sm leading-6 text-[#68717E] print:border-black print:bg-white print:text-black">
        {card.disclaimer ||
          "Access Stamp provides practical prompts and source-backed summaries. This card is not legal, medical or financial advice. Always check the official source before relying on it."}
      </div>

      <CardActions />
    </article>
  );
}

export function CarryWithCard({ card }: { card: HelpCard }) {
  return (
    <article className="rounded-[32px] border border-[#DCEAD7] bg-[#F8FFF5] p-6 shadow-sm sm:p-8">
      <CardTypePill type={card.type} />

      <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.045em] text-[#132033]">
        {card.title}
      </h3>

      <p className="mt-3 text-base leading-7 text-[#68717E]">
        {card.shortDescription}
      </p>

      {card.checklist && (
        <ul className="mt-7 space-y-3">
          {card.checklist.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-[#DCEAD7] bg-white/78 p-4 text-sm font-bold leading-6 text-[#132033]"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#2D6A3E] text-[#2D6A3E]">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <CardActions />
    </article>
  );
}

export function EmergencyCard({ card }: { card: HelpCard }) {
  return (
    <article className="rounded-[32px] border border-[#132033] bg-[#132033] p-6 text-white shadow-[0_24px_70px_rgba(19,32,51,0.22)] sm:p-8">
      <CardTypePill type={card.type} />

      <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.045em] text-white">
        {card.title}
      </h3>

      <p className="mt-3 text-base leading-7 text-white/72">
        {card.shortDescription}
      </p>

      {card.keyLine && (
        <div className="mt-7 rounded-[28px] border border-white/16 bg-white/8 p-6 text-2xl font-black leading-10 tracking-[-0.03em] text-white">
          {card.keyLine}
        </div>
      )}

      <CardActions dark />
    </article>
  );
}

export function CardActions({ dark = false }: { dark?: boolean }) {
  const base = dark
    ? "border-white/20 bg-white/10 text-white hover:bg-white/16 focus:ring-white/30"
    : "border-[#E0C8B3] bg-white/70 text-[#132033] hover:border-[#F05A1A] hover:bg-white focus:ring-[#F97316]/20";

  return (
    <div className="no-print mt-7 flex flex-wrap gap-3">
      {["Save", "Print", "Copy line", "Tailor with AI"].map((action) => (
        <button
          key={action}
          type="button"
          className={`inline-flex min-h-[44px] items-center justify-center rounded-2xl border px-4 text-sm font-extrabold transition focus:outline-none focus:ring-4 ${base}`}
        >
          {action}
        </button>
      ))}
    </div>
  );
}

export function RenderHelpCard({ card }: { card: HelpCard }) {
  if (card.type === "quick-script") return <QuickScriptCard card={card} />;
  if (card.type === "adjustment-request") return <AdjustmentRequestCard card={card} />;
  if (card.type === "evidence-summary") return <EvidenceSummaryCard card={card} />;
  if (card.type === "carry-with") return <CarryWithCard card={card} />;
  if (card.type === "emergency") return <EmergencyCard card={card} />;

  return <QuickScriptCard card={card} />;
}
