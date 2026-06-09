"use client";

const BTN_PRIMARY =
  "inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#F04E16] px-7 text-base font-extrabold text-white shadow-[0_18px_40px_rgba(240,78,22,0.28)] transition hover:-translate-y-0.5 hover:bg-[#E34612] focus:outline-none focus:ring-4 focus:ring-[#F97316]/30";

const BTN_SECONDARY =
  "inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#D8BFA9] bg-white/70 px-7 text-base font-extrabold text-[#132033] shadow-sm transition hover:-translate-y-0.5 hover:border-[#F05A1A] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#F97316]/20";

function ProductCardStack() {
  return (
    <div
      className="relative z-10 mx-auto h-[420px] w-full max-w-[650px] sm:h-[480px] lg:h-[560px]"
      aria-hidden="true"
    >
      <div className="absolute left-6 top-6 hidden rounded-2xl border border-[#E8D5C3] bg-white/72 px-5 py-4 text-sm font-bold text-[#132033] shadow-xl backdrop-blur md:block">
        <span className="mr-2 text-[#F05A1A]">♡</span>
        Save
      </div>
      <div className="absolute right-2 top-20 hidden rounded-2xl border border-[#E8D5C3] bg-white/80 px-5 py-4 text-sm font-bold text-[#132033] shadow-xl backdrop-blur md:block">
        <span className="mr-2 text-[#F05A1A]">⎙</span>
        Print
      </div>
      <div className="absolute left-0 top-[240px] hidden rounded-2xl border border-[#E8D5C3] bg-white/78 px-5 py-4 text-sm font-bold leading-5 text-[#132033] shadow-xl backdrop-blur md:block">
        <span className="mr-2 text-[#F05A1A]">✦</span>
        Tailor
        <br />
        with AI
      </div>
      <div className="absolute bottom-20 right-0 hidden rounded-2xl border border-[#E8D5C3] bg-white/80 px-5 py-4 text-sm font-bold text-[#132033] shadow-xl backdrop-blur md:block">
        <span className="mr-2 text-[#F05A1A]">□</span>
        Copy line
      </div>

      <div className="absolute inset-x-6 top-8 h-[360px] rounded-full bg-[#F97316]/10 blur-3xl lg:inset-x-10 lg:top-10 lg:h-[430px]" />

      <article className="absolute right-8 top-6 h-[160px] w-[min(100%,380px)] rotate-[-5deg] rounded-[30px] border border-[#EAD5C2] bg-white/82 p-6 shadow-[0_28px_80px_rgba(19,32,51,0.12)] backdrop-blur sm:right-16 sm:top-8 sm:h-[190px] sm:w-[430px] sm:p-7">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#F05A1A]">Access evidence</p>
        <div className="mt-4 space-y-2 text-base font-medium text-[#6B7280] sm:mt-5 sm:space-y-3">
          <p>Medical letters</p>
          <p>Adjustment history</p>
          <p className="text-[#9AA1AB]">Notes and examples</p>
        </div>
      </article>

      <article className="absolute right-0 top-[108px] h-[150px] w-[min(100%,360px)] rotate-[4deg] rounded-[30px] border border-[#EAD5C2] bg-white/88 p-6 shadow-[0_28px_80px_rgba(19,32,51,0.12)] backdrop-blur sm:top-[132px] sm:h-[180px] sm:w-[420px] sm:p-7">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#F05A1A]">Helpful ask</p>
        <div className="mt-4 space-y-2 text-base font-medium text-[#6B7280] sm:mt-5 sm:space-y-3">
          <p>Is the room step-free?</p>
          <p>Can I have extra time?</p>
        </div>
      </article>

      <article className="absolute bottom-6 right-4 w-[min(100%,480px)] rotate-[-2deg] rounded-[34px] border border-[#EAD5C2] bg-white p-6 shadow-[0_34px_90px_rgba(19,32,51,0.18)] sm:bottom-10 sm:right-12 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F05A1A]">Access Stamp</p>
          <span className="rounded-full border border-[#F3C8B0] bg-[#FFF7EF] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#F05A1A]">
            Help card
          </span>
        </div>
        <p className="mt-4 text-base font-semibold text-[#5F6875] sm:mt-5">Work & interviews</p>
        <div className="my-4 h-px bg-[#EED8C6] sm:my-5" />
        <h2 className="text-xl font-black tracking-[-0.03em] text-[#132033] sm:text-2xl">
          Job interview adjustment card
        </h2>
        <p className="mt-3 max-w-[390px] text-base leading-7 text-[#626B78] sm:mt-4 sm:text-lg sm:leading-8">
          I&apos;m asking for reasonable adjustments so I can take part fairly.
        </p>
        <div className="mt-5 rounded-3xl border border-[#F2D1BE] bg-[#FFF7EF] p-4 text-sm font-bold leading-7 text-[#132033] sm:mt-6 sm:p-5 sm:text-base">
          <span className="mr-2 text-2xl leading-none text-[#F05A1A]">&ldquo;</span>
          I&apos;m asking for reasonable adjustments so I can take part in the interview fairly.
        </div>
      </article>
    </div>
  );
}

