"use client";

import { useMemo, useState } from "react";
import { getHeroSampleVenue } from "@/data/venues";
import { PageContainer } from "@/components/layout/PageContainer";

const CLEARANCE_CM = 5;

type FitState = "fits" | "tight" | "narrow";

function assessFit(chairWidthCm: number, entranceCm: number, toiletCm: number): FitState {
  const required = chairWidthCm + CLEARANCE_CM;
  if (required <= toiletCm && required <= entranceCm) return "fits";
  if (required <= entranceCm) return "tight";
  return "narrow";
}

function fitMessage(
  state: FitState,
  chair: number,
  entrance: number,
  toilet: number,
  venueName: string,
): string {
  const required = chair + CLEARANCE_CM;
  if (state === "fits") {
    return `At ${chair} cm wide (plus ${CLEARANCE_CM} cm clearance), you are under the measured toilet door (${toilet} cm) and entrance (${entrance} cm) at ${venueName}.`;
  }
  if (state === "tight") {
    return `At ${chair} cm wide you need about ${required} cm clear opening. That passes the ${entrance} cm entrance but is tight at the ${toilet} cm toilet door — worth checking approach angle on the day.`;
  }
  return `At ${chair} cm wide you need about ${required} cm clear opening. That is wider than the measured ${entrance} cm entrance at ${venueName} — ask about alternative routes or pick a venue with wider doors.`;
}

const STATE_STYLE: Record<FitState, { title: string; panel: string; text: string }> = {
  fits: {
    title: "Should fit throughout",
    panel: "border-[#5F7444]/30 bg-[#EFF3E7]",
    text: "text-[#5F7444]",
  },
  tight: {
    title: "One tight spot",
    panel: "border-[#C07F1F]/30 bg-[#FBF0DC]",
    text: "text-[#C07F1F]",
  },
  narrow: {
    title: "Likely too narrow",
    panel: "border-[#B0512E]/30 bg-[#F8E8E0]",
    text: "text-[#B0512E]",
  },
};

export function HomeWillItFitDemo() {
  const venue = getHeroSampleVenue();
  const entranceCm = venue.measurements?.entranceWidthCm ?? 90;
  const toiletCm = venue.measurements?.toiletDoorWidthCm ?? 80;
  const [chairWidth, setChairWidth] = useState(68);

  const fitState = useMemo(
    () => assessFit(chairWidth, entranceCm, toiletCm),
    [chairWidth, entranceCm, toiletCm],
  );
  const style = STATE_STYLE[fitState];

  return (
    <section className="border-t border-[#EFE5DA] bg-[#FAF4ED] py-16 sm:py-20" aria-labelledby="will-it-fit-heading">
      <PageContainer>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Try it</p>
            <h2 id="will-it-fit-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl">
              Will it fit?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#4A5263]">
              Drag the slider to compare your chair width against measured doorways at{" "}
              <strong className="font-semibold text-[#20242E]">{venue.name}</strong>. This uses real figures from
              the access report — entrance {entranceCm} cm, toilet door {toiletCm} cm, with {CLEARANCE_CM} cm
              clearance allowed.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_16px_40px_-20px_rgba(122,80,48,0.18)] sm:p-8">
            <label htmlFor="chair-width-slider" className="block text-sm font-semibold text-[#20242E]">
              Chair width (outer, cm)
            </label>
            <div className="mt-4 flex items-center gap-4">
              <input
                id="chair-width-slider"
                type="range"
                min={55}
                max={95}
                step={1}
                value={chairWidth}
                onChange={(e) => setChairWidth(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-[#EF5B25]"
                aria-valuemin={55}
                aria-valuemax={95}
                aria-valuenow={chairWidth}
                aria-valuetext={`${chairWidth} centimetres`}
              />
              <span className="w-14 shrink-0 text-right text-lg font-semibold tabular-nums text-[#20242E]">
                {chairWidth}
              </span>
            </div>

            <div
              role="status"
              aria-live="polite"
              className={`mt-6 rounded-2xl border p-5 ${style.panel}`}
            >
              <p className={`text-sm font-semibold ${style.text}`}>{style.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#4A5263]">
                {fitMessage(fitState, chairWidth, entranceCm, toiletCm, venue.name)}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
