import { HelpCardActions } from "@/components/help-cards/help-card-actions";
import { HelpCardPreview } from "@/components/help-cards/help-card-preview";
import type { HelpCard } from "@/lib/help-cards";
import { HC_EYEBROW, HC_SECTION_TITLE } from "@/components/help-cards/help-cards-theme";

export function FeaturedHelpCard({
  card,
  onOpen,
}: {
  card: HelpCard;
  onOpen?: () => void;
}) {
  return (
    <section
      id="featured-card"
      aria-labelledby="featured-help-card-title"
      className="px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-24 xl:py-[120px]"
    >
      <div className="mx-auto max-w-7xl">
        <p className={HC_EYEBROW}>Example card</p>
        <h2 id="featured-help-card-title" className={`${HC_SECTION_TITLE} mt-3`}>
          Featured help card
        </h2>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#EAD7C5] bg-[rgba(255,255,255,0.78)] shadow-[0_24px_80px_rgba(19,32,51,0.08)]">
          <div className="help-card-print-area p-5 sm:p-8 lg:p-10">
            <HelpCardPreview card={card} size="large" />
          </div>

          <div
            className="flex flex-col gap-4 border-t border-[#EAD7C5]/80 bg-[#FFF7EF]/60 px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6 lg:px-10"
            aria-label="Featured card actions"
          >
            <p className="text-sm font-medium text-[#5B6472]">
              Save, print, or tailor this card for your interview.
            </p>
            <HelpCardActions card={card} showHelper={false} onOpen={onOpen} />
          </div>
        </div>
      </div>
    </section>
  );
}
