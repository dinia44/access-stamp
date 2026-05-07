"use client";

import { useEffect, useState } from "react";

type Prefs = {
  textScale: "normal" | "large";
  lineSpacing: "normal" | "wide";
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
};

const DEFAULTS: Prefs = {
  textScale: "normal",
  lineSpacing: "normal",
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
};

export function AccessibilityControls() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(() => {
    if (typeof window === "undefined") return DEFAULTS;
    const raw = window.localStorage.getItem("access-stamp-a11y");
    if (!raw) return DEFAULTS;
    try {
      const parsed = JSON.parse(raw) as Partial<Prefs>;
      return { ...DEFAULTS, ...parsed };
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.dataset.textScale = prefs.textScale;
    document.body.dataset.lineSpacing = prefs.lineSpacing;
    document.body.dataset.highContrast = prefs.highContrast ? "on" : "off";
    document.body.dataset.reduceMotion = prefs.reduceMotion ? "on" : "off";
    document.body.dataset.dyslexiaFont = prefs.dyslexiaFont ? "on" : "off";
    window.localStorage.setItem("access-stamp-a11y", JSON.stringify(prefs));
  }, [prefs]);

  return (
    <div className="fixed bottom-5 left-5 z-[61] print:hidden">
      <button
        type="button"
        className="rounded-[var(--radius-ui)] border border-border bg-card px-3 py-2 text-sm font-semibold text-heading shadow-[var(--shadow-soft)]"
        onClick={() => setOpen((v) => !v)}
      >
        Accessibility
      </button>
      {open ? (
        <div className="mt-2 w-[280px] rounded-[var(--radius-card)] border border-border bg-card p-3 shadow-[var(--shadow)]">
          <div className="text-sm font-semibold text-heading">Accessibility options</div>
          <div className="mt-3 grid gap-3 text-sm">
            <label className="grid gap-1">
              <span className="font-semibold text-heading">Text size</span>
              <select
                className="h-9 rounded-[var(--radius-ui)] border border-border bg-background px-2"
                value={prefs.textScale}
                onChange={(e) => setPrefs((p) => ({ ...p, textScale: e.target.value as Prefs["textScale"] }))}
              >
                <option value="normal">Normal</option>
                <option value="large">Large</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="font-semibold text-heading">Line spacing</span>
              <select
                className="h-9 rounded-[var(--radius-ui)] border border-border bg-background px-2"
                value={prefs.lineSpacing}
                onChange={(e) => setPrefs((p) => ({ ...p, lineSpacing: e.target.value as Prefs["lineSpacing"] }))}
              >
                <option value="normal">Normal</option>
                <option value="wide">Wide</option>
              </select>
            </label>

            <label className="flex items-center justify-between gap-3">
              <span className="font-semibold text-heading">High contrast</span>
              <input
                type="checkbox"
                checked={prefs.highContrast}
                onChange={(e) => setPrefs((p) => ({ ...p, highContrast: e.target.checked }))}
              />
            </label>

            <label className="flex items-center justify-between gap-3">
              <span className="font-semibold text-heading">Reduce motion</span>
              <input
                type="checkbox"
                checked={prefs.reduceMotion}
                onChange={(e) => setPrefs((p) => ({ ...p, reduceMotion: e.target.checked }))}
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="font-semibold text-heading">Dyslexia-friendly font</span>
              <input
                type="checkbox"
                checked={prefs.dyslexiaFont}
                onChange={(e) => setPrefs((p) => ({ ...p, dyslexiaFont: e.target.checked }))}
              />
            </label>
            <button
              type="button"
              className="rounded-[var(--radius-ui)] border border-border bg-background px-3 py-2 text-sm font-semibold text-heading"
              onClick={() => setPrefs(DEFAULTS)}
            >
              Reset accessibility settings
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
