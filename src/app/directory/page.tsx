"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";

type Entry = {
  name: string;
  category: string;
  area: string;
  phone?: string;
  website?: string;
  notes?: string;
};

const ENTRIES: Entry[] = [
  {
    name: "Wheelchair Services (Example)",
    category: "Wheelchair services",
    area: "North West",
    phone: "Coming soon",
    website: "Coming soon",
    notes: "Regional directory entry preview. Full provider list and filters are being added.",
  },
  {
    name: "PA Payroll (Example)",
    category: "PA payroll",
    area: "UK",
    notes: "Directory entry preview.",
  },
  {
    name: "Legal Advice (Example)",
    category: "Legal advice",
    area: "UK",
    notes: "Directory entry preview.",
  },
];

export default function DirectoryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>(ENTRIES.map((e) => e.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      if (cat !== "All" && e.category !== cat) return false;
      if (!term) return true;
      return (
        e.name.toLowerCase().includes(term) ||
        e.category.toLowerCase().includes(term) ||
        e.area.toLowerCase().includes(term) ||
        (e.notes ?? "").toLowerCase().includes(term)
      );
    });
  }, [q, cat]);

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "directory" }} />
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="amber">Directory</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Contacts directory</h1>
            <p className="max-w-[85ch] text-muted">
              Searchable contacts (wheelchair services by region, local authority teams, PA agencies, equipment repair,
              legal advice, and more).
            </p>
          </div>

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
                <div className="mt-3 text-sm text-muted">
                  <div>
                    <span className="font-semibold text-heading">Phone:</span> {e.phone ?? "—"}
                  </div>
                  <div>
                    <span className="font-semibold text-heading">Website:</span> {e.website ?? "—"}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
