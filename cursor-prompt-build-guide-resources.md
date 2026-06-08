# Cursor prompt: Build Access Stamp guide resources and full guide panel

Update `/advice/reasonable-adjustments-at-work` so the page has both:

1. The existing interactive step-by-step guide
2. A proper resource layer containing downloadable templates and a full accessible long-form guide

Do not make the full guide an image. That would be bad accessibility. Build it as real semantic HTML/MDX content with headings, paragraphs, lists, tables and buttons.

## Files to add

Create these files in the project:

- `/content/guides/reasonable-adjustments-at-work/full-guide.md`
- `/public/downloads/reasonable-adjustment-request-template.docx`
- `/public/downloads/workplace-barriers-checklist.docx`
- `/public/downloads/follow-up-email-template.docx`
- `/public/downloads/reasonable-adjustment-review-notes.docx`
- `/content/guides/reasonable-adjustments-at-work/resources.json`

Use the supplied resource pack as the source of truth.

## Page placement

In the middle support column, update the cards:

### Guide summary

Show:
- Understand what reasonable adjustments are
- Identify the workplace barriers affecting you
- Match each barrier to practical support
- Write a clear request without oversharing
- Track your employer's response
- Know what to do if your request is delayed or refused

### Helpful templates

Show four downloadable resources:

1. Reasonable adjustment request template
Description: A simple email structure using barrier, impact, adjustment and reason.
Button: Download DOCX

2. Workplace barriers checklist
Description: Identify physical, communication, workload, sensory and policy barriers.
Button: Download DOCX

3. Follow-up email template
Description: Chase delayed or unclear responses without sounding aggressive.
Button: Download DOCX

4. Adjustment review notes
Description: Record whether agreed adjustments are working and what needs to happen next.
Button: Download DOCX

### Official guidance

Add links to:
- GOV.UK: Reasonable adjustments for disabled workers
- Acas: Reasonable adjustments at work
- EHRC: Workplace adjustments guidance
- Citizens Advice: Asking your employer for changes
- GOV.UK: Access to Work

## Full guide CTA

Under the progress/action bar, add a premium card:

Heading:
Read the full guide

Text:
Prefer the full explanation? Open the complete Access Stamp guide with examples, template wording, common mistakes and next steps if your employer delays or refuses.

Buttons:
- Primary: View full guide
- Secondary: Listen to guide
- Tertiary/link: Download request template

The card should use the warm Access Stamp palette, rounded corners, soft shadow and a small illustration/icon.

## Full guide page or modal

Create a route or expandable panel:

`/advice/reasonable-adjustments-at-work/full-guide`

It should include:
- Full long-form guide content from the resource pack
- Semantic headings
- Table of contents
- Back to step-by-step guide link
- Download template buttons
- Sources section
- Print button
- Listen button

## Read aloud accessibility

Implement a `Listen to guide` button using the browser Web Speech API as a first version.

Requirements:
- Use the actual article text, not hidden image alt text
- `lang="en-GB"`
- Buttons: Listen, Pause/Resume, Stop
- `aria-live="polite"` status message
- Do not autoplay
- Do not hide content behind audio-only behaviour
- If browser speech is unsupported, show: "Your browser does not support built-in read aloud. You can still use your device screen reader or browser read aloud tools."

## Accessibility requirements

- Full guide must be real text, not an image
- Use semantic `<article>`, `<section>`, `<h1>`, `<h2>`, `<h3>`
- Table of contents links must be keyboard accessible
- Buttons must be at least 44px high
- Focus states must be visible
- Download buttons must include file type labels
- Do not use fake user names or fake account personalisation
- Do not use "Hi Sam"
- Do not imply saved account progress unless authentication exists
- Keep disclaimer calm and small

## Visual style

Keep the warm premium Access Stamp design:
- cream / warm ivory background
- white cards
- charcoal text
- burnt orange primary CTA
- olive secondary CTA
- warm borders
- soft shadows
- rounded corners

The page should feel like a premium practical guide and document hub, not a government page, charity leaflet, or static blog post.
