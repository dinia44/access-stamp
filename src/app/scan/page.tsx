import { redirect } from "next/navigation";

/** Quick Scan lives on the submit-venue flow — redirect internal links here. */
export default function ScanPage() {
  redirect("/submit-venue#quick-scan");
}
