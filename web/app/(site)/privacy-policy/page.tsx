import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy policy — Playbook Advisory Group',
  description: 'How Playbook Advisory Group Limited collects, uses, and protects your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Header */}
      <section
        className="bg-black"
        style={{ paddingBlock: 'var(--space-20, 5rem)', position: 'relative', overflow: 'hidden' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand-assets/icon/Playbook_Icon_White_RGB.svg" alt="" aria-hidden="true"
          style={{ position: 'absolute', top: '-80px', right: '-120px', width: '520px', height: 'auto', opacity: 0.12, pointerEvents: 'none', userSelect: 'none', transform: 'rotate(15deg)' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand-assets/icon/Playbook_Icon_White_RGB.svg" alt="" aria-hidden="true"
          style={{ position: 'absolute', bottom: '-40px', left: '-50px', width: '180px', height: 'auto', opacity: 0.07, pointerEvents: 'none', userSelect: 'none', transform: 'rotate(-10deg)' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span
            className="inline-block uppercase tracking-widest font-medium text-gold"
            style={{ fontSize: 'var(--size-label, 0.6875rem)', letterSpacing: 'var(--ls-widest, 0.1em)', marginBottom: 'var(--space-6, 1.5rem)' }}
          >
            Legal
          </span>
          <h1
            className="font-bold text-white"
            style={{ fontSize: 'var(--size-h1, 3.5rem)', lineHeight: 'var(--lh-tight, 1.1)', letterSpacing: 'var(--ls-tight, -0.025em)' }}
          >
            Privacy policy
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingBlock: 'var(--space-24)' }}>
        <div className="container">
          <div className="legal-prose">

            <h2>1. Who we are</h2>
            <p>
              Playbook Advisory Group Limited (<strong>"Playbook"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>) is a company registered in England and Wales. We provide senior-led, sponsor-side advisory services for capital programme governance.
            </p>
            <p>
              Our registered office and principal place of business is at 5 North Hall, Spencer Yard, Spencer Street, Leamington Spa, Warwickshire, CV31 3SY.
            </p>
            <p>
              We are the data controller for the personal data described in this policy. If you have any questions about how we handle your data, please contact us at <a href="mailto:hello@playbook-group.co.uk">hello@playbook-group.co.uk</a>.
            </p>

            <h2>2. What this policy covers</h2>
            <p>
              This policy explains what personal data we collect, why we collect it, how we use it, and your rights in relation to it. It applies to personal data collected through this website (<strong>playbook-group.co.uk</strong>) and through our direct business correspondence and engagement activities.
            </p>
            <p>
              We are committed to processing personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>

            <h2>3. Data we collect and how we collect it</h2>

            <h3>3.1 Information you provide directly</h3>
            <p>When you contact us through this website or by email, we may collect:</p>
            <ul>
              <li>Your name and job title</li>
              <li>Your organisation name</li>
              <li>Your business email address and telephone number</li>
              <li>The content of your enquiry or message</li>
            </ul>

            <h3>3.2 Information collected automatically</h3>
            <p>
              When you visit this website, we may collect limited technical data including your IP address, browser type, pages visited, and the date and time of your visit. This is collected for the purposes of website security, performance monitoring, and analytics. We do not use cookies for advertising or tracking purposes.
            </p>

            <h3>3.3 Information from business correspondence</h3>
            <p>
              In the course of our advisory work, we may collect professional contact information and correspondence from individuals at client organisations, prospective clients, and professional contacts. This data is typically limited to business contact details and professional context.
            </p>

            <h2>4. How we use your data</h2>
            <p>We use the personal data we collect for the following purposes:</p>
            <ul>
              <li><strong>Responding to enquiries:</strong> to respond to messages submitted through our contact form or sent to us directly</li>
              <li><strong>Client engagement:</strong> to manage our advisory engagements, including scoping discussions, project delivery, and ongoing correspondence</li>
              <li><strong>Business development:</strong> to follow up on professional introductions and maintain relationships with current and prospective clients</li>
              <li><strong>Improving our website:</strong> to understand how our website is used and to improve its performance and content</li>
              <li><strong>Legal and compliance obligations:</strong> to comply with any legal or regulatory requirements applicable to our business</li>
            </ul>

            <h2>5. Lawful basis for processing</h2>
            <p>We rely on the following lawful bases under UK GDPR:</p>
            <ul>
              <li><strong>Legitimate interests (Article 6(1)(f)):</strong> for responding to enquiries, maintaining professional relationships, and conducting business development. We have assessed that our legitimate interests do not override your rights and freedoms.</li>
              <li><strong>Contract (Article 6(1)(b)):</strong> where processing is necessary for the performance of a contract with you or your organisation, or to take steps at your request before entering into a contract.</li>
              <li><strong>Legal obligation (Article 6(1)(c)):</strong> where we are required to process data to comply with a legal obligation.</li>
            </ul>

            <h2>6. Data sharing</h2>
            <p>
              We do not sell, rent, or trade your personal data. We may share your data only in the following limited circumstances:
            </p>
            <ul>
              <li><strong>Service providers:</strong> third-party providers who process data on our behalf (such as email delivery services), bound by data processing agreements and permitted to use your data only for the services they provide to us</li>
              <li><strong>Professional advisers:</strong> our lawyers, accountants, and insurers where necessary for the conduct of our business</li>
              <li><strong>Legal requirements:</strong> where we are required to disclose data by law, court order, or regulatory authority</li>
            </ul>

            <h2>7. Data retention</h2>
            <p>
              We retain personal data only for as long as is necessary for the purposes set out in this policy, or as required by law. In practice:
            </p>
            <ul>
              <li>Enquiry data from the contact form is retained for up to 24 months from the date of last contact unless a client relationship develops</li>
              <li>Data relating to active client engagements is retained for the duration of the engagement and for a period of seven years thereafter, in line with standard professional practice</li>
              <li>Website analytics data is retained in aggregated form only</li>
            </ul>

            <h2>8. International transfers</h2>
            <p>
              We do not routinely transfer personal data outside the United Kingdom. Where any transfer does occur, we ensure appropriate safeguards are in place in accordance with UK GDPR requirements.
            </p>

            <h2>9. Your rights</h2>
            <p>Under UK GDPR, you have the following rights in relation to your personal data:</p>
            <ul>
              <li><strong>Right of access:</strong> to request a copy of the personal data we hold about you</li>
              <li><strong>Right to rectification:</strong> to request correction of inaccurate or incomplete data</li>
              <li><strong>Right to erasure:</strong> to request deletion of your data in certain circumstances</li>
              <li><strong>Right to restriction:</strong> to request that we limit the processing of your data in certain circumstances</li>
              <li><strong>Right to object:</strong> to object to processing based on legitimate interests</li>
              <li><strong>Right to data portability:</strong> to receive your data in a structured, machine-readable format in certain circumstances</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at <a href="mailto:hello@playbook-group.co.uk">hello@playbook-group.co.uk</a>. We will respond to verified requests within one calendar month.
            </p>
            <p>
              If you are unhappy with how we have handled your data, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
            </p>

            <h2>10. Website security</h2>
            <p>
              We take appropriate technical and organisational measures to protect personal data against unauthorised access, loss, or misuse. However, no transmission over the internet is entirely secure and we cannot guarantee the security of data transmitted to our website.
            </p>

            <h2>11. Links to other websites</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies before providing any personal data.
            </p>

            <h2>12. Changes to this policy</h2>
            <p>
              We may update this policy from time to time to reflect changes in our practices or in applicable law. The date at the top of this page indicates when the policy was last revised. We encourage you to review this page periodically.
            </p>

            <h2>13. Contact us</h2>
            <p>
              If you have any questions about this privacy policy or about how we handle your personal data, please contact us:
            </p>
            <p>
              <strong>Playbook Advisory Group Limited</strong><br />
              5 North Hall, Spencer Yard<br />
              Spencer Street, Leamington Spa<br />
              Warwickshire, CV31 3SY<br />
              <a href="mailto:hello@playbook-group.co.uk">hello@playbook-group.co.uk</a>
            </p>

          </div>
        </div>
      </section>

      <style>{`
        .legal-prose {
          width: 100%;
        }
        .legal-prose h2 {
          font-size: var(--size-h4);
          font-weight: var(--weight-bold);
          letter-spacing: var(--ls-tight);
          color: var(--color-black);
          margin-top: var(--space-12);
          margin-bottom: var(--space-4);
        }
        .legal-prose h3 {
          font-size: var(--size-h5);
          font-weight: var(--weight-semibold);
          letter-spacing: var(--ls-tight);
          color: var(--color-black);
          margin-top: var(--space-8);
          margin-bottom: var(--space-3);
        }
        .legal-prose p {
          font-size: var(--size-body);
          line-height: var(--lh-relaxed);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }
        .legal-prose ul {
          margin-bottom: var(--space-6);
          padding-left: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .legal-prose li {
          font-size: var(--size-body);
          line-height: var(--lh-relaxed);
          color: var(--color-text-secondary);
        }
        .legal-prose strong {
          font-weight: var(--weight-semibold);
          color: var(--color-black);
        }
        .legal-prose a {
          color: var(--color-black);
          border-bottom: 1px solid var(--color-border-default);
          padding-bottom: 1px;
          transition: color 140ms, border-color 140ms;
        }
        .legal-prose a:hover {
          color: var(--color-gold);
          border-color: var(--color-gold);
        }
      `}</style>
    </main>
  )
}
