"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { safeVenueReturnUrl } from "@/lib/venue-return-url";

function SearchBackLink() {
  const params = useSearchParams();
  return <Link href={safeVenueReturnUrl(params.get("returnTo"))} className="inline-flex min-h-11 items-center text-sm font-semibold text-blue">Back to search →</Link>;
}
export function VenueBackLink() {
  return <Suspense fallback={<Link href="/venue-finder">Back to search →</Link>}><SearchBackLink /></Suspense>;
}
