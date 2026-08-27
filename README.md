# Noitis Website

> **Intelligence, engineered.**

Official public-company website source for **Noitis™**, a technology brand being built in Greece with an international horizon.

## Current phase

**Phase 3 — Accessibility, SEO, and quality: Complete on `phase-3`.**

The `phase-3` branch was rebuilt from the exact accepted `phase-2` milestone on 27 August 2026. Phase 2 therefore remains the inherited content/product baseline, while Phase 3 adds the accessibility, SEO, responsive, asset-performance, link, quality, and browser-smoke release gates described below. `main` is not advanced by this branch until a later explicit merge decision.

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

## Phase 3 validation

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

Cross-browser smoke coverage is available separately because Playwright browsers are intentionally not permanent project dependencies:

```bash
npm install --no-save --package-lock=false playwright@1.62.1
npm run check
npm run check:browser
```

The browser smoke exercises Chromium, Firefox, and WebKit at mobile, tablet, and desktop breakpoints. It checks semantic landmarks, horizontal overflow, keyboard skip navigation, mobile-menu open/Escape-close behavior, accessible control labels, target sizes, reduced motion, and theme persistence.

For a production preview:

```bash
npm run build
npm run preview
```

## Accessibility and responsive contract

Phase 3 preserves the Phase 2 public experience while adding explicit release checks for:

- keyboard-first navigation and a visible skip link;
- semantic header/nav/main/footer landmarks and one primary heading per public page;
- focus-visible treatment;
- reduced-motion behavior;
- mobile, tablet, and desktop layouts;
- 44 CSS-pixel primary controls and adequately sized navigation targets;
- deterministic light/dark asset selection so duplicate hidden logos are not downloaded unnecessarily.

These checks supplement manual review; they do not claim universal assistive-technology certification.

## Publication URL and product links

The current publication fallback is:

```text
https://noitis-mc.github.io/noitis-website/
```

A future custom domain is a Phase 4 deployment decision. Set `VITE_SITE_URL` to the active public base address when building for another domain.

Public product and pricing links are configuration, not marketing literals. The React catalogue reads optional `VITE_<PRODUCT>_PUBLIC_URL` and `VITE_<PRODUCT>_PRICING_URL` values. When no real public destination is configured, the production card remains visible as **In development** but does not emit a fake or local link.

See [`.env.example`](./.env.example) and [`docs/content/PRODUCT_CATALOG.md`](./docs/content/PRODUCT_CATALOG.md).

## Public product content

The six product descriptions remain conservative and are not allowed to turn roadmap items into public capability claims. All six products currently display **In development**. Material safety boundaries remain visible where relevant, including AutoPaylot real payment execution, FamilyOS real marketplace/provider operations, and LegacyCI production connectors.

## Public pages

Vite builds four HTML entry points:

- `index.html` — Noitis company website
- `privacy.html` — website privacy notice
- `terms.html` — website terms of use
- `trademark.html` — Noitis trademark and brand-use policy

All four include publication metadata. The build generates `sitemap.xml` and `robots.txt` for the configured publication URL. The home page also carries Noitis Organization structured data.

## Legal and operator status

The current public legal pages state the present facts:

- the website is operated under the **Noitis™** brand from Greece;
- the current pages do not represent that a separate registered Noitis legal entity has been formed;
- the site has no accounts, contact form, advertising trackers, marketing analytics, payment collection, or Noitis-operated backend database;
- the only Noitis browser storage used by this website is the `noitis-theme` preference;
- hosting configuration may evolve as Phase 4 establishes the final production domain/hosting state.

Legal text must be reviewed again if those facts change. Phase 3 does not change those legal facts.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` remains intentionally gated by the repository variable:

```text
NOITIS_PAGES_ENABLED=true
```

Actual Pages enablement, custom-domain DNS, HTTPS/domain ownership, and final production publication remain Phase 4 operations.

## Repository structure

```text
noitis-website/
├── src/                         # React site, catalogue, Phase 3 accessibility/quality styles
├── media/                       # Noitis/product source artwork
├── public/                      # favicon/manifest/share image/public assets
├── scripts/                     # publication, content, link, quality, browser-smoke verification
├── docs/
│   ├── architecture/
│   ├── content/
│   ├── decisions/
│   └── engineering/
├── .github/workflows/           # CI and gated Pages deployment
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
