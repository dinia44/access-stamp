import type { ReactNode } from "react";
import type { HelpCard } from "@/lib/help-cards";
import { HC_PREVIEW_CARD } from "@/components/help-cards/help-cards-theme";
import { cn } from "@/lib/utils";

export function helpCardPreviewId(slug: string) {
  return `help-card-preview-${slug}`;
}

function categoryLabel(card: HelpCard) {
  const tag = card.tags[0];
  return tag ? `${card.category} / ${tag}` : card.category;
}

function getCheckOnceItems(card: HelpCard): string[] {
  if (card.checklist.length >= 3) {
    return [card.checklist[0], card.checklist[card.checklist.length - 1]];
  }
  return card.checklist.slice(0, 2);
}

function getAdjustmentsItems(card: HelpCard): string[] {
  const items: string[] = [];
  if (card.keyBullets?.[1]) {
    items.push(card.keyBullets[1]);
  }
  const highlights = card.whatToAskFor?.filter((item) =>
    /extra time|rest breaks|remote interview|accessible room/i.test(item),
  );
  if (highlights?.length) {
    items.push(...highlights.slice(0, 2));
  } else if (card.whatToAskFor?.length) {
    items.push(card.whatToAskFor[0]);
  }
  return items.slice(0, 2);
}

function BulletList({ items, size = "default" }: { items: string[]; size?: "default" | "large" | "compact" }) {
  const text =
    size === "large"
      ? "text-sm leading-6"
      : size === "compact"
        ? "text-xs leading-5"
        : "text-xs leading-5 sm:text-sm sm:leading-6";

  return (
    <ul className={cn("space-y-2.5", text)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-[#ef5b2a]" aria-hidden />
          <span className="text-[#17212b]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PreviewBlock({
  title,
  icon,
  children,
  isLarge,
  accent = false,
  className,
}: {
  title: string;
  icon: string;
  children: ReactNode;
  isLarge: boolean;
  accent?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-[#fffaf7] transition-[transform,box-shadow] duration-200",
        accent ? "border-[#edd6c5] bg-[#fff6ef]" : "border-[#edd6c5]",
        isLarge ? "p-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(53,30,12,0.06)]" : "p-3",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold",
            accent ? "bg-[#c8953d]/15 text-[#c8953d]" : "bg-[#ef5b2a]/12 text-[#ef5b2a]",
          )}
          aria-hidden
        >
          {icon}
        </span>
        <h4
          className={cn(
            "font-bold uppercase tracking-[0.08em]",
            accent ? "text-[#c8953d]" : "text-[#ef5b2a]",
            isLarge ? "text-[11px] sm:text-xs" : "text-[10px] sm:text-[11px]",
          )}
        >
          {title}
        </h4>
      </div>
      <div className="mt-3">{children}</div>
    </section>
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
  const checkOnce = getCheckOnceItems(card);
  const mustAsk = card.mustAsk.slice(0, 2);
  const adjustments = getAdjustmentsItems(card);
  const carry = card.documentsToCarry.slice(0, 3);
  const isLarge = size === "large";
  const previewId = forExport ? (id ?? helpCardPreviewId(card.slug)) : undefined;

  return (
    <article
      id={previewId}
      className={cn(
        "help-card-preview relative w-full overflow-hidden text-[#17212b]",
        isLarge
          ? `${HC_PREVIEW_CARD} min-h-[320px]`
          : "aspect-video rounded-[1.5rem] border border-[#f0c9b2] bg-white shadow-[0_18px_50px_rgba(53,30,12,0.08)]",
        className,
      )}
      aria-labelledby={previewId ? `${previewId}-title` : undefined}
    >
      {!isLarge ? (
        <div
          className="pointer-events-none absolute -right-6 -top-8 select-none text-[6rem] font-black leading-none text-[#ef5b2a]/[0.05] sm:text-[8rem]"
          aria-hidden
        >
          AS
        </div>
      ) : null}

      <div className={cn("relative flex h-full flex-col", isLarge ? "p-0" : "p-4 sm:p-5 md:p-6")}>
        <div
          className={cn(
            "flex items-start justify-between gap-3",
            isLarge ? "border-b border-[#ead2bf]/80 pb-4" : "border-b border-[#ead2bf] pb-3 sm:pb-4",
          )}
        >
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ef5b2a] sm:text-xs">
              ACCESS STAMP
            </p>
            <p className="mt-1 text-xs font-semibold text-[#5f6b76] sm:text-sm">{categoryLabel(card)}</p>
          </div>
          <span className="shrink-0 rounded-full border border-[#ead2bf]/80 bg-[#fffaf4] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#5f6b76]">
            HELP CARD
          </span>
        </div>

        <div className="mt-4 min-h-0 flex-1">
          <h3
            id={previewId ? `${previewId}-title` : undefined}
            className={cn(
              "font-extrabold leading-tight tracking-[-0.03em] text-[#17212b]",
              isLarge ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
            )}
          >
            {card.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-[#5f6b76]",
              isLarge ? "text-sm leading-6 sm:text-base sm:leading-7" : "text-xs leading-5 sm:text-sm sm:leading-6",
            )}
          >
            {card.summary}
          </p>

          {isLarge ? (
            <>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <PreviewBlock title="Check once" icon="✓" isLarge>
                  <BulletList items={checkOnce} size="large" />
                </PreviewBlock>
                <PreviewBlock title="Helpful ask" icon="?" isLarge>
                  <BulletList items={mustAsk} size="large" />
                </PreviewBlock>
                <PreviewBlock title="Adjustments I can ask for" icon="↔" isLarge>
                  <BulletList items={adjustments} size="large" />
                </PreviewBlock>
                <PreviewBlock title="Carry" icon="▣" isLarge>
                  <BulletList items={carry} size="large" />
                </PreviewBlock>
              </div>
              <PreviewBlock title="Key line" icon="“" isLarge accent className="mt-4">
                <blockquote className="text-sm font-semibold leading-6 text-[#17212b] sm:text-base sm:leading-7">
                  &ldquo;{card.keyLine}&rdquo;
                </blockquote>
              </PreviewBlock>
            </>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <section className="rounded-xl border border-[#ead2bf]/90 bg-[#fffaf4] p-3">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#ef5b2a] sm:text-[11px]">
                  Check once
                </h4>
                <div className="mt-3">
                  <BulletList items={checkOnce} size="compact" />
                </div>
              </section>
              <section className="rounded-xl border border-[#ead2bf]/90 bg-[#fffaf4] p-3">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#ef5b2a] sm:text-[11px]">
                  Helpful ask
                </h4>
                <div className="mt-3">
                  <BulletList items={mustAsk} size="compact" />
                </div>
              </section>
              <section className="rounded-xl border border-[#ead2bf]/90 bg-[#fffaf4] p-3">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#ef5b2a] sm:text-[11px]">
                  Carry
                </h4>
                <div className="mt-3">
                  <BulletList items={carry} size="compact" />
                </div>
              </section>
              <section className="rounded-xl border border-[#ead2bf] bg-[#fff6ef] p-3">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#c8953d] sm:text-[11px]">
                  Key line
                </h4>
                <blockquote className="mt-3 text-[11px] font-semibold leading-6 text-[#17212b] sm:text-xs sm:leading-6">
                  &ldquo;{card.keyLine}&rdquo;
                </blockquote>
              </section>
            </div>
          )}
        </div>

        <p className="mt-4 text-[11px] font-medium leading-5 text-[#5f6b76] sm:text-xs">
          Practical prompts, not legal advice.
        </p>
      </div>
    </article>
  );
}
