export interface Insight {
  slug: string
  title: string
  excerpt: string
  body: string
  coverImage: string
  tag: string
  publishedAt: string
  author: string
  readingTime: number
  featured: boolean
  relatedSlugs: string[]
}
