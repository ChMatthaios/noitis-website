# Noitis Website

> **Intelligence, engineered.**

Official public-company website source for **Noitis™**, a technology brand being built in Greece with an international horizon.

## Current phase

**Phase 5 — Launch candidate: in progress on `phase-5`; external Phase-4 activation is still required before final acceptance.**

The `phase-5` branch starts from the exact accepted Phase-4 milestone. The accepted accessibility, SEO, responsive, asset-performance, link, quality, browser-smoke, production-configuration, deployment-gating, monitoring, and operations foundations remain intact.

Phase 5 re-audits and freezes the launch copy/product catalogue, strengthens the production-preview browser gate, runs the clean-checkout and pinned-browser acceptance checks, and records the final accessibility/SEO/hosting/legal and go/no-go requirements in [`docs/PHASE-5-LAUNCH-CANDIDATE.md`](./docs/PHASE-5-LAUNCH-CANDIDATE.md).

The final production domain, GitHub Pages activation, DNS, domain verification, HTTPS enforcement, and live-site health verification are account/DNS operations and remain blocking until they are performed and verified. Source control does not pretend those external facts are complete.

The site is intentionally **static-first**. It has no application backend, operational database, authentication service, data warehouse, contact-form processor, marketing analytics, or payment collection. Do not add database/API scaffolding merely for symmetry with Noitis product applications.

## Stack

- React + TypeScript
- Vite
- GitHub Actions
- GitHub Pages deployment workflow

## Requirements

- Node.js 22.13.0 or newer in the Node 22 line
- npm
- Git
- a modern browser
- Playwright only when running the optional cross-browser smoke command locally

## Local development

```bash
npm ci
npm run dev
```

`npm run dev` creates an ignored `.env.development.local` with the permanent Noitis local product URLs when no development env file already exists. Vite loads that file only in development mode, so local app links cannot silently become production configuration.

Website: `http://localhost:5173`

| Product | Local URL |
|---|---|
| AgentGate | `http://localhost:5174` |
| AutoPaylot | `http://localhost:5175` |
| Business Resource Scheduler | `http://localhost:5176` |
| EarnLogic | `http://localhost:5177` |
| FamilyOS | `http://localhost:5178` |
| LegacyCI | `http://localhost:5179` |

## Validation

Primary deterministic gate:

```bash
npm run check
```

`check` performs the production build and verifies:

- production-content safety and absence of leaked local destinations;
- page metadata, canonical URLs, indexability, Organization structured data, sitemap, and robots output;
- local links, in-page anchors, and built asset references;
- reviewed contrast pairs, focus/reduced-motion rules, local/system-font policy, image-loading strategy, and bundle budgets;
- use of the lightweight SVG manifest/favicon mark rather than obsolete/broken generated asset references.

Production publication configuration has a separate fail-closed gate:

```bash
$env:VITE_SITE_URL = "https://YOUR-FINAL-DOMAIN/"
$env:NOITIS_CUSTOM_DOMAIN = "YOUR-FINAL-DOMAIN"
npm run check:production
```

This rejects missing/non-HTTPS/local publication addresses and rejects a mismatch between the configured custom domain and canonical site URL.

After publication, run:

```bash
$env:SITE_URL = "https://YOUR-FINAL-DOMAIN/"
npm run check:live
```

The live check verifies HTTPS availability, the four public HTML pages, canonical URLs, `robots.txt`, `sitemap.xml`, and discovered same-origin links.

Cross-browser smoke coverage remains available separately because Playwright browsers are intentionally not permanent project dependencies:

```bash
npm install --no-save --package-lock=false playwright@1.62.1
npm run check
npm run check:browser
```

For a production preview:

```bash
npm run build
npm run preview
```

The Phase-5 browser gate verifies the accepted accessibility/responsive contract plus homepage navigation, product-card identity/order, intentional linked-vs-unconfigured product access states, HTTPS-only configured product/pricing destinations, legal pages, theme persistence, and mobile navigation behavior across Chromium, Firefox, and WebKit.

## Accessibility and responsive contract

The accepted Phase 3 release checks remain required:

- keyboard-first navigation and a visible skip link;
- semantic header/nav/main/footer landmarks and one primary heading per public page;
- focus-visible treatment;
- reduced-motion behavior;
- mobile, tablet, and desktop layouts;
- 44 CSS-pixel primary controls and adequately sized navigation targets;
- deterministic light/dark asset selection so duplicate hidden logos are not downloaded unnecessarily.

These checks supplement manual review; they do not claim universal assistive-technology certification.

## Publication URL and product links

The pre-custom-domain Pages fallback is:

```text
https://noitis-mc.github.io/noitis-website/
```

For production, the GitHub Actions repository variable `NOITIS_SITE_URL` is the publication URL authority and is passed to the build as `VITE_SITE_URL`. When a final custom domain is configured, `NOITIS_CUSTOM_DOMAIN` must contain the same hostname and `NOITIS_SITE_URL` must use HTTPS with a trailing slash.

Public product and pricing links are configuration, not marketing literals. The React catalogue reads optional `VITE_<PRODUCT>_PUBLIC_URL` and `VITE_<PRODUCT>_PRICING_URL` values. When no real public destination is configured, the production card remains visible as **In development** but does not emit a fake or local link.

