export const apiVersion = "2025-01-01";

export function isSanityConfigured() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
  return Boolean(projectId && dataset && projectId !== "placeholder");
}

export function sanityProjectId() {
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
}

export function sanityDataset() {
  return process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
}
