import CookiePreferencesButton from './consent/CookiePreferencesButton'

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer__top">

          {/* Brand column */}
          <div className="footer__brand">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand-assets/wordmark/playbook-wordmark-white-registered.svg"
                alt="Playbook"
                className="footer__wordmark-svg"
              />
              <p className="footer__tagline">
                Clarity, Control, Confidence.<br />
                Senior-led, sponsor-side advisory for capital programmes.
              </p>
            </div>
          </div>

          {/* Navigation columns */}
          <nav className="footer__nav" aria-label="Footer navigation">
            <div>
              <h3 className="footer__nav-group-title">Advisory</h3>
              <ul className="footer__nav-links">
                <li><span className="footer__nav-link">Capital investment strategy</span></li>
                <li><span className="footer__nav-link">Programme governance</span></li>
                <li><span className="footer__nav-link">Sponsor-side advisory</span></li>
                <li><span className="footer__nav-link">Health diagnostics</span></li>
                <li><span className="footer__nav-link">Funding and business case</span></li>
              </ul>
            </div>
            <div>
              <h3 className="footer__nav-group-title">Company</h3>
              <ul className="footer__nav-links">
                <li><a href="/#sectors" className="footer__nav-link">Sectors</a></li>
                <li><a href="/insights" className="footer__nav-link">Insights</a></li>
                <li><a href="/contact" className="footer__nav-link">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="footer__nav-group-title">Connect</h3>
              <ul className="footer__nav-links">
                <li>
                  <a href="mailto:hello@playbook-group.co.uk" className="footer__nav-link">
                    hello@playbook-group.co.uk
                  </a>
                </li>
                <li><a href="https://www.linkedin.com/company/playbookadvisory" className="footer__nav-link" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><span className="footer__nav-link">Playbook HQ, Spencer Yard, Leamington Spa</span></li>
              </ul>
            </div>
          </nav>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__legal">
            &copy; 2026 Playbook Advisory Group Limited. Registered in England and Wales.
          </p>
          <ul className="footer__legal-links">
            <li><a href="/privacy-policy" className="footer__legal-link">Privacy policy</a></li>
            <li><a href="/terms-and-conditions" className="footer__legal-link">Terms and conditions</a></li>
            <li><CookiePreferencesButton className="footer__legal-link footer__legal-link--button" /></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
