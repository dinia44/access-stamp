import { AccessReportPreview } from "@/components/access-report-preview";
import { AS_CONTAINER, AS_EYEBROW, AS_SECTION, AS_SECTION_H2, AS_BODY, AS_TRUST_STRIP } from "@/lib/design-system";

export function HomeAccessReportSection() {
  return (
    <section className={`${AS_SECTION} bg-white`} aria-labelledby="access-report-heading">
      <div className={AS_CONTAINER}>
        <div className="max-w-2xl">
          <p className={AS_EYEBROW}>Signature access reports</p>
          <h2 id="access-report-heading" className={`${AS_SECTION_H2} mt-3 text-[#102033]`}>
            Know what to expect before you arrive
          </h2>
          <p className={`${AS_BODY} mt-4 text-[#617080]`}>
            Every venue report brings together access scores, feature checks, measurements, and photo evidence — so you
            can decide with calm confidence, not guesswork.
          </p>
        </div>

        <div className="mt-10">
          <AccessReportPreview variant="featured" />
        </div>

        <p className={`${AS_TRUST_STRIP} mt-8`}>
          Access details can change — always check before you travel. Reports show verification level and last review where available.
        </p>
      </div>
    </section>
  );
}
