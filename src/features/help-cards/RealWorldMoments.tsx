import type { HelpCard } from "@/lib/help-cards";
import {
  HC_INNER_CARD,
  HC_MUTED_SM,
  HC_PAGE_SECTION,
  HC_SECTION_PADDING,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";
import type { HelpCardCategoryFilter } from "@/features/help-cards/useHelpCardSearch";
import { HELP_CARD_CATEGORIES } from "@/features/help-cards/useHelpCardSearch";

export function RealWorldMoments({
  cards,
  onSelectCategory,
}: {
  cards: HelpCard[];
  onSelectCategory: (category: HelpCardCategoryFilter) => void;
}) {
  const moments = HELP_CARD_CATEGORIES.filter((c) => c !== "All").map((category) => ({
    category,
    count: cards.filter((card) => card.category === category).length,
  }));

  return (
    <section
      aria-labelledby="real-world-moments"
      className={`${HC_PAGE_SECTION} ${HC_SECTION_PADDING}`}
    >
      <h2 id="real-world-moments" className={HC_SECTION_TITLE}>
        Real-world moments
      </h2>
      <p className={`${HC_MUTED_SM} mt-2`}>
        Pick the situation you are preparing for — not generic topics.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {moments.map(({ category, count }) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category as HelpCardCategoryFilter)}
            className={`${HC_INNER_CARD} min-h-11 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(53,30,12,0.08)]`}
          >
            <p className="text-base font-bold text-[#17212b]">{category}</p>
            <p className={`${HC_MUTED_SM} mt-2`}>
              {count} source-backed card{count === 1 ? "" : "s"}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
