import ArrowIcon from './ArrowIcon'

export default function ArticleCTA() {
  return (
    <aside className="article-cta" aria-label="Get in touch">
      <div className="article-cta__inner">
        <span className="label-tag label-tag--on-dark is-visible">
          Every engagement begins with clarity
        </span>
        <h2 className="article-cta__title">
          Talk to playbook
        </h2>
        <p className="article-cta__copy">
          If this article resonates with the challenges your programme is facing,
          we are happy to speak further. No obligation, no pitch — just a direct
          conversation about what we see and what might help.
        </p>
        <a href="/contact" className="btn-primary">
          Get in touch
          <ArrowIcon size={16} />
        </a>
      </div>
    </aside>
  )
}
