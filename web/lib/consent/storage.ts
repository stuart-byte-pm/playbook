import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from './constants'
import type { ConsentChoices, ConsentRecord } from './types'

export function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function writeConsent(choices: ConsentChoices): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    choices,
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
    } catch {
      // localStorage may be unavailable (private mode, quota); fail silent
    }
  }
  return record
}

/* Removes Google Analytics cookies after a user withdraws consent. Consent
   Mode `update` stops new data being sent, but does not delete cookies
   already on the device — we must purge them ourselves. */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return
  const host = window.location.hostname
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  const domains = new Set<string>([host, `.${host}`])
  const parts = host.split('.')
  if (parts.length > 2) {
    const root = parts.slice(-2).join('.')
    domains.add(root)
    domains.add(`.${root}`)
  }
  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')) {
      domains.forEach((d) => {
        document.cookie = `${name}=; ${expire}; domain=${d}`
      })
      document.cookie = `${name}=; ${expire}`
    }
  })
}
