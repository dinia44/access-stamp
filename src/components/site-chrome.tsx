"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "/";
  const hideNavbar = path === "/venue-finder" || path.startsWith("/venue-finder/");

  return (
    <>
      {hideNavbar ? null : <Navbar />}
      {children}
    </>
  );
}
