interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params

  return (
    <main>
      <h1>Service: {slug}</h1>
    </main>
  )
}
