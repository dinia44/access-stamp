"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
