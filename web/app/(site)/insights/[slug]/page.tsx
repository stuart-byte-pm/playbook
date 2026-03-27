import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getInsightBySlug, getAllSlugs } from '../../../../lib/insights'
import ArrowIcon from '../../../../components/ArrowIcon'
import ShareButtons from '../../../../components/ShareButtons'
import ArticleCTA from '../../../../components/ArticleCTA'
import RelatedInsights from '../../../../components/RelatedInsights'

interface InsightPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) return {}

  return {
    title: `${insight.title} — Playbook Advisory Group`,
    description: insight.excerpt,
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      type: 'article',
      publishedTime: insight.publishedAt,
      authors: [insight.author],
      images: [{ url: insight.coverImage }],
    },
  }
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params
  const insight = getInsightBySlug(slug)

  if (!insight) notFound()

  return (
    <main className="article-page">
      <div className="container">
        {/* Back navigation */}
        <a href="/insights" className="article-page__back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to all insights
        </a>

        {/* Article header */}
        <header className="article-page__header">
          <div className="insight-card__meta">
            <span className="insight-card__tag">{insight.tag}</span>
            <span className="insight-card__dot" aria-hidden="true" />
            <time className="insight-card__date" dateTime={insight.publishedAt}>
              {formatDate(insight.publishedAt)}
            </time>
            <span className="insight-card__dot" aria-hidden="true" />
            <span className="insight-card__date">{insight.readingTime} min read</span>
          </div>
          <h1 className="article-page__title">{insight.title}</h1>
          <p className="article-page__author">By {insight.author}</p>
        </header>

        {/* Cover image */}
        <div className="article-page__cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={insight.coverImage}
            alt=""
            className="article-page__cover-img"
          />
        </div>

        {/* Article body */}
        <div
          className="article-page__body prose"
          dangerouslySetInnerHTML={{ __html: insight.body }}
        />

        {/* Share buttons */}
        <ShareButtons title={insight.title} slug={insight.slug} />

        {/* CTA */}
        <ArticleCTA />

        {/* Related insights */}
        {insight.relatedSlugs.length > 0 && (
          <RelatedInsights slugs={insight.relatedSlugs} />
        )}
      </div>
    </main>
  )
}
