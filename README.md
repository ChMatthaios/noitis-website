# Noitis Website

> **Intelligence, engineered.**

Official public-company website source for **Noitis™**, a technology brand being built in Greece with an international horizon.

## Current phase

**Phase 2 — Content and product readiness: implementation complete, awaiting acceptance.**

`main` remains the accepted Phase 1 milestone until Phase 2 is tested and approved. `phase-2` contains Phase 1 plus the complete Phase 2 implementation.

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

## Local development

```bash
npm ci
npm run dev
```

`npm run dev` creates an ignored `.env.local` with the permanent Noitis local product URLs when neither `.env.local` nor `.env` already exists. This preserves the multi-app local experience without committing development URLs into production configuration.

Website: `http://localhost:5173`

Local product ports:

| Product | Local URL |
|---|---|
| AgentGate | `http://localhost:5174` |
| AutoPaylot | `http://localhost:5175` |
| Business Resource Scheduler | `http://localhost:5176` |
| EarnLogic | `http://localhost:5177` |
| FamilyOS | `http://localhost:5178` |
| LegacyCI | `http://localhost:5179` |

## Validation

```bash
npm run check
```

`check` now runs the production build and then verifies that production output:

- contains canonical/social metadata;
- contains `robots.txt` and a four-page sitemap;
- does not contain `localhost:` or `127.0.0.1` development destinations.

For a production preview:

```bash
npm run build
npm run preview
```

## Publication URL and product links

The current publication fallback is:

```text
https://noitis-mc.github.io/noitis-website/
```

A future custom domain is a Phase 4 deployment decision. Set `VITE_SITE_URL` to the active public base address when building for another domain.

Public product and pricing links are configuration, not marketing literals. The React catalogue reads optional `VITE_<PRODUCT>_PUBLIC_URL` and `VITE_<PRODUCT>_PRICING_URL` values. When no real public destination is configured, the production card remains visible as **In development** but does not emit a fake or local link.

See [`.env.example`](./.env.example) and [`docs/content/PRODUCT_CATALOG.md`](./docs/content/PRODUCT_CATALOG.md).

## Public product content

The six product descriptions were audited against the current Noitis product repositories on 25 August 2026. The company site intentionally uses conservative descriptions and does not turn roadmap items into capability claims.

All six products currently display **In development**. Product-specific safety boundaries—such as AutoPaylot real payment execution, FamilyOS real marketplace/provider operations, and LegacyCI production connectors—remain visible in the catalogue copy where materially relevant.

## Public pages

Vite builds four HTML entry points:

- `index.html` — Noitis company website
- `privacy.html` — website privacy notice
- `terms.html` — website terms of use
- `trademark.html` — Noitis trademark and brand-use policy

All four entry points include canonical and social-preview metadata. The build generates `sitemap.xml` and `robots.txt` for the configured publication URL.

## Legal and operator status

The current public legal pages state the present facts:

- the website is operated under the **Noitis™** brand from Greece;
- the current pages do not represent that a separate registered Noitis legal entity has been formed;
- the site has no accounts, contact form, advertising trackers, marketing analytics, payment collection, or Noitis-operated backend database;
- the only Noitis browser storage used by this website is the `noitis-theme` preference;
- hosting configuration may evolve as Phase 4 establishes the final production domain/hosting state.

Legal text must be reviewed again if those facts change.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` is intentionally gated by the repository variable:

```text
NOITIS_PAGES_ENABLED=true
```

The current GitHub integration can build the Pages artifact but cannot create/enable the Pages site itself; GitHub returns `Resource not accessible by integration` for that administrative action. Enabling Pages, selecting GitHub Actions as its source, and setting `NOITIS_PAGES_ENABLED=true` are therefore Phase 4 repository/hosting operations.

This gate prevents normal `main` pushes from producing a misleading failed deployment while Pages is intentionally not enabled yet.

## Repository structure

```text
noitis-website/
├── src/                         # React pages, product catalogue, styles
├── media/                       # Noitis/product source artwork
├── public/                      # favicon/manifest/share image/sitemap/robots
├── scripts/                     # local-env, publication generation, content verification
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
├── package-lock.json
└── vite.config.ts
```

## Engineering documentation

- [`ROADMAP.md`](./ROADMAP.md) — phase sequence and acceptance state
- [`docs/content/PRODUCT_CATALOG.md`](./docs/content/PRODUCT_CATALOG.md) — product-claim and public-link authority
- [`docs/architecture/OVERVIEW.md`](./docs/architecture/OVERVIEW.md) — current website architecture
- [`docs/engineering/ENGINEERING_STANDARD.md`](./docs/engineering/ENGINEERING_STANDARD.md) — public-site engineering rules
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
