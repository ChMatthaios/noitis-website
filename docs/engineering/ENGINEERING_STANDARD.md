# Noitis Website Engineering Standard

This document adapts the Noitis engineering foundation to the public company website. The goal is a trustworthy, accessible, reproducible site—not application-backend ceremony.

## 1. Static-first by default

The website is a public information surface. Keep it deployable as static assets unless a concrete feature requires server-side capability. Do not add API, database, warehouse, authentication, queue, microservice, CMS, or cloud-service scaffolding merely for architectural appearance.

## 2. Public claims are production data

Company copy, product descriptions, pricing references, legal statements, privacy statements, trademark language, locations, contacts, certifications, partnerships, customer claims, availability, and launch state can affect public trust.

- do not invent or imply unverified facts;
- distinguish current capability from roadmap work;
- keep `src/productCatalog.ts` and `docs/content/PRODUCT_CATALOG.md` aligned;
- update stale claims when accepted product `main` changes;
- do not use `®` unless registration supports it.

## 3. Public links are configuration

Never hard-code a guessed production product/pricing URL. Public destinations come from documented `VITE_*` build variables. If a real destination does not exist, render the product without a public link.

Local multi-app links belong in ignored `.env.local`. The production validation gate must reject leaked localhost destinations.

## 4. Accessibility is a release requirement

Changes must preserve semantic landmarks/heading order, keyboard access, visible focus, useful labels, target sizes, alt decisions, responsive layouts, readable contrast, reduced-motion behavior, and light/dark usability. Accessibility is tested as behavior; Phase 3 adds the formal browser/accessibility gate.

## 5. Performance and assets

Prefer simple cacheable static output. Avoid unnecessary runtime dependencies. Large images must be reviewed for format, dimensions, compression, and duplication before production optimization is considered complete. Phase 3 owns the formal asset/Core Web Vitals pass.

## 6. SEO and publication metadata

Every public entry point requires an accurate title/description and canonical/social metadata. Sitemap/robots output must be generated for the configured publication URL. The final custom domain is not authoritative until Phase 4 establishes ownership and deployment.

## 7. Privacy and security

The current static site must not contain secrets or private/customer data. `VITE_*` variables are public frontend configuration and must never contain secrets.

If analytics, forms, cookies, newsletters, accounts, or other data collection are added later, document legal basis, consent where applicable, data destinations, retention, failure modes, and legal-page changes before production use.

## 8. Deterministic builds

Use committed `package-lock.json` with `npm ci`. Node.js 22.13.0 is the repository baseline.

`npm run check` is the source validation gate: it builds the site, generates publication files, verifies canonical/social metadata, verifies sitemap/robots, and rejects development-only destinations in `dist/`.

## 9. CI and deployment separation

CI runs on pushes/PRs. Pages deployment runs from `main` only when `NOITIS_PAGES_ENABLED=true`. Deployment must build from committed source and lockfiles; do not deploy locally generated `dist/` output.

## 10. Domain and hosting configuration

Domain ownership, DNS, HTTPS, Pages activation, repository Pages settings, and redirects are Phase 4 operations. Keep them out of component logic. Relative asset paths are intentional while the site may move between the project Pages URL and a custom domain.

## 11. Phase discipline

Phase branches are immutable milestones after acceptance. Do not synchronize an earlier accepted phase branch forward. A phase is complete only when its checklist, source/docs, relevant tests, review, and CI gate agree.

## 12. Architecture evolution

Prefer the smallest architecture that keeps public content reliable and maintainable. Add complexity only for an observed requirement.
