import Link from "next/link";
import { Container } from "@/components/container";
import { SetChatContext } from "@/components/chat/set-context";
import { HomeForVenuesBand } from "@/components/home/home-for-venues-band";
import { HomeMastheadHero } from "@/components/home/home-masthead-hero";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomeSecondaryPathways } from "@/components/home/home-secondary-pathways";
import { HomeWhyTrust } from "@/components/home/home-why-trust";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <SetChatContext page={{ kind: "home" }} />

      <HomeMastheadHero />
      <Container className="py-10">
        <h2 className="text-2xl font-semibold">How Access Stamp works</h2>
        <ol className="mt-5 grid gap-5 sm:grid-cols-3">
          {[
            ["Search", "Find a venue or place."],
            [
              "Check the evidence",
              "See measurements, photos, verification and unknowns.",
            ],
            [
              "Compare it with your needs",
              "Work out whether it is likely to work for you.",
            ],
          ].map(([title, body], i) => (
            <li key={title}>
              <h3 className="font-semibold">
                {i + 1}. {title}
              </h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Container>
      <HomePopularVenues />
      <HomeSecondaryPathways />
      <HomeWhyTrust />
      <Container className="border-t border-border py-8">
        <h2 className="text-xl font-semibold">Built by Allister Diniz</h2>
        <p className="mt-3 max-w-2xl">
          A wheelchair user building the access information he needs when
          planning a visit: measurements, evidence and visible unknowns.
        </p>
        <Link
          href="/about"
          className="inline-flex min-h-11 items-center underline"
        >
          About the founder →
        </Link>
      </Container>
      <HomeForVenuesBand />
    </div>
  );
}
