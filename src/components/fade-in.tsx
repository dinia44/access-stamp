"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "-10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 will-change-transform",
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

