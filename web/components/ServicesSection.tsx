'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import RevealWrapper from './RevealWrapper'

const SERVICES = [
  {
    index: '01',
    title: 'Capital investment strategy',
    desc: 'Upstream strategic advisory on major capital investment decisions — defining the governance structure, business case rationale, and decision framework before commitment. Establishing the context to which successful funding applications will need to respond.',
  },
  {
    index: '02',
    title: 'Programme setup and governance',
    desc: 'Designing and strengthening governance frameworks that direct complex programmes with clarity — establishing accountabilities, decision disciplines, and escalation structures.',
  },
  {
    index: '03',
    title: 'Sponsor-side advisory',
    desc: 'Acting exclusively for the client as an extension of the senior leadership team — providing independent challenge, objective oversight, and protected decision space.',
  },
  {
    index: '04',
    title: 'Programme health diagnostics and project recovery',
    desc: 'Rapid, structured assessment of programmes in distress — identifying root causes, restoring governance clarity, and creating the conditions for recovery.',
  },
  {
    index: '05',
    title: 'Funding and business case advisory',
    desc: 'Supporting the development of investment cases and funding submissions that hold under scrutiny — structuring the argument, evidence base, and approval pathway. We specialise in creating compelling cases that respond to the strategic context to maximise opportunity to secure funding for capital investments.',
  },
]

export default function ServicesSection() {
  const frameRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  /* Lock image frame height to list height — prevents zoom on row hover */
  useEffect(() => {
    const frame = frameRef.current
    const list = listRef.current
    if (!frame || !list) return

    function lockHeight() {
      frame!.style.height = `${list!.offsetHeight}px`
    }

    lockHeight()
    window.addEventListener('resize', lockHeight)
    return () => window.removeEventListener('resize', lockHeight)
  }, [])

  /* Upgrade service rows to reveal-left variant */
  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    list.querySelectorAll<HTMLElement>('.service-row').forEach((el) => {
      el.classList.replace('reveal', 'reveal-left')
    })

    if (prefersReducedMotion) {
      list.querySelectorAll('.reveal-left').forEach((el) => el.classList.add('is-visible'))
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

    list.querySelectorAll('.reveal-left').forEach((el) => observer.observe(el))

    /* Keyboard expand for service rows */
    list.querySelectorAll<HTMLElement>('.service-row').forEach((row) => {
      row.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          row.classList.toggle('kb-active')
        }
      })
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="services section" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="services__header">
          <div>
            <RevealWrapper as="span" className="label-tag">
              What we do
            </RevealWrapper>
            <RevealWrapper as="h2" className="services__title" delay={1} id="services-heading">
              Sponsor-side advisory, independent from delivery
            </RevealWrapper>
          </div>
        </div>

        <div className="services__layout">
          {/* Sticky image panel — hidden on small screens via CSS */}
          <div className="services__image-panel">
            <div className="services__image-frame" ref={frameRef}>
              <Image
                src="/images/sections/what-we-do-section-men-women-at-laptop.jpg"
                alt="Sponsor-side advisory in practice"
                fill
                sizes="(max-width: 900px) 0vw, 50vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Services list */}
          <div className="services__list" role="list" ref={listRef}>
            {SERVICES.map(({ index, title, desc }, i) => (
              <div
                key={index}
                className={`service-row reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}
                role="listitem"
                tabIndex={0}
                aria-label={title}
              >
                <span className="service-row__index">{index}</span>
                <div className="service-row__content">
                  <h3 className="service-row__title">{title}</h3>
                  <p className="service-row__desc">{desc}</p>
                </div>
                <div className="service-row__arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3h10v10M3 13L13 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
