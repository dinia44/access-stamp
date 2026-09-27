"use client";

import { createContext, useContext, type ComponentProps } from "react";
import Link from "next/link";

export const VenueSearchContext = createContext<string | null>(null);

export function VenueReportLink({ slug, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { slug: string }) {
  const search = useContext(VenueSearchContext);
  const returnTo = search ? `${search}#venue-${slug}` : null;
  const href = `/venue/${slug}${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`;
  return <Link {...props} href={href} />;
}
