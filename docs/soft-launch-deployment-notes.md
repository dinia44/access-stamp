# Soft-launch deployment notes (manual)

Do not treat coding as complete until these are done in the deployment environment.

## Required env / DNS

1. Set `NEXT_PUBLIC_SITE_URL=https://accessstamp.co.uk` on the **production** Vercel project **only after** the domain resolves.
2. Point DNS for `accessstamp.co.uk` (and `www` if used) at the Vercel project.
3. In Vercel → Project → Domains, attach the custom domain.
4. Confirm preview deployments stay `noindex` (app sets robots noindex when `VERCEL_ENV=preview`).
5. **Only then** add a host redirect from the `*.vercel.app` project hostname → `accessstamp.co.uk` in Vercel Domains (not in `next.config.ts` while the custom domain is offline). Redirecting early sends every visitor to a dead host and looks like a site-wide 404.

Until steps 1–3 are done, leave the site on:

`https://access-stamp-allister-diniz-s-projects.vercel.app`

## Providers to verify (without submitting live user data)

- Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, newsletter audience id, contact inbox
- OpenAI: chat + toolkit routes
- ElevenLabs: voice/TTS only where enabled
- Cloudinary / map tiles: CSP allowlist matches production hosts

## Legal

Complete `docs/soft-launch-legal-review-checklist.md` before removing draft-review language from `/legal/privacy`.
