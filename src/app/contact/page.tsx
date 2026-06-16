import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CONTACT_EMAIL } from "@/lib/contact";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Access Stamp",
  description:
    "Contact Access Stamp about venue access information, guides, partnerships, venue support, or general enquiries.",
  path: "/contact",
});

const CONTACT_CARDS = [
  {
    title: "General enquiries",
    body: "Questions about Access Stamp, guides, tools, or how the platform works.",
    email: CONTACT_EMAIL,
    cta: null as string | null,
    href: null as string | null,
  },
  {
    title: "Venue enquiries",
    body: "For venues, event spaces, restaurants, cafés, hotels, visitor attractions, and organisations that want clearer access information.",
    email: null,
    cta: "Ask about venue support",
    href: "/for-venues#book-audit",
  },
  {
    title: "Partnerships and media",
    body: "For collaborations, accessibility projects, interviews, or research.",
    email: CONTACT_EMAIL,
    cta: "Contact Access Stamp",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Partnership or media enquiry")}`,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="bg-[#FDFBF8] text-[#20242E]">
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Contact</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            Contact Access Stamp
          </h1>
          <p className="text-base leading-7 text-[#4A5263] sm:text-lg">
            Contact Access Stamp about venue access information, guides, partnerships, venue support, or general
            enquiries.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {CONTACT_CARDS.map((card) => (
            <li
              key={card.title}
              className="flex h-full flex-col rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.1)]"
            >
              <h2 className="text-lg font-semibold text-[#20242E]">{card.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-[#4A5263]">{card.body}</p>
              {card.email ? (
                <a
                  href={`mailto:${card.email}`}
                  className="mt-4 text-sm font-semibold text-[#C8430F] underline-offset-2 hover:underline"
                >
                  {card.email}
                </a>
              ) : null}
              {card.cta && card.href ? (
                <div className="mt-4">
                  {card.href.startsWith("mailto:") ? (
                    <a
                      href={card.href}
                      className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline"
                    >
                      {card.cta}
                    </a>
                  ) : (
                    <ButtonLink href={card.href} variant="secondary" className="min-h-11">
                      {card.cta}
                    </ButtonLink>
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#20242E]">Send a message</h2>
            <p className="text-sm leading-6 text-[#4A5263]">
              Access Stamp is currently growing, so response times may vary.
            </p>
            <ContactForm />
          </div>

          <aside className="rounded-[24px] border border-[#EFE5DA] bg-[#FAF4ED] p-6">
            <h2 className="text-base font-semibold text-[#20242E]">Important</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5263]">
              Access Stamp cannot provide emergency, legal, medical, safeguarding, or crisis advice. If something is
              urgent, contact the relevant emergency service, official organisation, or qualified adviser.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#4A5263]">
              Prefer email? Write to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-[#C8430F] hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <p className="mt-4 text-sm text-[#76808F]">
              See also{" "}
              <Link href="/accessibility" className="font-semibold text-[#C8430F] hover:underline">
                accessibility statement
              </Link>
              .
            </p>
          </aside>
        </div>
      </Container>
    </div>
  );
}
