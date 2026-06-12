"use client";

import { Navbar } from "@/components/navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
