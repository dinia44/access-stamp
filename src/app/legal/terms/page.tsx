import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms and conditions for using the Access Stamp platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">Legal</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Terms of use</h1>
            <p className="max-w-[85ch] text-sm text-muted">Last updated: May 2026</p>
          </div>

          <Card className="space-y-6 p-6 text-sm leading-7 text-text">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">About Access Stamp</h2>
              <p>
                Access Stamp provides practical accessibility information for disabled people,
                wheelchair users, carers, older people, and families in the UK. We are an information
                platform &mdash; not a medical, legal, or financial advice service.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Using the platform</h2>
              <p>
                By using Access Stamp you agree to these terms. You may use the site for personal,
                non-commercial purposes. You must not misuse the service, attempt to disrupt it, or
                use it to harm others.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Information accuracy</h2>
              <p>
                We work hard to keep venue listings, advice content, and AI responses accurate.
                However, information may change without notice. Always confirm key details &mdash;
                opening times, access features, eligibility for funding &mdash; directly with the
                venue or relevant authority before travelling or making decisions.
              </p>
              <p className="mt-2">
                Venue listings are based on audits, community reports, or publicly available
                information. We label each listing&rsquo;s verification status (&ldquo;Access Stamp
                checked&rdquo;, &ldquo;Community reported&rdquo;, or &ldquo;Not yet
                verified&rdquo;) so you can judge reliability.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">AI assistant</h2>
              <p>
                The AI assistant uses large language models to generate responses. While it is
                grounded in Access Stamp&rsquo;s data and UK-specific knowledge, it can make
                mistakes. Do not rely on AI responses as a substitute for professional medical,
                legal, or financial advice.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">User-submitted content</h2>
              <p>
                If you submit venue information, reviews, or other content, you grant Access Stamp a
                non-exclusive, royalty-free licence to use, edit, and publish that content on the
                platform. You must not submit content that is defamatory, misleading, or violates
                someone else&rsquo;s rights.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Intellectual property</h2>
              <p>
                All content, design, and code on Access Stamp is owned by us or our licensors unless
                otherwise stated. You may share links to our pages but must not reproduce large
                portions of content without permission.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Limitation of liability</h2>
              <p>
                Access Stamp is provided &ldquo;as is&rdquo; without warranties of any kind. To the
                fullest extent permitted by law, we are not liable for any loss or damage arising
                from your use of the platform, including reliance on information provided by the AI
                assistant or venue listings.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Governing law</h2>
              <p>
                These terms are governed by the laws of England and Wales. Any disputes will be
                subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-heading">Contact</h2>
              <p>
                Questions about these terms? Email{" "}
                <a
                  href="mailto:hello@accessstamp.co.uk"
                  className="font-semibold text-blue underline-offset-2 hover:underline"
                >
                  hello@accessstamp.co.uk
                </a>
                .
              </p>
            </section>
          </Card>
        </div>
      </Container>
    </div>
  );
}
