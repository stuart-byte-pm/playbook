import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ConsentProvider from '@/components/consent/ConsentProvider'

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

/* Google Consent Mode v2 default state — must execute before any Google
   script loads. Inlined into the SSR output so the browser runs it as the
   HTML is parsed, before React hydration. All ad and analytics signals
   default to denied; the user's choice (Accept / Reject) updates them
   later via gtagConsentUpdate. */
const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', false);
`.trim()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={inter.variable} suppressHydrationWarning>
      <body className="font-inter antialiased">
        <Script id="consent-default" strategy="beforeInteractive">
          {consentDefaultScript}
        </Script>
        <ConsentProvider>{children}</ConsentProvider>
      </body>
    </html>
  )
}
