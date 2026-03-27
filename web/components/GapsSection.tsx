'use client'

import { useEffect, useRef } from 'react'
import RevealWrapper from './RevealWrapper'

const GAPS = [
  {
    number: '01',
    name: 'Before commitment',
    pillar: 'Clarity.',
    copy: 'Where a major scheme is being defined, we work with sponsors to scope complex programmes, strengthen governance, and ensure decisions are clear and aligned from the outset — establishing the clarity required to proceed with confidence.',
    extra: 'We take ownership of the outcomes and scope out what is needed to maximise success from the outset.',
  },
  {
    number: '02',
    name: 'When programmes are under pressure',
    pillar: 'Control.',
    copy: 'Where a programme is drifting, unclear, or exposed, we establish where issues sit, bring structure to decision-making, and define a clear recovery plan — restoring the control and stable footing that the programme needs.',
    extra: 'We can provide swift diagnosis to provide clear and objective observations to get things back on track.',
  },
  {
    number: '03',
    name: 'When independent assurance is required',
    pillar: 'Confidence.',
    copy: 'Where sponsors, funders, or governance bodies require an independent view, we assess whether governance is functioning, whether decisions remain aligned to strategy, and whether risks are being appropriately managed.',
    extra: 'We continue looking after the clients\' interests with experience-led oversight and assurance.',
  },
]

export default function GapsSection() {
  const cardsRef = useRef<HTMLDivElement>(null)

  /* Animate number digits + apply scale reveal + golden thread on enter */
  useEffect(() => {
    const container = cardsRef.current
    if (!container) return

    /* Split number text into individual digit spans for staggered animation */
    container.querySelectorAll<HTMLElement>('.gap-card__number').forEach((el) => {
      const text = el.textContent?.trim() ?? ''
      el.innerHTML = [...text]
        .map((ch) => `<span class="gap-card__number-digit">${ch}</span>`)
        .join('')
    })

    /* Upgrade to scale variant for visual interest */
    container.querySelectorAll<HTMLElement>('.gap-card').forEach((card) => {
      card.classList.replace('reveal', 'reveal-scale')
      card.setAttribute('tabindex', '0')
    })

    /* Persistent golden thread — once hovered, card stays threaded */
    container.querySelectorAll<HTMLElement>('.gap-card').forEach((card) => {
      card.addEventListener('mouseenter', () => card.classList.add('is-threaded'))
    })

    /* Equalise .gap-card__extra heights so copy baselines align across cards */
    function equaliseExtras() {
      const extras = Array.from(
        container!.querySelectorAll<HTMLElement>('.gap-card__extra')
      )
      extras.forEach((el) => { el.style.minHeight = '' })
      const maxH = Math.max(...extras.map((el) => el.offsetHeight))
      extras.forEach((el) => { el.style.minHeight = `${maxH}px` })
    }
    window.addEventListener('load', equaliseExtras)
    window.addEventListener('resize', equaliseExtras)

    /* IntersectionObserver for the scale reveal */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      container.querySelectorAll('.reveal-scale').forEach((el) => el.classList.add('is-visible'))
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
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )

    container.querySelectorAll('.reveal-scale').forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      window.removeEventListener('load', equaliseExtras)
      window.removeEventListener('resize', equaliseExtras)
    }
  }, [])

  return (
    <section className="gaps section" aria-labelledby="engagement-heading">
      <div className="container">
        <div className="gaps__header">
          <RevealWrapper as="span" className="label-tag label-tag--on-dark">
            When we are typically engaged
          </RevealWrapper>
          <h2 className="gaps__title reveal reveal-delay-1" id="engagement-heading">
            Three moments where independent advisory changes the outcome
          </h2>
        </div>

        <div className="gaps__grid" role="list" ref={cardsRef}>
          {GAPS.map(({ number, name, pillar, copy, extra }, i) => (
            <article
              key={number}
              className={`gap-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}
              role="listitem"
            >
              <div className="gap-card__number">{number}</div>
              <h3 className="gap-card__name">{name}</h3>
              <div className="gap-card__divider" aria-hidden="true" />
              <p className="gap-card__copy">{copy}</p>
              <p className="gap-card__extra">{extra}</p>
              <div className="gap-card__pillar" aria-hidden="true" data-word={pillar}>
                {pillar}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
