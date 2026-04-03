'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ArrowIcon from './ArrowIcon'

const SECTOR_CHILDREN = [
  { href: '/sectors/public-sector', label: 'Public sector' },
  { href: '/sectors/private-sector', label: 'Private sector' },
  { href: '/sectors/infrastructure', label: 'Infrastructure' },
]

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/sectors', label: 'Sectors', children: SECTOR_CHILDREN },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  /* Pages with dark hero banners where the nav starts transparent with white text */
  const darkHeroPages = ['/', '/contact', '/privacy-policy', '/terms-and-conditions']
  const isDarkHero = darkHeroPages.includes(pathname ?? '/') ||
    (pathname ?? '').startsWith('/sectors/')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const scrollTicking = useRef(false)

  /* Scroll detection — update nav state and progress bar */
  useEffect(() => {
    const progressBar = document.createElement('div')
    progressBar.className = 'progress-bar'
    progressBar.setAttribute('aria-hidden', 'true')
    document.body.prepend(progressBar)

    const handleScroll = () => {
      if (scrollTicking.current) return
      if (document.body.classList.contains('splash-active')) return
      scrollTicking.current = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const viewH = window.innerHeight
        const docH = document.documentElement.scrollHeight
        setIsScrolled(scrollY > 40)
        const progress = docH > viewH ? (scrollY / (docH - viewH)) * 100 : 0
        progressBar.style.width = Math.min(progress, 100) + '%'
        scrollTicking.current = false
      })
    }

    /* Delay scroll listener to avoid false triggers during page streaming / splash */
    const startTimer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      /* Sync initial scroll position now that the page has settled */
      if (!document.body.classList.contains('splash-active')) {
        setIsScrolled(window.scrollY > 40)
      }
    }, 100)

    return () => {
      clearTimeout(startTimer)
      window.removeEventListener('scroll', handleScroll)
      progressBar.remove()
    }
  }, [])

  /* Focus trap in drawer */
  useEffect(() => {
    if (!isOpen) return
    const drawer = drawerRef.current
    if (!drawer) return
    const focusable = Array.from(
      drawer.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')
    )
    /* Focus first link after transition */
    const timer = setTimeout(() => focusable[0]?.focus(), 380)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function openMenu() { setIsOpen(true) }
  function closeMenu() { setIsOpen(false) }

  const isTransparent = isDarkHero && !isScrolled

  return (
    <>
      <header
        className={`nav${isTransparent ? ' nav--transparent' : ''}`}
        id="nav"
        role="banner"
      >
        <div className="nav__inner">
          <Link href="/" className="nav__logo" aria-label="Playbook Advisory Group — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand-assets/wordmark/playbook-wordmark-black.svg"
              alt="Playbook"
              className="nav__wordmark-svg nav__wordmark--dark"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand-assets/wordmark/playbook-wordmark-white.svg"
              alt="Playbook"
              className="nav__wordmark-svg nav__wordmark--light"
            />
          </Link>

          <nav aria-label="Primary navigation">
            <ul className="nav__links">
              {NAV_LINKS.map(({ href, label, children }) =>
                children ? (
                  <li key={href} className="nav__dropdown">
                    <span className="nav__link nav__dropdown-trigger">
                      {label}
                      <svg className="nav__dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <ul className="nav__dropdown-menu">
                      {children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={href}>
                    <a href={href} className="nav__link">{label}</a>
                  </li>
                )
              )}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            className={`nav__toggle${isOpen ? ' is-open' : ''}`}
            id="navToggle"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="navDrawer"
            onClick={() => isOpen ? closeMenu() : openMenu()}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`nav__backdrop${isOpen ? ' is-open' : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Mobile drawer */}
      <nav
        ref={drawerRef}
        className={`nav__drawer${isOpen ? ' is-open' : ''}`}
        id="navDrawer"
        role="dialog"
        aria-modal={isOpen}
        aria-label="Site navigation"
      >
        <button
          className="nav__drawer-close"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <ul className="nav__drawer-links">
          {NAV_LINKS.map(({ href, label, children }) => (
            <li key={href}>
              {children ? (
                <>
                  <span className="nav__drawer-link">{label}</span>
                  <ul className="nav__drawer-sublinks">
                    {children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="nav__drawer-sublink" onClick={closeMenu}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a href={href} className="nav__drawer-link" onClick={closeMenu}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="nav__drawer-footer">
          <a href="/contact" className="nav__drawer-cta" onClick={closeMenu}>
            Talk to playbook
            <ArrowIcon size={16} />
          </a>
          <p className="nav__drawer-tagline">Clarity, Control, Confidence</p>
        </div>
      </nav>
    </>
  )
}
