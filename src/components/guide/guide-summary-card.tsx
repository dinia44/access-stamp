import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type GuideSummaryCardProps = {
  title: string;
  items: string[];
  image?: { src: string; alt: string };
  linkLabel?: string;
  linkHref?: string;
  variant?: "default" | "help" | "glance";
  description?: string;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
};

export function GuideSummaryCard({
  title,
  items,
  image,
  linkLabel,
  linkHref,
  variant = "default",
  description,
  onAction,
  actionLabel,
  className,
}: GuideSummaryCardProps) {
  const isHelp = variant === "help";

  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-[#F1D8C7] bg-white p-5 shadow-[var(--shadow-soft)]",
        isHelp && "border-[#C8E6C9] bg-[#F6FBF6]",
        className,
      )}
    >
      <div className={cn("flex gap-4", image ? "items-start" : undefined)}>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-heading">{title}</h2>
          {description ? <p className="mt-2 text-sm leading-6 text-muted">{description}</p> : null}
          <ul className="mt-3 space-y-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text">
                <span
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    variant === "glance" ? "bg-[#59682A]" : "bg-[#F04A16]/70",
                  )}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {linkLabel && linkHref ? (
            <Link
              href={linkHref}
              className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#59682A] hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
            >
              {linkLabel} →
            </Link>
          ) : null}
          {actionLabel && onAction ? (
            <button
              type="button"
              onClick={onAction}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#C8E6C9] bg-white px-4 text-sm font-semibold text-[#59682A] transition-colors hover:bg-[#EDF7ED] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
            >
              {actionLabel} →
            </button>
          ) : null}
        </div>
        {image ? (
          <div className="relative hidden h-20 w-24 shrink-0 overflow-hidden rounded-xl sm:block">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="96px"
              unoptimized={image.src.endsWith(".svg")}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
