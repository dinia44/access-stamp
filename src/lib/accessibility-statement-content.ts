import { SITE_CONFIG } from "@/lib/site-config";

export const ACCESSIBILITY_LAST_REVIEW = "18 June 2026";
export const ACCESSIBILITY_CONFORMANCE_TARGET = "WCAG 2.2 Level AA";

export const ACCESSIBILITY_TESTING = {
  automated: {
    tools: ["Playwright", "@axe-core/playwright"],
    lastRun: "18 June 2026",
    routes: [
      "/",
      "/venue-finder",
      "/advice",
      "/help-cards",
      "/ai-toolkit",
      "/contact",
      "/methodology",
      "/legal/privacy",
      "/accessibility",
    ],
    checks: [
      "No critical or serious axe violations on key public routes",
      "Keyboard focus visible on homepage",
      "Venue finder search operable by keyboard",
      "Mobile navigation closes with Escape and restores focus",
      "No horizontal scroll at 320–1440px on venue finder",
    ],
  },
  manual: {
    keyboard: {
      date: "18 June 2026",
      scope: "Global header, mobile menu, homepage CTAs, venue finder filters, contact form, help card actions",
    },
    screenReader: {
      date: "18 June 2026",
      tools: ["VoiceOver on macOS Safari", "Spot checks on Chrome with NVDA guidance"],
      scope: "Landmarks, form labels, results announcements, demo listing banners",
    },
  },
} as const;

export const ACCESSIBILITY_LIMITATIONS = [
  "All current venue listings are demo examples — confidence labels and unknowns are shown, but they must not be treated as live audited data.",
  "Save venue controls are not available — listings are for planning and exploration only.",
  "Third-party map tiles on the venue finder may not meet the same contrast and keyboard standards as the rest of the site.",
  "Some AI toolkit tools send text to OpenAI for drafting — avoid entering unnecessary personal information.",
  "We are still expanding measured venue data — not every future listing will have full doorway measurements at launch.",
] as const;

export const ACCESSIBILITY_FEEDBACK_EMAIL = SITE_CONFIG.email;
