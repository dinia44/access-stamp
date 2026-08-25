import type { HelpCardDownloadDocument } from "@/data/help-cards/download-types";
import { formatReviewDate } from "@/lib/help-cards/format";
import { authorityLabel } from "@/lib/help-cards/authority";
import { createQrMatrix, qrMatrixToSvg } from "@/lib/help-cards/qr-matrix";

export function HelpCardDownloadDocumentView({
  document,
  forPrint = true,
}: {
  document: HelpCardDownloadDocument;
  forPrint?: boolean;
}) {
  const qr = qrMatrixToSvg(createQrMatrix(document.liveUrl));

  return (
    <article
      className={forPrint ? "help-card-document help-card-document--print-only" : "help-card-document"}
      aria-hidden={forPrint ? true : undefined}
      lang="en-GB"
    >
      <header className="help-card-document__header">
        <div className="help-card-document__brand">
          <p className="help-card-document__wordmark">Access Stamp</p>
          <p className="help-card-document__category">{document.category}</p>
        </div>
        <p className="help-card-document__badge">Help card</p>
      </header>

      <h1 className="help-card-document__title">{document.title}</h1>

      <section className="help-card-section">
        <h2>Use this when</h2>
        <p>{document.purpose}</p>
      </section>

      <section className="help-card-section">
        <h2>Key message</h2>
        <p className="help-card-document__key">{document.keyMessage}</p>
      </section>

      {document.suggestedWording ? (
        <section className="help-card-wording">
          <h2>{document.suggestedWording.label}</h2>
          <p>{document.suggestedWording.text}</p>
        </section>
      ) : null}

      <section className="help-card-section">
        <h2>What to do</h2>
        <ul>
          {document.actions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {document.questionsToAsk?.length ? (
        <section className="help-card-section">
          <h2>What to ask or confirm</h2>
          <ul>
            {document.questionsToAsk.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {document.conditions?.length ? (
        <section className="help-card-section">
          <h2>Conditions and limits</h2>
          <ul>
            {document.conditions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {document.beforeYouGo?.length ? (
        <section className="help-card-section">
          <h2>Before you go</h2>
          <ul>
            {document.beforeYouGo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="help-card-section">
        <h2>Applies to</h2>
        <p>{document.appliesTo}</p>
      </section>

      <section className="help-card-section">
        <h2>Authority</h2>
        <p>{document.authorityLabel}</p>
      </section>

      <section className="help-card-source">
        <h2>Official sources</h2>
        <ul>
          {document.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url}>{source.title}</a>
              <span>
                {" "}
                — {source.publisher} ({authorityLabel(source.authorityType)})
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="help-card-section">
        <h2>Last reviewed</h2>
        <p>{formatReviewDate(document.reviewedAt)}</p>
      </section>

      <section className="help-card-document__live">
        <h2>Live Help Card</h2>
        <div className="help-card-document__qr-row">
          <div
            className="help-card-document__qr"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <div>
            <p>Scan or visit the live card for the latest reviewed detail. No tracking is added to this link.</p>
            <p>
              <a href={document.liveUrl}>{document.liveUrlLabel}</a>
            </p>
          </div>
        </div>
      </section>

      <footer className="help-card-document__footer">
        <p>{document.disclaimer}</p>
        <p>{document.footerNote}</p>
        <p>Document version {document.version}. Access Stamp Help Card.</p>
      </footer>
    </article>
  );
}
