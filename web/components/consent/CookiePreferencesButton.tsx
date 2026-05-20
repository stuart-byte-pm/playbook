'use client'

import { useConsent } from './useConsent'

export default function CookiePreferencesButton({ className }: { className?: string }) {
  const { openPreferences } = useConsent()
  return (
    <button type="button" className={className} onClick={openPreferences}>
      Cookie preferences
    </button>
  )
}
