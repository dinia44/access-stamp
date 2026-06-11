"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/container";
import { Button, Card } from "@/components/ui";

export default function VenueFinderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Venue finder error:", error);
  }, [error]);

  return (
    <div className="bg-background">
      <Container className="py-16">
        <Card className="mx-auto max-w-lg space-y-4 p-8 text-center">
          <h1 className="font-[var(--font-heading)] text-3xl text-heading">Venue finder unavailable</h1>
          <p className="text-sm text-muted">
            We hit an unexpected error loading venue search. You can try again, browse from the homepage, or
            use the AI assistant for help.
          </p>
          {error.digest ? (
            <p className="rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-left text-xs text-muted">
              Reference: {error.digest}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-center gap-3">
            <Button type="button" onClick={() => reset()}>
              Try again
            </Button>
            <Button href="/" variant="secondary">
              Home
            </Button>
            <Link
              href="/?openChat=1"
              className="text-sm font-semibold text-blue underline-offset-2 hover:underline"
            >
              Open AI assistant
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
