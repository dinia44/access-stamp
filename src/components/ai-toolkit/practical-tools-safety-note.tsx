import Link from "next/link";
import { Card } from "@/components/ui";

export function PracticalToolsSafetyNote() {
  return (
    <Card className="max-w-[85ch] border-border bg-background/80 p-5 md:p-6">
      <h2 className="text-base font-semibold text-heading">Before you start</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
        <p>
          These tools help you prepare. They do not replace legal, medical, benefits, safeguarding, emergency, or
          professional advice.
        </p>
        <p>
          Avoid entering unnecessary personal details such as full names, addresses, National Insurance numbers, dates
          of birth, employer case numbers, medical record numbers, or other identifying information unless genuinely
          needed.
        </p>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/legal/privacy" className="font-semibold text-blue underline-offset-2 hover:underline">
          Read privacy policy
        </Link>
      </p>
    </Card>
  );
}
