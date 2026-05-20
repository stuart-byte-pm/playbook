type ConsentState = 'granted' | 'denied'

export interface ConsentParams {
  ad_storage?: ConsentState
  ad_user_data?: ConsentState
  ad_personalization?: ConsentState
  analytics_storage?: ConsentState
  functionality_storage?: ConsentState
  personalization_storage?: ConsentState
  security_storage?: ConsentState
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function gtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

export function gtagConsentUpdate(params: ConsentParams): void {
  if (!gtagAvailable()) return
  window.gtag('consent', 'update', params)
}

export function trackPageview(
  measurementId: string,
  pagePath: string,
  pageTitle: string,
): void {
  if (!gtagAvailable()) return
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    send_to: measurementId,
  })
}
