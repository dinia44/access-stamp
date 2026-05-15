"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f3f8ff] p-8 font-sans text-[#0f1a2b]">
        <main className="mx-auto max-w-lg space-y-4 rounded-xl border border-[#d8e1ef] bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-semibold">Access Stamp</h1>
          <p className="text-sm text-[#5a6e82]">Something went wrong. Please try again.</p>
          {process.env.NODE_ENV === "development" && error.message ? (
            <p className="rounded-lg border border-[#d8e1ef] bg-[#f3f8ff] px-3 py-2 text-left text-xs">{error.message}</p>
          ) : null}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg bg-[#1a6fc4] px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
            <Link href="/" className="rounded-lg border border-[#d8e1ef] px-4 py-2 text-sm font-semibold text-[#1a6fc4]">
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
