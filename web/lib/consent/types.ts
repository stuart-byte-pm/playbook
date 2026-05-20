export type ConsentCategory = 'necessary' | 'analytics'

export interface ConsentChoices {
  necessary: true
  analytics: boolean
}

export interface ConsentRecord {
  version: number
  timestamp: string
  choices: ConsentChoices
}

export interface CategoryMetadata {
  key: ConsentCategory
  label: string
  description: string
  required: boolean
}
