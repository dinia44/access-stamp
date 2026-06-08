import type { HelpCard } from "@/lib/help-cards";
import { cn } from "@/lib/utils";

export function helpCardPreviewId(slug: string) {
  return `help-card-preview-${slug}`;
}

function categoryLabel(card: HelpCard) {
  const tag = card.tags[0];
  return tag ? `${card.category} / ${tag}` : card.category;
}

function BulletList({ items, size = "default" }: { items: string[]; size?: "default" | "large" | "compact" }) {
  const text =
    size === "large"
      ? "text-sm leading-snug"
      : size === "compact"
        ? "text-xs leading-snug"
        : "text-xs leading-snug sm:text-sm";

  return (
    <ul className={cn("space-y-2", text)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-[#ef5b2a]" aria-hidden />
          <span className="text-[#17212b]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function HelpCardPreview({
  card,
  className,
  id,
  size = "default",
  forExport = false,
}: {
  card: HelpCard;
  className?: string;
  id?: string;
  size?: "default" | "large" | "compact";
  forExport?: boolean;
}) {
  const checklist = card.checklist.slice(0, 3);
  const mustAsk = card.mustAsk.slice(0, 2);
  const carry = card.documentsToCarry.slice(0, 3);
  const isLarge = size === "large";

  return (
    <div
      id={forExport ? (id ?? helpCardPreviewId(card.slug)) : undefined}
      className={cn(
        "help-card-preview relative w-full overflow-hidden rounded-[1.5rem] border border-[#f0c9b2] bg-white text-[#17212b] shadow-[0_18px_50px_rgba(53,30,12,0.08)]",
        isLarge ? "aspect-[16/10] min-h-[320px]" : "aspect-video",
        className,
      )}
      role="img"
      aria-label={`Help card preview: ${card.title}`}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-8 select-none text-[6rem] font-black leading-none text-[#ef5b2a]/[0.05] sm:text-[8rem]"
        aria-hidden
      >
        AS
      </div>

      <div className="relative flex h-full flex-col p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 border-b border-[#ead2bf] pb-3 sm:pb-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ef5b2a] sm:text-xs">Access Stamp</p>
            <p className="mt-1 text-xs font-semibold text-[#5f6b76] sm:text-sm">{categoryLabel(card)}</p>
          </div>
          <span className="shrink-0 rounded-full border border-[#ead2bf] bg-[#fffaf4] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#5f6b76]">
            Help Card
          </span>
        </div>

        <div className="mt-3 min-h-0 flex-1 sm:mt-4">
          <h3
            className={cn(
              "font-extrabold leading-tight tracking-[-0.03em] text-[#17212b]",
              isLarge ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
            )}
          >
            {card.title}
          </h3>
          <p className={cn("mt-2 text-[#5f6b76]", isLarge ? "text-sm leading-relaxed sm:text-base" : "text-xs leading-relaxed sm:text-sm")}>
            {card.summary}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <section className="rounded-xl border border-[#ead2bf]/90 bg-[#fffaf4] p-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#ef5b2a] sm:text-[11px]">Check once</h4>
              <div className="mt-2">
                <BulletList items={checklist} size={isLarge ? "default" : "compact"} />
              </div>
            </section>
            <section className="rounded-xl border border-[#ead2bf]/90 bg-[#fffaf4] p-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#ef5b2a] sm:text-[11px]">Helpful ask</h4>
              <div className="mt-2">
                <BulletList items={mustAsk} size={isLarge ? "default" : "compact"} />
              </div>
            </section>
            <section className="rounded-xl border border-[#ead2bf]/90 bg-[#fffaf4] p-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#ef5b2a] sm:text-[11px]">Carry</h4>
              <div className="mt-2">
                <BulletList items={carry} size={isLarge ? "default" : "compact"} />
              </div>
            </section>
            <section className="rounded-xl border border-[#ead2bf] bg-[#fff6ef] p-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#c8953d] sm:text-[11px]">Key line</h4>
              <blockquote className="mt-2 text-[11px] font-semibold leading-snug text-[#17212b] sm:text-xs">
                &ldquo;{card.keyLine}&rdquo;
              </blockquote>
            </section>
          </div>
        </div>

        <p className="mt-3 text-[11px] font-medium text-[#5f6b76] sm:text-xs">Practical prompts, not legal advice.</p>
      </div>
    </div>
  );
}
