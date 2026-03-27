'use client'

interface TagFilterProps {
  tags: string[]
  activeTag: string | null
  onChange: (tag: string | null) => void
}

export default function TagFilter({ tags, activeTag, onChange }: TagFilterProps) {
  return (
    <div className="tag-filter" role="tablist" aria-label="Filter by tag">
      <button
        role="tab"
        aria-selected={activeTag === null}
        className={`tag-filter__pill${activeTag === null ? ' tag-filter__pill--active' : ''}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          role="tab"
          aria-selected={activeTag === tag}
          className={`tag-filter__pill${activeTag === tag ? ' tag-filter__pill--active' : ''}`}
          onClick={() => onChange(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
