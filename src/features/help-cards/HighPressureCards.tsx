import type { HelpCard } from "@/lib/help-cards";
import { HelpCardIcon, type HelpCardIconName } from "@/features/help-cards/help-card-icons";
import {
  HC_BTN_SECONDARY,
  HC_EYEBROW,
  HC_FOCUS,
  HC_MUTED_SM,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

type HighPressureItem = {
  label: string;
  slug: string;
  icon: HelpCardIconName;
  description: string;
};

const HIGH_PRESSURE_ITEMS: HighPressureItem[] = [
  {
    label: "Stopped by police",
    slug: "section-88-driving-licence",
    icon: "shield",
    description: "Stay calm and explain your situation with clear, source-backed wording.",
  },
  {
    label: "Section 88 driving licence",
    slug: "section-88-driving-licence",
    icon: "car",
    description: "When DVLA is processing your licence and you need to explain Section 88.",
  },
  {
    label: "Blue Badge issue",
    slug: "blue-badge-issue",
    icon: "badge",
    description: "Record the facts calmly during a parking challenge or PCN.",
  },
  {
    label: "Communication support",
    slug: "communication-support-card",
    icon: "chat",
    description: "Ask for time, written information, or support to communicate clearly.",
  },
  {
    label: "Please give me time to respond",
    slug: "communication-support-card",
    icon: "clock",
    description: "A quick line when you need space to process and reply.",
  },
];

export function HighPressureCards({
  cardsBySlug,
  onOpenCard,
}: {
  cardsBySlug: Map<string, HelpCard>;
  onOpenCard: (slug: string) => void;
}) {
  const items = HIGH_PRESSURE_ITEMS.filter((item) => cardsBySlug.has(item.slug));
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="high-pressure-cards-title"
      className="px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-24 xl:py-[120px]"
    >
      <div className="mx-auto max-w-7xl">
        <p className={HC_EYEBROW}>Urgent moments</p>
        <h2 id="high-pressure-cards-title" className={`${HC_SECTION_TITLE} mt-3`}>
          High-pressure cards
        </h2>
        <p className={`${HC_MUTED_SM} mt-3 max-w-2xl text-base leading-7`}>
          For moments where you need clear wording quickly.
        </p>

        <div className="-mx-5 mt-10 flex gap-4 overflow-x-auto px-5 pb-2 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item) => (
            <article
              key={item.label}
              className="flex w-[min(280px,78vw)] shrink-0 snap-start flex-col rounded-2xl border border-[#EAD7C5] bg-[rgba(255,255,255,0.78)] p-5 shadow-[0_8px_32px_rgba(19,32,51,0.05)] sm:w-auto"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7EF] text-[#132033]">
                <HelpCardIcon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug text-[#132033]">{item.label}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[#5B6472]">{item.description}</p>
              <button
                type="button"
                onClick={() => onOpenCard(item.slug)}
                className={`${HC_BTN_SECONDARY} mt-5 w-full sm:w-auto ${HC_FOCUS}`}
                aria-label={`Open ${item.label} help card`}
              >
                Open card
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
