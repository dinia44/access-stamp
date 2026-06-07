"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { DIRECTORY_ENTRIES } from "@/lib/directory-entries";

export default function DirectoryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>(DIRECTORY_ENTRIES.map((e) => e.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DIRECTORY_ENTRIES.filter((e) => {
      if (cat !== "All" && e.category !== cat) return false;
      if (!term) return true;
      return (
        e.name.toLowerCase().includes(term) ||
        e.category.toLowerCase().includes(term) ||
        e.area.toLowerCase().includes(term) ||
        (e.notes ?? "").toLowerCase().includes(term) ||
        (e.phone ?? "").toLowerCase().includes(term)
      );
    });
  }, [q, cat]);

  return (
    <div className="premium-section-hero">
      <SetChatContext page={{ kind: "directory" }} />
      <Container className="py-12 md:py-16">
        <div className="space-y-8">
          <div className="page-hero-panel max-w-3xl space-y-4">
            <Badge tone="blue">Directory</Badge>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-heading sm:text-5xl">
              Useful contacts
            </h1>
            <p className="max-w-[65ch] text-base leading-7 text-muted">
              UK-wide helplines and services we often point people to. Always check their sites for the latest hours and
              eligibility.
            </p>
          </div>

          <Card className="border-blue-pale bg-blue-pale/30 p-4 text-sm text-text">
            Missing a service?{" "}
            <Link href="/submit-venue" className="font-semibold text-blue underline-offset-2 hover:underline">
              Suggest a venue
            </Link>{" "}
            for access listings, or ask the{" "}
            <Link href="/ai" className="font-semibold text-blue underline-offset-2 hover:underline">
              AI assistant
            </Link>{" "}
            for advice links.
          </Card>

          <Card className="p-5">
            <div className="grid gap-3 md:grid-cols-[1fr_260px]">
              <label className="text-sm font-semibold text-muted">
                Search
                <input
                  className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                  placeholder="Name, category, area…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </label>
              <label className="text-sm font-semibold text-muted">
                Category
                <select
                  className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>
          </Card>

          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((e) => (
              <Card key={e.name} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-heading">{e.name}</div>
                    <div className="mt-1 text-xs font-semibold text-muted">
                      {e.category} · {e.area}
                    </div>
                  </div>
                  <Badge tone="blue">{e.category}</Badge>
                </div>
                {e.notes ? <p className="mt-3 text-sm text-muted">{e.notes}</p> : null}
                <dl className="mt-3 space-y-1 text-sm text-muted">
                  {e.phone ? (
                    <div>
                      <dt className="inline font-semibold text-heading">Phone: </dt>
                      <dd className="inline">{e.phone}</dd>
                    </div>
                  ) : null}
                  {e.website ? (
                    <div>
                      <dt className="inline font-semibold text-heading">Website: </dt>
                      <dd className="inline">
                        <a
                          href={e.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue underline-offset-2 hover:underline"
                        >
                          {new URL(e.website).hostname.replace(/^www\./, "")}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </Card>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-muted">No matches. Try a different search or category.</p>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
