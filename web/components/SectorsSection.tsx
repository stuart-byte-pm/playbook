'use client'

/* Note: sandbox images are used here as per demo-04 source.
   These will be replaced with proper sector images in a later sprint. */

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import RevealWrapper from './RevealWrapper'

const SECTORS = [
  {
    name: 'Public sector',
    sub: 'Local authorities, NHS trusts, and education institutions — navigating political complexity, audit scrutiny, and the accountability structures of public capital programmes.',
    image: '/images/sandbox/Hospital 1.jpg',
    imageAlt: 'Public sector capital programme',
    tags: ['Local authority', 'Healthcare', 'Education'],
  },
  {
    name: 'Private sector',
    sub: 'Developer sponsors, regeneration leads, manufacturers, and commercial operators — strengthening governance where investment scale demands independent discipline.',
    image: '/images/sandbox/private sector.jpg',
    imageAlt: 'Private sector development',
    tags: ['Regeneration', 'Manufacturing', 'Commercial', 'Residential'],
  },
  {
    name: 'Infrastructure',
    sub: 'Logistics, transport, highways, utilities, and defence — complex long-duration programmes where independent governance authority and decision discipline are structurally critical.',
    image: '/images/sandbox/High rise buid.jpg',
    imageAlt: 'Infrastructure programme',
    tags: ['Transport', 'Utilities', 'Defence'],
  },
]

export default function SectorsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  /* 3D tilt on sector cards via mouse tracking */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll<HTMLElement>('.sector-card')

    function handleMouseMove(this: HTMLElement, e: MouseEvent) {
      const r = this.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      this.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`
      this.style.boxShadow = `${-x * 8}px ${-y * 8 + 8}px 32px rgba(0,0,0,0.10)`
    }

    function handleMouseLeave(this: HTMLElement) {
      this.style.transform = ''
      this.style.boxShadow = ''
    }

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <section className="sectors section" id="sectors" aria-labelledby="sectors-heading">
      <div className="container">
        <div className="sectors__header">
          <RevealWrapper as="span" className="label-tag">
            Sectors we serve
          </RevealWrapper>
          <h2 className="sectors__title reveal reveal-delay-1" id="sectors-heading">
            Senior-led advisory across public, private, and infrastructure
          </h2>
        </div>

        <div className="sectors__grid" ref={containerRef}>
          {SECTORS.map(({ name, sub, image, imageAlt, tags }, i) => (
            <RevealWrapper
              key={name}
              as="article"
              variant="scale"
              delay={i as 0 | 1 | 2}
              className="sector-card"
              tabIndex={0}
            >
              <div className="sector-card__image">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 960px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div className="sector-card__body">
                <h3 className="sector-card__name">{name}</h3>
                <p className="sector-card__sub">{sub}</p>
                <div className="sector-card__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
