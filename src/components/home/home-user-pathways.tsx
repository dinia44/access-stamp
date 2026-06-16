import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { HOME_FOCUS } from "@/components/home/home-theme";

const PATHWAYS = [
  {
    title: "I'm checking access before I go somewhere",
    body: "Find practical access details before travelling.",
    cta: "Find venue access information",
    href: "/venue-finder",
  },
  {
    title: "I need practical disability guidance",
    body: "Browse plain-English guides on rights, access, support, and adjustments.",
    cta: "Browse guides",
    href: "/advice",
  },
  {
    title: "I need wording, a checklist, or a letter",
    body: "Use structured tools to prepare drafts, questions, and next steps.",
    cta: "Use Access Stamp tools",
    href: "/ai-toolkit",
  },
  {
    title: "I run a venue or organisation",
    body: "Show access clearly and help people make confident decisions.",
    cta: "See venue support",
    href: "/for-venues",
  },
] as const;

export function HomeUserPathways() {
  return (
    <section className="border-t border-[#EFE5DA] bg-[#FDFBF8] py-16 sm:py-20" aria-labelledby="pathways-heading">
      <PageContainer>
        <div className="max-w-2xl">
          <h2 id="pathways-heading" className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl">
            What do you need help with today?
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {PATHWAYS.map((pathway) => (
            <li key={pathway.title}>
              <article className="flex h-full flex-col rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.1)]">
                <h3 className="text-lg font-semibold text-[#20242E]">{pathway.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#4A5263]">{pathway.body}</p>
                <Link
                  href={pathway.href}
                  className={`mt-5 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline ${HOME_FOCUS}`}
                >
                  {pathway.cta}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
