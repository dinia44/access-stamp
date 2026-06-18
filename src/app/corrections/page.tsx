import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CONTACT_EMAIL } from "@/lib/contact";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("corrections");

export default function CorrectionsPage() {
  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Corrections" }]} />
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-heading">Corrections and updates</h1>
          <p className="text-base leading-7 text-muted">
            Access information changes. Venue owners, staff, and disabled visitors can help keep listings accurate.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-heading">Who can submit a correction</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>Venue owners or managers updating access details</li>
            <li>Disabled visitors reporting inaccuracies after a visit</li>
            <li>Staff or carers sharing corrected measurements or routes</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-heading">What to include</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>Venue name and location</li>
            <li>Which feature or measurement is wrong or missing</li>
            <li>When you last checked the detail on site</li>
            <li>Photographs or measurements where you have consent to share them</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-heading">How to submit</h2>
          <p className="text-sm leading-6 text-muted">
            Email us with the subject line <strong className="text-heading">Venue correction</strong> or use the report
            link on any venue page. We review submissions against our{" "}
            <Link href="/methodology" className="font-semibold text-[#C8430F] hover:underline">
              methodology
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Venue%20correction`}>Email a correction</ButtonLink>
            <ButtonLink href="/submit-venue" variant="secondary">
              Submit a new venue
            </ButtonLink>
          </div>
        </section>

        <p className="text-sm text-muted">
          Correction status tracking is not yet available in the public product. We will confirm receipt by email where
          possible.
        </p>
      </div>
    </Container>
  );
}
