import { hcChipClass } from "@/components/help-cards/help-cards-theme";
import type { HelpCardCategoryFilter } from "@/features/help-cards/useHelpCardSearch";
import { HELP_CARD_CATEGORIES } from "@/features/help-cards/useHelpCardSearch";

export function HelpCardFilters({
  category,
  onCategoryChange,
}: {
  category: HelpCardCategoryFilter;
  onCategoryChange: (category: HelpCardCategoryFilter) => void;
}) {
  return (
    <div>
      <p className="text-sm font-bold text-[#17212b]">Choose the situation</p>
      <div
        className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filter by situation"
      >
        {HELP_CARD_CATEGORIES.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onCategoryChange(option)}
            className={hcChipClass(category === option)}
            aria-pressed={category === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
