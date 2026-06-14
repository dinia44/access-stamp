"use client";

import Link from "next/link";
import { useState } from "react";
import { AboutSection } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    <AboutSection aria-labelledby="about-newsletter-heading">
      <div className={`mx-auto max-w-3xl p-6 sm:p-10 ${ABOUT_PANEL}`}>
        <h2
          id="about-newsletter-heading"
          className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#13201F] sm:text-4xl"
        >
          Get practical access updates before you need them.
        </h2>
        <p className={`mt-4 ${ABOUT_BODY}`}>
          Join the Access Stamp newsletter for new venue checks, practical disability guides, access planning tips, and
          updates on tools that help people make better decisions.
        </p>

        {status === "error" && message ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {message}
          </div>
        ) : null}

        <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={onSubscribe} noValidate>
          <div className="flex-1">
            <label htmlFor="about-newsletter-email" className="block text-sm font-medium text-[#13201F]">
              Enter your email
            </label>
            <input
              id="about-newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading" || status === "ok"}
              className="mt-2 h-12 w-full rounded-2xl border border-[#E8C4A8] bg-[#FFF8F1] px-4 text-base text-[#13201F] placeholder:text-[#5E6A66]/80 focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15 disabled:opacity-70"
              placeholder="you@example.com"
              aria-invalid={status === "error"}
              aria-describedby="about-newsletter-helper"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "ok"}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-[#F04A16] px-6 text-sm font-semibold text-white transition hover:bg-[#D93E10] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F04A16]/25 focus-visible:ring-offset-2 disabled:opacity-70"
          >
            {status === "loading" ? "Joining…" : status === "ok" ? "Joined" : "Join the newsletter"}
          </button>
        </form>

        <p id="about-newsletter-helper" className="mt-4 text-sm leading-6 text-[#5E6A66]">
          No spam. Just practical access information, guides, and platform updates. See our{" "}
          <Link href="/legal/privacy" className="font-semibold text-[#F04A16] underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>

        {status === "ok" && message ? (
          <p className="mt-3 text-sm font-medium text-[#2F7D32]" role="status">
            {message}
          </p>
        ) : null}
      </div>
    </AboutSection>
  );
}
