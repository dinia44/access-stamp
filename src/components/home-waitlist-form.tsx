"use client";

import { useState, type FormEvent } from "react";

export function HomeWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage(data.message ?? "Thanks — you are on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Please try again later.");
    }
  }

  return (
    <form className="mx-auto mt-5 w-full max-w-[400px]" onSubmit={onSubmit}>
      <label htmlFor="waitlist-email" className="sr-only">
        Email address for waitlist
      </label>
      <div className="flex w-full gap-2">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "ok"}
          className="h-11 flex-1 rounded-[var(--radius-ui)] border border-border bg-background px-3 text-sm text-heading"
          placeholder="Your email address"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "ok"}
          className="inline-flex shrink-0 items-center justify-center rounded-[var(--radius-ui)] bg-amber px-4 py-2 text-sm font-semibold text-navy transition-opacity hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : status === "ok" ? "Joined" : "Join waitlist"}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-2 text-xs font-semibold ${status === "error" ? "text-amber" : "text-muted"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted">No spam. Unsubscribe when we email you.</p>
      )}
    </form>
  );
}
