import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

/* Inter is the sole brand typeface. Loaded via next/font for automatic
   optimisation and self-hosting — no external request at render time. */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Playbook Advisory Group',
  description: 'Senior-led, sponsor-side advisory for capital programme governance.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        {/* TODO: Add Plausible Analytics script here once account is set up post-launch */}
      </head>
      <body className="font-inter antialiased" style={{ overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
