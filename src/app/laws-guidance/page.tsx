import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { LAWS_GUIDANCE_LINKS } from "@/lib/laws-guidance";
import Link from "next/link";

export default function LawsGuidancePage() {
  const groups = ["General", "Work", "Education", "Travel", "Services", "Housing"] as const;
  const isExternal = (href: string) => href.startsWith("http://") || href.startsWith("https://");
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
                    <Card key={link.href} className="p-5">
                      <div className="text-sm font-semibold text-heading">{link.title}</div>
                      <p className="mt-2 text-sm text-muted">{link.helpsWith}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-blue px-3 py-2 text-xs font-semibold text-white hover:bg-[#1a62ad]"
                        >
                          Open source
                        </a>
                        {isExternal(link.moreInfoHref) ? (
                          <a
                            href={link.moreInfoHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-xs font-semibold text-heading hover:bg-background"
                          >
                            More information
                          </a>
                        ) : (
                          <Link
                            href={link.moreInfoHref}
                            className="inline-flex items-center justify-center rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-xs font-semibold text-heading hover:bg-background"
                          >
                            More information
                          </Link>
                        )}
                      </div>
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
