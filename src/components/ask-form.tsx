"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ASK_NATIONS, type AskResult } from "@/lib/ask";
import { track } from "@/lib/analytics";

export function AskForm({
  guideSlug,
  guideTitle,
}: {
  guideSlug?: string;
  guideTitle?: string;
}) {
  const [situation, setSituation] = useState("");
  const [nation, setNation] = useState("England");
  const [followUp, setFollowUp] = useState("");
  const [result, setResult] = useState<AskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  async function submit(e: React.FormEvent, follow = false) {
    e.preventDefault();
    const combined = follow
      ? `${situation}\nFollow-up: ${followUp}`
      : situation;
    if (combined.length > 4000) {
      setError(
        "Please shorten your situation or follow-up to 4,000 characters in total.",
      );
      return;
    }
    setLoading(true);
    setError("");
    track("ai_tool_started", { tool: "ask" });
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: combined, nation, guideSlug }),
        signal: AbortSignal.timeout(45000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Please try again.");
      setResult(data);
      setSituation(combined);
      setFollowUp("");
      track("ai_tool_completed", {
        tool: "ask",
        source: data.mode,
        result_count: data.sources.length,
      });
      requestAnimationFrame(() => heading.current?.focus());
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "The request timed out. Try again or browse our guides.",
      );
      track("ai_tool_failed", { tool: "ask" });
    } finally {
      setLoading(false);
    }
  }
  const field =
    "mt-2 w-full rounded-xl border border-border bg-white p-3 text-heading";
  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="space-y-5">
        {guideTitle ? (
          <p className="text-sm text-muted">Using: {guideTitle}</p>
        ) : null}
        <label className="block font-semibold" htmlFor="ask-situation">
          Tell us what’s happening
          <textarea
            id="ask-situation"
            className={field}
            rows={5}
            required
            minLength={10}
            maxLength={4000}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="For example: I need changes to my desk at work, but I’m not sure what to ask for."
          />
        </label>
        <label className="block font-semibold" htmlFor="ask-nation">
          Where in the UK does this apply?
          <select
            id="ask-nation"
            className={field}
            value={nation}
            onChange={(e) => setNation(e.target.value)}
          >
            {ASK_NATIONS.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <p className="text-sm text-muted">
          Avoid sharing information we don’t need to know. Your text may be sent
          to OpenAI to prepare your guide.{" "}
          <Link className="underline" href="/legal/privacy">
            Read our Privacy Policy
          </Link>
          .
        </p>
        <button
          disabled={loading}
          className="min-h-12 rounded-full bg-[#C8430F] px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Preparing your guide…" : "Build my guide"}
        </button>
      </form>
      <p role="status" aria-live="polite" className="text-sm">
        {loading
          ? "Finding relevant guides and preparing your next steps…"
          : result
            ? "Your guide is ready."
            : ""}
      </p>
      {error ? (
        <p role="alert" className="rounded-xl border border-red-700 p-4">
          {error}{" "}
          <Link href="/advice" className="underline">
            Browse guides
          </Link>
        </p>
      ) : null}
      {result ? (
        <section
          aria-busy={loading}
          className="space-y-6 border-t border-border pt-6"
        >
          <h2 ref={heading} tabIndex={-1} className="text-2xl font-bold">
            Your practical guide
          </h2>
          {result.mode === "guide-extracts" ? (
            <p className="text-sm text-muted">
              Personalised generation is unavailable. Showing matching guide
              extracts, not an AI-generated plan.
            </p>
          ) : (
            <p className="text-sm text-muted">
              AI-generated using the guides below. Check the sources before
              acting.
            </p>
          )}
          <p>{result.plan.summary}</p>
          <ol className="list-decimal space-y-4 pl-6">
            {result.plan.steps.map((s, i) => (
              <li key={i}>
                {s.text}{" "}
                <Link
                  href={`/advice/${s.sourceSlug}`}
                  className="block text-sm underline"
                >
                  Source:{" "}
                  {result.sources.find((x) => x.slug === s.sourceSlug)?.title}
                </Link>
              </li>
            ))}
          </ol>
          <h3 className="text-lg font-semibold">What still needs checking</h3>
          <ul className="list-disc space-y-2 pl-6">
            {result.plan.unknowns.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">Sources and review dates</h3>
          <ul className="space-y-3">
            {result.sources.map((s) => (
              <li key={s.slug}>
                <Link className="underline" href={s.href}>
                  {s.title}
                </Link>
                <p className="text-sm text-muted">
                  Reviewed / updated: {s.reviewed}
                </p>
                {s.officialLinks.slice(0, 3).map((l) => (
                  <a
                    key={l.href}
                    className="block py-1 text-sm underline"
                    href={l.href}
                  >
                    {l.label}
                  </a>
                ))}
              </li>
            ))}
          </ul>
          <details>
            <summary className="min-h-11 cursor-pointer font-semibold">
              More tools
            </summary>
            <ul>
              {result.tools.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="inline-block py-3 underline">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <form onSubmit={(e) => submit(e, true)} className="space-y-3">
            <label className="block font-semibold" htmlFor="ask-follow-up">
              Add a detail or ask a follow-up
              <textarea
                id="ask-follow-up"
                required
                minLength={3}
                maxLength={1500}
                rows={3}
                className={field}
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
              />
            </label>
            <button
              disabled={loading}
              className="min-h-11 rounded-full border border-border px-5 py-2 font-semibold"
            >
              Update my guide
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
