# Noitis Website

> **Intelligence, engineered.**

Official public-company website source for **Noitis™**, a technology brand being built in Greece with an international horizon.

## Current phase

**Phase 4 — Production domain and operations: repository foundation implemented on `phase-4`; external activation still required.**

The `phase-4` branch starts from the exact accepted Phase 3 milestone. The accepted accessibility, SEO, responsive, asset-performance, link, quality, and browser-smoke gates remain intact. Phase 4 adds production URL/domain validation, fail-closed Pages deployment configuration, scheduled live-site health checks, dependency maintenance, explicit content/operations ownership, and production rollback/emergency procedures.

The final production domain, GitHub Pages activation, DNS, domain verification, and HTTPS enforcement are account/DNS operations and are not marked complete until they are performed and verified.

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
- use of the lightweight SVG manifest mark rather than the obsolete PNG asset.

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

See [`.env.example`](./.env.example), [`docs/content/PRODUCT_CATALOG.md`](./docs/content/PRODUCT_CATALOG.md), and [`docs/operations/PRODUCTION.md`](./docs/operations/PRODUCTION.md).

## Public product content

The six product descriptions remain conservative and are not allowed to turn roadmap items into public capability claims. Material safety boundaries remain visible where relevant, including AutoPaylot real payment execution, FamilyOS real marketplace/provider operations, and LegacyCI production connectors.

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

Phase 4 intentionally does **not** add analytics because there is currently no defined business requirement/legal basis that justifies changing the accepted privacy position. Analytics can be reconsidered later only through an explicit privacy/legal review and documentation update.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` remains intentionally gated by:

```text
NOITIS_PAGES_ENABLED=true
```

Before enabling that variable, configure `NOITIS_SITE_URL`; for a custom domain also configure `NOITIS_CUSTOM_DOMAIN`. The workflow runs `npm run check:production` before building and deploying, so unsafe/missing production URL configuration fails closed.

With the custom GitHub Actions Pages workflow, the custom domain is configured through GitHub Pages settings and DNS rather than a committed `CNAME` file.

## Operations

Phase 4 adds:

- `.github/workflows/site-health.yml` — daily live publication health check when Pages is enabled;
- `.github/dependabot.yml` — weekly npm and GitHub Actions update review;
- `.github/CODEOWNERS` — explicit website/content/operations ownership;
- [`docs/operations/PRODUCTION.md`](./docs/operations/PRODUCTION.md) — Pages/DNS setup, validation, monitoring, rollback, emergency unpublish, and emergency legal/content procedures.

External domain/DNS/HTTPS operations must be completed and verified before Phase 4 is accepted as 100% complete.

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
│   └── operations/
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
- [`docs/operations/PRODUCTION.md`](./docs/operations/PRODUCTION.md) — Phase 4 production operations/runbook
- [`docs/content/PRODUCT_CATALOG.md`](./docs/content/PRODUCT_CATALOG.md) — product-claim and public-link authority
- [`docs/architecture/OVERVIEW.md`](./docs/architecture/OVERVIEW.md) — current website architecture
- [`docs/engineering/ENGINEERING_STANDARD.md`](./docs/engineering/ENGINEERING_STANDARD.md) — public-site engineering and quality rules
- [`docs/engineering/FRONTEND_ARCHITECTURE.md`](./docs/engineering/FRONTEND_ARCHITECTURE.md) — frontend ownership rules
- [`docs/decisions/0001-static-first-company-website.md`](./docs/decisions/0001-static-first-company-website.md) — static-first hosting decision
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — contribution and phase workflow

## Legal, licensing, and brand use

This repository is **proprietary Noitis software and content**. Public visibility does not make it open source or place its code, copy, design, documentation, or brand assets in the public domain.

- [`LICENSE`](./LICENSE)
- [`PRIVACY.md`](./PRIVACY.md)
- [`TERMS.md`](./TERMS.md)
- [`TRADEMARK.md`](./TRADEMARK.md)

**Noitis™** is used as a claimed trademark. `™` does not indicate registration; do not use `®` unless registration has actually been granted and its use is appropriate.

## Architecture principle

> **Public information and brand presentation in the browser; operational product authority stays in the product systems that own it.**
