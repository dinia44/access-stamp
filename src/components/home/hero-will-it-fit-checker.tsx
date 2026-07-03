"use client";

import { useMemo, useState } from "react";
import { getHeroSampleVenue } from "@/data/venues";

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

export function HeroWillItFitChecker() {
  const venue = getHeroSampleVenue();
  const entranceCm = venue.measurements?.entranceWidthCm ?? 90;
  const toiletCm = venue.measurements?.toiletDoorWidthCm ?? 80;
  const [chairWidth, setChairWidth] = useState(68);

  const fitState = useMemo(
    () => assessFit(chairWidth, entranceCm, toiletCm),
    [chairWidth, entranceCm, toiletCm],
  );
  const style = STATE_STYLE[fitState];
  const doorwayLabel = `Doorway opening ${entranceCm} centimetres wide, chair set to ${chairWidth} centimetres`;

  return (
    <div className="rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_16px_40px_-20px_rgba(122,80,48,0.18)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Will it fit?</p>
      <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.03em] text-[#20242E]">
        Try our doorway checker
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#4A5263]">
        Compare your chair width against measured doorways at{" "}
        <strong className="font-semibold text-[#20242E]">{venue.name}</strong>.
      </p>

      <div
        className="mt-5 flex items-end justify-center gap-3 rounded-2xl border border-[#EFE5DA] bg-[#FAF4ED] px-4 py-5"
        role="img"
        aria-label={doorwayLabel}
      >
        <div className="relative flex h-24 w-16 items-end justify-center border-x-4 border-t-4 border-[#20242E] bg-[#FDFBF8]">
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#EF5B25]/25 transition-all duration-200"
            style={{ height: `${Math.min(100, (chairWidth / entranceCm) * 100)}%` }}
            aria-hidden="true"
          />
          <span className="absolute -bottom-6 text-xs font-medium tabular-nums text-[#4A5263]" aria-hidden="true">
            {entranceCm} cm
          </span>
        </div>
        <div className="flex flex-col items-center gap-1" aria-hidden="true">
          <div
            className="rounded-sm bg-[#EF5B25] transition-all duration-200"
            style={{ width: `${Math.min(72, chairWidth * 0.7)}px`, height: "28px" }}
          />
          <span className="text-xs font-semibold tabular-nums text-[#20242E]">{chairWidth} cm</span>
        </div>
      </div>

      <label htmlFor="hero-chair-width-slider" className="mt-5 block text-sm font-semibold text-[#20242E]">
        Chair width (outer, cm)
      </label>
      <div className="mt-3 flex items-center gap-4">
        <input
          id="hero-chair-width-slider"
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

      <div role="status" aria-live="polite" className={`mt-5 rounded-2xl border p-4 ${style.panel}`}>
        <p className={`text-sm font-semibold ${style.text}`}>{style.title}</p>
        <p className="mt-1.5 text-sm leading-6 text-[#4A5263]">
          {fitMessage(fitState, chairWidth, entranceCm, toiletCm, venue.name)}
        </p>
      </div>
    </div>
  );
}
