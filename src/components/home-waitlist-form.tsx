"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";

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
    <form className="mx-auto mt-5 w-full max-w-[400px]" onSubmit={onSubmit} noValidate>
      <label htmlFor="waitlist-email" className="sr-only">
        Email address for waitlist
      </label>
      {status === "error" && message ? (
        <div className="form-error-summary mb-3 text-left" role="alert">
          {message}
        </div>
      ) : null}
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
          className="form-input h-11 flex-1 px-3 text-sm disabled:opacity-70"
          placeholder="Your email address"
          aria-invalid={status === "error"}
        />
        <Button type="submit" variant="primary" className="shrink-0" disabled={status === "loading" || status === "ok"}>
          {status === "loading" ? "Joining…" : status === "ok" ? "Joined" : "Join waitlist"}
        </Button>
      </div>
      {status === "ok" && message ? (
        <p className="form-success-text mt-2" role="status">
          {message}
        </p>
      ) : status !== "error" ? (
        <p className="mt-2 text-xs text-muted">No spam. Unsubscribe when we email you.</p>
      ) : null}
    </form>
  );
}
