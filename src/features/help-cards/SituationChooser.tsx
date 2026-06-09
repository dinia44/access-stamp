import type { HelpCard } from "@/lib/help-cards";
import { HelpCardIcon, type HelpCardIconName } from "@/features/help-cards/help-card-icons";
import {
  HC_EYEBROW,
  HC_FOCUS,
  HC_MUTED_SM,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

type SituationTile = {
  title: string;
  description: string;
  icon: HelpCardIconName;
  category: string;
};

const SITUATIONS: SituationTile[] = [
  {
    title: "Job interview",
    description: "Request interview adjustments and confirm access before the day.",
    icon: "briefcase",
    category: "Work & interviews",
  },
  {
    title: "Work adjustments",
    description: "Ask for reasonable changes at work or during recruitment.",
    icon: "users",
    category: "Work & interviews",
  },
  {
    title: "GP appointment",
    description: "Record communication needs and ask for appointment access.",
    icon: "stethoscope",
    category: "Healthcare appointments",
  },
  {
    title: "Hospital appointment",
    description: "Get clear wording for NHS access and communication support.",
    icon: "hospital",
    category: "Healthcare appointments",
  },
  {
    title: "Social care assessment",
    description: "Prepare for council needs assessments with evidence and outcomes.",
    icon: "care",
    category: "Social care",
  },
  {
    title: "Benefits assessment",
    description: "Explain daily living and mobility impact for PIP or reviews.",
    icon: "pound",
    category: "Benefits & assessments",
  },
  {
    title: "Visiting a venue",
    description: "Confirm step-free access, toilets and parking before you travel.",
    icon: "venue",
    category: "Venues & travel",
  },
  {
    title: "Travel or transport issue",
    description: "Handle access failures, parking challenges and travel barriers.",
    icon: "bus",
    category: "Venues & travel",
  },
];

function countForCategory(cards: HelpCard[], category: string) {
  return cards.filter((card) => card.category === category).length;
}

export function SituationChooser({
  cards,
  onSelectCategory,
}: {
  cards: HelpCard[];
  onSelectCategory: (category: string) => void;
}) {
  return (
    <section
      id="situations"
      aria-labelledby="situation-chooser-title"
      className="px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-24 xl:py-[120px]"
    >
      <div className="mx-auto max-w-7xl">
        <p className={HC_EYEBROW}>Choose your moment</p>
        <h2 id="situation-chooser-title" className={`${HC_SECTION_TITLE} mt-3`}>
          What situation are you preparing for?
        </h2>
        <p className={`${HC_MUTED_SM} mt-3 max-w-2xl text-base leading-7`}>
          Choose a moment and get the card wording you need quickly.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SITUATIONS.map((situation) => {
            const count = countForCategory(cards, situation.category);
            return (
              <li key={situation.title}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(situation.category)}
                  className={`group flex h-full min-h-[168px] w-full flex-col rounded-2xl border border-[#EAD7C5] bg-[rgba(255,255,255,0.78)] p-5 text-left shadow-[0_8px_32px_rgba(19,32,51,0.05)] transition hover:-translate-y-1 hover:border-[#F97316]/40 hover:shadow-[0_16px_48px_rgba(19,32,51,0.08)] ${HC_FOCUS}`}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7EF] text-[#132033] transition group-hover:bg-[#F97316]/10 group-hover:text-[#F97316]">
                    <HelpCardIcon name={situation.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-snug text-[#132033]">
                    {situation.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#5B6472]">
                    {situation.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[#F97316]">
                    {count > 0 ? `${count} card${count === 1 ? "" : "s"}` : "View cards"}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
