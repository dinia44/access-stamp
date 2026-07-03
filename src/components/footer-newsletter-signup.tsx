"use client";

import Link from "next/link";
import { useState } from "react";

export function FooterNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubscribe() {
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage(data.message ?? "Thanks — you're subscribed.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Please try again later.");
    }
  }

  return (
    <div
      className="mb-12 rounded-[20px] border border-[#EFE5DA] bg-white p-6 text-[#20242E] shadow-[0_12px_32px_-20px_rgba(122,80,48,0.16)] sm:p-8"
      aria-labelledby="footer-newsletter-heading"
    >
      <h2
        id="footer-newsletter-heading"
        className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[#20242E]"
      >
        Stay in the loop
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4A5263]">
        Benefits and accessibility rules change often. Get an occasional email when we add venues, publish guides, or
        update what&apos;s changed — no spam, unsubscribe anytime.
      </p>

      {status === "error" && message ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {message}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="footer-newsletter-email" className="block text-sm font-medium text-[#20242E]">
            Email address
          </label>
          <input
            id="footer-newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "loading" || status === "ok"}
            className="mt-2 h-11 w-full rounded-full border border-[#EFE5DA] bg-[#FDFBF8] px-4 text-sm text-[#20242E] focus:border-[#F6CFB8] focus:outline-none focus:ring-2 focus:ring-[#FDE9DD] disabled:opacity-70"
            placeholder="you@example.com"
            aria-invalid={status === "error"}
            aria-describedby="footer-newsletter-helper"
          />
        </div>
        <button
          type="button"
          onClick={onSubscribe}
          disabled={status === "loading" || status === "ok"}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#EF5B25] px-6 text-sm font-semibold text-white transition hover:bg-[#D94E1C] disabled:opacity-70"
        >
          {status === "loading" ? "Subscribing…" : status === "ok" ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <p id="footer-newsletter-helper" className="mt-4 text-xs leading-5 text-[#76808F]">
        We only use this to send the newsletter. See our{" "}
        <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[#4A5263]">
          Privacy Policy
        </Link>
        .
      </p>

      {status === "ok" && message ? (
        <p className="mt-3 text-sm text-[#5F7444]" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
