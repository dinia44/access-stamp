import type { HelpCard } from "@/lib/help-cards";
import { HelpCardIcon, type HelpCardIconName } from "@/features/help-cards/help-card-icons";

type SituationTile = {
  title: string;
  description: string;
  icon: HelpCardIconName;
  category: string;
};

const SITUATIONS: SituationTile[] = [
  {
    title: "Job interview",
    description: "Ask for interview adjustments before the day.",
    icon: "briefcase",
    category: "Work & interviews",
  },
  {
    title: "Work adjustments",
    description: "Explain what you need to work safely and fairly.",
    icon: "users",
    category: "Work & interviews",
  },
  {
    title: "GP appointment",
    description: "Prepare your key points before speaking to reception or a clinician.",
    icon: "stethoscope",
    category: "Healthcare appointments",
  },
  {
    title: "Hospital appointment",
    description: "Request access support, communication help, and practical adjustments.",
    icon: "hospital",
    category: "Healthcare appointments",
  },
  {
    title: "Social care assessment",
    description: "Keep the focus on daily needs, safety, and support.",
    icon: "care",
    category: "Social care",
  },
  {
    title: "Benefits assessment",
    description: "Explain functional impact clearly and consistently.",
    icon: "pound",
    category: "Benefits & assessments",
  },
  {
    title: "Visiting a venue",
    description: "Check access details before you travel.",
    icon: "venue",
    category: "Venues & travel",
  },
  {
    title: "Travel or transport issue",
    description: "Use clear wording when plans break down.",
    icon: "bus",
    category: "Venues & travel",
  },
];

function countForCategory(cards: HelpCard[], category: string) {
  const count = cards.filter((card) => card.category === category).length;
  return count > 0 ? `${count} card${count === 1 ? "" : "s"}` : "View cards";
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
      className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 max-w-[720px]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F05A1A]">Browse by moment</p>
          <h2
            id="situation-chooser-title"
            className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#132033] sm:text-4xl"
          >
            Choose the situation
          </h2>
          <p className="mt-3 text-base leading-7 text-[#68717E]">
            Find the card that matches what you need, then save it, print it, or tailor the wording.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SITUATIONS.map((situation) => (
            <button
              key={situation.title}
              type="button"
              onClick={() => onSelectCategory(situation.category)}
              className="group rounded-[28px] border border-[#EAD5C2] bg-white/72 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#F2B895] hover:bg-white hover:shadow-[0_24px_60px_rgba(19,32,51,0.10)] focus:outline-none focus:ring-4 focus:ring-[#F97316]/20"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#F2D1BE] bg-[#FFF3EA] text-[#F05A1A]">
                <HelpCardIcon name={situation.icon} className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black tracking-[-0.03em] text-[#132033]">{situation.title}</h3>
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#68717E]">{situation.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-[#F0DED0] pt-4">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-[#8A7280]">
                  {countForCategory(cards, situation.category)}
                </span>
                <span className="text-sm font-extrabold text-[#F05A1A]">Open →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
