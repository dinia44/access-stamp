import { redirect } from "next/navigation";
import { SAMPLE_VENUES } from "@/lib/mock-data";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ venue?: string }>;
}) {
  const { venue } = await searchParams;
  const found = SAMPLE_VENUES.find((v) => v.slug === venue);
  redirect(found ? `/venue/${found.slug}#venue-fit` : "/venue-finder");
}
