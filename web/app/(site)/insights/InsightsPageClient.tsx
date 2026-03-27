'use client'

import { useState, useMemo } from 'react'
import type { Insight } from '../../../lib/types'
import InsightCard from '../../../components/InsightCard'
import TagFilter from '../../../components/TagFilter'
import InsightSearch from '../../../components/InsightSearch'

const PAGE_SIZE = 6

interface InsightsPageClientProps {
  insights: Insight[]
  tags: string[]
}

export default function InsightsPageClient({ insights, tags }: InsightsPageClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let results = insights

    if (activeTag) {
      results = results.filter(
        (i) => i.tag.toLowerCase() === activeTag.toLowerCase()
      )
    }

    if (query.trim()) {
      const normalised = query.toLowerCase().trim()
      results = results.filter(
        (i) =>
          i.title.toLowerCase().includes(normalised) ||
          i.excerpt.toLowerCase().includes(normalised)
      )
    }

    return results
  }, [insights, activeTag, query])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleTagChange(tag: string | null) {
    setActiveTag(tag)
    setVisibleCount(PAGE_SIZE)
  }

  function handleSearchChange(next: string) {
    setQuery(next)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <>
      <div className="insights-hub__controls">
        <TagFilter tags={tags} activeTag={activeTag} onChange={handleTagChange} />
        <InsightSearch value={query} onChange={handleSearchChange} />
      </div>

      {filtered.length === 0 ? (
        <div className="insights-hub__empty">
          <p>No articles match your current filters.</p>
          <button
            className="insights-hub__reset"
            onClick={() => {
              setActiveTag(null)
              setQuery('')
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="insights-hub__grid">
            {visible.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>

          <div className="insights-hub__pagination">
            <p className="insights-hub__count">
              Showing {visible.length} of {filtered.length}
            </p>
            {hasMore && (
              <button
                className="insights-hub__load-more"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              >
                Load more
              </button>
            )}
          </div>
        </>
      )}
    </>
  )
}
