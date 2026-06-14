import Link from "next/link";
import { AboutSection, AboutSectionHeader } from "@/components/about/about-section";
import { ABOUT_PANEL } from "@/components/about/about-theme";

const CHECKLIST = [
  "Clear heading structure",
  "Keyboard-accessible navigation and forms",
  "Visible focus states",
  "Readable text sizes and line heights",
  "High-contrast buttons and links",
  "Meaningful alt text",
  "Plain-English content",
  "No essential information hidden only in animations or images",
] as const;

export function AccessibilityPromise() {
  return (
    <AboutSection tone="alt" aria-labelledby="accessibility-promise-heading">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <AboutSectionHeader
          id="accessibility-promise-heading"
          title="Our own platform has to meet the same standard."
          description="Access Stamp should be easy to use with keyboard navigation, screen readers, clear contrast, readable typography, plain language, and mobile layouts that do not punish users for needing larger text or assistive technology."
        />

        <ul className={`grid gap-3 sm:grid-cols-2 ${ABOUT_PANEL} p-6 sm:p-8`}>
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#13201F]">
              <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDF7ED] text-[#2F7D32]" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/accessibility"
        className="mt-8 inline-flex items-center gap-1 font-semibold text-[#F04A16] underline decoration-[#F04A16]/30 underline-offset-4 transition hover:decoration-[#F04A16] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F04A16]/25 focus-visible:ring-offset-2"
      >
        Read our accessibility statement <span aria-hidden>→</span>
      </Link>
    </AboutSection>
  );
}
