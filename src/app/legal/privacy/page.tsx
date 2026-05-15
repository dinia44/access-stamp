import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Access Stamp collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">Legal</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Privacy policy</h1>
            <p className="max-w-[85ch] text-sm text-muted">Last updated: May 2026</p>
          </div>

          <Card className="space-y-6 p-6 text-sm leading-7 text-text">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Who we are</h2>
              <p>
                Access Stamp is a UK-based accessibility information platform. We are not a charity,
                compliance tool, or medical service. When we say &ldquo;we&rdquo; or &ldquo;us&rdquo;
                in this policy, we mean the Access Stamp team.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">What we collect</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <strong>Chat messages</strong> &mdash; text you type or speak into the AI assistant.
                  Messages are sent to our server to generate a reply and are not stored after the
                  session ends.
                </li>
                <li>
                  <strong>Venue submissions</strong> &mdash; if you suggest a venue, we keep the
                  information you provide (name, address, access features) so we can review and
                  publish it.
                </li>
                <li>
                  <strong>Usage data</strong> &mdash; our host may collect basic, aggregated request
                  logs for security and performance. We do not run advertising trackers or sell
                  browsing data.
                </li>
                <li>
                  <strong>Device preferences</strong> &mdash; accessibility settings (text size,
                  contrast, motion) are saved in your browser&rsquo;s local storage and never
                  leave your device.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">How we use your data</h2>
              <p>
                We use information only to run the service: answering your questions, improving venue
                listings, and fixing bugs. We do not sell data, run targeted advertising, or share
                information with third parties except where required by law.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">AI and third-party services</h2>
              <p>
                Chat messages may be processed by OpenAI&rsquo;s API to generate replies. Messages
                are sent over encrypted connections and are subject to{" "}
                <a
                  href="https://openai.com/policies/api-data-usage-policies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue underline-offset-2 hover:underline"
                >
                  OpenAI&rsquo;s API data usage policy
                </a>
                . OpenAI does not use API inputs to train its models.
              </p>
              <p className="mt-2">
                Voice playback may use the ElevenLabs text-to-speech API. The text of each reply is
                sent to generate audio and is not retained after processing.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Cookies</h2>
              <p>
                We do not use tracking cookies, advertising cookies, or third-party marketing pixels.
                Essential cookies may be set by our hosting provider (Vercel) for security and
                performance purposes only.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Your rights</h2>
              <p>
                Under UK data protection law (UK GDPR), you have the right to access, correct, or
                delete personal data we hold about you. Since we store minimal data, in most cases
                there is nothing to delete. If you have questions, contact us at{" "}
                <a
                  href="mailto:hello@accessstamp.co.uk"
                  className="font-semibold text-blue underline-offset-2 hover:underline"
                >
                  hello@accessstamp.co.uk
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Children</h2>
              <p>
                Access Stamp is designed for all ages. We do not knowingly collect personal data from
                children under 13. If a parent or guardian believes their child has provided personal
                information, please contact us and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The &ldquo;last updated&rdquo; date at
                the top will always reflect the most recent version. Continued use of the site after
                changes means you accept the updated policy.
              </p>
            </section>
          </Card>
        </div>
      </Container>
    </div>
  );
}
