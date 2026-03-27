'use client'

import { useEffect, useRef } from 'react'
import ArrowIcon from './ArrowIcon'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  /* Word-by-word heading reveal.
     Fires once on mount; respects prefers-reduced-motion. */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const heading = headingRef.current
    if (!heading || prefersReducedMotion) return

    heading.style.opacity = '1'
    heading.style.animation = 'none'

    const words = ['Clarity.', 'Control.', 'Confidence.']
    let delay = 280
    const step = 180

    heading.innerHTML = ''
    words.forEach((word, i) => {
      if (i > 0) heading.appendChild(document.createTextNode(' '))
      const outer = document.createElement('span')
      outer.className = 'hero__word'
      const inner = document.createElement('span')
      inner.className = 'hero__word-inner'
      inner.style.animationDelay = `${delay}ms`
      inner.textContent = word
      outer.appendChild(inner)
      heading.appendChild(outer)
      delay += step
    })
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-heading">
      {/* Background video — muted, autoplayed, decorative */}
      <video
        className="hero__video"
        src="/videos/istockphoto-931929622-640_adpp_is.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Subtle grid overlay */}
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__label">
          <span className="label-tag label-tag--on-dark">
            Senior-led, sponsor-side advisory
          </span>
        </div>

        <h1
          ref={headingRef}
          className="hero__heading"
          id="hero-heading"
        >
          Clarity. Control. Confidence.
        </h1>

        <p className="hero__sub">
          Playbook brings structure to complex programmes, guiding the right people to the right
          decisions with clear thinking, healthy challenge, and experience-led advice.
        </p>

        <div className="hero__actions">
          <a href="/contact" className="btn-primary">
            Talk to Playbook
            <ArrowIcon size={16} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
