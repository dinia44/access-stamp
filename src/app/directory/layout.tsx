import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Useful contacts",
  description:
    "UK helplines and services: Citizens Advice, Scope, NHS 111, Motability, Changing Places, and more.",
};

export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
