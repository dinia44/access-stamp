"use client";

import type { CSSProperties } from "react";
import { tickerItems } from "@/data/ticker-items";
import styles from "@/components/measure-ticker.module.css";

function formatDate(iso?: string) {
  if (!iso) return null;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function TickerRow() {
  return (
    <>
      {tickerItems.map((item) => {
        const dateLabel = formatDate(item.date);
        return (
          <span className={styles.item} key={`${item.kind}-${item.venue}-${item.fact}`}>
            <span className={styles.seal}>{item.kind}</span>
            <strong>{item.venue}</strong> {item.fact}
            {dateLabel ? <span className={styles.date}> · {dateLabel}</span> : null}
          </span>
        );
      })}
    </>
  );
}

export function MeasureTicker() {
  if (tickerItems.length === 0) return null;

  const durationSeconds = Math.max(38, tickerItems.length * 7);

  return (
    <div
      className={styles.ticker}
      aria-hidden="true"
      style={{ "--ticker-duration": `${durationSeconds}s` } as CSSProperties}
    >
      <div className={styles.track}>
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}
