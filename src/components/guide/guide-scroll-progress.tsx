"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type GuideScrollProgressProps = {
  className?: string;
};

export function GuideScrollProgress({ className }: GuideScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn("pointer-events-none fixed inset-x-0 top-16 z-40 h-0.5 bg-[#F1D8C7]/60 lg:top-[4.5rem]", className)}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Guide reading progress"
    >
      <div
        className="h-full origin-left bg-[#F04A16] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
