"use client";

import { useCallback, useState } from "react";
import type { ToolkitInputMap, ToolkitRunResult, ToolkitToolId } from "@/lib/ai-toolkit/types";

export function useToolkitSubmit<T extends ToolkitToolId>(tool: T) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ToolkitRunResult<T> | null>(null);

  const submit = useCallback(
    async (input: ToolkitInputMap[T]) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ai-toolkit", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ tool, input }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error ?? "Request failed");
        }
        const data = (await res.json()) as ToolkitRunResult<T>;
        setResult(data);
        void fetch("/api/ai-toolkit/usage", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ tool, source: data.source }),
        }).catch(() => undefined);
        return data;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Something went wrong";
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [tool],
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { submit, loading, error, result, reset };
}
