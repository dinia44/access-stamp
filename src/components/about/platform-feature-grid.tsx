import Link from "next/link";
import { AboutSection, AboutSectionHeader } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";
import { FadeIn } from "@/components/fade-in";

const FEATURES = [
  {
    title: "Find accessible places",
    body: "Search venues using practical access details, not vague promises. Look for entrance information, toilet details, parking notes, photos, and confidence labels.",
    cta: "Explore venues",
    href: "/venue-finder",
  },
  {
    title: "Understand the details nobody explains",
    body: "Read plain-English guides on wheelchair use, pressure care basics, access planning, workplace adjustments, travel preparation, and everyday disability admin.",
    cta: "Read guides",
    href: "/advice",
  },
  {
    title: "Ask better access questions",
    body: "Use AI tools to turn messy situations into checklists, phone scripts, venue questions, and practical next steps.",
    cta: "Try AI tools",
    href: "/ai-toolkit",
  },
  {
    title: "Know how reliable the information is",
    body: "Access Stamp separates checked information from community reports and unverified listings so users understand the confidence level.",
    cta: "How verification works",
    href: "#verification",
  },
  {
    title: "Show disabled customers what to expect",
    body: "Help people decide whether your venue is suitable by publishing clear access information, measurements, photos, and support details.",
    cta: "List your venue",
    href: "/submit-venue",
  },
  {
    title: "Prepare for work, study, and public life",
    body: "Access is not only about going out. It also includes adjustments, risk assessments, evacuation plans, support needs, and the right questions to ask.",
    cta: "View resources",
    href: "/advice",
  },
] as const;

export function PlatformFeatureGrid() {
  return (
    <AboutSection aria-labelledby="platform-features-heading">
      <AboutSectionHeader
        id="platform-features-heading"
        title="What Access Stamp helps with"
        description="Access Stamp brings venue information, practical guides, verification labels, and AI support into one place so people can make better access decisions before they are under pressure."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <FadeIn key={feature.title} delayMs={index * 40}>
            <article className={`flex h-full flex-col p-6 ${ABOUT_PANEL}`}>
              <h3 className="text-lg font-bold text-[#13201F]">{feature.title}</h3>
              <p className={`mt-3 flex-1 ${ABOUT_BODY} text-base`}>{feature.body}</p>
              <Link
                href={feature.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#F04A16] underline decoration-[#F04A16]/30 underline-offset-4 transition hover:decoration-[#F04A16] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F04A16]/25 focus-visible:ring-offset-2"
              >
                {feature.cta} <span aria-hidden>→</span>
              </Link>
            </article>
          </FadeIn>
        ))}
      </div>
    </AboutSection>
  );
}
