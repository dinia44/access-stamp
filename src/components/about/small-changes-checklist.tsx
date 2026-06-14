import { AboutSection, AboutSectionHeader } from "@/components/about/about-section";
import { ABOUT_PANEL } from "@/components/about/about-theme";

const CHECKLIST = [
  "Add clear entrance photos",
  "List doorway widths and step heights",
  "Explain toilet layout and transfer space",
  "Show parking distance and surface type",
  "State whether a portable ramp is available",
  "Train staff on access questions",
  "Offer quieter booking times where possible",
  "Publish a clear access contact email or phone number",
  "Show seating options and table heights",
  "Keep information updated when layouts change",
] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-[#59682A]" fill="none" aria-hidden>
      <path
        d="M5 10.5 8.5 14 15 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SmallChangesChecklist() {
  return (
    <AboutSection aria-labelledby="small-changes-heading">
      <AboutSectionHeader
        id="small-changes-heading"
        title="Small changes can make a venue easier to trust."
        description="Not every access improvement starts with a building project. Many venues can immediately improve confidence by explaining what already exists more clearly and fixing small points of friction."
      />

      <ul className={`mt-10 grid gap-3 sm:grid-cols-2 ${ABOUT_PANEL} p-6 sm:p-8`}>
        {CHECKLIST.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-xl border border-[#F1D8C7]/70 bg-[#FFF8F1] px-4 py-3.5 text-sm leading-6 text-[#13201F]">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
    </AboutSection>
  );
}
