# Noitis Website

> **Intelligence, engineered.**

Official company website for **Noitis**, a Greece-based technology company building intelligent systems people can trust.

## Status

This branch represents the completed **Phase 1 — Company website foundation** milestone.

The repository contains the static-first public website frontend, legal/public-information pages, Noitis and product presentation, GitHub Actions validation, and a GitHub Pages deployment workflow. The deployment workflow is configured to enable Pages through GitHub Actions when it runs from `main`.

The site intentionally does **not** contain a product backend, operational database, authentication service, CMS, analytics platform, or data warehouse. Those systems must not be added unless a real website capability requires them.

## Stack

- React
- TypeScript
- Vite
- GitHub Actions
- GitHub Pages deployment

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

Open the local URL printed by Vite.

## Validation

```bash
npm run check
```

`check` runs the TypeScript/Vite production build. A successful Phase 1 build confirms that the current static website compiles; browser, accessibility, SEO, responsive, and cross-browser release gates belong to later roadmap phases.

## Production preview

```bash
npm run build
npm run preview
```

Production files are generated in `dist/`.

## Public entry points

The Vite build has four HTML entry points:

- `index.html` — Noitis company website
- `privacy.html` — website privacy notice
- `terms.html` — website terms of use
- `trademark.html` — Noitis trademark and brand-use policy

The legal pages describe the current public website and its present technical behavior. They must be reviewed whenever the website, Noitis legal/operator identity, hosting model, data practices, or commercial operations materially change.

## Continuous integration

`.github/workflows/ci.yml` validates pushes and pull requests with:

```text
checkout
  ↓
Node 22.13.0
  ↓
npm ci
  ↓
npm run check
```

The committed `package-lock.json` is the dependency authority for CI and deployment.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` deploys only from `main` and can also be invoked manually through GitHub Actions.

The workflow:

1. checks out the exact commit;
2. installs dependencies with `npm ci`;
3. validates/builds the site;
4. configures GitHub Pages with Actions-based enablement;
5. uploads the generated `dist/` artifact;
6. deploys that artifact through GitHub Pages.

Phase branches do not deploy automatically. After a phase is reviewed and merged, the `main` deployment run is the external verification that Pages is enabled and serving the approved artifact.

## Custom Noitis domain

A final production domain is intentionally **not** a Phase 1 requirement. The repository does not commit a speculative `CNAME` or hard-code an unowned future domain.

When a final domain is registered and its DNS is under Noitis control, the production-domain roadmap phase will configure the Pages custom-domain settings, DNS, HTTPS, canonical URLs, redirects, sitemap/robots behavior, and social-preview metadata for that final address.

The Vite configuration uses relative asset paths so the same build can work on a GitHub Pages project URL and later on a custom Noitis domain without rewriting application components.

## Accessibility direction

The Phase 1 implementation already provides foundations such as semantic navigation, keyboard-operable controls, visible focus styling, appropriately sized targets, reduced-motion handling, responsive navigation, and light/dark themes.

Accessibility remains a release requirement and is not considered fully validated until the dedicated accessibility/SEO/quality phase completes browser and assistive-technology checks.

## Brand palette

| Name | Hex | Role |
|---|---|---|
| Midnight Navy | `#0B1020` | Trust, security, infrastructure |
| Trust Blue | `#3B82F6` | Confidence and primary actions |
| Electric Cyan | `#22D3EE` | Active systems and innovation |
| Future Violet | `#8B5CF6` | Frontier technology |
| Ice White | `#EAF2FF` | Clarity and clean surfaces |

## Repository structure

```text
noitis-website/
├── src/                       # React source, legal pages, and stylesheet entry point
├── media/                     # Noitis/product source artwork
├── public/                    # files copied directly into the build
├── docs/
│   ├── architecture/
│   ├── decisions/
│   └── engineering/
├── .github/workflows/
│   ├── ci.yml
│   └── deploy-pages.yml
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

There is no `database/` directory because this repository has no operational database. The Noitis database-layout standard applies only to repositories that actually own database objects or configuration data.

## Phase branch model

Each `phase-N` branch is a milestone, not a permanently synchronized development branch.

```text
phase-1 = accepted Phase 1 state only
phase-2 = Phase 1 + accepted Phase 2
phase-3 = Phases 1-3
...
main    = latest accepted phase
```

Once an earlier phase is accepted, its branch is not moved forward with later implementation.

## Engineering documentation

- [`docs/architecture/OVERVIEW.md`](./docs/architecture/OVERVIEW.md) — current website architecture and boundaries
- [`docs/engineering/ENGINEERING_STANDARD.md`](./docs/engineering/ENGINEERING_STANDARD.md) — public-site engineering rules
- [`docs/engineering/FRONTEND_ARCHITECTURE.md`](./docs/engineering/FRONTEND_ARCHITECTURE.md) — frontend ownership and growth rules
- [`docs/decisions/0001-static-first-company-website.md`](./docs/decisions/0001-static-first-company-website.md) — static-first/GitHub Pages architecture decision
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — contribution, phase, and validation expectations

## Legal, licensing, and brand use

This repository is **proprietary Noitis software and content**. Public visibility does not make the repository open source and does not place its code, website copy, visual design, product descriptions, documentation, or brand assets in the public domain.

- [`LICENSE`](./LICENSE) — proprietary repository/software/content terms
- [`PRIVACY.md`](./PRIVACY.md) — current website privacy notice
- [`TERMS.md`](./TERMS.md) — public website terms of use
- [`TRADEMARK.md`](./TRADEMARK.md) — Noitis trademark and brand-use policy

The public website exposes corresponding Privacy, Terms, and Trademarks pages in its footer.

## Trademark status

**Noitis™** is currently used as a claimed trademark. The `™` symbol does not indicate registration. Do not use the registered `®` symbol unless registration has actually been granted in the relevant territory and its use is appropriate.

The Noitis name, logos, slogan, product-family branding, and distinctive brand assets remain subject to the trademark policy even when the website repository is publicly viewable.

## Architecture principle

The website should stay as simple as its job allows:

> **Public information and brand presentation in the browser; operational product authority stays in the product systems that own it.**
