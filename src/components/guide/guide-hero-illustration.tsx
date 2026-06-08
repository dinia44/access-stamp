import Image from "next/image";
import { cn } from "@/lib/utils";

type GuideHeroIllustrationProps = {
  heroImageUrl?: string;
  alt?: string;
  reducedMotion?: boolean;
  className?: string;
};

export function GuideHeroIllustration({
  heroImageUrl,
  alt = "Guide illustration",
  reducedMotion = false,
  className,
}: GuideHeroIllustrationProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-[#F1D8C7] bg-gradient-to-br from-[#FFFDF9] via-[#FFF3E8] to-[#FFE2D3] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_12px_32px_-16px_rgba(240,74,22,0.18)]",
        !reducedMotion && "guide-hero-float",
        className,
      )}
      aria-hidden={!heroImageUrl}
    >
      {heroImageUrl ? (
        <Image src={heroImageUrl} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 420px" priority />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {/* Clipboard / checklist */}
          <div className="absolute left-[14%] top-[16%] h-[52%] w-[38%] rounded-2xl border border-[#F1D8C7] bg-white/90 shadow-md">
            <div className="border-b border-[#F1D8C7] px-3 py-2">
              <div className="h-2 w-2/3 rounded-full bg-[#FFE2D3]" />
            </div>
            <div className="space-y-2 p-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded border border-[#C8E6C9] bg-[#EDF7ED]" />
                  <span className="h-2 flex-1 rounded-full bg-[#FFF3E8]" />
                </div>
              ))}
            </div>
          </div>

          {/* Pen */}
          <div className="absolute bottom-[18%] right-[22%] h-16 w-3 rotate-[35deg] rounded-full bg-gradient-to-b from-[#F04A16] to-[#D93E10] shadow-sm" />
          <div className="absolute bottom-[16%] right-[19%] h-4 w-4 rotate-[35deg] rounded-sm bg-[#13201F]/80" />

          {/* Access / support icon */}
          <div className="absolute right-[12%] top-[14%] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F04A16] text-xl text-white shadow-lg shadow-[#F04A16]/25">
            ✦
          </div>

          {/* Olive leaf accents */}
          <div className="absolute bottom-[12%] left-[10%] h-10 w-10 rounded-full bg-[#59682A]/15 blur-[1px]" />
          <div className="absolute left-[8%] top-[28%] h-6 w-12 rotate-[-25deg] rounded-full bg-[#59682A]/20" />
          <div className="absolute right-[8%] bottom-[28%] h-5 w-10 rotate-[20deg] rounded-full bg-[#59682A]/15" />
        </div>
      )}
    </div>
  );
}
