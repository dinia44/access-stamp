import Link from "next/link";
import { Container } from "@/components/container";
import { AboutJsonLd } from "@/components/about/about-jsonld";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata = staticPageMetadata("about");

const PRINCIPLES = [
  ["Useful detail", "Door widths, routes, toilet layout, seating and support — the things that affect whether a place actually works for you."],
  ["Clear unknowns", "If something has not been checked, we say so. Missing information should never be presented as reassurance."],
  ["Your needs first", "Access is personal. A venue can work well for one person and not for another, so Access Stamp helps you compare the evidence with what you need."],
] as const;

const LINKS = [
  ["How Access Stamp checks venues", "/methodology"],
  ["Our own accessibility", "/accessibility"],
  ["Information for venues", "/for-venues"],
  ["Get in touch", "/contact"],
] as const;

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-canvas)]">
      <AboutJsonLd />

      <section className="border-b border-[var(--color-border)] px-4 py-14 sm:px-6 sm:py-20">
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,.7fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                About Access Stamp
              </p>
              <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-[clamp(2.5rem,7vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[var(--color-ink)]">
                Accessibility information should help you decide, not make you guess.
              </h1>
            </div>

            <p className="max-w-md text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
              Access Stamp brings together practical venue information and disability guidance so you can understand what a place offers before you leave home.
            </p>
          </div>
        </Container>
      </section>

      <Container className="max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
              Why it exists
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl">
              The wheelchair symbol is not enough.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[var(--color-text)]">
            <p>
              A venue can call itself accessible and still leave out the one detail that decides whether you can get through the door, use the toilet or sit comfortably once you are inside.
            </p>
            <p>
              Access Stamp was created to make those details easier to find. We focus on practical evidence, show where information is missing, and avoid turning a broad “accessible” label into a promise it cannot keep.
            </p>
          </div>
        </div>

        <div className="my-14 h-px bg-[var(--color-border)] sm:my-20" />

        <section id="founder" className="grid gap-10 lg:grid-cols-[minmax(240px,.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-trust)]">
              Founded from lived experience
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl">
              Allister Diniz
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--color-text-muted)]">Founder of Access Stamp</p>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[var(--color-text)]">
            <p>
              I’m a wheelchair user, and I built Access Stamp around a problem I know well: finding out whether somewhere is genuinely going to work before you arrive.
            </p>
            <p>
              The information I want is usually very ordinary — a doorway width, the route from the entrance, what the toilet is actually like, whether there is somewhere suitable to sit. But those are often the details that are hardest to find.
            </p>
            <p>
              Access Stamp is my attempt to make that planning simpler, more honest and more useful for other disabled people, families and carers too.
            </p>
          </div>
        </section>

        <div className="my-14 h-px bg-[var(--color-border)] sm:my-20" />

        <section>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
              The approach
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl">
              Evidence over labels.
            </h2>
          </div>

          <dl className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {PRINCIPLES.map(([title, description], index) => (
              <div key={title} className="grid gap-3 py-7 sm:grid-cols-[64px_220px_1fr] sm:items-start sm:gap-6">
                <dt className="contents">
                  <span className="text-sm font-semibold tabular-nums text-[var(--color-brand)]">0{index + 1}</span>
                  <span className="text-lg font-semibold text-[var(--color-ink)]">{title}</span>
                </dt>
                <dd className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 bg-[var(--color-surface-subtle)] px-5 py-8 sm:mt-20 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.7fr)] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-trust)]">
                Still being built
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)]">
                Access Stamp is growing one useful piece at a time.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
                The venue finder, practical guides and planning tools are being developed together. Demonstration listings show how venue reports work while verified real-world coverage expands.
              </p>
            </div>

            <nav aria-label="Learn more" className="border-t border-[var(--color-border)] pt-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <ul className="divide-y divide-[var(--color-border)]">
                {LINKS.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      className="flex min-h-14 items-center justify-between gap-4 font-semibold text-[var(--color-ink)] transition hover:text-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                      href={href}
                    >
                      <span>{label}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </Container>
    </main>
  );
}
