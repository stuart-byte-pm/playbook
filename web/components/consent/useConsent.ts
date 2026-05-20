'use client'

import { useContext } from 'react'
import { ConsentContext } from './ConsentProvider'

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error('useConsent must be used within a ConsentProvider')
  }
  return ctx
}
