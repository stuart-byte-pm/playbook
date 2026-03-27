'use client'

import { useState } from 'react'
import RevealWrapper from './RevealWrapper'
import ArrowIcon from './ArrowIcon'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    /* Placeholder: replace with Resend Server Action in a later sprint */
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStatus('sent')
  }

  return (
    <section
      className="contact section--tight"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="contact__inner">

          {/* Left: contact info */}
          <RevealWrapper>
            <span className="label-tag">Talk to Playbook</span>
            <h2 className="contact__title" id="contact-heading">
              Start with a conversation
            </h2>
            <p className="contact__copy">
              Playbook operates as an extension of the senior leadership team. If you are dealing
              with a complex programme — or want to strengthen governance before problems arise —
              speak with us directly.
            </p>
            <div className="contact__offices" aria-label="Contact details">
              <div className="office">
                <span className="office__label">Email</span>
                <a
                  href="mailto:hello@playbook-group.co.uk"
                  className="office__address"
                  style={{
                    color: 'inherit',
                    borderBottom: '1px solid var(--color-border-default)',
                    display: 'inline-block',
                    paddingBottom: '2px',
                    transition: 'color 140ms, border-color 140ms',
                  }}
                >
                  hello@playbook-group.co.uk
                </a>
              </div>
              <div className="office">
                <span className="office__label">Telephone</span>
                <span className="office__address">Number to be confirmed</span>
              </div>
            </div>
          </RevealWrapper>

          {/* Right: contact form */}
          <RevealWrapper variant="right" delay={1} className="contact__form">
            <form
              noValidate
              aria-label="Contact form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="org">Organisation</label>
                  <input
                    className="form-input"
                    type="text"
                    id="org"
                    name="organisation"
                    placeholder="Your organisation"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <select className="form-select" id="subject" name="subject">
                  <option value="" disabled>Select a subject</option>
                  <option value="diagnostic">Capital Governance Diagnostic</option>
                  <option value="governance">Programme governance</option>
                  <option value="advisory">Sponsor-side advisory</option>
                  <option value="recovery">Programme health / recovery</option>
                  <option value="general">General enquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  className="form-textarea"
                  id="message"
                  name="message"
                  placeholder="Briefly describe the programme or challenge you are working with…"
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={status !== 'idle'}
                style={status === 'sent' ? { backgroundColor: 'var(--color-teal)' } : undefined}
              >
                {status === 'idle' && (
                  <>
                    Send enquiry
                    <ArrowIcon size={16} />
                  </>
                )}
                {status === 'sending' && 'Sending\u2026'}
                {status === 'sent' && (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Enquiry sent
                  </>
                )}
              </button>
            </form>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
