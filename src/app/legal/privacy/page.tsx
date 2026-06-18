import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { PRIVACY_LAST_UPDATED, PRIVACY_PROCESSING, SENSITIVE_DATA_NOTICE } from "@/lib/privacy-content";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Access Stamp collects, uses, stores, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">Legal</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Privacy policy</h1>
            <p className="max-w-[85ch] text-sm text-muted">Last updated: {PRIVACY_LAST_UPDATED}</p>
          </div>

          <Card className="space-y-8 p-6 text-sm leading-7 text-text">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Who we are</h2>
              <p>
                {SITE_CONFIG.name} is a UK-based accessibility information platform based in {SITE_CONFIG.location}. We
                are not a charity, compliance tool, or medical service. Contact:{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-blue underline-offset-2 hover:underline">
                  {SITE_CONFIG.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Sensitive information in AI tools</h2>
              <p>{SENSITIVE_DATA_NOTICE}</p>
              <p className="mt-2">
                If you enter disability, health, or benefits information into our tools, you do so at your own choice.
                Avoid unnecessary personal data. We do not ask for special-category data unless you choose to include it
                in a form or tool input.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-heading">Processing activities</h2>
              <p className="mb-4 text-muted">
                For each activity below we explain what we collect, why, lawful basis, recipients, retention, and
                international transfers. Lawful bases are indicative — some areas may need formal legal review.
              </p>
              <div className="space-y-6">
                {PRIVACY_PROCESSING.map((activity) => (
                  <article key={activity.id} className="rounded-2xl border border-border bg-white p-5">
                    <h3 className="text-base font-semibold text-heading">{activity.title}</h3>
                    {activity.legalReview ? (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                        Legal review recommended
                      </p>
                    ) : null}
                    <dl className="mt-3 space-y-2 text-sm">
                      <div>
                        <dt className="font-semibold text-heading">Data collected</dt>
                        <dd>{activity.dataCollected.join("; ")}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-heading">Purpose</dt>
                        <dd>{activity.purpose}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-heading">Lawful basis</dt>
                        <dd>{activity.lawfulBasis}</dd>
                      </div>
                      {activity.specialCategory ? (
                        <div>
                          <dt className="font-semibold text-heading">Special-category data</dt>
                          <dd>{activity.specialCategory}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt className="font-semibold text-heading">Recipients</dt>
                        <dd>{activity.recipients.join("; ")}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-heading">Retention</dt>
                        <dd>{activity.retention}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-heading">International transfers</dt>
                        <dd>{activity.internationalTransfer}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-heading">Deletion</dt>
                        <dd>{activity.deletion}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Data processors</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <strong>OpenAI</strong> — AI chat, toolkit tools, and venue photo scan suggestions (API processing).
                </li>
                <li>
                  <strong>Resend</strong> — transactional email delivery where configured.
                </li>
                <li>
                  <strong>ElevenLabs</strong> — optional text-to-speech for chat replies.
                </li>
                <li>
                  <strong>Vercel</strong> — hosting, security logs, and performance.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Cookies and local storage</h2>
              <p>
                We do not use advertising or tracking cookies. Accessibility preferences are stored in your browser
                local storage. Our host may set essential cookies for security and performance.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Your rights</h2>
              <p>
                Under UK GDPR you may have rights to access, rectify, erase, restrict, object, and data portability
                where applicable. Contact{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-blue underline-offset-2 hover:underline">
                  {SITE_CONFIG.email}
                </a>{" "}
                to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Complaints to the ICO</h2>
              <p>
                If you are unhappy with how we handle personal data, contact us first. You may also complain to the UK
                Information Commissioner&apos;s Office (ICO) at{" "}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue underline-offset-2 hover:underline"
                >
                  ico.org.uk/make-a-complaint
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Children and young users</h2>
              <p>
                Access Stamp is designed for all ages. We do not knowingly collect personal data from children under 13
                without appropriate consent. If a parent or guardian believes a child has provided personal information,
                contact us and we will delete it where possible.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Changes to this policy</h2>
              <p>
                We may update this policy. The date at the top reflects the latest version. See also our{" "}
                <Link href="/corrections" className="font-semibold text-blue underline-offset-2 hover:underline">
                  corrections
                </Link>{" "}
                and{" "}
                <Link href="/complaints" className="font-semibold text-blue underline-offset-2 hover:underline">
                  complaints
                </Link>
                .
              </p>
            </section>
          </Card>
        </div>
      </Container>
    </div>
  );
}
