import { createClient } from "next-sanity";
import { apiVersion, isSanityConfigured, sanityDataset, sanityProjectId } from "./env";

export function getSanityClient() {
  if (!isSanityConfigured()) return null;
  return createClient({
    projectId: sanityProjectId(),
    dataset: sanityDataset(),
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
    perspective: "published",
  });
}
