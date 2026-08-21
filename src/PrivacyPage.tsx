import { BrandMark } from './BrandMark'

export function PrivacyPage() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#privacy-main">Skip to main content</a>

      <header className="site-header">
        <a className="brand-link" href="./index.html" aria-label="Return to Noitis home">
          <BrandMark compact />
        </a>
        <nav className="privacy-nav" aria-label="Legal navigation">
          <a href="./index.html">Home</a>
          <a href="./terms.html">Terms</a>
          <a href="./trademark.html">Trademarks</a>
        </nav>
      </header>

      <main className="privacy-page" id="privacy-main">
        <header className="privacy-hero">
          <p className="eyebrow">Noitis™ privacy notice</p>
          <h1>Privacy should be understandable.</h1>
          <p className="privacy-hero__lead">
            This notice describes the current privacy behavior of the public Noitis company website.
            Individual Noitis products may use separate privacy notices when their own services process personal data.
          </p>
          <p className="privacy-meta"><strong>Effective date:</strong> 21 August 2026</p>
        </header>

        <section className="privacy-section">
          <h2>1. Who operates this website?</h2>
          <p>
            This website is operated under the <strong>Noitis™</strong> brand from Greece.
          </p>
          <dl className="privacy-details">
            <div><dt>Privacy contact</dt><dd>chouliarasmatthaios@gmail.com</dd></div>
          </dl>
          <p>
            If the legal identity responsible for Noitis changes, or a registered entity becomes the controller for this website,
            this notice will be updated accordingly.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. What the current website collects</h2>
          <p>
            The current Noitis website is static-first. Its frontend does not intentionally include account creation,
            contact forms, advertising trackers, marketing analytics, payment collection, or a Noitis-operated backend database.
          </p>
          <p>The website currently stores one browser preference locally:</p>
          <ul>
            <li><code>noitis-theme</code> — remembers whether the visitor selected the light or dark theme.</li>
          </ul>
          <p>
            This value is stored in the visitor&apos;s own browser through local storage. It is not intended to identify a visitor
            and is not transmitted to a Noitis application server by the current website code.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. Hosting and technical connection data</h2>
          <p>
            The website is designed to be hosted through GitHub Pages. Like other internet hosting providers, GitHub may process
            technical connection information needed to deliver and secure the site, such as IP addresses, request information,
            device/browser information, and security logs, under GitHub&apos;s own applicable privacy and service terms.
          </p>
          <p>
            The current Noitis frontend does not intentionally copy that hosting data into a separate Noitis analytics or customer database.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Why information may be processed</h2>
          <ul>
            <li>To deliver the website and its static assets.</li>
            <li>To remember the visitor&apos;s selected theme locally in the browser.</li>
            <li>To maintain security, reliability, and availability through the hosting platform.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
          <p>
            If Noitis later adds forms, accounts, analytics, newsletters, support tools, cookies, or other data-processing features,
            this notice must be updated before or when those features are introduced, as required by applicable law.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Cookies and local storage</h2>
          <p>The current website does not intentionally set advertising or analytics cookies.</p>
          <p>
            It uses browser local storage for the <code>noitis-theme</code> preference described above. Visitors can remove that value
            by clearing site data in their browser. Removing it only resets the saved theme choice.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Links to Noitis products and third-party services</h2>
          <p>
            The website may link to Noitis products or external websites. A linked destination may have its own privacy practices,
            terms, authentication, infrastructure, and data flows. This website privacy notice does not automatically govern those separate services.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Retention</h2>
          <p>
            The <code>noitis-theme</code> preference remains in the visitor&apos;s browser until the visitor clears it or browser/site storage
            is otherwise removed.
          </p>
          <p>
            Any technical information processed by the hosting provider is retained according to the provider&apos;s applicable policies
            and legitimate operational requirements. Noitis does not currently define a separate retention period for hosting logs it does not independently receive or store.
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. International processing</h2>
          <p>
            Internet infrastructure and hosting providers may process information in more than one country. Where applicable data-protection
            law requires safeguards for international transfers, the relevant service provider and controller are responsible for using appropriate legal mechanisms.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Your rights</h2>
          <p>
            Depending on applicable law and the circumstances, individuals may have rights concerning personal data, including access,
            correction, deletion, restriction, portability, objection, and withdrawal of consent where consent is the applicable legal basis.
          </p>
          <p>
            Because the current website does not provide user accounts or a Noitis-operated personal-data database, Noitis may have little
            or no website-specific personal data with which to identify a visitor. Privacy questions or rights requests may nevertheless be sent to the contact address above.
          </p>
          <p>
            Individuals may also have the right to lodge a complaint with a competent supervisory authority. In Greece, this may include the Hellenic Data Protection Authority.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Children</h2>
          <p>
            The public company website is not designed to collect personal information from children. The current website does not intentionally
            provide forms or account registration through which a child could submit personal data to Noitis.
          </p>
        </section>

        <section className="privacy-section">
          <h2>11. Security</h2>
          <p>
            Noitis aims to keep the public website limited in scope and to avoid collecting personal data that the website does not need.
            No internet service can guarantee absolute security, and hosting/provider security remains subject to the relevant platform&apos;s controls and terms.
          </p>
        </section>

        <section className="privacy-section">
          <h2>12. Changes to this notice</h2>
          <p>
            This notice may change when the website, Noitis organization, hosting model, legal requirements, or actual data practices change.
            The effective date will be updated when a material revision is published.
          </p>
        </section>
      </main>

      <footer className="site-footer site-footer--privacy">
        <div className="site-footer__brand">
          <BrandMark />
          <p>Privacy should be understandable.</p>
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
