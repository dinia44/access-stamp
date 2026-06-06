import { HERO_FLOAT_CARDS } from "@/lib/venue-finder-images";

export function HeroVisualPanel() {
  return (
    <div className="vf-hero-float-stage hidden lg:block" aria-hidden="true">
      <div className="vf-hero-float-glow" />
      {HERO_FLOAT_CARDS.map((card) => (
        <article key={card.id} className={`vf-hero-float-card ${card.offset}`}>
          <div className="vf-hero-float-card-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.photo.src} alt="" />
          </div>
          <div className="vf-hero-float-card-body">
            <p className="vf-hero-float-card-kicker">Report</p>
            <p className="vf-hero-float-card-title">{card.title}</p>
            <p className="vf-hero-float-card-report">{card.report}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Simplified mobile accent — scrollable preview chips */
export function HeroMobileAccent() {
  return (
    <div
      className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-hidden="true"
    >
      {HERO_FLOAT_CARDS.map((card) => (
        <span
          key={card.id}
          className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold"
          style={{
            borderColor: "rgba(214, 168, 79, 0.35)",
            color: "var(--vf-hero-subtitle)",
            background: "rgba(255, 255, 255, 0.08)",
          }}
        >
          {card.title}
        </span>
      ))}
    </div>
  );
}
