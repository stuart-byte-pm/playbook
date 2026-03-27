import type { Insight } from '../lib/types'
import { getInsightBySlug } from '../lib/insights'
import InsightCard from './InsightCard'

interface RelatedInsightsProps {
  slugs: string[]
}

export default function RelatedInsights({ slugs }: RelatedInsightsProps) {
  const related = slugs
    .map((s) => getInsightBySlug(s))
    .filter((i): i is Insight => i !== undefined)
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="related-insights" aria-labelledby="related-heading">
      <h2 className="related-insights__title" id="related-heading">
        Related insights
      </h2>
      <div className="related-insights__grid">
        {related.map((insight) => (
          <InsightCard key={insight.slug} insight={insight} />
        ))}
      </div>
    </section>
  )
}
