import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
export function HomeSecondaryPathways() {
  return (
    <section
      className="border-t border-border py-12"
      aria-labelledby="secondary-pathways-heading"
    >
      <PageContainer>
        <h2 id="secondary-pathways-heading" className="text-3xl font-semibold">
          Need help with something else?
        </h2>
        <p className="mt-4 text-xl">Tell Access Stamp what’s happening.</p>
        <p className="mt-3 max-w-2xl text-muted">
          Get a practical guide built around your situation using Access Stamp
          information.
        </p>
        <Link
          href="/ask"
          className="mt-5 inline-flex min-h-12 items-center rounded-full bg-[#C8430F] px-6 font-semibold text-white"
        >
          Ask Access Stamp →
        </Link>
        <p className="mt-4">
          <Link
            href="/advice"
            className="inline-flex min-h-11 items-center underline"
          >
            Browse guides →
          </Link>
        </p>
      </PageContainer>
    </section>
  );
}
