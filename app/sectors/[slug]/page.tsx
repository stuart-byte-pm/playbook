interface SectorPageProps {
  params: Promise<{ slug: string }>
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params

  return (
    <main>
      <h1>Sector: {slug}</h1>
    </main>
  )
}
