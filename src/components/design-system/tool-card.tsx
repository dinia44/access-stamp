import { Badge, Card } from "@/components/ui";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ToolCard({
  title,
  description,
  bestFor,
  time,
  youGet,
  cta,
  href,
  badge,
}: {
  title: string;
  description: string;
  bestFor: string;
  time: string;
  youGet: string;
  cta: string;
  href: string;
  badge?: string;
}) {
  return (
    <Card className="flex h-full flex-col p-5">
      {badge ? (
        <Badge tone="navy" className="w-fit">
          {badge}
        </Badge>
      ) : null}
      <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-heading">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="font-semibold text-heading">Best for</dt>
          <dd className="text-muted">{bestFor}</dd>
        </div>
        <div>
          <dt className="font-semibold text-heading">Time</dt>
          <dd className="text-muted">{time}</dd>
        </div>
        <div>
          <dt className="font-semibold text-heading">You get</dt>
          <dd className="text-muted">{youGet}</dd>
        </div>
      </dl>
      <div className="mt-5">
        <ButtonLink href={href}>{cta}</ButtonLink>
      </div>
    </Card>
  );
}
