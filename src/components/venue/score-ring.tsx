type ScoreRingProps = {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASSES = {
  sm: "h-16 w-16 text-lg",
  md: "h-[76px] w-[76px] text-xl xl:h-[84px] xl:w-[84px] xl:text-2xl",
  lg: "h-24 w-24 text-3xl",
} as const;

/** Plain olive access-score ring — decorative; pair with visible ScoreDisplay text. */
export function ScoreRing({ score, size = "md", className = "" }: ScoreRingProps) {
  return (
    <div className={`flex shrink-0 flex-col items-center ${className}`} aria-hidden>
      <div
        className={`relative flex items-center justify-center rounded-full border-4 border-[#5F7444] font-[family-name:var(--font-heading)] font-medium text-[#20242E] ${SIZE_CLASSES[size]}`}
      >
        {score}%
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#76808F]">
        Access score
      </span>
    </div>
  );
}
