'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageview } from '@/lib/consent/gtag'

function Inner({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    const query = searchParams?.toString()
    const path = query ? `${pathname}?${query}` : pathname
    trackPageview(measurementId, path, document.title)
  }, [measurementId, pathname, searchParams])

  return null
}

export default function PageviewTracker({ measurementId }: { measurementId: string }) {
  return (
    <Suspense fallback={null}>
      <Inner measurementId={measurementId} />
    </Suspense>
  )
}
