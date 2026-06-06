"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "/";
  const isHome = path === "/";

  return (
    <>
      {!isHome ? <Navbar /> : null}
      {children}
    </>
  );
}
