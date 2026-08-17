# Noitis Website Architecture

## Purpose

This repository contains the public Noitis company website. It is a marketing, product-discovery, brand, and public-information surface—not an operational Noitis application backend.

The site currently uses React, TypeScript, Vite, static assets, GitHub Actions, and GitHub Pages.

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

The current site has two HTML entry points:

- `index.html` for the company website;
- `privacy.html` for the privacy notice.

Both are built by Vite and share the same React/CSS asset pipeline.

## Repository boundaries

```text
noitis-website/
├── src/                     # React and CSS source
├── media/                   # source brand/product artwork
├── public/                  # files copied directly into the build
├── docs/                    # architecture and engineering decisions
├── .github/workflows/       # validation and GitHub Pages deployment
├── index.html
├── privacy.html
├── package.json
├── package-lock.json
└── vite.config.ts
```

The website intentionally does **not** include application API, operational database, data-warehouse, or service scaffolding. Those belong in product repositories or future dedicated services when an actual public-site requirement exists.

## Public-site authority boundary

The browser may render public copy, product descriptions, navigation, theme state, and static assets. It must not become the authority for protected product actions, account data, billing, credentials, private telemetry, or internal operational state.

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
Pages artifact
        ↓
GitHub Pages deployment
```

CI validates code independently from deployment. Deployment is limited to `main` and uses the committed lockfile.

## Domain model

The site currently uses relative Vite asset paths so the same build can work on a GitHub Pages project URL and later behind a custom Noitis domain. Domain ownership, DNS, HTTPS, canonical URL metadata, and redirects are deployment/configuration concerns rather than reasons to hard-code environment-specific paths throughout React components.

## Evolution rule

Keep this repository static-first. Add server-side capability only when a real website feature requires it. Do not introduce a backend, database, CMS, analytics platform, authentication system, or microservices merely to make the repository appear more corporate.
