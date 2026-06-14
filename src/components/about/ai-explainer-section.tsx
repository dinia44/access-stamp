import { AboutSection, AboutSectionHeader } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeIn } from "@/components/fade-in";

const AI_FEATURES = [
  {
    title: "Access Question Builder",
    body: "Generate exact questions to ask a venue before visiting.",
  },
  {
    title: "Venue Gap Checker",
    body: "Help venues identify missing access information and quick improvements.",
  },
  {
    title: "Will It Fit?",
    body: "Use measurements to help users think through wheelchair width, turning space, transfer needs, and support requirements.",
  },
  {
    title: "Guide Recommender",
    body: "Suggest practical guides based on what the user is trying to solve.",
  },
  {
    title: "New Wheelchair User Starter Pack",
    body: "Explain hidden basics such as cushions, pressure areas, slide sheets, transfers, and planning ahead.",
  },
] as const;

export function AIExplainerSection() {
  return (
    <AboutSection aria-labelledby="ai-tools-heading">
      <AboutSectionHeader
        id="ai-tools-heading"
        title="AI that turns access confusion into clear next steps."
        description={
          <div className="space-y-4">
            <p className={ABOUT_BODY}>
              Access Stamp’s AI tools are designed to help users ask better questions, prepare for visits, understand
              guide content, and turn complicated access situations into practical checklists.
            </p>
            <p className={ABOUT_BODY}>
              The AI does not replace professional advice, medical advice, legal advice, or venue confirmation. It
              helps people organise information, spot missing details, and prepare more confidently.
            </p>
          </div>
        }
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AI_FEATURES.map((feature, index) => (
          <FadeIn key={feature.title} delayMs={index * 40}>
            <article className={`p-5 ${ABOUT_PANEL}`}>
              <h3 className="text-base font-bold text-[#13201F]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5E6A66]">{feature.body}</p>
            </article>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8">
        <ButtonLink href="/ai-toolkit">Explore AI tools</ButtonLink>
      </div>
    </AboutSection>
  );
}
