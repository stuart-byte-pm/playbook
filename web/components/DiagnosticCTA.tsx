'use client'

/* Diagnostic CTA section — split layout with meet-in-middle entrance animation.
   Left column slides from translateX(-80px), image from translateX(80px),
   both to translateX(0) at 600ms cubic-bezier(0.2, 0, 0, 1).
   On mobile: translateY(40px) instead. */

import { useEffect, useRef } from 'react'
import ArrowIcon from './ArrowIcon'

export default function DiagnosticCTA() {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      inner.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -48px 0px' }
    )

    observer.observe(inner)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="diagnostic section"
      id="diagnostic"
      aria-labelledby="diagnostic-heading"
    >
      <div className="container">
        <div
          ref={innerRef}
          className="diagnostic__inner diagnostic--meet"
        >
          {/* Left: content */}
          <div className="diagnostic__content">
            <div className="diagnostic__eyebrow">
              <span className="label-tag label-tag--on-dark">
                Every engagement begins with clarity
              </span>
            </div>
            <h2 className="diagnostic__title" id="diagnostic-heading">
              The Capital Governance Diagnostic
            </h2>
            <p className="diagnostic__copy">
              Whether we are engaged to set up a programme, restore control, or provide independent
              assurance, the first step is always the same. We establish a clear, structured
              understanding of how decisions are being made, where risks sit, and where governance
              needs to strengthen — before delivery begins and significant commitments are made.
            </p>
            <a href="#contact" className="btn-primary">
              Request the Diagnostic
              <ArrowIcon size={16} />
            </a>
          </div>

          {/* Right: image with gradient overlay */}
          <div className="diagnostic__image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sandbox/campus 1.jpg"
              alt="Senior adviser in an urban setting"
              loading="lazy"
            />
            {/* Guiding star pill mark — centred */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="diagnostic__image-icon"
              src="/images/brand-assets/icon/Playbook_Icon_Pill_White_RGB.svg"
              width={128}
              height={128}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
