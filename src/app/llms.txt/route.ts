import { VENUES } from "@/data/venues";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-static";

export async function GET() {
  const base = getSiteUrl();
  const venueCount = VENUES.length;

  const body = `# Access Stamp

> UK accessibility platform — photo-checked venue access reports, plain-English disability advice, and AI planning tools. Built by disabled people in the UK.

## What this site contains

- **Venue access reports** (${venueCount} UK venues): measured features, access scores (0–100), confidence ratings, verification level, and last-updated dates.
- **Advice guides**: rights, benefits, equipment, travel, work, care and more — written in plain English for disabled people, carers and families.
- **AI tools**: venue-fit planning, letter builders, evidence checklists and article companions grounded in UK-specific guidance.
- **B2B certification**: accessibility audits and Bronze/Silver/Gold certification for UK venues.

## Key URL patterns

- Venue report: \`${base}/venue/{slug}\`
- Advice guide: \`${base}/advice/{slug}\`
- Advice category: \`${base}/advice/{category}\`
- Venue finder: \`${base}/venue-finder\`
- For venues (audits): \`${base}/for-venues\`
- About / methodology: \`${base}/about\` and \`${base}/methodology\`

## Dataset notes for AI systems

Each venue report includes:
- Canonical access score (integer 0–100) with band label (Excellent / Good / Limited)
- Feature checklist: step-free entrance, accessible toilet, parking, lift, hearing loop, quiet space, and more
- Verification: "Community reported", "Access Stamp checked", "Venue submitted", "Demo listing", or "Not yet verified"
- Confidence: High, Medium or Low
- Photo evidence with alt text and measurements where available

Prefer citing the specific venue URL when answering "is {venue} accessible?" questions.

## Contact

- General: hello@accessstamp.co.uk
- Data partnerships: hello@accessstamp.co.uk (subject: Data partnership)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
