import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { PageSectionTitle } from "@/components/page-layout";
import { CHOOSER_OPTIONS } from "@/lib/ai-toolkit/practical-tools-content";

export function PracticalToolsChooser() {
  return (
    <section aria-labelledby="practical-tools-chooser-title">
      <PageSectionTitle
        title="What do you need help with?"
        description="Choose the situation that matches your problem. We will point you to the right tool."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHOOSER_OPTIONS.map((option, index) => (
          <FadeIn key={option.toolId} delayMs={index * 40}>
            <Link
              href={option.href}
              className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-card/95 p-5 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-mid)] hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--as-focus)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--as-bg)]"
            >
              <p className="text-base font-semibold leading-snug text-heading">{option.problem}</p>
              <p className="mt-3 text-sm text-muted">
                Recommended tool:{" "}
                <span className="font-medium text-heading">{option.recommendedTool}</span>
              </p>
              <span className="mt-auto pt-5 text-sm font-semibold text-[var(--color-primary)] group-hover:underline">
                {option.cta} →
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
