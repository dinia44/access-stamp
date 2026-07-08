"use client";

import { useLayoutEffect } from "react";

const SESSION_KEY = "as-home-masthead-entered";

/** First-load entrance only — skips replay on client navigations back to home. */
export function HomeMastheadEntranceGate() {
  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        document.documentElement.classList.add("home-masthead-hero--instant");
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.documentElement.classList.remove("home-masthead-hero--instant");
      }
    } catch {
      /* storage blocked — keep default CSS animations */
    }
  }, []);

  return null;
}
