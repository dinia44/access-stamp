import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary \u2013 jargon buster",
  description: "Plain-language definitions for common UK disability-related terms: PIP, Blue Badge, DFG, Changing Places, and more.",
};

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
