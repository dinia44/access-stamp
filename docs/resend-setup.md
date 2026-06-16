# Resend email setup for Access Stamp

Access Stamp uses [Resend](https://resend.com) for:

- Contact form (`/api/contact`)
- Venue pilot enquiries (`/api/for-venues-lead`)
- Newsletter signups (`/api/newsletter-signup`)

Without `RESEND_API_KEY`, forms still work locally — submissions are logged on the server only.

## 1. Create a Resend account

1. Sign up at [resend.com](https://resend.com).
2. Create an API key under **API Keys**.
3. Add it to Vercel (and `.env.local` for local testing):

```bash
RESEND_API_KEY=re_xxxxxxxx
```

## 2. Verify your sending domain

To send from `hello@accessstamp.co.uk`, add and verify the domain in Resend:

1. Resend dashboard → **Domains** → **Add domain**
2. Enter `accessstamp.co.uk`
3. Add the DNS records Resend provides (SPF, DKIM, and optionally DMARC) at your domain host
4. Wait until Resend shows the domain as **Verified**

Then set:

```bash
RESEND_FROM_EMAIL=Access Stamp <hello@accessstamp.co.uk>
CONTACT_INBOX_EMAIL=hello@accessstamp.co.uk
```

Until the domain is verified, you can test with Resend’s sandbox sender (`onboarding@resend.dev`) — emails only deliver to the address on your Resend account.

## 3. Newsletter audience

Newsletter signups are added to a Resend **Audience** when configured:

1. Resend dashboard → **Audiences** → **Create audience** (e.g. “Access Stamp newsletter”)
2. Copy the audience ID
3. Set in Vercel / `.env.local`:

```bash
RESEND_NEWSLETTER_AUDIENCE_ID=aud_xxxxxxxx
```

Each signup:

- Adds the contact to that audience (duplicate emails are treated as success)
- Sends a notification to `CONTACT_INBOX_EMAIL` so you know someone joined

You can send campaigns from Resend using that audience later.

## 4. Vercel environment variables

In your Vercel project → **Settings** → **Environment Variables**, add for **Production** and **Preview**:

| Variable | Example |
|----------|---------|
| `RESEND_API_KEY` | `re_...` |
| `RESEND_FROM_EMAIL` | `Access Stamp <hello@accessstamp.co.uk>` |
| `CONTACT_INBOX_EMAIL` | `hello@accessstamp.co.uk` |
| `RESEND_NEWSLETTER_AUDIENCE_ID` | `aud_...` |

Redeploy after adding variables.

## 5. Quick test

1. Submit the contact form at `/contact`
2. Submit the footer newsletter form
3. Check `hello@accessstamp.co.uk` for notification emails
4. Check Resend → **Audiences** for the new contact

## Troubleshooting

| Issue | Likely cause |
|-------|----------------|
| 502 on form submit | Invalid API key or unverified `RESEND_FROM_EMAIL` domain |
| No inbox notification | `CONTACT_INBOX_EMAIL` wrong or email in spam |
| Subscriber not in audience | `RESEND_NEWSLETTER_AUDIENCE_ID` missing or wrong |
| Works locally, not on Vercel | Env vars not set for the deployment environment |
