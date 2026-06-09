import { FadeIn } from "@/components/fade-in";
import { HelpCardActions } from "@/components/help-cards/help-card-actions";
import { HelpCardPreview } from "@/components/help-cards/help-card-preview";
import type { HelpCard } from "@/lib/help-cards";
import {
  HC_EYEBROW,
  HC_IMPORTANT_SECTION,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

const FEATURED_BENEFITS = [
  "Ask the right questions before the interview",
  "Carry a source-backed quick line",
  "Save or print in seconds",
] as const;

export function FeaturedHelpCard({ card }: { card: HelpCard }) {
  return (
    <FadeIn>
      <section aria-labelledby="featured-help-card" className={`${HC_IMPORTANT_SECTION} p-5 sm:p-7 lg:p-9`}>
        <p className={HC_EYEBROW}>Featured help card</p>
        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="help-card-print-area">
            <HelpCardPreview card={card} size="large" />
          </div>
          <div>
            <h2 id="featured-help-card" className={`${HC_SECTION_TITLE} text-[clamp(1.8rem,3vw,2.5rem)]`}>
              {card.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5f6b76]">{card.useThisWhen ?? card.summary}</p>
            <ul className="mt-6 space-y-3">
              {FEATURED_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-base font-semibold leading-6 text-[#17212b]">
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ef5b2a]/15 text-xs font-bold text-[#ef5b2a]"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <HelpCardActions card={card} />
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
