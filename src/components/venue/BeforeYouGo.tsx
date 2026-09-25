import { CopyableScript } from "@/components/design-system/copyable-script";
import { MethodologyLink } from "@/components/design-system/methodology-link";
import { Card } from "@/components/ui";

const DEFAULT_SCRIPT =
  "Hi, I'm planning to visit and need to check a few access details before booking. Could you confirm the step-free entrance location, narrowest doorway width, accessible toilet layout, parking or drop-off arrangements, and whether staff can keep a clear route available?";

type Props = {
  script?: string;
  tips?: string[];
  demo?: boolean;
};

export function BeforeYouGo({ script = DEFAULT_SCRIPT, tips, demo = false }: Props) {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-heading">{demo ? "Example questions for a real venue" : "Before you travel, confirm these details"}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        {demo ? "This is an example script. Use it with a real venue whose identity and contact details you have verified." : "Access information can change. Confirm important details directly with the venue before travelling."}
      </p>
      <CopyableScript script={script} className="mt-4" />
      {tips?.length ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      ) : null}
      <MethodologyLink className="mt-4" />
    </Card>
  );
}
