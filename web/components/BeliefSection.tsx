'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import RevealWrapper from './RevealWrapper'
import ArrowIcon from './ArrowIcon'

export default function BeliefSection() {
  const quoteRef = useRef<HTMLQuoteElement>(null)

  /* Quote line-by-line reveal on visibility */
  useEffect(() => {
    const quote = quoteRef.current
    if (!quote) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      quote.classList.add('is-visible')
      return
    }

    const lines = [
      '"Major programmes rarely fail in delivery.',
      'They fail in the decisions that precede it."',
    ]
    quote.innerHTML = lines
      .map(
        (line) =>
          `<span class="quote-line"><span class="quote-line-inner">${line}</span></span>`
      )
      .join('')

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

    observer.observe(quote)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="belief section" aria-labelledby="belief-heading">
      <div className="container">
        <div className="belief__inner">

          {/* Image — left column */}
          <RevealWrapper className="belief__image">
            <Image
              src="/images/sandbox/People 4.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
            {/* Guiding star mark — centred decorative overlay */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand-assets/icon/Playbook_Icon_Gold_RGB.svg"
              alt=""
              aria-hidden="true"
              width={80}
              height={80}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          </RevealWrapper>

          {/* Body — right column */}
          <div className="belief__body">
            <RevealWrapper as="span" className="label-tag">
              The problem
            </RevealWrapper>

            <blockquote
              ref={quoteRef}
              className="belief__quote"
              id="belief-heading"
            >
              {/* JS replaces this with animated spans; this is the accessible fallback */}
              &ldquo;Major programmes rarely fail in delivery.
              They fail in the decisions that precede it.&rdquo;
            </blockquote>

            <RevealWrapper as="p" className="belief__copy" delay={2}>
              Unclear governance. Lack of clarity. Diffused accountability. Experience that never
              reaches the moment of decision.
            </RevealWrapper>

            <RevealWrapper as="p" className="belief__copy" delay={2}>
              By the time issues become visible, risk is already embedded.{' '}
              We work with sponsors and senior leaders to bring structure, clarity, and control
              to the environments where those decisions are made.
            </RevealWrapper>

            <RevealWrapper as="a" href="#services" className="belief__link" delay={3}>
              What we do
              <ArrowIcon size={14} />
            </RevealWrapper>
          </div>

        </div>
      </div>
    </section>
  )
}
