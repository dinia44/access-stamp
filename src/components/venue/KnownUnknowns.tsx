import { formatKnownUnknowns } from "@/lib/format-known-unknowns";

type Props = {
  count: number;
  className?: string;
};

export function KnownUnknowns({ count, className }: Props) {
  if (count <= 0) return null;

  return (
    <p className={className}>
      {formatKnownUnknowns(count)} — confirm before travelling
    </p>
  );
}
