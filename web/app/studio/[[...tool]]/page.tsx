'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

/* Sanity Studio embedded at /studio — not wrapped by the site layout.
   Requires a Sanity project ID in NEXT_PUBLIC_SANITY_PROJECT_ID to function. */
export default function StudioPage() {
  return <NextStudio config={config} />
}
