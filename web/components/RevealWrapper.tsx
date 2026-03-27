'use client'

/* RevealWrapper — applies IntersectionObserver-driven reveal animations.
   Wrap any element that should animate into view on scroll.
   Supports reveal variants: 'up' (default), 'left', 'right', 'scale'. */

import { useEffect, useRef } from 'react'

interface RevealWrapperProps {
  children: React.ReactNode
  variant?: 'up' | 'left' | 'right' | 'scale'
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  /* Allow additional HTML attributes (e.g. id, role, tabIndex) */
  [key: string]: unknown
}

const VARIANT_CLASS: Record<string, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
}

export default function RevealWrapper({
  children,
  variant = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
  ...rest
}: RevealWrapperProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.classList.add('is-visible')
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

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const variantClass = VARIANT_CLASS[variant] ?? 'reveal'
  const delayClass = delay > 0 ? ` reveal-delay-${delay}` : ''
  const combinedClass = `${variantClass}${delayClass}${className ? ` ${className}` : ''}`

  const Element = Tag as React.ElementType

  return (
    <Element ref={ref} className={combinedClass} {...rest}>
      {children}
    </Element>
  )
}