export function HelpCardsHero({
  onBrowse,
  onBuildPack,
}: {
  onBrowse?: () => void;
  onBuildPack?: () => void;
}) {
  return (
    <section
      aria-labelledby="help-cards-hero-title"
      className="relative overflow-hidden border-b border-[#EED8C6] bg-[radial-gradient(circle_at_74%_34%,rgba(249,115,22,0.14),transparent_34%),linear-gradient(180deg,#FFF1E6_0%,#FFF8F1_56%,#FFF7EF_100%)]"
    >
      <div className="pointer-events-none absolute right-0 top-24 h-[520px] w-[520px] rounded-full bg-[#F97316]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-12 top-32 hidden h-[360px] w-[360px] rounded-full border border-[#F97316]/10 lg:block" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.48fr_0.52fr] lg:gap-16 lg:px-10 lg:py-20 xl:py-24">
        <div className="relative z-10 max-w-[680px] pb-4 sm:pb-0">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-[#F05A1A] sm:text-sm">
            Pocket-sized support tools
          </p>
          <h1
            id="help-cards-hero-title"
            className="max-w-[720px] text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-black leading-[0.93] tracking-[-0.065em] text-[#132033] xl:text-[clamp(3.7rem,7vw,7rem)]"
          >
            Say the right thing when access fails<span className="text-[#F05A1A]">.</span>
          </h1>
          <p className="mt-6 max-w-[610px] text-pretty text-lg leading-8 text-[#5F6875] sm:mt-7 sm:text-xl sm:leading-9">
            Practical disability access cards for interviews, appointments, travel, care reviews and
            difficult conversations.
          </p>
          <p className="mt-4 max-w-[610px] text-base leading-7 text-[#6D7480] sm:text-lg">
            Pick a situation. Save the card. Show it, read it, print it, or tailor it with AI.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row">
            {onBuildPack ? (
              <button type="button" onClick={onBuildPack} className={BTN_PRIMARY}>
                <span aria-hidden="true">▣</span>
                Build my card pack
              </button>
            ) : (
              <a href="#card-packs" className={BTN_PRIMARY}>
                <span aria-hidden="true">▣</span>
                Build my card pack
              </a>
            )}
            {onBrowse ? (
              <button type="button" onClick={onBrowse} className={BTN_SECONDARY}>
                <span aria-hidden="true">⌕</span>
                Browse all cards
              </button>
            ) : (
              <a href="#situations" className={BTN_SECONDARY}>
                <span aria-hidden="true">⌕</span>
                Browse all cards
              </a>
            )}
          </div>

          <div className="mt-6 inline-flex max-w-full items-start gap-3 rounded-2xl border border-[#E6D2BF] bg-white/58 px-5 py-4 text-sm font-semibold leading-6 text-[#5F6875] shadow-sm backdrop-blur">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
              ✓
            </span>
            <span>
              Created with disabled people and access experts. Source-backed practical prompts — not
              legal advice.
            </span>
          </div>
        </div>

        <ProductCardStack />
      </div>
    </section>
  );
}
