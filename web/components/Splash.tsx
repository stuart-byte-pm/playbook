'use client'

/* Splash screen — shown once per session, auto-dismisses after 5.5s.
   Mirrors the demo exactly: always rendered in the DOM, hidden via
   CSS/JS rather than React state to avoid hydration issues. */

import { useEffect } from 'react'
import WordmarkSvg from './WordmarkSvg'

export default function Splash() {
  useEffect(() => {
    const splash = document.getElementById('splash')
    if (!splash) return

    /* Already seen this session — hide immediately */
    if (sessionStorage.getItem('splashSeen')) {
      splash.style.display = 'none'
      return
    }

    document.body.classList.add('splash-active')

    const fadeTimer = setTimeout(() => {
      splash.classList.add('is-hiding')

      const removeTimer = setTimeout(() => {
        splash.style.display = 'none'
        document.body.classList.remove('splash-active')
        sessionStorage.setItem('splashSeen', '1')
      }, 500)

      return () => clearTimeout(removeTimer)
    }, 5500)

    return () => {
      clearTimeout(fadeTimer)
      document.body.classList.remove('splash-active')
    }
  }, [])

  return (
    <div
      className="splash"
      id="splash"
      role="status"
      aria-label="Loading Playbook Advisory Group"
    >
      <div className="splash__inner">
        <WordmarkSvg
          className="splash__wordmark"
          ariaLabel="Playbook Advisory Group"
          height={200}
        />

        <div className="splash__rule" aria-hidden="true" />

        <div className="splash__definition">
          <p className="splash__word">play&middot;book</p>
          <p className="splash__pos">noun</p>
          <ol className="splash__defs">
            <li>a notional range of possible strategies, methodologies, and tactics in any sphere of activity</li>
            <li>any plan or set of strategies, as for outlining a campaign in business or politics</li>
          </ol>
        </div>

        {/* Guiding star — spinning loading indicator */}
        <svg
          className="splash__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 610 610"
          aria-hidden="true"
        >
          <path d="M316.6,605c156.6-6,282.4-131.8,288.4-288.4-285.4.2-288.3,282.7-288.4,288.4Z" />
          <path d="M5,316.6c6,156.6,131.8,282.4,288.3,288.4-.2-285.1-282-288.3-288.3-288.4Z" />
          <path d="M605,293.3C599,136.8,473.2,11,316.7,5c.2,285,281.9,288.3,288.3,288.3Z" />
          <path d="M5,293.3c284.8-.2,288.3-281.5,288.4-288.3C136.8,11,11,136.8,5,293.3Z" />
        </svg>

        <p className="splash__loading" aria-live="polite">
          Loading
          <span className="splash__loading-dots" aria-hidden="true">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
      </div>
    </div>
  )
}
