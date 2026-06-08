"use client";

import { cn } from "@/lib/utils";

type GuideProgressStepperProps = {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  onJumpToStep?: (step: number) => void;
  className?: string;
};

export function GuideProgressStepper({
  currentStep,
  totalSteps,
  stepLabels = [],
  onJumpToStep,
  className,
}: GuideProgressStepperProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#F1D8C7] bg-white px-4 py-4 shadow-[var(--shadow-soft)] sm:px-5 sm:py-5",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Your progress</p>
          <p className="mt-0.5 text-sm font-bold text-heading">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        <label className="flex items-center gap-2 sm:shrink-0">
          <span className="sr-only">Jump to step</span>
          <select
            className="min-h-[44px] rounded-xl border border-[#F1D8C7] bg-[#FFF8F1] px-3 py-2 text-sm font-semibold text-heading focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
            value={currentStep}
            onChange={(e) => onJumpToStep?.(Number(e.target.value))}
          >
            <option value="" disabled>
              Jump to step
            </option>
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                Step {n}
                {stepLabels[n - 1] ? `: ${stepLabels[n - 1]}` : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ol
        className="mt-5 flex items-center gap-0 overflow-x-auto pb-1"
        aria-label={`Guide progress: step ${currentStep} of ${totalSteps}`}
      >
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const label = stepLabels[i] ?? `Step ${stepNum}`;

          return (
            <li key={stepNum} className="flex min-w-[2.75rem] flex-1 items-center last:flex-none last:min-w-0">
              <button
                type="button"
                onClick={() => onJumpToStep?.(stepNum)}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2",
                  isComplete || isCurrent
                    ? "bg-[#F04A16] text-white shadow-sm shadow-[#F04A16]/25"
                    : "border-2 border-[#E8C4A8] bg-white text-muted",
                )}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`${label}${isComplete ? ", completed" : isCurrent ? ", current" : ""}`}
              >
                {isComplete ? (
                  <span aria-hidden>✓</span>
                ) : (
                  stepNum
                )}
              </button>
              {stepNum < totalSteps ? (
                <span
                  className={cn(
                    "mx-1 h-0.5 min-w-[1rem] flex-1 rounded-full",
                    stepNum < currentStep ? "bg-[#F04A16]/60" : "border-t-2 border-dashed border-[#E8C4A8]",
                  )}
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
