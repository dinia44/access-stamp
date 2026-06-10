import type { Metadata } from "next";
import Link from "next/link";
import "./help-cards.css";
import { helpCardPacks } from "@/data/helpCardPacks";
import { HelpCardPackPreview } from "@/components/help-cards/HelpCardComponents";
import { SetChatContext } from "@/components/chat/set-context";

export const metadata: Metadata = {
  title: "Help Cards",
  description:
    "Say the right thing when access fails. Practical disability access cards for interviews, appointments, travel, care reviews and difficult conversations.",
};

const cardTypes = [
  {
    title: "Quick scripts",
    description: "Short wording for what to say in the moment.",
  },
  {
    title: "Adjustment cards",
    description: "Structured prompts for asking for changes or support.",
  },
  {
    title: "Evidence summaries",
    description: "Formal source-backed cards for what to show.",
  },
  {
    title: "Carry-with checklists",
    description: "Simple lists of documents, notes or evidence to bring.",
  },
  {
    title: "Emergency cards",
    description: "Very short, high-contrast cards for high-pressure moments.",
  },
];

export default function Page() {
  return (
    <>
      <SetChatContext page={{ kind: "none" }} />
      <main className="hc-landing min-h-screen bg-[#FFF7EF] text-[#132033]">
        <HelpCardsHero />
        <CardTypesExplainer />
        <FeaturedPacks />
        <BuildPackSection />
        <TrustStrip />
      </main>
    </>
  );
}

function HelpCardsHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#EED8C6] bg-[radial-gradient(circle_at_74%_34%,rgba(249,115,22,0.14),transparent_34%),linear-gradient(180deg,#FFF1E6_0%,#FFF8F1_56%,#FFF7EF_100%)]">
      <div className="pointer-events-none absolute right-0 top-24 h-[520px] w-[520px] rounded-full bg-[#F97316]/10 blur-3xl" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[0.48fr_0.52fr] lg:gap-16 lg:px-10 lg:py-24">
        <div className="relative z-10 max-w-[680px]">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-[#F05A1A] sm:text-sm">
            Pocket-sized support tools
          </p>

          <h1 className="max-w-[760px] text-balance text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.93] tracking-[-0.065em] text-[#132033]">
            Practical card packs for difficult access moments<span className="text-[#F05A1A]">.</span>
          </h1>

          <p className="mt-7 max-w-[620px] text-pretty text-lg leading-8 text-[#5F6875] sm:text-xl sm:leading-9">
            Choose a situation and get the words, evidence summary, checklist and printable support cards you need.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#packs"
              className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#F04E16] px-7 text-base font-extrabold text-white shadow-[0_18px_40px_rgba(240,78,22,0.28)] transition hover:-translate-y-0.5 hover:bg-[#E34612] focus:outline-none focus:ring-4 focus:ring-[#F97316]/30"
            >
              Build my card pack
            </Link>

            <Link
              href="#card-types"
              className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#D8BFA9] bg-white/70 px-7 text-base font-extrabold text-[#132033] shadow-sm transition hover:-translate-y-0.5 hover:border-[#F05A1A] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#F97316]/20"
            >
              See card types
            </Link>
          </div>

          <div className="mt-6 inline-flex max-w-full items-start gap-3 rounded-2xl border border-[#E6D2BF] bg-white/58 px-5 py-4 text-sm font-semibold leading-6 text-[#5F6875] shadow-sm backdrop-blur">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
              ✓
            </span>
            <span>
              Quick scripts for what to say. Evidence cards for what to show. Checklists for what to bring.
            </span>
          </div>
        </div>

        <HeroPackVisual />
      </div>
    </section>
  );
}

