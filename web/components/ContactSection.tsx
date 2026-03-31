'use client'

import { useState } from 'react'
import RevealWrapper from './RevealWrapper'
import ArrowIcon from './ArrowIcon'
import { submitContactForm } from '@/app/(site)/contact/actions'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg(null)

    const formData = new FormData(e.currentTarget)
    formData.set('form_source', 'homepage')

    const result = await submitContactForm({ success: false, error: null }, formData)

    if (result.success) {
      setStatus('sent')
    } else {
      setStatus('error')
      setErrorMsg(result.error)
    }
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
          <RevealWrapper variant="right" delay={1}>
            <form
              className="contact__form"
              noValidate
              aria-label="Contact form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="name">Name</label>
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
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label form-label--required" htmlFor="email">Email</label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="yourname@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  className="form-input"
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Please add your subject line here"
                />
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

              {status === 'error' && errorMsg && (
                <p
                  style={{
                    fontSize: 'var(--size-body-sm, 0.875rem)',
                    color: '#b91c1c',
                    fontWeight: 500,
                    margin: 0,
                  }}
                  role="alert"
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="form-submit"
                disabled={status === 'sending'}
                style={status === 'sent' ? { backgroundColor: 'var(--color-teal)' } : undefined}
              >
                {(status === 'idle' || status === 'error') && (
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
