'use client'

/* Playbook Model — auto-cycling 4-stage selector.
   Cycles every 3 seconds; click or arrow keys jump to a stage.
   Inactive stages at opacity 0.38; active stage shows a gold
   progress bar animated via @keyframes stageProgress. */

import { useEffect, useRef, useState, useCallback } from 'react'
import RevealWrapper from './RevealWrapper'
import ArrowIcon from './ArrowIcon'

const STAGES = [
  {
    number: '01',
    name: 'Experience',
    desc: 'Decades of senior-level programme leadership, brought directly to each engagement. We have lived the decisions that matter.',
  },
  {
    number: '02',
    name: 'Insight',
    desc: 'Pattern recognition built across sectors, client types, and programme scales. We know where risk accumulates before it becomes visible.',
  },
  {
    number: '03',
    name: 'Judgement',
    desc: 'The ability to make the right call under pressure, with incomplete information, at the moment it matters. Not process — discernment.',
  },
  {
    number: '04',
    name: 'Institutional memory',
    desc: 'Closing the Memory Gap: ensuring that the lessons of previous programmes are captured, structured, and available to the next one.',
  },
]

export default function PlaybookModelSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isRunningRef = useRef(false)
  const stagesElRef = useRef<HTMLDivElement>(null)

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % STAGES.length)
  }, [])

  const startCycle = useCallback(() => {
    if (isRunningRef.current) return
    isRunningRef.current = true
    timerRef.current = setInterval(advance, 3000)
  }, [advance])

  const stopCycle = useCallback(() => {
    isRunningRef.current = false
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  function activateStage(index: number, resetTimer: boolean) {
    setActiveIndex(index)
    if (resetTimer && isRunningRef.current) {
      stopCycle()
      startCycle()
    }
  }

  /* Start/stop cycle based on visibility */
  useEffect(() => {
    const el = stagesElRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startCycle()
          else stopCycle()
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      stopCycle()
    }
  }, [startCycle, stopCycle])

  return (
    <section
      className="model-band"
      id="the-playbook-model"
      aria-labelledby="model-heading"
    >
      <div className="container">
        <RevealWrapper className="model-band__header">
          <div className="model-band__intro">
            <span className="label-tag label-tag--on-dark">The Playbook Model</span>
            <h2 className="model-band__title" id="model-heading">
              How we bring experience to the moment of decision
            </h2>
            <p className="model-band__copy">
              The Playbook Model is the structured approach through which we close the Memory Gap,
              the Translation Gap, and the Decision Gap — addressing the three structural conditions
              that cause programmes to fail before delivery begins.
            </p>
          </div>
          <a href="/the-playbook-model" className="btn-outline-light">
            The Playbook Model
            <ArrowIcon size={16} />
          </a>
        </RevealWrapper>

        {/* Stage selector */}
        <div
          className="model-stages"
          ref={stagesElRef}
          role="tablist"
          aria-label="The Playbook Model stages"
        >
          {STAGES.map((stage, i) => {
            const isActive = i === activeIndex
            return (
              <div
                key={stage.name}
                className={`model-stage${isActive ? ' model-stage--active' : ''}`}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => activateStage(i, true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    activateStage(i, true)
                  }
                  if (e.key === 'ArrowRight') {
                    activateStage((i + 1) % STAGES.length, true)
                  }
                  if (e.key === 'ArrowLeft') {
                    activateStage((i + STAGES.length - 1) % STAGES.length, true)
                  }
                }}
              >
                <div className="model-stage__number">{stage.number}</div>
                <div className="model-stage__name">{stage.name}</div>
                <div className="model-stage__desc">{stage.desc}</div>
                <div className="model-stage__bar" aria-hidden="true">
                  {/* Key forces React to re-mount the fill div when activeIndex changes,
                      which re-triggers the CSS animation */}
                  <div
                    key={isActive ? `fill-active-${i}` : `fill-inactive-${i}`}
                    className="model-stage__bar-fill"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
