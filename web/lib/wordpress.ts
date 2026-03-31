/**
 * WordPress REST API client for insights/blog content.
 *
 * Fetches posts from the WordPress instance at cms.playbook-group.co.uk
 * and maps them to the Insight interface used throughout the site.
 */

import type { Insight } from './types'

// ---------------------------------------------------------------------------
// WP REST API types (only the fields we use)
// ---------------------------------------------------------------------------

interface WPPost {
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  sticky: boolean
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
    'wp:term'?: Array<Array<{ name: string }>>
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strip HTML tags from a string, returning plain text. */
function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

/** Calculate reading time in minutes from HTML content. */
function calculateReadingTime(html: string): number {
  const words = stripHTML(html).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

/** Decode common HTML entities (&amp; &#8217; etc.) */
function decodeHTMLEntities(str: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#8217;': '\u2019',
    '&#8216;': '\u2018',
    '&#8220;': '\u201C',
    '&#8221;': '\u201D',
    '&#8211;': '\u2013',
    '&#8212;': '\u2014',
    '&hellip;': '\u2026',
    '&ndash;': '\u2013',
    '&mdash;': '\u2014',
    '&lsquo;': '\u2018',
    '&rsquo;': '\u2019',
    '&ldquo;': '\u201C',
    '&rdquo;': '\u201D',
  }
  return str.replace(/&[#\w]+;/g, (match) => entities[match] ?? match)
}

// ---------------------------------------------------------------------------
// API client
// ---------------------------------------------------------------------------

const WP_API_URL = process.env.WORDPRESS_API_URL

/**
 * Fetch all published posts from WordPress with embedded media and terms.
 * Returns an empty array on error (graceful degradation).
 */
export async function fetchWPPosts(): Promise<WPPost[]> {
  if (!WP_API_URL) {
    console.warn('[wordpress] WORDPRESS_API_URL is not set')
    return []
  }

  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.warn(`[wordpress] API returned ${res.status}`)
      return []
    }

    return (await res.json()) as WPPost[]
  } catch (error) {
    console.warn('[wordpress] Failed to fetch posts:', error)
    return []
  }
}

// ---------------------------------------------------------------------------
// Mapping
// ---------------------------------------------------------------------------

/** Map a WordPress post object to the Insight interface. */
export function mapWPPostToInsight(post: WPPost, allPosts: WPPost[] = []): Insight {
  const tag =
    post._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Uncategorised'

  const coverImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? ''

  // Derive related posts: up to 3 other posts in the same category, sorted by date (newest first)
  const relatedSlugs = allPosts
    .filter((p) => {
      if (p.slug === post.slug) return false
      const pTag = p._embedded?.['wp:term']?.[0]?.[0]?.name
      return pTag?.toLowerCase() === tag.toLowerCase()
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((p) => p.slug)

  return {
    slug: post.slug,
    title: decodeHTMLEntities(stripHTML(post.title.rendered)),
    excerpt: decodeHTMLEntities(stripHTML(post.excerpt.rendered)),
    body: post.content.rendered,
    coverImage,
    tag,
    publishedAt: post.date,
    author: 'Playbook Advisory Group',
    readingTime: calculateReadingTime(post.content.rendered),
    featured: post.sticky,
    relatedSlugs,
  }
}
