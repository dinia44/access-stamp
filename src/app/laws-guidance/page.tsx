"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { LAWS_GUIDANCE_LINKS, type LawGuidanceLink } from "@/lib/laws-guidance";

function getLawDetails(link: LawGuidanceLink) {
  const lower = `${link.title} ${link.helpsWith}`.toLowerCase();
  if (lower.includes("equality act")) {
    return {
      p1: "The Equality Act 2010 is the main UK law that protects disabled people from discrimination in work, education, services, housing, and transport. It sets out where unfair treatment is unlawful and when organisations must make reasonable adjustments.",
      p2: "In practice, this means providers and employers should remove avoidable barriers, change policies when needed, and not put disabled people at a substantial disadvantage. If this is not happening, this law gives a clear rights framework for complaints and escalation.",
    };
  }
  if (lower.includes("access to work")) {
    return {
      p1: "Access to Work is a government scheme that can fund practical support to help disabled people start work, stay in work, or move into self-employment. Support may include specialist equipment, travel help, communication support, or coaching.",
      p2: "It is separate from your employer's duty to make reasonable adjustments, so both can apply together. Using this guidance can help you prepare a stronger request and clearly explain what support you need to work safely and effectively.",
    };
  }
  if (lower.includes("send") || lower.includes("students")) {
    return {
      p1: "Education guidance in this section explains what support schools, colleges, and universities should provide for disabled learners. It covers planning, assessment, and practical adjustments that help learners access education on equal terms.",
      p2: "These sources are useful when asking for support plans, specialist provision, or formal reviews. They can help parents, carers, and students understand what is reasonable to request and how to challenge decisions when support is delayed or refused.",
    };
  }
  if (lower.includes("aviation") || lower.includes("air travel") || lower.includes("transport")) {
    return {
      p1: "Travel guidance sets out what assistance passengers can expect before, during, and after their journey. This includes wheelchair handling, airport or station support, and how providers should respond when things go wrong.",
      p2: "If support is denied or mobility equipment is damaged, these rules and complaint routes help you record evidence and escalate quickly. They are designed to make providers accountable and improve outcomes after poor service.",
    };
  }
  if (lower.includes("housing") || lower.includes("facilities grant")) {
    return {
      p1: "Housing guidance explains routes for adaptations, accessibility improvements, and complaint escalation when homes are not suitable. It helps people understand both practical funding paths and formal complaint options.",
      p2: "Using this guidance can support clearer requests for changes such as ramps, bathroom adaptations, or safer access arrangements. It also helps when landlords or services do not respond appropriately and escalation is needed.",
    };
  }
  return {
    p1: "This source explains your rights and practical options in this area, including what support should be available and how decisions are usually made. It is a good starting point for understanding both legal duties and day-to-day guidance.",
    p2: "If you are not getting the support you need, use this guidance to structure your next steps, gather evidence, and escalate clearly. It can help you make stronger requests and communicate your needs with confidence.",
  };
}

export default function LawsGuidancePage() {
  const groups = ["General", "Work", "Education", "Travel", "Services", "Housing"] as const;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "none" }} />
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">Useful laws and guidance</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Laws, rights, and practical guidance links</h1>
            <p className="max-w-[82ch] text-muted">
              Trusted links for Equality Act rights, workplace adjustments, education support, travel rights, housing access,
              and complaint escalation.
            </p>
          </div>

          {groups.map((group) => {
            const links = LAWS_GUIDANCE_LINKS.filter((item) => item.audience === group);
            if (!links.length) return null;
            return (
              <section key={group} className="space-y-3">
                <h2 className="font-[var(--font-heading)] text-2xl text-heading">{group}</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {links.map((link) => (
                    <Card key={link.href} className="p-5 transition-shadow hover:shadow-[0_14px_32px_-24px_rgba(12,29,52,0.45)]">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-heading underline-offset-4 hover:text-blue hover:underline"
                      >
                        {link.title}
                      </a>
                      <p className="mt-2 text-sm text-muted">{link.helpsWith}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setExpanded((state) => ({ ...state, [link.href]: !state[link.href] }))}
                          className="inline-flex items-center justify-center rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-xs font-semibold text-heading hover:bg-background"
                          aria-expanded={expanded[link.href] ? "true" : "false"}
                        >
                          {expanded[link.href] ? "Hide information" : "More information"}
                        </button>
                      </div>
                      {expanded[link.href] ? (
                        <div className="mt-3 rounded-[var(--radius-ui)] border border-[#dbe4f2] bg-[#f8fbff] p-3">
                          <p className="text-sm text-heading">{getLawDetails(link).p1}</p>
                          <p className="mt-2 text-sm text-heading">{getLawDetails(link).p2}</p>
                        </div>
                      ) : null}
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
