import WordmarkSvg from './WordmarkSvg'

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer__top">

          {/* Brand column */}
          <div className="footer__brand">
            <div>
              <WordmarkSvg className="footer__wordmark-svg" />
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
                <li><a href="/services/capital-investment-strategy" className="footer__nav-link">Capital investment strategy</a></li>
                <li><a href="/services/programme-governance" className="footer__nav-link">Programme governance</a></li>
                <li><a href="/services/sponsor-side-advisory" className="footer__nav-link">Sponsor-side advisory</a></li>
                <li><a href="/services/programme-health-diagnostics" className="footer__nav-link">Health diagnostics</a></li>
                <li><a href="/services/funding-and-business-case" className="footer__nav-link">Funding and business case</a></li>
              </ul>
            </div>
            <div>
              <h3 className="footer__nav-group-title">Company</h3>
              <ul className="footer__nav-links">
                <li><a href="/the-playbook-model" className="footer__nav-link">The Playbook model</a></li>
                <li><a href="/#sectors" className="footer__nav-link">Sectors</a></li>
                <li><a href="/insights" className="footer__nav-link">Insights</a></li>
                <li><a href="/#contact" className="footer__nav-link">Contact</a></li>
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
                <li><a href="#" className="footer__nav-link">LinkedIn</a></li>
                <li><a href="#" className="footer__nav-link">Spencer Yard, Leamington Spa</a></li>
                <li><a href="#" className="footer__nav-link">Jewellery Quarter, Birmingham</a></li>
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
            <li><a href="/legal-notices" className="footer__legal-link">Legal notices</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
