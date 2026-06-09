import { Container } from "@/components/container";

export function PageContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <Container className={className}>{children}</Container>;
}
