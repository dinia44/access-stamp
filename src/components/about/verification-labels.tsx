import { AboutSection, AboutSectionHeader } from "@/components/about/about-section";
import { ABOUT_PANEL } from "@/components/about/about-theme";
import { VerificationBadge } from "@/components/verification-badge";

const LABELS = [
  {
    status: "On-site audited" as const,
    title: "On-site verified",
    body: "Measured on site with photographed evidence, audit record, and published methodology version.",
    panel: "bg-verified-pale border-[#C8E6C9]/70",
  },
  {
    status: "Desk reviewed" as const,
    title: "Reviewed remotely",
    body: "Reviewed remotely against our checklist using submitted or public evidence.",
    panel: "bg-emerald-50 border-emerald-100",
  },
  {
    status: "Community reported" as const,
    title: "Submitted / not independently verified",
    body: "Information supplied by visitors, staff or a venue that has not yet been independently verified.",
    panel: "bg-blue-pale border-[#F1D8C7]",
  },
  {
    status: "Demo listing" as const,
    title: "Demo",
    body: "Shows how a venue report could work. Not live venue data and must not be relied on for travel.",
    panel: "bg-amber-pale border-[#FDE68A]/70",
  },

] as const;

export function VerificationLabels() {
  return (
    <AboutSection id="verification" tone="panel" aria-labelledby="verification-heading">
      <AboutSectionHeader
        id="verification-heading"
        title="Clear labels. Honest confidence levels."
        description="Access information is only useful when people understand how reliable it is. Access Stamp uses verification labels so visitors know where information came from and how much to rely on it."
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {LABELS.map((label) => (
          <li key={label.title} className={`h-full rounded-[20px] border p-6 ${label.panel}`}>
            <VerificationBadge status={label.status} />
            <h3 className="mt-4 text-base font-bold text-[#13201F]">{label.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5E6A66]">{label.body}</p>
          </li>
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