function HeroPackVisual() {
  return (
    <div className="relative z-10 mx-auto h-[520px] w-full max-w-[650px] lg:h-[560px]">
      <div className="absolute inset-x-10 top-10 h-[430px] rounded-full bg-[#F97316]/10 blur-3xl" />

      <article className="hc-hero-float-a absolute right-4 top-8 h-[190px] w-[min(430px,calc(100%-1rem))] rotate-[-5deg] rounded-[30px] border border-[#EAD5C2] bg-white/82 p-7 shadow-[0_28px_80px_rgba(19,32,51,0.12)] backdrop-blur sm:right-20">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#F05A1A]">
          Evidence Summary
        </p>
        <h3 className="mt-5 text-2xl font-black text-[#132033]">
          Section 88 driving licence
        </h3>
        <p className="mt-3 text-sm font-semibold text-[#68717E]">
          Source-backed. Not a legal document.
        </p>
      </article>

      <article className="hc-hero-float-b absolute right-0 top-[132px] h-[180px] w-[min(420px,calc(100%-0.5rem))] rotate-[4deg] rounded-[30px] border border-[#EAD5C2] bg-white/88 p-7 shadow-[0_28px_80px_rgba(19,32,51,0.12)] backdrop-blur">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#F05A1A]">
          Quick Script
        </p>
        <p className="mt-5 text-lg font-black leading-7 text-[#132033]">
          “I need time to explain my access needs clearly.”
        </p>
      </article>

      <article className="hc-hero-float-c absolute bottom-10 right-0 w-[min(500px,100%)] rotate-[-2deg] rounded-[34px] border border-[#EAD5C2] bg-white p-6 shadow-[0_34px_90px_rgba(19,32,51,0.18)] sm:right-12 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F05A1A]">
            Access Stamp
          </p>
          <span className="rounded-full border border-[#F3C8B0] bg-[#FFF7EF] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#F05A1A]">
            Card pack
          </span>
        </div>

        <p className="mt-5 text-base font-semibold text-[#5F6875]">
          Work & interviews
        </p>

        <div className="my-5 h-px bg-[#EED8C6]" />

        <h2 className="text-2xl font-black tracking-[-0.03em] text-[#132033]">
          Job interview adjustment pack
        </h2>

        <div className="mt-6 grid gap-3">
          {["Quick script", "Adjustment request", "Evidence checklist", "Follow-up wording"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#F2D1BE] bg-[#FFF7EF] px-4 py-3 text-sm font-black text-[#132033]"
              >
                {item}
              </div>
            )
          )}
        </div>
      </article>
    </div>
  );
}

function CardTypesExplainer() {
  return (
    <section id="card-types" className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 max-w-[760px]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F05A1A]">
            Not just one card
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#132033] sm:text-5xl">
            Each pack gives you the right card for the moment.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#68717E]">
            A quick script helps you speak. An evidence summary helps you show. A checklist helps you prepare.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {cardTypes.map((type) => (
            <article
              key={type.title}
              className="rounded-[28px] border border-[#EAD5C2] bg-white/72 p-6 shadow-sm"
            >
              <h3 className="text-lg font-black tracking-[-0.03em] text-[#132033]">
                {type.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#68717E]">
                {type.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPacks() {
  return (
    <section id="packs" className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F05A1A]">
              Choose the situation
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#132033] sm:text-5xl">
              Featured card packs
            </h2>
            <p className="mt-4 max-w-[680px] text-base leading-7 text-[#68717E]">
              Start with the situations where clear wording and evidence matter most.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {helpCardPacks.map((pack) => (
            <HelpCardPackPreview key={pack.slug} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildPackSection() {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] gap-8 rounded-[36px] border border-[#EAD5C2] bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(255,243,234,0.78))] p-6 shadow-sm md:grid-cols-[0.6fr_0.4fr] sm:p-8 lg:p-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F05A1A]">
            Coming next
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#132033] sm:text-4xl">
            Build a personalised pack.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#68717E]">
            The AI layer should tailor approved card templates. It should not invent law, medical advice or official rules.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#EAD5C2] bg-white/76 p-6">
          <ol className="space-y-4">
            {[
              "Choose a situation",
              "Pick what you need: say, show, bring or send",
              "Add personal access needs",
              "Generate a printable card pack",
            ].map((step, index) => (
              <li key={step} className="flex gap-3 text-sm font-bold leading-6 text-[#132033]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F05A1A] text-xs text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="px-5 pb-20 pt-4 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px] rounded-[30px] border border-[#EAD5C2] bg-white/70 p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-5">
          {["Source-backed", "Plain English", "Printable", "Saveable", "Disability-led"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#F0DED0] bg-[#FFFDF9] px-4 py-4 text-center text-sm font-black text-[#132033]"
              >
                {item}
              </div>
            )
          )}
        </div>

        <p className="mt-5 text-center text-sm leading-6 text-[#68717E]">
          Access Stamp provides practical prompts and source-backed summaries. It does not provide medical, legal or financial advice.
        </p>
      </div>
    </section>
  );
}
