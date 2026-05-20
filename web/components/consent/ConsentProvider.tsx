'use client'

import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import Script from 'next/script'
import { ACCEPT_ALL_CHOICES, DEFAULT_CHOICES } from '@/lib/consent/constants'
import { clearAnalyticsCookies, readConsent, writeConsent } from '@/lib/consent/storage'
import { gtagConsentUpdate } from '@/lib/consent/gtag'
import type { ConsentChoices, ConsentRecord } from '@/lib/consent/types'
import ConsentBanner from './ConsentBanner'
import ConsentPreferencesModal from './ConsentPreferencesModal'
import PageviewTracker from './PageviewTracker'

interface ConsentContextValue {
  choices: ConsentChoices
  hasDecided: boolean
  openPreferences: () => void
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (choices: ConsentChoices) => void
}

export const ConsentContext = createContext<ConsentContextValue | null>(null)

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function ConsentProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<ConsentRecord | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    setRecord(existing)
    setHydrated(true)
    if (existing) {
      gtagConsentUpdate({
        analytics_storage: existing.choices.analytics ? 'granted' : 'denied',
      })
    }
  }, [])

  const applyChoices = useCallback((choices: ConsentChoices) => {
    const next = writeConsent(choices)
    setRecord(next)
    gtagConsentUpdate({
      analytics_storage: choices.analytics ? 'granted' : 'denied',
    })
    if (!choices.analytics) {
      clearAnalyticsCookies()
    }
  }, [])

  const acceptAll = useCallback(() => {
    applyChoices(ACCEPT_ALL_CHOICES)
    setModalOpen(false)
  }, [applyChoices])

  const rejectAll = useCallback(() => {
    applyChoices(DEFAULT_CHOICES)
    setModalOpen(false)
  }, [applyChoices])

  const savePreferences = useCallback(
    (choices: ConsentChoices) => {
      applyChoices(choices)
      setModalOpen(false)
    },
    [applyChoices],
  )

  const openPreferences = useCallback(() => {
    setModalOpen(true)
  }, [])

  const closePreferences = useCallback(() => {
    setModalOpen(false)
  }, [])

  const choices = record?.choices ?? DEFAULT_CHOICES
  const hasDecided = record !== null
  const showBanner = hydrated && !hasDecided && !modalOpen
  const analyticsActive = hasDecided && choices.analytics

  const ctx: ConsentContextValue = {
    choices,
    hasDecided,
    openPreferences,
    acceptAll,
    rejectAll,
    savePreferences,
  }

  return (
    <ConsentContext.Provider value={ctx}>
      {children}

      {analyticsActive && MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            gtag('js', new Date());
            gtag('config', '${MEASUREMENT_ID}', {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `}</Script>
          <PageviewTracker measurementId={MEASUREMENT_ID} />
        </>
      )}

      {showBanner && (
        <ConsentBanner onAccept={acceptAll} onReject={rejectAll} onCustomise={openPreferences} />
      )}
      {modalOpen && (
        <ConsentPreferencesModal
          initialChoices={choices}
          onSave={savePreferences}
          onAcceptAll={acceptAll}
          onClose={closePreferences}
        />
      )}
    </ConsentContext.Provider>
  )
}
