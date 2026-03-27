import type { Metadata } from 'next'
import { getAllInsights, getFeaturedInsight, getAllTags } from '../../../lib/insights'
import ArrowIcon from '../../../components/ArrowIcon'
import InsightsPageClient from './InsightsPageClient'

export const metadata: Metadata = {
  title: 'Insights — Playbook Advisory Group',
  description:
    'Perspectives on governance, capital programmes, and decision quality. Thought leadership from Playbook Advisory Group.',
  openGraph: {
    title: 'Insights — Playbook Advisory Group',
    description:
      'Perspectives on governance, capital programmes, and decision quality.',
    type: 'website',
  },
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function InsightsPage() {
  const allInsights = getAllInsights()
  const featured = getFeaturedInsight()
  const tags = getAllTags()
  const remaining = allInsights.filter((i) => i.slug !== featured.slug)

  return (
    <main className="insights-hub">
      <div className="container">
        {/* Page header */}
        <div className="insights-hub__header">
          <span className="label-tag is-visible">Thought leadership</span>
          <h1 className="insights-hub__title">
            Perspectives on governance, capital programmes, and decision quality
          </h1>
        </div>

        {/* Featured article */}
        <article className="featured-insight">
          <div className="featured-insight__image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.coverImage}
              alt=""
              className="featured-insight__img"
            />
            <div className="featured-insight__image-overlay" aria-hidden="true" />
          </div>
          <div className="featured-insight__body">
            <div className="insight-card__meta">
              <span className="insight-card__tag">{featured.tag}</span>
              <span className="insight-card__dot" aria-hidden="true" />
              <time className="insight-card__date" dateTime={featured.publishedAt}>
                {formatDate(featured.publishedAt)}
              </time>
              <span className="insight-card__dot" aria-hidden="true" />
              <span className="insight-card__date">{featured.readingTime} min read</span>
            </div>
            <h2 className="featured-insight__title">
              <a href={`/insights/${featured.slug}`} className="featured-insight__title-link">
                {featured.title}
              </a>
            </h2>
            <p className="featured-insight__excerpt">{featured.excerpt}</p>
            <a href={`/insights/${featured.slug}`} className="insight-card__link">
              Read article <ArrowIcon size={14} />
            </a>
          </div>
        </article>

        {/* Filter, search, grid */}
        <InsightsPageClient insights={remaining} tags={tags} />
      </div>
    </main>
  )
}
