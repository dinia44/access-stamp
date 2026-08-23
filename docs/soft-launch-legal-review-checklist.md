# Soft-launch legal / privacy review checklist

**Status:** coding task complete — human legal review still required before treating the privacy policy as final.  
**Do not** remove draft-review language until counsel (or an equivalent reviewer) has approved replacement copy.

## Passages that explicitly require review

| Location | Why |
|----------|-----|
| `/legal/privacy` intro | States lawful bases are indicative and legal review is recommended |
| `PRIVACY_PROCESSING` analytics activity (`legalReview: true`) | Badge: “Legal review recommended” |
| Contact / newsletter / waitlist consent wording | Soft vs explicit consent differences |
| AI toolkit / chat disclosures | Special-category risk; OpenAI / ElevenLabs processing |
| Venue photograph upload notice | Identifiable people, plates, EXIF |
| Business identity block | Company name, address, ICO registration if applicable |

## Review coverage checklist

- [ ] Disability, health, benefits, and other potentially special-category information
- [ ] OpenAI (chat, toolkit, venue photo scan) as processor
- [ ] ElevenLabs (voice / TTS) as processor
- [ ] Resend (contact + newsletter) as processor
- [ ] Vercel hosting / logs / analytics surfaces actually enabled
- [ ] Cloudinary / Sanity / Mapbox (or OSM tiles) if used in production
- [ ] Retention periods and deletion handling for each processing activity
- [ ] International processing / transfers wording
- [ ] AI chat and toolkit inputs (and confirmation that UI disclosures match routes)
- [ ] Venue photograph uploads and identifiable people / plates
- [ ] Contact form consent checkbox vs newsletter soft consent
- [ ] Business identity and contact information accuracy

## Engineering notes (accurate as of this soft-launch pass)

- AI text surfaces should show a concise disclosure adjacent to inputs when OpenAI is used.
- Do not invent final legal wording in code without approved copy in the repository.
- Production metadata must use `NEXT_PUBLIC_SITE_URL` (fallback `https://accessstamp.co.uk`).
- Set `NEXT_PUBLIC_SITE_URL` on the Vercel production project and confirm DNS for `accessstamp.co.uk`.
- Confirm Vercel domain settings so the project hostname redirects (or aliases) to the approved domain without indexing previews.

## Sign-off

| Role | Name | Date | Notes |
|------|------|------|-------|
| Product owner | | | |
| Legal / privacy reviewer | | | |
| Engineering | | | |
