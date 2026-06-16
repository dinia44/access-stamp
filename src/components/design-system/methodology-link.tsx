import Link from "next/link";
import { cn } from "@/lib/utils";

export function MethodologyLink({ className }: { className?: string }) {
  return (
    <Link
      href="/methodology"
      className={cn(
        "inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] underline-offset-2 hover:underline",
        className,
      )}
    >
      How Access Stamp access information works
    </Link>
  );
}
