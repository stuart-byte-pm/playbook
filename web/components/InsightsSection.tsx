import RevealWrapper from './RevealWrapper'
import ArrowIcon from './ArrowIcon'
import InsightCard from './InsightCard'
import { getAllInsights } from '../lib/insights'

export default async function InsightsSection() {
  const insights = await getAllInsights()

  return (
    <section className="insights section" id="insights" aria-labelledby="insights-heading">
      <div className="container">
        <div className="insights__header">
          <div>
            <RevealWrapper as="span" className="label-tag">
              Thought leadership
            </RevealWrapper>
            <RevealWrapper as="h2" className="insights__title" delay={1} id="insights-heading">
              Perspectives on governance, capital programmes, and decision quality
            </RevealWrapper>
          </div>
          <RevealWrapper
            as="a"
            href="/insights"
            className="belief__link"
            delay={2}
            style={{ whiteSpace: 'nowrap', alignSelf: 'flex-end' } as React.CSSProperties}
          >
            All insights
            <ArrowIcon size={14} />
          </RevealWrapper>
        </div>

        <div className="insights__grid">
          {insights.map((insight, i) => (
            <RevealWrapper
              key={insight.slug}
              variant="scale"
              delay={i as 0 | 1 | 2 | 3}
            >
              <InsightCard insight={insight} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
