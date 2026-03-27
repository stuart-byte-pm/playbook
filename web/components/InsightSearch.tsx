'use client'

import { useRef, useEffect, useCallback } from 'react'

interface InsightSearchProps {
  value: string
  onChange: (query: string) => void
}

export default function InsightSearch({ value, onChange }: InsightSearchProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => onChange(next), 250)
    },
    [onChange]
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="insight-search">
      <svg
        className="insight-search__icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="insight-search__input"
        placeholder="Search articles..."
        defaultValue={value}
        onChange={handleChange}
        aria-label="Search articles"
      />
    </div>
  )
}
