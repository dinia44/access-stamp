import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { ADVICE_CATEGORIES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";

export default function AdviceHubPage() {
  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="amber">Advice Hub</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Practical guides in plain language</h1>
            <p className="max-w-[80ch] text-muted">
              Practical, plain-language guides on disability rights, equipment, care, education, transport, workplace,
              and more. Written from lived experience.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ADVICE_CATEGORIES.map((c) => (
              <Link key={c.href} href={c.href} className="group">
                <Card className="h-full transition-shadow group-hover:shadow-[var(--shadow)]">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-pale text-lg" aria-hidden>
                        {c.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-heading">{c.title}</div>
                        <div className="mt-1 text-sm text-muted">{c.desc}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm font-semibold text-blue">Open →</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Card className="p-5 md:col-span-1">
              <div className="text-sm font-semibold text-heading">Useful links</div>
              <ul className="mt-3 space-y-2 text-sm font-semibold">
                <li><Link className="text-blue" href="/directory">Directory →</Link></li>
                <li><Link className="text-blue" href="/glossary">Glossary →</Link></li>
                <li><Link className="text-blue" href="/ai">Or ask our AI →</Link></li>
              </ul>
            </Card>
            <Card className="p-5 md:col-span-2">
              <div className="text-sm font-semibold text-heading">How this is written</div>
              <p className="mt-2 text-sm text-muted">
                Clear, confident, and practical. No charity tone. No inspiration language. Acronyms are explained on
                first use, and complex processes are broken into numbered steps.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
