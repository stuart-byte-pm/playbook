'use client'

import { useActionState } from 'react'
import dynamic from 'next/dynamic'
import { submitContactForm, type ContactFormState } from './actions'

const ContactMap = dynamic(() => import('@/components/ContactMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-sm bg-sand"
      style={{ aspectRatio: '16/10', minHeight: '300px' }}
    />
  ),
})

const initialState: ContactFormState = { success: false, error: null }

export default function ContactPageClient() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    <main className="bg-sand" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <section
        className="bg-teal"
        style={{ paddingBlock: 'var(--space-20, 5rem)' }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: 'var(--max-width-content, 1280px)',
            paddingInline: 'var(--container-padding, 5rem)',
          }}
        >
          <span
            className="inline-block uppercase tracking-widest font-medium text-gold"
            style={{
              fontSize: 'var(--size-label, 0.6875rem)',
              letterSpacing: 'var(--ls-widest, 0.1em)',
              marginBottom: 'var(--space-6, 1.5rem)',
            }}
          >
            Talk to Playbook
          </span>
          <h1
            className="font-bold text-white"
            style={{
              fontSize: 'var(--size-h1, 3.5rem)',
              lineHeight: 'var(--lh-tight, 1.1)',
              letterSpacing: 'var(--ls-tight, -0.025em)',
            }}
          >
            Start with a conversation
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section
        style={{
          paddingBlock: 'var(--space-24, 6rem)',
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: 'var(--max-width-content, 1280px)',
            paddingInline: 'var(--container-padding, 5rem)',
          }}
        >
          <div className="contact-grid">
            {/* Left column — Form */}
            <div>
              {state.success ? (
                <SuccessMessage />
              ) : (
                <form action={formAction} className="flex flex-col" style={{ gap: 'var(--space-4, 1rem)' }}>
                  <div className="form-row">
                    <FormField label="Name" required>
                      <input
                        className="form-input"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        required
                      />
                    </FormField>
                    <FormField label="Organisation">
                      <input
                        className="form-input"
                        type="text"
                        name="organisation"
                        placeholder="Your organisation"
                      />
                    </FormField>
                  </div>

                  <FormField label="Email" required>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      required
                    />
                  </FormField>

                  <FormField label="Subject" required>
                    <select className="form-select" name="subject" required defaultValue="">
                      <option value="" disabled>Select a subject</option>
                      <option value="diagnostic">Capital Governance Diagnostic</option>
                      <option value="governance">Programme governance</option>
                      <option value="advisory">Sponsor-side advisory</option>
                      <option value="recovery">Programme health / recovery</option>
                      <option value="general">General enquiry</option>
                    </select>
                  </FormField>

                  <FormField label="Message" required>
                    <textarea
                      className="form-textarea"
                      name="message"
                      placeholder="Briefly describe the programme or challenge you are working with&#8230;"
                    />
                  </FormField>

                  {state.error && (
                    <p
                      className="font-medium"
                      style={{
                        fontSize: 'var(--size-body-sm, 0.875rem)',
                        color: '#b91c1c',
                      }}
                      role="alert"
                    >
                      {state.error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="form-submit"
                  >
                    {isPending ? 'Sending\u2026' : 'Send enquiry'}
                    {!isPending && (
                      <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right column — Details, image, map */}
            <div className="flex flex-col" style={{ gap: 'var(--space-10, 2.5rem)' }}>
              {/* Contact details */}
              <div className="flex flex-col" style={{ gap: 'var(--space-6, 1.5rem)' }}>
                <p
                  style={{
                    fontSize: 'var(--size-body, 1rem)',
                    color: 'var(--color-text-secondary, #555)',
                    lineHeight: 'var(--lh-relaxed, 1.6)',
                    maxWidth: '44ch',
                  }}
                >
                  Playbook operates as an extension of the senior leadership team. If you are dealing with a complex programme — or want to strengthen governance before problems arise — speak with us directly.
                </p>

                <div className="flex flex-col" style={{ gap: 'var(--space-6, 1.5rem)' }}>
                  <ContactDetail label="Address">
                    5 North Hall, Spencer Yard<br />
                    Spencer Street<br />
                    Leamington Spa<br />
                    Warwickshire
                  </ContactDetail>

                  <ContactDetail label="Email">
                    <a
                      href="mailto:hello@playbook-group.co.uk"
                      className="contact-link"
                    >
                      hello@playbook-group.co.uk
                    </a>
                  </ContactDetail>

                  <ContactDetail label="Telephone">
                    <span style={{ color: 'var(--color-text-secondary, #555)' }}>
                      Number to be confirmed
                    </span>
                  </ContactDetail>
                </div>
              </div>

              {/* Building image placeholder */}
              <div
                className="w-full rounded-sm overflow-hidden"
                style={{
                  aspectRatio: '16/9',
                  backgroundColor: 'var(--color-pale-blue, #c3dae2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="uppercase tracking-widest font-medium"
                  style={{
                    fontSize: 'var(--size-caption, 0.75rem)',
                    color: 'var(--color-teal, #264852)',
                    letterSpacing: 'var(--ls-widest, 0.1em)',
                  }}
                >
                  Building image — coming soon
                </span>
              </div>

              {/* Map */}
              <div>
                <h2
                  className="font-semibold uppercase"
                  style={{
                    fontSize: 'var(--size-caption, 0.75rem)',
                    letterSpacing: 'var(--ls-widest, 0.1em)',
                    color: 'var(--color-gold, #af7e56)',
                    marginBottom: 'var(--space-4, 1rem)',
                  }}
                >
                  Find us
                </h2>
                <ContactMap />
                <div
                  className="flex flex-wrap"
                  style={{
                    gap: 'var(--space-4, 1rem)',
                    marginTop: 'var(--space-3, 0.75rem)',
                  }}
                >
                  <MapLegendItem colour="#af7e56" label="Playbook office" />
                  <MapLegendItem colour="#264852" label="Railway station (5 min)" />
                  <MapLegendItem colour="#264852" label="Covent Garden car park (2 min)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-24, 6rem);
          align-items: start;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--space-12, 3rem);
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4, 1rem);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-2, 0.5rem);
        }

        .form-label {
          font-size: var(--size-caption, 0.75rem);
          font-weight: 600;
          letter-spacing: var(--ls-wider, 0.05em);
          text-transform: uppercase;
          color: var(--color-text-secondary, #555);
        }

        .form-input,
        .form-select,
        .form-textarea {
          font-family: var(--font-primary, 'Inter', sans-serif);
          font-size: var(--size-body-sm, 0.875rem);
          color: var(--color-black, #000);
          background-color: var(--color-white, #fff);
          border: 1px solid var(--color-border-default, #E5E5E5);
          border-radius: var(--radius-sm, 2px);
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color var(--duration-fast, 140ms) var(--ease-standard, cubic-bezier(0.4, 0, 0.2, 1)),
                      box-shadow var(--duration-fast, 140ms) var(--ease-standard, cubic-bezier(0.4, 0, 0.2, 1));
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--color-black, #000);
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: var(--lh-relaxed, 1.6);
        }

        .form-submit {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3, 0.75rem);
          font-family: var(--font-primary, 'Inter', sans-serif);
          font-size: var(--size-body-sm, 0.875rem);
          font-weight: 500;
          letter-spacing: var(--ls-wide, 0.025em);
          padding: 0.875rem 1.75rem;
          background-color: var(--color-black, #000);
          color: var(--color-white, #fff);
          border: none;
          border-radius: var(--radius-sm, 2px);
          align-self: flex-start;
          cursor: pointer;
          transition: background-color var(--duration-fast, 140ms) var(--ease-standard, cubic-bezier(0.4, 0, 0.2, 1)),
                      transform var(--duration-fast, 140ms) var(--ease-standard, cubic-bezier(0.4, 0, 0.2, 1));
          will-change: transform;
        }

        .form-submit:hover:not(:disabled) {
          background-color: var(--color-teal, #264852);
          transform: translateY(-1px);
        }

        .form-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .form-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-submit .arrow {
          transition: transform var(--duration-fast, 140ms) var(--ease-standard, cubic-bezier(0.4, 0, 0.2, 1));
        }

        .form-submit:hover:not(:disabled) .arrow {
          transform: translateX(3px);
        }

        .contact-link {
          color: inherit;
          border-bottom: 1px solid var(--color-border-default, #E5E5E5);
          display: inline-block;
          padding-bottom: 2px;
          transition: color var(--duration-fast, 140ms) var(--ease-standard, cubic-bezier(0.4, 0, 0.2, 1)),
                      border-color var(--duration-fast, 140ms) var(--ease-standard, cubic-bezier(0.4, 0, 0.2, 1));
          text-decoration: none;
        }

        .contact-link:hover {
          color: var(--color-gold, #af7e56);
          border-color: var(--color-gold, #af7e56);
        }

        /* Leaflet marker reset */
        .contact-map-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </main>
  )
}

function FormField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="text-gold" aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  )
}

function ContactDetail({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--space-1, 0.25rem)' }}>
      <span
        className="font-semibold uppercase"
        style={{
          fontSize: 'var(--size-caption, 0.75rem)',
          letterSpacing: 'var(--ls-widest, 0.1em)',
          color: 'var(--color-gold, #af7e56)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 'var(--size-body-sm, 0.875rem)',
          color: 'var(--color-text-secondary, #555)',
          lineHeight: 'var(--lh-relaxed, 1.6)',
        }}
      >
        {children}
      </span>
    </div>
  )
}

function SuccessMessage() {
  return (
    <div
      className="flex flex-col items-start"
      style={{
        gap: 'var(--space-6, 1.5rem)',
        paddingBlock: 'var(--space-10, 2.5rem)',
      }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-teal"
        style={{ width: '48px', height: '48px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2
        className="font-bold"
        style={{
          fontSize: 'var(--size-h3, 2rem)',
          lineHeight: 'var(--lh-snug, 1.2)',
          letterSpacing: 'var(--ls-tight, -0.025em)',
          color: 'var(--color-black, #000)',
        }}
      >
        Thank you for getting in touch
      </h2>
      <p
        style={{
          fontSize: 'var(--size-body, 1rem)',
          color: 'var(--color-text-secondary, #555)',
          lineHeight: 'var(--lh-relaxed, 1.6)',
          maxWidth: '40ch',
        }}
      >
        We will review your enquiry and respond within two working days.
      </p>
    </div>
  )
}

function MapLegendItem({ colour, label }: { colour: string; label: string }) {
  return (
    <div className="flex items-center" style={{ gap: 'var(--space-2, 0.5rem)' }}>
      <span
        className="inline-block rounded-full"
        style={{ width: '10px', height: '10px', backgroundColor: colour }}
      />
      <span
        style={{
          fontSize: 'var(--size-caption, 0.75rem)',
          color: 'var(--color-text-secondary, #555)',
        }}
      >
        {label}
      </span>
    </div>
  )
}
