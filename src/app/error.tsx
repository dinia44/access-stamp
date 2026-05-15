"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { Button, Card } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-background">
      <Container className="py-16">
        <Card className="mx-auto max-w-lg space-y-4 p-8 text-center">
          <h1 className="font-[var(--font-heading)] text-3xl text-heading">Something went wrong</h1>
          <p className="text-sm text-muted">
            We hit an unexpected error loading this page. You can try again, go home, or use the AI
            assistant for help.
          </p>
          {process.env.NODE_ENV === "development" && error.message ? (
            <p className="rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-left text-xs text-muted">
              {error.message}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-center gap-3">
            <Button type="button" onClick={() => reset()}>
              Try again
            </Button>
            <Button href="/" variant="secondary">
              Home
            </Button>
            <Link href="/?openChat=1" className="text-sm font-semibold text-blue underline-offset-2 hover:underline">
              Open AI assistant
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
