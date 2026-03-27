/**
 * CMS-agnostic data access layer for insights/blog articles.
 *
 * All pages and components consume insights through these functions.
 * When WordPress (or another CMS) is integrated, only this file
 * needs to change — swap the static imports for API calls and map
 * the response to the Insight interface.
 */

import type { Insight } from './types'
import { memoryGap } from './insights/memory-gap'
import { nhsCapitalProgrammes } from './insights/nhs-capital-programmes'
import { governanceBridgeRegen } from './insights/governance-bridge-regen'
import { decisionGap } from './insights/decision-gap'

const allInsights: Insight[] = [
  memoryGap,
  nhsCapitalProgrammes,
  governanceBridgeRegen,
  decisionGap,
]

/** All insights, sorted by date (newest first). */
export function getAllInsights(): Insight[] {
  return [...allInsights].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/** Single insight by slug. Returns undefined if not found. */
export function getInsightBySlug(slug: string): Insight | undefined {
  return allInsights.find((insight) => insight.slug === slug)
}

/** All insights matching a given tag, sorted by date (newest first). */
export function getInsightsByTag(tag: string): Insight[] {
  return getAllInsights().filter(
    (insight) => insight.tag.toLowerCase() === tag.toLowerCase()
  )
}

/**
 * The featured insight — the one with `featured: true`.
 * Falls back to the most recent if none is explicitly featured.
 */
export function getFeaturedInsight(): Insight {
  const featured = allInsights.find((insight) => insight.featured)
  if (featured) return featured
  return getAllInsights()[0]
}

/**
 * Search insights by matching the query against title and excerpt.
 * Case-insensitive substring match. Returns results sorted by date.
 */
export function searchInsights(query: string): Insight[] {
  const normalised = query.toLowerCase().trim()
  if (!normalised) return getAllInsights()
  return getAllInsights().filter(
    (insight) =>
      insight.title.toLowerCase().includes(normalised) ||
      insight.excerpt.toLowerCase().includes(normalised)
  )
}

/** All unique tags across published insights, in alphabetical order. */
export function getAllTags(): string[] {
  const tags = Array.from(new Set(allInsights.map((insight) => insight.tag)))
  return tags.sort()
}

/** All available slugs — used by generateStaticParams. */
export function getAllSlugs(): string[] {
  return allInsights.map((insight) => insight.slug)
}
