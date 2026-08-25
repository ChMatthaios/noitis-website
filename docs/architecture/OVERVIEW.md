# Noitis Website Architecture

## Purpose

This repository contains the public Noitis company website. It is a marketing, product-discovery, brand, legal, and public-information surface—not an operational Noitis application backend.

The Phase 1 implementation uses React, TypeScript, Vite, static assets, GitHub Actions, and a GitHub Pages deployment workflow.

## Current architecture

```text
Browser
  ↓
Static HTML / React / CSS / media
  ↓
Vite production build
  ↓
GitHub Pages artifact
  ↓
GitHub Pages
```

GitHub Pages is configured by the deployment workflow when the approved code runs from `main`. Phase branches do not deploy automatically.

## Public entry points

The site has four HTML entry points:

- `index.html` — company website;
- `privacy.html` — privacy notice;
- `terms.html` — terms of use;
- `trademark.html` — trademark and brand-use policy.

They are built by Vite and share the same React/CSS asset pipeline.

## Repository boundaries

```text
noitis-website/
├── src/                     # React page source and CSS entry point
├── media/                   # source brand/product artwork
├── public/                  # files copied directly into the build
├── docs/                    # architecture, decisions, engineering rules
├── .github/workflows/       # CI and GitHub Pages deployment
├── index.html
├── privacy.html
├── terms.html
├── trademark.html
├── package.json
├── package-lock.json
└── vite.config.ts
```

The website intentionally does **not** include application API, operational database, data warehouse, CMS, authentication, or service scaffolding. Those belong in product repositories or future dedicated services when an actual public-site requirement exists.

Because the website owns no operational database, it has no `database/` directory. The Noitis `database/db_objects` and `database/conf_data` layout applies only to repositories that actually own database objects/configuration data.

## Public-site authority boundary

The browser may render public copy, product descriptions, navigation, theme state, legal pages, and static assets. It must not become the authority for protected product actions, account data, billing, credentials, private telemetry, or internal operational state.

If the site later gains forms, newsletters, analytics, authentication, or public APIs, those integrations must be introduced explicitly with their own security, privacy, consent, failure, and data-retention design.

## Deployment flow

```text
Commit / pull request
        ↓
GitHub Actions CI
        ↓
npm ci
        ↓
TypeScript + Vite production build

main branch
        ↓
GitHub Pages workflow
        ↓
npm ci + production build
        ↓
actions/configure-pages (enablement allowed)
        ↓
Pages artifact
        ↓
GitHub Pages deployment
```

CI validates code independently from deployment. Deployment is limited to `main`, uses the committed lockfile, and is the external verification step after a phase is approved.

## Domain model

The site uses relative Vite asset paths so the same build can work on a GitHub Pages project URL and later behind a custom Noitis domain. Domain ownership, DNS, HTTPS, canonical URL metadata, and redirects are deployment/configuration concerns rather than reasons to hard-code environment-specific paths throughout React components.

A final production domain is not assumed in Phase 1.

## Phase milestone rule

`phase-N` branches are historical milestones. A completed earlier phase branch is not advanced with later implementation. `main` represents the latest accepted phase.

## Evolution rule

Keep this repository static-first. Add server-side capability only when a real website feature requires it. Do not introduce a backend, database, CMS, analytics platform, authentication system, or microservices merely to make the repository appear more corporate.
