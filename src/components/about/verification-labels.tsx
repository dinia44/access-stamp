import { AboutSection, AboutSectionHeader } from "@/components/about/about-section";
import { ABOUT_PANEL } from "@/components/about/about-theme";
import { VerificationBadge } from "@/components/verification-badge";
import { FadeIn } from "@/components/fade-in";

const LABELS = [
  {
    status: "Access Stamp checked" as const,
    title: "Access Stamp checked",
    body: "Information reviewed against Access Stamp’s practical access criteria.",
    panel: "bg-verified-pale border-[#C8E6C9]/70",
  },
  {
    status: "Community reported" as const,
    title: "Community reported",
    body: "Information shared by users, visitors, or venue staff and useful as a starting point.",
    panel: "bg-blue-pale border-[#F1D8C7]",
  },
  {
    status: "Not yet verified" as const,
    title: "Not yet verified",
    body: "A listing exists, but users should confirm details before relying on it.",
    panel: "bg-amber-pale border-[#FDE68A]/70",
  },
] as const;

export function VerificationLabels() {
  return (
    <AboutSection id="verification" tone="panel" aria-labelledby="verification-heading">
      <AboutSectionHeader
        id="verification-heading"
        title="Clear labels. Honest confidence levels."
        description="Access information is only useful when people understand how reliable it is. Access Stamp uses clear labels so visitors know whether a listing has been checked, reported by the community, or still needs verification."
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {LABELS.map((label, index) => (
          <FadeIn key={label.title} delayMs={index * 50}>
            <li className={`h-full rounded-[20px] border p-6 ${label.panel}`}>
              <VerificationBadge status={label.status} />
              <h3 className="mt-4 text-base font-bold text-[#13201F]">{label.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5E6A66]">{label.body}</p>
            </li>
          </FadeIn>
        ))}
      </ul>

      <p className={`mt-8 rounded-[20px] border border-[#F1D8C7] bg-white p-5 text-sm leading-7 text-[#5E6A66] sm:p-6 ${ABOUT_PANEL}`}>
        <strong className="font-semibold text-[#13201F]">Access needs vary.</strong> Access Stamp does not pretend one
        label can guarantee suitability for everyone. The goal is to make the information clearer, more detailed, and
        easier to check before someone travels.
      </p>
    </AboutSection>
  );
}
