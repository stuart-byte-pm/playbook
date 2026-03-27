import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and conditions — Playbook Advisory Group',
  description: 'Terms and conditions governing the use of the Playbook Advisory Group website and the provision of advisory services.',
}

export default function TermsAndConditionsPage() {
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
            Terms and conditions
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingBlock: 'var(--space-24)' }}>
        <div className="container">
          <div className="legal-prose">

            <h2>1. About us</h2>
            <p>
              These terms and conditions govern your use of this website and the provision of advisory services by Playbook Advisory Group Limited (<strong>"Playbook"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>), a company registered in England and Wales.
            </p>
            <p>
              Our registered office and principal place of business is at 5 North Hall, Spencer Yard, Spencer Street, Leamington Spa, Warwickshire, CV31 3SY.
            </p>
            <p>
              By accessing this website or engaging our services, you agree to be bound by these terms. If you do not agree, please do not use this website or engage our services.
            </p>

            <h2>2. Use of this website</h2>

            <h3>2.1 Permitted use</h3>
            <p>
              You may use this website for lawful purposes only. You must not use this website in any way that causes, or is likely to cause, the website or access to it to be interrupted, damaged, or impaired, or in any way that is unlawful, fraudulent, or harmful.
            </p>

            <h3>2.2 Intellectual property</h3>
            <p>
              All content on this website — including text, graphics, logos, images, and software — is the property of Playbook Advisory Group Limited or its content suppliers and is protected by United Kingdom and international intellectual property laws.
            </p>
            <p>
              You may view, download, and print content from this website for your own personal, non-commercial use only. You must not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
            </p>

            <h3>2.3 Accuracy of information</h3>
            <p>
              We make reasonable efforts to ensure the information on this website is accurate and up to date. However, we make no warranties or representations, express or implied, as to the completeness, accuracy, or fitness for purpose of any content on this website. Nothing on this website constitutes professional advice and should not be relied upon as such.
            </p>

            <h3>2.4 Third-party links</h3>
            <p>
              This website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those websites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>

            <h2>3. Advisory services</h2>

            <h3>3.1 Engagement terms</h3>
            <p>
              The provision of advisory services by Playbook is governed by a separate engagement letter or services agreement entered into with each client. These terms and conditions apply to the use of this website and initial enquiries only. They do not constitute or form part of any contract for services unless expressly incorporated by reference in a signed engagement letter.
            </p>

            <h3>3.2 No advice through this website</h3>
            <p>
              Nothing on this website constitutes legal, financial, governance, or other professional advice. Any information provided is for general informational purposes only. You should not act on the basis of any information on this website without first taking appropriate professional advice tailored to your specific circumstances.
            </p>

            <h3>3.3 Confidentiality</h3>
            <p>
              Any information you submit through this website will be treated in accordance with our Privacy Policy. Information shared in the context of a formal advisory engagement will be subject to the confidentiality provisions of your engagement letter.
            </p>

            <h2>4. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Playbook Advisory Group Limited excludes all liability for any loss or damage — whether direct, indirect, consequential, or otherwise — arising from your use of this website or reliance on any information contained within it.
            </p>
            <p>
              Nothing in these terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable law.
            </p>
            <p>
              Where liability cannot be excluded, it is limited to the maximum extent permitted by applicable law.
            </p>

            <h2>5. Indemnity</h2>
            <p>
              You agree to indemnify and hold harmless Playbook Advisory Group Limited, its directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or in connection with your use of this website or breach of these terms.
            </p>

            <h2>6. Privacy</h2>
            <p>
              Your use of this website is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these terms by reference. By using this website, you consent to our use of your data as described in that policy.
            </p>

            <h2>7. Governing law and jurisdiction</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2>8. Changes to these terms</h2>
            <p>
              We reserve the right to amend these terms and conditions at any time. Changes will be posted on this page with an updated effective date. Your continued use of this website following any changes constitutes your acceptance of the revised terms.
            </p>

            <h2>9. Severability</h2>
            <p>
              If any provision of these terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.
            </p>

            <h2>10. Contact us</h2>
            <p>
              If you have any questions about these terms and conditions, please contact us:
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
