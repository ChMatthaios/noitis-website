import { BrandMark } from './BrandMark'

export function TermsPage() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#terms-main">Skip to main content</a>

      <header className="site-header">
        <a className="brand-link" href="./index.html" aria-label="Return to Noitis home">
          <BrandMark compact />
        </a>
        <nav className="privacy-nav" aria-label="Legal navigation">
          <a href="./index.html">Home</a>
          <a href="./privacy.html">Privacy</a>
          <a href="./trademark.html">Trademarks</a>
        </nav>
      </header>

      <main className="privacy-page" id="terms-main">
        <header className="privacy-hero">
          <p className="eyebrow">Noitis™ terms of use</p>
          <h1>Clear terms for a public website.</h1>
          <p className="privacy-hero__lead">
            These terms govern use of the public Noitis company website and explain the boundaries around its content,
            product information, intellectual property, and permitted use.
          </p>
          <p className="privacy-meta"><strong>Effective date:</strong> 21 August 2026</p>
        </header>

        <section className="privacy-section">
          <h2>1. About the website</h2>
          <p>
            The Noitis website presents information about Noitis, its direction, and products under development. It is primarily
            an informational company website and is not itself a production product service, customer account system, payment service, or contractual offer.
          </p>
          <p>
            Product names, descriptions, status labels, roadmaps, availability statements, pricing references, technical descriptions,
            and future plans may change without notice.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Intellectual property</h2>
          <p>
            Except for third-party materials governed by their own licenses or terms, the website&apos;s source code, text, visual design,
            logos, graphics, product descriptions, documentation, layouts, and other materials are owned by Noitis or its applicable rights holders.
          </p>
          <p>
            Public access to the website or its GitHub repository does not place those materials in the public domain and does not grant
            an open-source or commercial-use license. Repository source and content are governed by the proprietary LICENSE file, while Noitis brand identifiers are governed by the Trademark Policy.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. Permitted use</h2>
          <p>
            You may browse and use the website for its intended informational purpose and may make lawful references to Noitis and its products.
            Any additional use of source code, brand assets, website content, or protected materials requires permission where the repository license,
            GitHub&apos;s applicable terms, or the law does not already grant that use.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Prohibited use</h2>
          <ul>
            <li>Impersonating Noitis or falsely suggesting affiliation, sponsorship, endorsement, or certification.</li>
            <li>Misusing Noitis names, logos, marks, visual identity, or product identities.</li>
            <li>Unlawfully copying, redistributing, mirroring, rebranding, selling, sublicensing, or commercially exploiting protected website materials.</li>
            <li>Interfering with, disrupting, probing, attacking, or attempting unauthorized access to website infrastructure or linked Noitis systems.</li>
            <li>Introducing malicious code or using the website in connection with unlawful, deceptive, abusive, or infringing activity.</li>
            <li>Removing or altering legal, ownership, copyright, or trademark notices.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>5. Product information and no commitment</h2>
          <p>
            Descriptions of Noitis products may refer to prototypes, planned capabilities, local development environments, future integrations,
            pricing concepts, roadmaps, or other work in progress.
          </p>
          <p>
            Unless Noitis expressly agrees otherwise in a signed written agreement, website content does not create a warranty, service-level commitment,
            purchase obligation, investment representation, employment offer, partnership, or promise that a particular feature, product, release, price, or date will become available.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. External and product links</h2>
          <p>
            The website may link to Noitis product environments, GitHub, or other third-party destinations. Those destinations may have separate terms,
            privacy notices, security controls, and availability. Noitis is not responsible for third-party content or practices merely because the website links to them.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Privacy</h2>
          <p>
            The current website privacy practices are described on the <a href="./privacy.html">Privacy</a> page.
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. No warranty</h2>
          <p>
            To the maximum extent permitted by applicable law, the website and its content are provided &quot;as is&quot; and &quot;as available&quot;
            without warranties of any kind, express or implied, including warranties of accuracy, availability, merchantability, fitness for a particular purpose,
            title, non-infringement, or security. Nothing in these terms excludes rights or warranties that cannot lawfully be excluded.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Noitis and its applicable owners, contributors, affiliates, or authorized representatives
            shall not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, profits, revenue,
            business, goodwill, or use, arising from or relating to the website or its content. Nothing in these terms limits liability where applicable law does not permit that limitation.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Changes</h2>
          <p>
            Noitis may update the website and these terms as the company, products, infrastructure, or legal requirements evolve.
            Material revisions will be reflected by an updated effective date.
          </p>
        </section>

        <section className="privacy-section">
          <h2>11. Applicable law</h2>
          <p>
            These terms are intended to operate subject to applicable law. Where a choice of law is legally permitted and no different written agreement applies,
            they are governed by the laws of Greece, without limiting mandatory rights that may apply under another applicable legal regime.
          </p>
        </section>

        <section className="privacy-section">
          <h2>12. Contact</h2>
          <p>Questions about these terms or requests for permission concerning website materials may be sent to:</p>
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
