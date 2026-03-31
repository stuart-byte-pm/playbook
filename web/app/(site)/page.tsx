import Splash from '@/components/Splash'
import Hero from '@/components/Hero'
import BeliefSection from '@/components/BeliefSection'
import WhereWeSitSection from '@/components/WhereWeSitSection'
import GapsSection from '@/components/GapsSection'
import ServicesSection from '@/components/ServicesSection'
import SectorsSection from '@/components/SectorsSection'
import InsightsSection from '@/components/InsightsSection'
import DiagnosticCTA from '@/components/DiagnosticCTA'
import ContactSection from '@/components/ContactSection'

export const metadata = {
  title: 'Playbook Advisory Group — Connecting you to clarity',
  description:
    'Senior-led, sponsor-side advisory for capital programme governance. Clarity, Control, Confidence.',
}

export default async function HomePage() {
  return (
    <>
      <Splash />
      <main id="main-content">
        <Hero />
        <BeliefSection />
        <WhereWeSitSection />
        <GapsSection />
        <ServicesSection />
        <SectorsSection />
        <InsightsSection />
        <DiagnosticCTA />
        <ContactSection />
      </main>
    </>
  )
}
