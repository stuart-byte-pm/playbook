'use client'

import Image from 'next/image'
import RevealWrapper from '@/components/RevealWrapper'
import ArrowIcon from '@/components/ArrowIcon'
import DiagnosticCTA from '@/components/DiagnosticCTA'
import type { SectorData, SubSector } from '@/lib/sector-data'

interface Props {
  sector: SectorData
}

export default function SectorPageClient({ sector }: Props) {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="sector-hero" aria-labelledby="sector-heading">
        <Image
          src={sector.heroImage}
          alt={sector.heroImageAlt}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
          className="sector-hero__bg-image"
        />
        <div className="sector-hero__overlay" />

        {/* Decorative guiding stars */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand-assets/icon/Playbook_Icon_White_RGB.svg"
          alt=""
          aria-hidden="true"
          className="sector-hero__star sector-hero__star--large"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand-assets/icon/Playbook_Icon_White_RGB.svg"
          alt=""
          aria-hidden="true"
          className="sector-hero__star sector-hero__star--small"
        />

        <div className="container sector-hero__content">
          <span className="label-tag label-tag--on-dark">{sector.label}</span>
          <h1 className="sector-hero__title" id="sector-heading">
            {sector.headline}
          </h1>
          <p className="sector-hero__intro">{sector.intro}</p>
        </div>
      </section>

      {/* ── Pressure / overview ── */}
      <section className="sector-pressure section--tight" aria-labelledby="pressure-heading">
        <div className="container">
          <RevealWrapper className="sector-pressure__card">
            <h2 className="sector-pressure__heading" id="pressure-heading">
              {sector.pressureHeading}
            </h2>
            {sector.pressureIntro && (
              <p className="sector-pressure__intro">{sector.pressureIntro}</p>
            )}
            <ul className="sector-pressure__list">
              {sector.pressurePoints.map((point) => (
                <li key={point} className="sector-pressure__item">{point}</li>
              ))}
            </ul>
            <p className="sector-pressure__closing">{sector.pressureClosing}</p>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Sub-sectors ── */}
      {sector.subSectors.map((sub, i) => (
        <SubSectorSection key={sub.name} sub={sub} index={i} />
      ))}

      {/* ── How Playbook supports ── */}
      <section className="sector-support" aria-labelledby="support-heading">
        {/* Decorative guiding star */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand-assets/icon/Playbook_Icon_Outline_White_RGB.svg"
          alt=""
          aria-hidden="true"
          className="sector-support__star"
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <RevealWrapper>
            <span className="label-tag label-tag--on-dark">Our role</span>
            <h2 className="sector-support__heading" id="support-heading">
              {sector.supportHeading}
            </h2>
          </RevealWrapper>

          <div className="sector-support__grid">
            <RevealWrapper delay={1}>
              <ul className="sector-support__list">
                {sector.supportPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </RevealWrapper>
            <RevealWrapper variant="right" delay={2}>
              <h3 className="sector-support__outcomes-heading">What this enables</h3>
              <ul className="sector-support__outcomes">
                {sector.supportOutcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </RevealWrapper>
          </div>

          <RevealWrapper delay={2}>
            <p className="sector-support__closing">{sector.supportClosing}</p>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Diagnostic CTA ── */}
      <DiagnosticCTA />
    </main>
  )
}

/* ── Sub-sector section ── */

function SubSectorSection({ sub, index }: { sub: SubSector; index: number }) {
  const bgClass = index % 2 === 0 ? 'sector-sub--white' : 'sector-sub--sand'

  return (
    <section
      className={`sector-sub section ${bgClass}`}
      aria-labelledby={`sub-${index}-heading`}
    >
      <div className="container">

        {/* ── Row 1: Challenges + Position (left) | Image (right) ── */}
        <div className="sector-sub__split">
          <RevealWrapper className="sector-sub__split-content">
            <h2 className="sector-sub__name" id={`sub-${index}-heading`}>
              {sub.name}
            </h2>

            <div className="sector-sub__block">
              <h3 className="sector-sub__section-heading">Structural sponsor challenges</h3>
              <ul className="sector-sub__list">
                {sub.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="sector-sub__block">
              <h3 className="sector-sub__section-heading">Playbook&rsquo;s position</h3>
              <ul className="sector-sub__list">
                {sub.position.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </RevealWrapper>

          <RevealWrapper variant="right" delay={1} className="sector-sub__split-image-wrap">
            <div className="sector-sub__image">
              <Image
                src={sub.image}
                alt={sub.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
              <div className="sector-sub__image-gradient" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand-assets/icon/Playbook_Icon_Pill_White_RGB.svg"
                alt=""
                aria-hidden="true"
                className="sector-sub__image-icon"
              />
            </div>
          </RevealWrapper>
        </div>

        {/* ── Row 2: Image (left) | Engagement + Outcomes (right) ── */}
        {(sub.engagement || sub.outcomes.length > 0) && (
          <div className="sector-sub__split sector-sub__split--reversed">
            {/* Content in DOM first, but CSS order pushes image left */}
            <RevealWrapper variant="right" delay={1} className="sector-sub__split-content">
              {sub.engagement && (
                <div className="sector-sub__block">
                  <h3 className="sector-sub__section-heading">How we engage</h3>
                  <ul className="sector-sub__list">
                    {sub.engagement.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="sector-sub__block">
                <h3 className="sector-sub__section-heading">What this enables</h3>
                <ul className="sector-sub__list">
                  {sub.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </RevealWrapper>

            <RevealWrapper className="sector-sub__split-image-wrap">
              <div className="sector-sub__image sector-sub__image--with-star">
                <Image
                  src={sub.image2}
                  alt={sub.image2Alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  loading="lazy"
                />
                <div className="sector-sub__image-gradient" />
                {/* Decorative guiding star — right side, matching page hero pattern */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand-assets/icon/Playbook_Icon_White_RGB.svg"
                  alt=""
                  aria-hidden="true"
                  className="sector-sub__image-star"
                />
              </div>
            </RevealWrapper>
          </div>
        )}

        {/* ── Risk & mitigation + closing ── */}
        <div className="sector-sub__footer">
          <RevealWrapper>
            <h3 className="sector-sub__section-heading">Targeted risk and mitigation</h3>
            <div className="sector-sub__risks">
              {sub.risks.map((r) => (
                <div key={r.risk} className="sector-sub__risk-row">
                  <span className="sector-sub__risk-label">{r.risk}</span>
                  <span className="sector-sub__risk-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="sector-sub__risk-mitigation">{r.mitigation}</span>
                </div>
              ))}
            </div>
          </RevealWrapper>

          {sub.closingLine && (
            <RevealWrapper delay={1}>
              <p className="sector-sub__closing">{sub.closingLine}</p>
            </RevealWrapper>
          )}
        </div>
      </div>
    </section>
  )
}
