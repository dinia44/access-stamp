import { Card } from "@/components/ui";
import { ToolkitCopyButton } from "@/components/ai-toolkit/toolkit-copy-button";

export function ToolkitSectionCard({
  title,
  children,
  copyText,
  id,
}: {
  title: string;
  children: React.ReactNode;
  copyText?: string;
  id?: string;
}) {
  return (
    <div id={id}>
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-heading">{title}</h3>
          {copyText ? <ToolkitCopyButton text={copyText} /> : null}
        </div>
        <div className="mt-3 text-sm leading-relaxed text-text">{children}</div>
      </Card>
    </div>
  );
}

export function ToolkitListSection({
  title,
  items,
  copyText,
}: {
  title: string;
  items: string[];
  copyText?: string;
}) {
  if (!items.length) return null;
  const joined = items.map((x, i) => `${i + 1}. ${x}`).join("\n");
  return (
    <ToolkitSectionCard title={title} copyText={copyText ?? joined}>
      <ol className="list-decimal space-y-2 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </ToolkitSectionCard>
  );
}
