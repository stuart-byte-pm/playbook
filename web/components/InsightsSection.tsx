import RevealWrapper from './RevealWrapper'
import ArrowIcon from './ArrowIcon'

/* Insight articles — static placeholder content matching demo-04.
   When Sanity CMS is integrated these will be fetched via ISR. */

const INSIGHTS = [
  {
    tag: 'Governance',
    date: '10 March 2026',
    datetime: '2026-03-10',
    title: 'The most expensive lessons in any programme are the ones that must be learned twice',
    excerpt:
      'Why the Memory Gap, Translation Gap, and Decision Gap repeat — and what structurally closes them before financial commitment.',
    image: '/images/hero/hero-governance-briefing-02.png',
  },
  {
    tag: 'Healthcare',
    date: '24 February 2026',
    datetime: '2026-02-24',
    title: 'Why NHS capital programmes drift: diffuse accountability and the governance bridge',
    excerpt:
      'The structural conditions that allow NHS capital programmes to escalate in cost and complexity — and where independent sponsor-side advisory changes the outcome.',
    image: '/images/insights/insights-architectural-detail-02.png',
  },
  {
    tag: 'Regeneration',
    date: '7 February 2026',
    datetime: '2026-02-07',
    title: 'What the Governance Bridge looks like in residential regeneration',
    excerpt:
      'How the space between Board oversight and programme delivery creates risk in mixed-use schemes — and how structured sponsor-side advisory fills it.',
    image: '/images/insights/insights-structural-detail-04.png',
  },
  {
    tag: 'Capital programmes',
    date: '10 January 2026',
    datetime: '2026-01-10',
    title: 'Closing the Decision Gap: independent challenge at the point of commitment',
    excerpt:
      'How the absence of a sponsor-side voice allows individually defensible decisions to collectively produce outcomes nobody intended — and what changes it.',
    image: '/images/hero/hero-briefing-table-06.png',
  },
]

export default function InsightsSection() {
  return (
    <section className="insights section" id="insights" aria-labelledby="insights-heading">
      <div className="container">
        <div className="insights__header">
          <div>
            <RevealWrapper as="span" className="label-tag">
              Thought leadership
            </RevealWrapper>
            <h2 className="insights__title reveal reveal-delay-1" id="insights-heading">
              Perspectives on governance, capital programmes, and decision quality
            </h2>
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
          {INSIGHTS.map(({ tag, date, datetime, title, excerpt, image }, i) => (
            <RevealWrapper
              key={datetime}
              as="article"
              variant="scale"
              delay={i as 0 | 1 | 2 | 3}
              className="insight-card"
            >
              <div className="insight-card__body">
                <div className="insight-card__meta">
                  <span className="insight-card__tag">{tag}</span>
                  <span className="insight-card__dot" aria-hidden="true" />
                  <time className="insight-card__date" dateTime={datetime}>{date}</time>
                </div>
                <h3 className="insight-card__title">{title}</h3>
                <p className="insight-card__excerpt">{excerpt}</p>
                <a href="/insights" className="insight-card__link">
                  Read article{' '}
                  <ArrowIcon size={14} />
                </a>
              </div>
              <div className="insight-card__image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="insight-card__img"
                />
                <div className="insight-card__image-overlay" aria-hidden="true" />
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
