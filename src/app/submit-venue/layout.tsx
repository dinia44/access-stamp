import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suggest a venue",
  description:
    "Tell us about a place you visited. We review access details before publishing venue listings.",
};

export default function SubmitVenueLayout({ children }: { children: React.ReactNode }) {
  return children;
}
