import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSectorBySlug, getAllSectorSlugs } from '@/lib/sector-data'
import SectorPageClient from './SectorPageClient'

interface SectorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSectorSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params
  const sector = getSectorBySlug(slug)
  if (!sector) return {}
  return {
    title: sector.metaTitle,
    description: sector.metaDescription,
  }
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params
  const sector = getSectorBySlug(slug)
  if (!sector) notFound()

  return <SectorPageClient sector={sector} />
}
