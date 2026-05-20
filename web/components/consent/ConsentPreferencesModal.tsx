'use client'

import { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from '@/lib/consent/constants'
import type { ConsentChoices } from '@/lib/consent/types'

interface Props {
  initialChoices: ConsentChoices
  onSave: (choices: ConsentChoices) => void
  onAcceptAll: () => void
  onClose: () => void
}

export default function ConsentPreferencesModal({
  initialChoices,
  onSave,
  onAcceptAll,
  onClose,
}: Props) {
  const [choices, setChoices] = useState<ConsentChoices>(initialChoices)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  function setAnalytics(value: boolean) {
    setChoices((c) => ({ ...c, analytics: value }))
  }

  return (
    <div className="consent-modal" role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-modal-title"
        className="consent-modal__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="consent-modal__header">
          <h2 id="consent-modal-title" className="consent-modal__title">
            Cookie preferences
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            className="consent-modal__close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <p className="consent-modal__intro">
          Choose which cookies we can use. You can change these settings at any time via the
          &quot;Cookie preferences&quot; link in the footer.
        </p>

        <div className="consent-modal__categories">
          {CATEGORIES.map((cat) => {
            const checked = cat.required ? true : choices.analytics
            return (
              <div key={cat.key} className="consent-cat">
                <div className="consent-cat__row">
                  <div className="consent-cat__text">
                    <h3 className="consent-cat__label">{cat.label}</h3>
                    <p className="consent-cat__desc">{cat.description}</p>
                  </div>
                  <label className="consent-toggle">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={cat.required}
                      onChange={(e) => !cat.required && setAnalytics(e.target.checked)}
                      aria-label={cat.label}
                    />
                    <span className="consent-toggle__track" aria-hidden="true">
                      <span className="consent-toggle__thumb" />
                    </span>
                  </label>
                </div>
              </div>
            )
          })}
        </div>

        <div className="consent-modal__actions">
          <button
            type="button"
            className="consent-btn consent-btn--primary"
            onClick={() => onSave(choices)}
          >
            Save preferences
          </button>
          <button
            type="button"
            className="consent-btn consent-btn--secondary"
            onClick={onAcceptAll}
          >
            Accept all
          </button>
        </div>
      </div>

      <style>{`
        .consent-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4, 1rem);
          animation: consentModalFade 200ms ease-out;
        }
        .consent-modal__panel {
          background: #ffffff;
          color: #000000;
          width: 100%;
          max-width: 560px;
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
          padding: var(--space-8, 2rem);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
          animation: consentModalIn 240ms cubic-bezier(0.2, 0, 0, 1);
        }
        .consent-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4, 1rem);
        }
        .consent-modal__title {
          font-size: var(--size-h4, 1.5rem);
          font-weight: var(--weight-bold, 700);
          letter-spacing: var(--ls-tight, -0.02em);
          margin: 0;
        }
        .consent-modal__close {
          background: transparent;
          border: 0;
          font-size: 1.75rem;
          line-height: 1;
          cursor: pointer;
          padding: var(--space-2, 0.5rem);
          color: #000000;
        }
        .consent-modal__close:focus-visible {
          outline: 2px solid #af7e56;
          outline-offset: 2px;
        }
        .consent-modal__intro {
          font-size: var(--size-body-sm, 0.875rem);
          line-height: var(--lh-relaxed, 1.6);
          color: #444;
          margin: 0 0 var(--space-6, 1.5rem) 0;
        }
        .consent-modal__categories {
          display: flex;
          flex-direction: column;
          gap: var(--space-4, 1rem);
          margin-bottom: var(--space-6, 1.5rem);
        }
        .consent-cat {
          border-top: 1px solid #ebe7dc;
          padding-top: var(--space-4, 1rem);
        }
        .consent-cat__row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-4, 1rem);
        }
        .consent-cat__text { flex: 1 1 auto; }
        .consent-cat__label {
          font-size: var(--size-body, 1rem);
          font-weight: var(--weight-semibold, 600);
          margin: 0 0 var(--space-1, 0.25rem) 0;
        }
        .consent-cat__desc {
          font-size: var(--size-body-sm, 0.875rem);
          line-height: var(--lh-relaxed, 1.6);
          color: #555;
          margin: 0;
        }
        .consent-toggle {
          position: relative;
          flex-shrink: 0;
          cursor: pointer;
          display: inline-block;
        }
        .consent-toggle input {
          position: absolute;
          opacity: 0;
          inset: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .consent-toggle input:disabled { cursor: not-allowed; }
        .consent-toggle__track {
          display: inline-block;
          width: 44px;
          height: 24px;
          background: #d4d4d0;
          border-radius: 12px;
          position: relative;
          transition: background 160ms;
        }
        .consent-toggle__thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          background: #ffffff;
          border-radius: 50%;
          transition: transform 160ms;
        }
        .consent-toggle input:checked + .consent-toggle__track {
          background: #af7e56;
        }
        .consent-toggle input:checked + .consent-toggle__track .consent-toggle__thumb {
          transform: translateX(20px);
        }
        .consent-toggle input:disabled + .consent-toggle__track {
          background: #af7e56;
          opacity: 0.55;
        }
        .consent-toggle input:focus-visible + .consent-toggle__track {
          outline: 2px solid #af7e56;
          outline-offset: 3px;
        }
        .consent-modal__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3, 0.75rem);
        }
        .consent-btn {
          font-family: inherit;
          font-size: var(--size-body-sm, 0.875rem);
          font-weight: var(--weight-medium, 500);
          padding: var(--space-3, 0.75rem) var(--space-5, 1.25rem);
          border: 1px solid transparent;
          background: transparent;
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
          border-color: #c8c4b8;
          color: #000000;
        }
        .consent-btn--secondary:hover { background: #ebe7dc; }
        @keyframes consentModalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes consentModalIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .consent-modal, .consent-modal__panel { animation: none; }
        }
      `}</style>
    </div>
  )
}
