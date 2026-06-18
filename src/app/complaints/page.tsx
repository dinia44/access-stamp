import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CONTACT_EMAIL } from "@/lib/contact";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("complaints");

export default function ComplaintsPage() {
  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Complaints" }]} />
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-heading">Complaints</h1>
          <p className="text-base leading-7 text-muted">
            Tell us if something on Access Stamp is misleading, incomplete, or handled poorly.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-heading">What you can complain about</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>Inaccurate or outdated venue information</li>
            <li>Editorial or guide content that is unclear or potentially harmful</li>
            <li>Accessibility barriers on the Access Stamp website itself</li>
            <li>How we handled a correction, submission, or contact enquiry</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-heading">How to submit</h2>
          <p className="text-sm leading-6 text-muted">
            Email <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-[#C8430F] hover:underline">{CONTACT_EMAIL}</a>{" "}
            with the subject line <strong className="text-heading">Complaint</strong>. Include the page URL, what went
            wrong, and what outcome you need.
          </p>
          <p className="text-sm leading-6 text-muted">
            We aim to acknowledge complaints within 5 working days and respond with an outcome or next steps within 20
            working days where possible.
          </p>
          <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Complaint`}>Send a complaint</ButtonLink>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-heading">Escalation</h2>
          <p className="text-sm leading-6 text-muted">
            If you remain dissatisfied after our response, you may ask for a review by a different member of the team.
            For data-protection complaints, you can contact the Information Commissioner&apos;s Office (ICO).
          </p>
          <p className="text-sm leading-6 text-muted">
            For venue report appeals, see our{" "}
            <Link href="/methodology" className="font-semibold text-[#C8430F] hover:underline">
              methodology
            </Link>{" "}
            and{" "}
            <Link href="/corrections" className="font-semibold text-[#C8430F] hover:underline">
              corrections route
            </Link>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
