import { BrandMark } from './BrandMark'

export function TrademarkPage() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#trademark-main">Skip to main content</a>

      <header className="site-header">
        <a className="brand-link" href="./index.html" aria-label="Return to Noitis home">
          <BrandMark compact />
        </a>
        <nav className="privacy-nav" aria-label="Legal navigation">
          <a href="./index.html">Home</a>
          <a href="./privacy.html">Privacy</a>
          <a href="./terms.html">Terms</a>
        </nav>
      </header>

      <main className="privacy-page" id="trademark-main">
        <header className="privacy-hero">
          <p className="eyebrow">Noitis™ trademark policy</p>
          <h1>Our name and identity are part of what we build.</h1>
          <p className="privacy-hero__lead">
            This policy explains how the Noitis name, logos, slogan, product-family branding, and distinctive brand assets may be used.
          </p>
          <p className="privacy-meta"><strong>Effective date:</strong> 21 August 2026</p>
        </header>

        <section className="privacy-section">
          <h2>1. Noitis mark</h2>
          <p>
            <strong>Noitis™</strong> is used as a claimed trademark. The ™ symbol indicates a claim of trademark rights; it does not represent
            that the mark is registered. The ® symbol must not be used unless registration has actually been granted in the relevant jurisdiction and its use is appropriate.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Protected brand identifiers</h2>
          <p>Access to this website or repository does not grant permission to use, reproduce, adapt, publish, distribute, register, or commercialize:</p>
          <ul>
            <li>the Noitis™ name;</li>
            <li>Noitis logos, symbols, and marks;</li>
            <li>the “Intelligence, engineered.” slogan;</li>
            <li>Noitis product-family branding;</li>
            <li>Noitis visual identity, distinctive layouts, or brand assets; or</li>
            <li>confusingly similar names, marks, logos, domains, or branding intended to suggest affiliation with Noitis.</li>
          </ul>
          <p>
            Any permitted use must be expressly authorized by Noitis in writing unless applicable law independently permits the use.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. Product names</h2>
          <p>
            The website identifies AgentGate, AutoPaylot, Business Resource Scheduler, EarnLogic, FamilyOS, and LegacyCI as Noitis products.
            Their appearance here does not grant permission to use those names as brands, product identities, domains, or source identifiers.
          </p>
          <p>
            This policy does not represent that each product name is a registered trademark. Any separate registration or formal trademark claim
            for an individual product mark should be documented only after appropriate clearance and legal review.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Logos and visual assets</h2>
          <p>
            Noitis logos and other brand assets may appear in source control so the official website can render them. Their technical availability
            does not grant a license to extract, reuse, modify, distribute, sell, register, or present them as the branding of another product, business, service, or organization.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Referential use</h2>
          <p>
            Nothing in this policy is intended to prohibit truthful reference to Noitis where applicable law allows nominative, descriptive,
            journalistic, review, commentary, interoperability, or other lawful use. Such use must not falsely imply sponsorship, endorsement, certification, partnership, or affiliation.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. No implied endorsement</h2>
          <p>
            Access to, contribution to, evaluation of, linking to, or reference to this repository or website does not create a partnership,
            sponsorship, endorsement, certification, or other affiliation with Noitis. Technical compatibility with a Noitis product or public interface likewise does not imply Noitis endorsement.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Software and content rights are separate</h2>
          <p>
            Trademark rights and software/content copyright rights are distinct. The repository&apos;s code, documentation, design, and content are governed
            by the proprietary LICENSE file, while Noitis brand identifiers are governed by this trademark policy and applicable trademark law.
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. Questions and permissions</h2>
          <p>Requests concerning authorized brand use may be sent to:</p>
          <p><strong>chouliarasmatthaios@gmail.com</strong></p>
        </section>
      </main>

      <footer className="site-footer site-footer--privacy">
        <div className="site-footer__brand">
          <BrandMark />
          <p>Intelligence, engineered.</p>
        </div>
        <div className="site-footer__links">
          <a href="./index.html">Home</a>
          <a href="./privacy.html">Privacy</a>
          <a href="./terms.html">Terms</a>
          <a href="./trademark.html">Trademarks</a>
        </div>
        <p className="site-footer__legal">© {new Date().getFullYear()} Noitis™. All rights reserved.</p>
      </footer>
    </div>
  )
}
