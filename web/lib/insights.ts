/**
 * CMS data access layer for insights/blog articles.
 *
 * All pages and components consume insights through these functions.
 * Data is fetched from WordPress at cms.playbook-group.co.uk.
 *
 * Fallback: if WordPress is unreachable, static content is returned
 * from the local insight files so the site never hard-crashes.
 */

import type { Insight } from './types'
import { fetchWPPosts, mapWPPostToInsight } from './wordpress'

// Static fallback imports — kept until WordPress content is verified
import { memoryGap } from './insights/memory-gap'
import { nhsCapitalProgrammes } from './insights/nhs-capital-programmes'
import { governanceBridgeRegen } from './insights/governance-bridge-regen'
import { decisionGap } from './insights/decision-gap'

const staticInsights: Insight[] = [
  memoryGap,
  nhsCapitalProgrammes,
  governanceBridgeRegen,
  decisionGap,
]

/**
 * Fetch all insights from WordPress, falling back to static content on failure.
 */
async function fetchInsights(): Promise<Insight[]> {
  const posts = await fetchWPPosts()

  if (posts.length === 0) {
    return staticInsights
  }

  return posts.map((post) => mapWPPostToInsight(post, posts))
}

/** All insights, sorted by date (newest first). */
export async function getAllInsights(): Promise<Insight[]> {
  const insights = await fetchInsights()
  return [...insights].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/** Single insight by slug. Returns undefined if not found. */
export async function getInsightBySlug(slug: string): Promise<Insight | undefined> {
  const insights = await fetchInsights()
  return insights.find((insight) => insight.slug === slug)
}

/** All insights matching a given tag, sorted by date (newest first). */
export async function getInsightsByTag(tag: string): Promise<Insight[]> {
  const insights = await getAllInsights()
  return insights.filter(
    (insight) => insight.tag.toLowerCase() === tag.toLowerCase()
  )
}

/**
 * The featured insight — the one with `featured: true` (sticky in WordPress).
 * Falls back to the most recent if none is explicitly featured.
 */
export async function getFeaturedInsight(): Promise<Insight> {
  const insights = await fetchInsights()
  const featured = insights.find((insight) => insight.featured)
  if (featured) return featured
  return (await getAllInsights())[0]
}

/**
 * Search insights by matching the query against title and excerpt.
 * Case-insensitive substring match. Returns results sorted by date.
 */
export async function searchInsights(query: string): Promise<Insight[]> {
  const normalised = query.toLowerCase().trim()
  if (!normalised) return getAllInsights()
  const insights = await getAllInsights()
  return insights.filter(
    (insight) =>
      insight.title.toLowerCase().includes(normalised) ||
      insight.excerpt.toLowerCase().includes(normalised)
  )
}

/** All unique tags across published insights, in alphabetical order. */
export async function getAllTags(): Promise<string[]> {
  const insights = await fetchInsights()
  const tags = Array.from(new Set(insights.map((insight) => insight.tag)))
  return tags.sort()
}

/** All available slugs — used by generateStaticParams. */
export async function getAllSlugs(): Promise<string[]> {
  const insights = await fetchInsights()
  return insights.map((insight) => insight.slug)
}
