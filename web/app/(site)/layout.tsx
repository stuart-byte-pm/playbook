import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

/* Shared layout for all site pages.
   Nav and Footer are rendered here so every page inherits them automatically.
   The Sanity Studio (/studio) sits outside this group and is unaffected. */

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