For the current Phase-5 launch candidate, the safe default is to leave a product/pricing URL unset until a real HTTPS public deployment has been separately reviewed as intentional and publicly safe.

See [`.env.example`](./.env.example), [`docs/content/PRODUCT_CATALOG.md`](./docs/content/PRODUCT_CATALOG.md), [`docs/operations/PRODUCTION.md`](./docs/operations/PRODUCTION.md), and [`docs/PHASE-5-LAUNCH-CANDIDATE.md`](./docs/PHASE-5-LAUNCH-CANDIDATE.md).

## Public product content

The six product descriptions remain conservative and are not allowed to turn roadmap items into public capability claims. The catalogue was re-audited on 3 September 2026 against the accepted Phase-4 milestone of every product.

Material boundaries remain visible where relevant, including:

- AgentGate production integration/approval-delivery work;
- AutoPaylot real payment execution;
- Business Resource Scheduler external calendar/API/webhook synchronization;
- EarnLogic productized CRM/ERP/HRIS/payroll/API integrations;
- FamilyOS provider platform, authoritative availability, and real marketplace payments;
- LegacyCI semantic lineage/change-impact parsing beyond its certified read-only PostgreSQL metadata connector.

## Public pages

Vite builds four HTML entry points:

- `index.html` — Noitis company website
- `privacy.html` — website privacy notice
- `terms.html` — website terms of use
- `trademark.html` — Noitis trademark and brand-use policy

All four include publication metadata. The build generates `sitemap.xml` and `robots.txt` for the configured publication URL. The home page also carries Noitis Organization structured data.

## Legal and analytics status

The current public legal pages state the present facts:

- the website is operated under the **Noitis™** brand from Greece;
- the current pages do not represent that a separate registered Noitis legal entity has been formed;
- the site has no accounts, contact form, advertising trackers, marketing analytics, payment collection, or Noitis-operated backend database;
- the only Noitis browser storage used by this website is the `noitis-theme` preference.

Phase 4 intentionally did **not** add analytics because there is currently no defined business requirement/legal basis that justifies changing the accepted privacy position. The Phase-5 candidate preserves that decision. Analytics can be reconsidered later only through an explicit privacy/legal review and documentation update.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` remains intentionally gated by:

```text
NOITIS_PAGES_ENABLED=true
```

Before enabling that variable, configure `NOITIS_SITE_URL`; for a custom domain also configure `NOITIS_CUSTOM_DOMAIN`. The workflow runs `npm run check:production` before building and deploying, so unsafe/missing production URL configuration fails closed.

With the custom GitHub Actions Pages workflow, the custom domain is configured through GitHub Pages settings and DNS rather than a committed `CNAME` file.

## Operations

The accepted Phase-4 operations foundation includes:

- `.github/workflows/site-health.yml` — daily live publication health check when Pages is enabled;
- `.github/dependabot.yml` — weekly npm and GitHub Actions update review;
- `.github/CODEOWNERS` — explicit website/content/operations ownership;
- [`docs/operations/PRODUCTION.md`](./docs/operations/PRODUCTION.md) — Pages/DNS setup, validation, monitoring, rollback, emergency unpublish, and emergency legal/content procedures.

External domain/DNS/HTTPS operations must be completed and verified before Phase 4—and therefore the externally dependent parts of Phase 5—can be accepted as 100% complete.

## Repository structure

```text
noitis-website/
├── src/                         # React site and accepted public experience
├── media/                       # Noitis/product source artwork
├── public/                      # favicon/manifest/share image/public assets
├── scripts/                     # build, quality, production-config and live-health checks
├── docs/
│   ├── architecture/
│   ├── content/
│   ├── decisions/
│   ├── engineering/
│   ├── operations/
│   └── PHASE-5-LAUNCH-CANDIDATE.md
├── .github/
│   ├── workflows/               # CI, Pages deployment and site-health monitoring
│   ├── dependabot.yml
│   └── CODEOWNERS
├── index.html
├── privacy.html
├── terms.html
├── trademark.html
├── LICENSE
├── PRIVACY.md
├── TERMS.md
├── TRADEMARK.md
├── ROADMAP.md
├── package.json
└── vite.config.ts
```

## Engineering documentation

- [`ROADMAP.md`](./ROADMAP.md) — phase sequence and acceptance state
- [`docs/PHASE-5-LAUNCH-CANDIDATE.md`](./docs/PHASE-5-LAUNCH-CANDIDATE.md) — Phase-5 launch-candidate acceptance contract
- [`docs/operations/PRODUCTION.md`](./docs/operations/PRODUCTION.md) — production operations/runbook inherited from Phase 4
- [`docs/content/PRODUCT_CATALOG.md`](./docs/content/PRODUCT_CATALOG.md) — product-claim and public-link authority
- [`docs/architecture/OVERVIEW.md`](./docs/architecture/OVERVIEW.md) — current website architecture
- [`docs/engineering/ENGINEERING_STANDARD.md`](./docs/engineering/ENGINEERING_STANDARD.md) — public-site engineering and quality rules
- [`docs/engineering/FRONTEND_ARCHITECTURE.md`](./docs/engineering/FRONTEND_ARCHITECTURE.md) — frontend ownership rules
- [`docs/decisions/0001-static-first-company-website.md`](./docs/decisions/0001-static-first-company-website.md) — static-first hosting decision
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — contribution and phase workflow
