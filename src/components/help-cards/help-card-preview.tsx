import type { HelpCard } from "@/lib/help-cards";
import { cn } from "@/lib/utils";

export function helpCardPreviewId(slug: string) {
  return `help-card-preview-${slug}`;
}

function categoryLabel(card: HelpCard) {
  const tag = card.tags[0];
  return tag ? `${card.category} • ${tag}` : card.category;
}

function BulletList({ items, compact }: { items: string[]; compact?: boolean }) {
  return (
    <ul className={cn("space-y-1.5", compact ? "text-[11px] leading-snug sm:text-xs" : "text-xs leading-snug sm:text-sm")}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04A16]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function HelpCardPreview({
  card,
  className,
  id,
  compact = false,
  forExport = false,
}: {
  card: HelpCard;
  className?: string;
  id?: string;
  /** Smaller typography for grid thumbnails */
  compact?: boolean;
  /** Off-screen export target — only one element per card should set this */
  forExport?: boolean;
}) {
  const checklist = card.checklist.slice(0, 3);
  const mustAsk = card.mustAsk.slice(0, 2);
  const carry = card.documentsToCarry.slice(0, 3);

  return (
    <div
      id={forExport ? (id ?? helpCardPreviewId(card.slug)) : undefined}
      className={cn(
        "help-card-preview relative aspect-video w-full overflow-hidden rounded-2xl border border-[#F1D8C7] bg-[#FFF8F1] text-[#13201F] shadow-[0_24px_60px_-28px_rgba(240,74,22,0.25)]",
        className,
      )}
      role="img"
      aria-label={`Help card preview: ${card.title}`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 select-none text-[7rem] font-bold leading-none text-[#F04A16]/[0.06] sm:text-[9rem]"
        aria-hidden
      >
        AS
      </div>

      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F04A16] via-[#59682A] to-[#F04A16]/40" aria-hidden />

      <div className="relative flex h-full flex-col p-3 sm:p-4 md:p-5">
        <div className="flex items-start justify-between gap-3 border-b border-[#F1D8C7] pb-2 sm:pb-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F04A16] sm:text-[11px]">
              Access Stamp
            </p>
            <p className="mt-0.5 text-[10px] font-semibold text-[#59682A] sm:text-xs">{categoryLabel(card)}</p>
          </div>
          <span className="shrink-0 rounded-full border border-[#F1D8C7] bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#5E6A66] sm:text-[10px]">
            Help Card
          </span>
        </div>

        <div className="mt-2 min-h-0 flex-1">
          <h3
            className={cn(
              "font-bold leading-tight text-[#13201F]",
              compact ? "text-sm sm:text-base" : "text-base sm:text-lg md:text-xl",
            )}
          >
            {card.title}
          </h3>
          <p className={cn("mt-1 text-[#2A3836]", compact ? "text-[10px] leading-snug sm:text-xs" : "text-xs leading-snug sm:text-sm")}>
            {card.summary}
          </p>

          <div className="mt-2 grid h-[calc(100%-3.5rem)] grid-cols-2 gap-2 sm:mt-3 sm:grid-cols-4 sm:gap-3">
            <section className="min-h-0 rounded-xl border border-[#F1D8C7]/80 bg-white/80 p-2 sm:p-2.5">
              <h4 className="text-[9px] font-bold uppercase tracking-wide text-[#F04A16] sm:text-[10px]">Quick checklist</h4>
              <div className="mt-1.5">
                <BulletList items={checklist} compact={compact} />
              </div>
            </section>
            <section className="min-h-0 rounded-xl border border-[#F1D8C7]/80 bg-white/80 p-2 sm:p-2.5">
              <h4 className="text-[9px] font-bold uppercase tracking-wide text-[#F04A16] sm:text-[10px]">Must ask</h4>
              <div className="mt-1.5">
                <BulletList items={mustAsk} compact={compact} />
              </div>
            </section>
            <section className="min-h-0 rounded-xl border border-[#F1D8C7]/80 bg-white/80 p-2 sm:p-2.5">
              <h4 className="text-[9px] font-bold uppercase tracking-wide text-[#F04A16] sm:text-[10px]">Carry</h4>
              <div className="mt-1.5">
                <BulletList items={carry} compact={compact} />
              </div>
            </section>
            <section className="min-h-0 rounded-xl border border-[#59682A]/25 bg-[#59682A]/[0.06] p-2 sm:p-2.5">
              <h4 className="text-[9px] font-bold uppercase tracking-wide text-[#59682A] sm:text-[10px]">Key line</h4>
              <blockquote
                className={cn(
                  "mt-1.5 font-semibold leading-snug text-[#13201F]",
                  compact ? "text-[10px] sm:text-[11px]" : "text-[10px] sm:text-xs",
                )}
              >
                &ldquo;{card.keyLine}&rdquo;
              </blockquote>
            </section>
          </div>
        </div>

        <p className="mt-2 text-[9px] font-medium text-[#5E6A66] sm:text-[10px]">Practical prompts, not legal advice.</p>
      </div>
    </div>
  );
}
