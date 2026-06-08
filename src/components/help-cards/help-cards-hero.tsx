import { FadeIn } from "@/components/fade-in";
import { homeChipClass } from "@/components/home/home-theme";

const BENEFITS = ["Save to phone", "Print and carry", "Tailor with AI"] as const;

function StackedCardsGraphic() {
  return (
    <div className="relative mx-auto flex h-[280px] w-full max-w-md items-center justify-center sm:h-[320px] lg:max-w-none" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320" fill="none">
        <path d="M40 240 Q200 180 360 240" stroke="#F04A16" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 8" />
        <path d="M60 80 Q200 40 340 100" stroke="#59682A" strokeOpacity="0.12" strokeWidth="2" />
        <circle cx="320" cy="60" r="4" fill="#F04A16" fillOpacity="0.35" />
        <circle cx="80" cy="200" r="3" fill="#59682A" fillOpacity="0.35" />
        <circle cx="360" cy="180" r="5" fill="#F04A16" fillOpacity="0.2" />
      </svg>

      <div className="absolute left-[8%] top-[18%] w-[58%] rotate-[-8deg] rounded-2xl border border-[#F1D8C7] bg-[#FFF3E8] p-4 shadow-[0_20px_50px_-20px_rgba(89,104,42,0.25)] transition-transform duration-500 motion-safe:hover:-translate-y-1">
        <div className="h-1 w-12 rounded-full bg-[#59682A]/40" />
        <div className="mt-3 space-y-2">
          <div className="h-2 w-3/4 rounded bg-[#13201F]/10" />
          <div className="h-2 w-1/2 rounded bg-[#13201F]/8" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="h-10 rounded-lg border border-[#F1D8C7] bg-white/70" />
          <div className="h-10 rounded-lg border border-[#F1D8C7] bg-white/70" />
        </div>
      </div>

      <div className="absolute right-[6%] top-[28%] w-[54%] rotate-[6deg] rounded-2xl border border-[#F1D8C7] bg-white p-4 shadow-[0_24px_60px_-24px_rgba(240,74,22,0.2)] transition-transform duration-500 motion-safe:hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#F04A16]">Access Stamp</span>
          <span className="rounded-full border border-[#F1D8C7] px-2 py-0.5 text-[9px] font-semibold text-[#5E6A66]">Help Card</span>
        </div>
        <p className="mt-2 text-sm font-bold text-[#13201F]">Interview access</p>
        <div className="mt-3 h-px bg-gradient-to-r from-[#F04A16] to-transparent" />
        <div className="mt-3 space-y-1.5">
          <div className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04A16]" />
            <span className="text-[11px] text-[#2A3836]">Ask who owns adjustments</span>
          </div>
          <div className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04A16]" />
            <span className="text-[11px] text-[#2A3836]">Confirm step-free access</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[22%] top-[8%] w-[62%] rotate-[-2deg] rounded-2xl border-2 border-[#F04A16]/30 bg-[#FFF8F1] p-4 shadow-[0_28px_70px_-28px_rgba(240,74,22,0.35)] ring-1 ring-[#F04A16]/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFE2D3] text-xs font-bold text-[#F04A16]">AS</div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#F04A16]">Access Stamp</p>
            <p className="text-[10px] font-semibold text-[#59682A]">Work • Interview</p>
          </div>
        </div>
        <p className="mt-3 text-base font-bold leading-snug text-[#13201F]">Help Card</p>
        <p className="mt-1 text-xs text-[#5E6A66]">Save, print, or carry in meetings</p>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-[#FFE2D3] px-2.5 py-1 text-[10px] font-semibold text-[#D93E10]">PNG</span>
          <span className="rounded-full border border-[#F1D8C7] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#13201F]">Print</span>
        </div>
      </div>
    </div>
  );
}

export function HelpCardsHero() {
  return (
    <FadeIn>
      <section className="relative overflow-hidden rounded-3xl border border-[#F1D8C7] bg-gradient-to-br from-[#FFE8D6]/60 via-[#FFF8F1] to-[#FFF3E8] p-6 sm:p-8 md:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F04A16]">Downloadable support tools</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#13201F] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
              Help cards you can{" "}
              <span className="text-[#59682A]">save, print, and carry</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#2A3836] sm:text-lg">
              Pre-built cards for real-life access situations — work, travel, care, education, rights, and emergencies.
              Save them to your phone, print them, or tailor them with AI.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {BENEFITS.map((benefit) => (
                <li key={benefit}>
                  <span className={homeChipClass(false)}>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block">
            <StackedCardsGraphic />
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
