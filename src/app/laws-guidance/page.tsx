import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { LAWS_GUIDANCE_LINKS } from "@/lib/laws-guidance";

export default function LawsGuidancePage() {
  const groups = ["General", "Work", "Education", "Travel", "Services", "Housing"] as const;
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
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-blue hover:underline"
                      >
                        {link.title}
                      </a>
                      <p className="mt-2 text-sm text-muted">{link.helpsWith}</p>
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
