"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type GuideChecklistCardProps = {
  title: string;
  description: string;
  image: { src: string; alt: string };
  checked?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function GuideChecklistCard({
  title,
  description,
  image,
  checked = false,
  onToggle,
  className,
}: GuideChecklistCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-[#F1D8C7] bg-[#FFF8F1]/60 shadow-sm transition-colors hover:border-[#E8C4A8]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 240px"
          unoptimized={image.src.endsWith(".svg")}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h4 className="text-sm font-bold text-heading">{title}</h4>
        <p className="mt-1.5 flex-1 text-xs leading-5 text-muted">{description}</p>
        <label className="mt-3 flex min-h-[44px] cursor-pointer items-center gap-2 text-xs font-semibold text-[#59682A]">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="h-4 w-4 rounded border-[#E8C4A8] text-[#59682A] focus:ring-[#F04A16]"
          />
          Review ideas
        </label>
      </div>
    </div>
  );
}
