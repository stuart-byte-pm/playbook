interface InsightPageProps {
  params: Promise<{ slug: string }>
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params

  return (
    <main>
      <h1>Insight: {slug}</h1>
    </main>
  )
}
