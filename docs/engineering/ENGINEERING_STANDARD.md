# Noitis Website Engineering Standard

This document adapts the Noitis engineering foundation to the public company website. The goal is a trustworthy, accessible, reproducible site—not application-backend ceremony.

## Static-first by default

Keep the website deployable as static assets unless a concrete feature requires server-side capability. Do not add API, database, warehouse, authentication, queue, microservice, CMS, or cloud-service scaffolding merely for architectural appearance.

## Public claims are production data

Company copy, product descriptions, pricing references, legal/privacy/trademark language, contacts, certifications, partnerships, customer claims, availability, and launch state can affect public trust.

- do not invent or imply unverified facts;
- distinguish current capability from roadmap work;
- keep `src/productCatalog.ts` and `docs/content/PRODUCT_CATALOG.md` aligned;
- update stale claims when verified product behavior changes;
- do not use `®` unless registration supports it.

## Public links are configuration

Never hard-code a guessed production product/pricing URL. Public destinations come from documented `VITE_*` build variables. If a real destination does not exist, render the product without a public link.

Local multi-app links belong in ignored `.env.development.local`. The production validation gate must reject leaked localhost/private destinations.

## Accessibility is a release requirement

Changes must preserve semantic landmarks and heading order, keyboard access, visible focus, useful labels, target sizes, alternative-text decisions, responsive layouts, readable contrast, reduced-motion behavior, and light/dark usability. Browser checks supplement manual review.

## Performance and assets

Prefer simple cacheable static output. Avoid unnecessary runtime dependencies. Large images must be reviewed for format, dimensions, compression, and duplication. JavaScript and CSS bundle budgets remain enforced by repository checks.

## SEO and publication metadata

Every public entry point requires an accurate title/description and canonical/social metadata. Sitemap/robots output must be generated for the configured publication URL. A custom domain becomes authoritative only after ownership, DNS, TLS, and live verification are complete.

## Privacy and security

The static site must not contain secrets or private/customer data. `VITE_*` variables are public frontend configuration and must never contain secrets.

If analytics, forms, cookies, newsletters, accounts, or other data collection are added later, document legal basis, consent where applicable, data destinations, retention, failure modes, and legal-page changes before production use.

## Deterministic builds

Use committed `package-lock.json` with `npm ci`. Node.js 22.13.0 is the repository baseline.

`npm run check` builds the site, generates publication files, verifies canonical/social metadata, verifies sitemap/robots, validates quality budgets, and rejects development-only destinations in production output.

## CI and deployment separation

CI runs on pushes and pull requests. Pages deployment runs from `main` when `NOITIS_PAGES_ENABLED=true`. Deployment must build from committed source and lockfiles; do not deploy locally generated `dist/` output.

## Domain and hosting configuration

Domain ownership, DNS, HTTPS, Pages settings, and redirects belong to deployment/operations configuration, not component logic. Relative asset paths are intentional while the site may move between the current GitHub Pages project URL and a future custom domain.

## Change discipline

A public change is complete only when source, documentation, validation, manual review where relevant, and CI tell the same story. Keep internal development milestone labels out of the public website tree.

## Architecture evolution

Prefer the smallest architecture that keeps public content reliable and maintainable. Add complexity only for an observed requirement.
