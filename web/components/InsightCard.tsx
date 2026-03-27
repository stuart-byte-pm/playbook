import type { Insight } from '../lib/types'
import ArrowIcon from './ArrowIcon'

interface InsightCardProps {
  insight: Insight
  /** Optional extra class names */
  className?: string
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function InsightCard({ insight, className }: InsightCardProps) {
  const { slug, tag, publishedAt, title, excerpt, coverImage, readingTime } = insight

  return (
    <article className={`insight-card${className ? ` ${className}` : ''}`}>
      <div className="insight-card__body">
        <div className="insight-card__meta">
          <span className="insight-card__tag">{tag}</span>
          <span className="insight-card__dot" aria-hidden="true" />
          <time className="insight-card__date" dateTime={publishedAt}>
            {formatDate(publishedAt)}
          </time>
          <span className="insight-card__dot" aria-hidden="true" />
          <span className="insight-card__date">{readingTime} min read</span>
        </div>
        <h3 className="insight-card__title">
          <a href={`/insights/${slug}`} className="insight-card__title-link">{title}</a>
        </h3>
        <p className="insight-card__excerpt">{excerpt}</p>
        <a href={`/insights/${slug}`} className="insight-card__link">
          Read article <ArrowIcon size={14} />
        </a>
      </div>
      <div className="insight-card__image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage}
          alt=""
          loading="lazy"
          className="insight-card__img"
        />
        <div className="insight-card__image-overlay" aria-hidden="true" />
      </div>
    </article>
  )
}
