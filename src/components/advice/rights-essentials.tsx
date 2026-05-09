import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const ESCALATION_STEPS = [
  {
    step: 1,
    title: "Name it and ask clearly",
    body: "Say what is harder for you, what you need, and by when. Email is fine — keep it short and dated.",
  },
  {
    step: 2,
    title: "Follow up in writing",
    body: "If nothing changes, resend with a reasonable deadline. You are building a timeline, not being difficult.",
  },
  {
    step: 3,
    title: "Use the formal complaints route",
    body: "Every large organisation should have one. Ask for the policy, reference numbers, and expected response times.",
  },
  {
    step: 4,
    title: "Independent bodies and advice",
    body: "Ombudsmen, regulators, Citizens Advice, Acas, EASS, and specialists — pick the route that matches housing, NHS, work, or benefits.",
  },
  {
    step: 5,
    title: "Legal routes (when appropriate)",
    body: "Tribunals and court deadlines are strict. Use EASS or a solicitor — Access Stamp does not replace legal advice.",
  },
] as const;

const MYTHS = [
  {
    myth: "“Reasonable adjustments” means I get whatever I ask for.",
    truth:
      "The duty is to remove disadvantages where it is reasonable. You should still ask clearly — organisations must think properly about your request, not dismiss it without considering alternatives.",
  },
  {
    myth: "If I can manage sometimes, I am not “disabled enough”.",
    truth:
      "The Equality Act looks at the impact of your condition over time, including fluctuating conditions. Good and bad days can both be relevant.",
  },
  {
    myth: "I have to tell everyone about my condition.",
    truth:
      "You choose when to disclose. In practice, employers and services often need enough information to put adjustments in place — but that is different from sharing a full medical history.",
  },
] as const;

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "What counts as discrimination under the Equality Act?",
    a: (
      <>
        Several types exist — including direct discrimination, discrimination arising from disability, indirect discrimination,
        harassment, and failure to make reasonable adjustments. Our{" "}
        <Link href="/advice/equality-act" className="font-semibold text-blue underline-offset-2 hover:underline">
          Equality Act guide
        </Link>{" "}
        walks through them in everyday language.
      </>
    ),
  },
  {
    q: "Who has to make reasonable adjustments?",
    a: "Employers, education providers, landlords in some situations, and organisations providing goods, facilities, and services to the public — with some specific rules per context.",
  },
  {
    q: "What evidence should I keep?",
    a: "Dates, names, emails, screenshots of inaccessible booking pages, photos only where safe and appropriate, and a one-page timeline. You do not need perfect files — consistency beats polish.",
  },
  {
    q: "Can I complain about how a benefit assessment was done?",
    a: "Yes — mandatory reconsideration and appeals are the main benefit routes. Equality Act arguments can also matter if the assessment process itself put you at a substantial disadvantage and adjustments were refused.",
  },
  {
    q: "What if I am too exhausted to fight?",
    a: "That is common. Advocacy services, trusted friends, MPs’ caseworkers (for some issues), and formal complaints can share the load. Prioritise safety and health first.",
  },
] as const;

function DetailsFaq({ question, answer }: { question: string; answer: ReactNode }) {
  return (
    <details className="group rounded-[var(--radius-card)] border border-border bg-card px-4 py-3">
      <summary className="cursor-pointer list-none font-semibold text-heading [&::-webkit-details-marker]:hidden">
        <span className="flex items-start justify-between gap-2">
          {question}
          <span className="text-blue transition group-open:rotate-90" aria-hidden>
            ›
          </span>
        </span>
      </summary>
      <div className="mt-3 border-t border-border pt-3 text-sm text-muted">{answer}</div>
    </details>
  );
}

export function RightsEssentials() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-3">
        <h2 className="font-[var(--font-heading)] text-2xl text-heading">UK disability rights in plain English</h2>
        <p className="text-sm text-muted md:text-base">
          The guides below go deep on each topic. This section is the “sit down with a cup of tea” overview — how the law is supposed to work in real life, without expecting you to already sound like a lawyer.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <Card className="space-y-5 border border-border p-5 sm:p-6">
          <div className="space-y-3 text-sm text-text md:text-base">
            <p>
              <strong className="text-heading">The Equality Act 2010</strong> is the main UK law that protects disabled people in
              work, education, and when using services like shops, banks, transport operators, councils, and many online
              systems. It also covers some housing situations and associations.
            </p>
            <p>
              You are usually protected if you have a physical or mental impairment that has a{" "}
              <strong className="text-heading">substantial</strong> negative effect on day-to-day activities and is{" "}
              <strong className="text-heading">long-term</strong> (or likely to be). Some conditions, such as cancer, HIV, and
              multiple sclerosis, are protected from diagnosis. Fluctuating conditions can still count.
            </p>
            <p>
              <strong className="text-heading">Reasonable adjustments</strong> are changes to rules, practices, physical
              features, or the way information is provided, so you are not put at a substantial disadvantage compared to
              non-disabled people. They are not “special favours” — they are how organisations meet their legal duty.
            </p>
            <p>
              When things go wrong, most people do not start with court claims. They start with a clear request, a paper trail,
              a formal complaint, and — where needed — ombudsmen, regulators, or specialist advice. The cards and guides on
              this page are built around that practical order.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-background-2 p-4 text-sm text-text">
            <div className="font-semibold text-heading">Words that confuse people</div>
            <p className="mt-2 text-muted">
              <strong className="text-heading">Substantial disadvantage</strong> means roughly “more than minor or trivial” in
              real life — for example missing appointments because you cannot use the booking system, or being unable to
              complete work tasks without adjustments.
            </p>
            <p className="mt-2">
              <Link href="/glossary" className="font-semibold text-blue underline-offset-2 hover:underline">
                Open the jargon buster →
              </Link>
            </p>
          </div>
        </Card>

        <Card className="border border-border bg-background-2 p-5">
          <div className="text-sm font-semibold text-heading">Typical escalation path</div>
          <p className="mt-1 text-xs text-muted">Not every situation follows this exactly — use it as a sensible default.</p>
          <ol className="mt-4 space-y-4">
            {ESCALATION_STEPS.map((s, i) => (
              <li key={s.step} className="flex gap-3 text-sm">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                    i < 2 ? "bg-blue" : i < 4 ? "bg-[#6b5cae]" : "bg-heading/80",
                  )}
                >
                  {s.step}
                </span>
                <div>
                  <div className="font-semibold text-heading">{s.title}</div>
                  <p className="mt-1 text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-4 border-t border-border pt-4 text-xs text-muted">
            Related:{" "}
            <Link href="/laws-guidance" className="font-semibold text-blue underline-offset-2 hover:underline">
              Laws & guidance hub
            </Link>
            ,{" "}
            <Link href="/advice/formal-complaints" className="font-semibold text-blue underline-offset-2 hover:underline">
              formal complaints guide
            </Link>
            .
          </div>
        </Card>
      </div>

      <div>
        <h3 className="font-[var(--font-heading)] text-lg font-semibold text-heading">Myths that waste energy</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {MYTHS.map((m) => (
            <Card key={m.myth} className="border border-border p-4 text-sm">
              <p className="font-semibold text-heading">{m.myth}</p>
              <p className="mt-2 text-muted">{m.truth}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-[var(--font-heading)] text-lg font-semibold text-heading">Quick answers</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted">
          Short FAQs — each topic has a fuller guide in the lists below.
        </p>
        <div className="mt-4 flex max-w-3xl flex-col gap-2">
          {FAQ.map((item) => (
            <DetailsFaq key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}
