import { FadeIn } from "@/components/fade-in";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui";

export function PracticalToolsFeatured() {
  return (
    <FadeIn delayMs={120}>
      <Card className="border-[var(--color-primary)]/20 bg-gradient-to-br from-[#FFF3EA] to-card p-6 md:p-8">
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-heading sm:text-3xl">Not sure where to start?</h2>
        <p className="mt-3 max-w-[65ch] text-base leading-7 text-muted">
          Use the Access Needs Profiler. Answer a few questions and get a practical action plan with next steps,
          evidence to gather, useful wording, and related Access Stamp guides.
        </p>
        <div className="mt-6">
          <ButtonLink href="/ai-toolkit/access-needs-profiler">Start with the profiler</ButtonLink>
        </div>
      </Card>
    </FadeIn>
  );
}
