import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("home");

/** Mostly static marketing homepage — revalidate hourly. */
export const revalidate = 3600;

export { default } from "./home-page";
