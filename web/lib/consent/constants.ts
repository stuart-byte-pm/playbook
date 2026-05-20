import type { CategoryMetadata, ConsentChoices } from './types'

export const CONSENT_STORAGE_KEY = 'playbook_consent_v1'
export const CONSENT_VERSION = 1

export const DEFAULT_CHOICES: ConsentChoices = {
  necessary: true,
  analytics: false,
}

export const ACCEPT_ALL_CHOICES: ConsentChoices = {
  necessary: true,
  analytics: true,
}

export const CATEGORIES: readonly CategoryMetadata[] = [
  {
    key: 'necessary',
    label: 'Strictly necessary',
    description: 'Required for the site to function. Stores your cookie preferences only.',
    required: true,
  },
  {
    key: 'analytics',
    label: 'Analytics (Google Analytics 4)',
    description: 'Anonymised usage data so we can understand how the site is used. No advertising.',
    required: false,
  },
] as const
