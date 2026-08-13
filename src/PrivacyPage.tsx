import { BrandMark } from './BrandMark'

export function PrivacyPage() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#privacy-main">Skip to main content</a>

      <header className="site-header">
        <a className="brand-link" href="./index.html" aria-label="Return to Noetis home">
          <BrandMark compact />
        </a>
        <nav className="privacy-nav" aria-label="Privacy navigation">
          <a href="./index.html">Home</a>
        </nav>
      </header>

      <main className="privacy-page" id="privacy-main">
        <header className="privacy-hero">
          <p className="eyebrow">Noetis privacy notice</p>
          <h1>Privacy should be understandable.</h1>
          <p className="privacy-hero__lead">
            This page explains the structure Noetis intends to use for privacy across its products.
            It is currently a pre-production notice and must be completed with verified legal and operational details before launch.
          </p>
          <p className="privacy-meta"><strong>Draft effective date:</strong> 13 August 2026</p>
        </header>

        <aside className="privacy-alert" role="note" aria-label="Important draft status">
          <strong>Pre-production notice</strong>
          <p>
            Before public production use, Noetis must add the registered legal entity, postal address, privacy contact,
            real data flows, processors, retention periods, international-transfer safeguards, and product-specific lawful bases.
          </p>
        </aside>

        <section className="privacy-section">
          <h2>1. Who is responsible for your data?</h2>
          <p><strong>Noetis</strong> is the parent brand for its products.</p>
          <dl className="privacy-details">
            <div><dt>Data controller</dt><dd>[TO COMPLETE: registered legal entity]</dd></div>
            <div><dt>Registered address</dt><dd>[TO COMPLETE: full postal address, Greece]</dd></div>
            <div><dt>Privacy contact</dt><dd>[TO COMPLETE: privacy@your-domain]</dd></div>
            <div><dt>Data Protection Officer</dt><dd>[TO COMPLETE if appointed or legally required]</dd></div>
          </dl>
        </section>

        <section className="privacy-section">
          <h2>2. What information may we process?</h2>
          <p>
            The exact information depends on the Noetis product and the features a customer chooses to use.
            Noetis intends to follow a data-minimisation approach: collect what a feature needs, not everything that could be collected.
          </p>
          <ul>
            <li>Account, organization, role, and contact information.</li>
            <li>Product configuration, settings, permissions, and operational records.</li>
            <li>Activity, approval, audit, and security events where required by a product.</li>
            <li>Information customers intentionally provide through integrations, documents, or workflows.</li>
            <li>Support and diagnostic information needed to operate and secure the service.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. Why may we process personal data?</h2>
          <ul>
            <li>To provide and operate a requested Noetis product.</li>
            <li>To authenticate users and protect accounts and systems.</li>
            <li>To perform requested workflows and maintain understandable activity history.</li>
            <li>To provide support and respond to requests.</li>
            <li>To maintain reliability, prevent abuse, and investigate security incidents.</li>
            <li>To comply with applicable legal and regulatory obligations.</li>
          </ul>
          <p>
            The final production notice must map each purpose to the lawful basis that actually applies to the product and situation.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. AI and automated processing</h2>
          <p>
            Noetis builds products around understandable control. If a production product uses automated processing that materially
            affects individuals, the final notice will describe what it does, why it is used, and the safeguards that apply.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Service providers and transfers</h2>
          <p>
            Noetis may rely on selected providers for services such as hosting, authentication, communications, monitoring,
            customer support, or regulated connectivity. Before production, the actual providers, processing locations,
            and relevant international-transfer safeguards must be verified and disclosed where required.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Retention</h2>
          <p>
            Noetis intends to keep personal data only for as long as necessary for the purpose for which it was collected,
            including legitimate security, contractual, audit, and legal requirements. Final retention periods or criteria
            will be published before production use.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Your rights</h2>
          <p>Subject to applicable law, individuals may have rights to:</p>
          <ul>
            <li>access personal data;</li>
            <li>correct inaccurate or incomplete data;</li>
            <li>request deletion;</li>
            <li>restrict certain processing;</li>
            <li>receive or transfer eligible data;</li>
            <li>object to certain processing;</li>
            <li>withdraw consent where processing relies on consent; and</li>
            <li>seek safeguards relating to qualifying automated decisions.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>8. Complaints</h2>
          <p>
            Individuals may have the right to lodge a complaint with a competent data-protection supervisory authority.
            For a controller established in Greece, this may include the Hellenic Data Protection Authority.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Cookies and analytics</h2>
          <p>
            Noetis will describe any cookies, local storage, analytics, or similar technologies actually used by its production website
            and products. Non-essential tracking should not be introduced silently.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Changes to this notice</h2>
          <p>
            This notice may change as Noetis products, legal requirements, and verified data practices evolve.
            The current effective date will be shown whenever a production notice is updated.
          </p>
        </section>
      </main>

      <footer className="site-footer site-footer--privacy">
        <div className="site-footer__brand">
          <BrandMark />
          <p>Privacy should be understandable.</p>
        </div>
        <a href="./index.html">Back to Noetis</a>
      </footer>
    </div>
  )
}
