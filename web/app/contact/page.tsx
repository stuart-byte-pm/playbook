import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact — Playbook Advisory Group',
  description:
    'Get in touch with Playbook Advisory Group. Based in Leamington Spa, we provide senior-led advisory for capital programme governance.',
}

export default function ContactPage() {
  return <ContactPageClient />
}
