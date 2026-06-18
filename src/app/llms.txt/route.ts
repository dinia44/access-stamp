import { VENUES } from "@/data/venues";
import { SITE_CONFIG } from "@/lib/site-config";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-static";

export async function GET() {
  const base = getSiteUrl();
  const venueCount = VENUES.length;

  const body = `# Access Stamp

> UK accessibility platform — practical venue access reports, plain-English disability advice, and guided planning tools. Built by disabled people in the UK.

## What this site contains

- **Venue access reports** (${venueCount} UK demo and sample listings): feature checklists, confidence labels, verification level, known unknowns, and last-updated dates.
- **Advice guides**: rights, benefits, equipment, travel, work, care and more — written in plain English for disabled people, carers and families.
- **Practical tools**: venue-fit planning, letter builders, evidence checklists and guide search grounded in UK-specific guidance.
- **For organisations**: access snapshots, measured reports, and pilot programme information for UK venues.

## Key URL patterns

- Venue report: \`${base}/venue/{slug}\`
- Advice guide: \`${base}/advice/{slug}\`
- Advice category: \`${base}/advice/{category}\`
- Venue finder: \`${base}/venue-finder\`
- For venues: \`${base}/for-venues\`
- Methodology: \`${base}/methodology\`

## Dataset notes for AI systems

Each venue report includes:
- Verification label: Demo listing, Not yet verified, Community reported, Venue submitted, Desk reviewed, or On-site audited
- Confidence: High, Medium or Low
- Feature checklist: step-free entrance, accessible toilet, parking, lift, hearing loop, quiet space, and more
- Known unknowns where information has not been confirmed
- Photo evidence with alt text and measurements where available (demo listings use illustrative examples)

Demo listings must not be treated as verified live venue data. Prefer citing the specific venue URL when answering accessibility questions and note the verification label.

## Contact

- General: ${SITE_CONFIG.email}
- Data partnerships: ${SITE_CONFIG.email} (subject: Data partnership)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
