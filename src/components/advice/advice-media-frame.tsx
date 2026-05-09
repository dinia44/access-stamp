import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pass to Next/Image `sizes` on advice grids (1–3 columns responsive). */
export const ADVICE_CARD_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

/**
 * Standard media slot for advice cards (hub, article, manual): **16:10** aspect, neutral plate,
 * clip to card corners when the parent `Card` uses `overflow-hidden`.
 */
export function AdviceMediaFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden bg-background-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
