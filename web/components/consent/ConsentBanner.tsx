'use client'

interface Props {
  onAccept: () => void
  onReject: () => void
  onCustomise: () => void
}

export default function ConsentBanner({ onAccept, onReject, onCustomise }: Props) {
  return (
    <div role="dialog" aria-label="Cookie consent" aria-describedby="cookie-banner-body" className="consent-banner">
      <div className="consent-banner__inner">
        <div className="consent-banner__copy">
          <h2 className="consent-banner__title">Cookies on this site</h2>
          <p id="cookie-banner-body" className="consent-banner__body">
            We use essential cookies to keep our website secure and working properly. Optional
            cookies help us improve performance and personalise content to improve your experience.
            Choose Accept to allow optional cookies or Decline to use only essential cookies. See
            our <a href="/privacy-policy#cookies">privacy policy</a> for details.
          </p>
        </div>
        <div className="consent-banner__actions">
          <button type="button" className="consent-btn consent-btn--primary" onClick={onAccept}>
            Accept
          </button>
          <button type="button" className="consent-btn consent-btn--secondary" onClick={onReject}>
            Decline
          </button>
          <button type="button" className="consent-btn consent-btn--tertiary" onClick={onCustomise}>
            Customise
          </button>
        </div>
      </div>

      <style>{`
        .consent-banner {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          justify-content: center;
          padding: var(--space-4, 1rem);
          pointer-events: none;
        }
        .consent-banner__inner {
          pointer-events: auto;
          width: 100%;
          max-width: 1200px;
          background: #000000;
          color: #ffffff;
          padding: var(--space-6, 1.5rem);
          display: flex;
          flex-direction: column;
          gap: var(--space-5, 1.25rem);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          animation: consentBannerIn 240ms cubic-bezier(0.2, 0, 0, 1);
        }
        @media (min-width: 768px) {
          .consent-banner { padding: var(--space-6, 1.5rem); }
          .consent-banner__inner {
            padding: var(--space-8, 2rem);
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-8, 2rem);
          }
        }
        .consent-banner__copy { flex: 1 1 auto; max-width: 720px; }
        .consent-banner__title {
          font-size: var(--size-h6, 1rem);
          font-weight: var(--weight-bold, 700);
          letter-spacing: var(--ls-tight, -0.02em);
          margin: 0 0 var(--space-2, 0.5rem) 0;
        }
        .consent-banner__body {
          font-size: var(--size-body-sm, 0.875rem);
          line-height: var(--lh-relaxed, 1.6);
          color: #ebe7dc;
          margin: 0;
        }
        .consent-banner__body a {
          color: #af7e56;
          border-bottom: 1px solid rgba(175, 126, 86, 0.4);
          transition: color 140ms, border-color 140ms;
        }
        .consent-banner__body a:hover {
          border-bottom-color: #af7e56;
        }
        .consent-banner__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3, 0.75rem);
          align-items: center;
          flex-shrink: 0;
        }
        .consent-btn {
          font-family: inherit;
          font-size: var(--size-body-sm, 0.875rem);
          font-weight: var(--weight-medium, 500);
          padding: var(--space-3, 0.75rem) var(--space-5, 1.25rem);
          border: 1px solid transparent;
          background: transparent;
          color: inherit;
          cursor: pointer;
          transition: background 140ms, border-color 140ms, color 140ms;
        }
        .consent-btn:focus-visible {
          outline: 2px solid #af7e56;
          outline-offset: 2px;
        }
        .consent-btn--primary {
          background: #af7e56;
          color: #000000;
        }
        .consent-btn--primary:hover { background: #c0916b; }
        .consent-btn--secondary {
          border-color: #ebe7dc;
          color: #ffffff;
        }
        .consent-btn--secondary:hover { background: rgba(235, 231, 220, 0.08); }
        .consent-btn--tertiary {
          color: #ebe7dc;
          padding-inline: var(--space-2, 0.5rem);
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(235, 231, 220, 0.4);
        }
        .consent-btn--tertiary:hover {
          color: #ffffff;
          text-decoration-color: #ffffff;
        }
        @keyframes consentBannerIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .consent-banner__inner { animation: none; }
        }
      `}</style>
    </div>
  )
}
