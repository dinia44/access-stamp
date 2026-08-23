# Soft-launch deployment notes (manual)

Do not treat coding as complete until these are done in the deployment environment.

## Required env / DNS

1. Set `NEXT_PUBLIC_SITE_URL=https://accessstamp.co.uk` on the **production** Vercel project.
2. Point DNS for `accessstamp.co.uk` (and `www` if used) at the Vercel project.
3. In Vercel → Project → Domains, attach the custom domain and keep the project hostname as a secondary alias or redirect.
4. Confirm preview deployments stay `noindex` (app sets robots noindex when `VERCEL_ENV=preview`).
5. Confirm production redirect from `access-stamp-allister-diniz-s-projects.vercel.app` → `accessstamp.co.uk` (configured in `next.config.ts` for `VERCEL_ENV=production`, plus Vercel domain settings).

## Providers to verify (without submitting live user data)

- Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, newsletter audience id, contact inbox
- OpenAI: chat + toolkit routes
- ElevenLabs: voice/TTS only where enabled
- Cloudinary / map tiles: CSP allowlist matches production hosts

## Legal

Complete `docs/soft-launch-legal-review-checklist.md` before removing draft-review language from `/legal/privacy`.
