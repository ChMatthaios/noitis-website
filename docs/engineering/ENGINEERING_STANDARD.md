# Noitis Website Engineering Standard

This document adapts the Noitis engineering foundation to the public company website. The goal is a trustworthy, accessible, reproducible site—not application-backend ceremony.

## 1. Static-first by default

Keep the website deployable as static assets unless a concrete feature requires server-side capability. Do not add API, database, warehouse, authentication, queue, microservice, CMS, or cloud-service scaffolding merely for architectural appearance.

## 2. Public claims are production data

Company copy, product descriptions, pricing references, legal/privacy/trademark language, contacts, certifications, partnerships, customer claims, availability, and launch state can affect public trust.

- do not invent or imply unverified facts;
- distinguish current capability from roadmap work;
- keep `src/productCatalog.ts` and `docs/content/PRODUCT_CATALOG.md` aligned;
- update stale claims when accepted product `main` changes;
- do not use `®` unless registration supports it.

## 3. Public links are configuration

Never hard-code a guessed production product/pricing URL. Public destinations come from documented `VITE_*` build variables. If a real destination does not exist, render the product without a public link.

Local multi-app links belong in ignored `.env.development.local`, which is development-mode configuration only. The production validation gate must reject leaked localhost destinations.

## 4. Accessibility is a release requirement

Preserve semantic landmarks and heading order, keyboard access, visible focus, useful labels, 44x44 CSS-pixel interactive targets where applicable, readable contrast, reduced-motion behavior, responsive layouts, and useful image-alt decisions.

Phase 3 validation uses the existing source checks plus `scripts/browser-smoke.mjs` to exercise these requirements in Chromium, Firefox, and WebKit at mobile, tablet, and desktop sizes.

## 5. Performance and assets

Use system fonts; do not add remote font loading without an explicit performance/privacy review. Prefer the compact official product symbols over larger wordmarks where the product name is already rendered as text. Below-the-fold product imagery must lazy-load, and theme-specific imagery should request only the active variant.

The web manifest uses the SVG Noitis mark instead of a duplicate large PNG. `scripts/verify-quality.mjs` enforces JavaScript/CSS budgets and the current publication-image budget. Revisit the budgets only when a real feature justifies the increase.

## 6. SEO and publication metadata

Every public entry point requires an accurate title, description, robots directive, canonical URL, Open Graph metadata, and Twitter metadata. The home page also publishes minimal Organization structured data. Sitemap/robots output must be generated for the configured publication URL. The final custom domain is not authoritative until Phase 4 establishes ownership and deployment.

## 7. Privacy and security

The static site must not contain secrets or private/customer data. `VITE_*` variables are public frontend configuration and must never contain secrets.

If analytics, forms, cookies, newsletters, accounts, or other data collection are added later, document legal basis, consent where applicable, data destinations, retention, failure modes, and legal-page changes before production use.

## 8. Deterministic builds and checks

Use committed `package-lock.json` with `npm ci`. Node.js 22.13.0 is the repository baseline.

`npm run check` builds the site and validates production-content safety, metadata/indexability, sitemap/robots, local links, contrast/reduced-motion rules, font policy, image-loading rules, and JavaScript/CSS budgets.

The browser smoke dependency is intentionally installed without modifying the application lockfile:

```bash
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium firefox webkit
npm run check:browser
```

## 9. CI and deployment separation

CI runs on pushes/PRs and executes both the source/build checks and the Phase 3 browser smoke review. Pages deployment runs from `main` only when `NOITIS_PAGES_ENABLED=true`. Deployment must build from committed source and lockfiles; do not deploy locally generated `dist/` output.

## 10. Domain and hosting configuration

Domain ownership, DNS, HTTPS, Pages activation, repository Pages settings, and redirects are Phase 4 operations. Keep them out of component logic. Relative asset paths are intentional while the site may move between the project Pages URL and a custom domain.

## 11. Phase discipline

Phase branches are immutable milestones after acceptance. Do not synchronize an earlier accepted phase branch forward. A phase is complete only when its checklist, source/docs, relevant tests, review, and CI gate agree.

## 12. Architecture evolution

Prefer the smallest architecture that keeps public content reliable and maintainable. Add complexity only for an observed requirement.
