'use client'

import { useEffect, useRef } from 'react'
import RevealWrapper from './RevealWrapper'

const ROWS = [
  { num: '01', text: 'Sponsor-side advisory, aligned to client interests' },
  { num: '02', text: 'Specialists in governance and decision quality' },
  { num: '03', text: 'Engaged early to reduce risk and strengthen outcomes' },
  { num: '04', text: 'Independent from technical delivery and execution' },
]

export default function WhereWeSitSection() {
  const rowsRef = useRef<HTMLDivElement>(null)
  const footnoteRef = useRef<HTMLDivElement>(null)

  /* Staggered row entrance animation driven by IntersectionObserver */
  useEffect(() => {
    const rowsEl = rowsRef.current
    const footnote = footnoteRef.current
    if (!rowsEl) return

    const rows = rowsEl.querySelectorAll<HTMLDivElement>('.wws__row')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      rows.forEach((r) => r.classList.add('wws-in'))
      if (footnote) footnote.classList.add('wws-in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          rows.forEach((row, i) => {
            setTimeout(() => row.classList.add('wws-in'), i * 110)
          })
          if (footnote) {
            setTimeout(
              () => footnote.classList.add('wws-in'),
              rows.length * 110 + 160
            )
          }
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(rowsEl)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="where-we-sit" id="where-we-sit" aria-labelledby="where-heading">
      {/* Decorative guiding star — background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="wws__bg-icon"
        src="/images/brand-assets/icon/Playbook_Icon_Outline_White_RGB.svg"
        alt=""
        aria-hidden="true"
      />

      <div className="container">
        <RevealWrapper className="wws__header">
          <div>
            <span className="label-tag label-tag--on-dark">Where we sit</span>
            <h2 className="wws__title" id="where-heading">
              Independent by design
            </h2>
          </div>
          <p className="wws__intro">
            Delivery capability is abundant. What is often missing is independent sponsor-side
            authority — ensuring decisions are clear, governance is robust, and programmes are
            set up to succeed before delivery begins.
          </p>
        </RevealWrapper>

        {/* Declaration rows — animated individually */}
        <div className="wws__rows" ref={rowsRef}>
          {ROWS.map(({ num, text }) => (
            <div key={num} className="wws__row">
              <span className="wws__row-num">{num}</span>
              <span className="wws__row-text">{text}</span>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="wws__footnote" ref={footnoteRef}>
          <span className="wws__footnote-label">We are not &mdash;</span>
          <span className="wws__footnote-items">
            A design &amp; construction consultancy · Embedded resource or capacity support
          </span>
        </div>
      </div>
    </section>
  )
}
