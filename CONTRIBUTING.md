# Contributing to the Noitis website

This repository contains the public-facing Noitis company website. Changes should keep it factual, accessible, fast, secure, and straightforward to maintain.

## Change workflow

Use a focused branch for meaningful work, review the resulting public behavior, run the repository validation gates, and merge only reviewed changes into `main`. `main` is the deployable source for the public website.

## Public-content rules

- Preserve the approved Noitis identity unless a change explicitly updates the brand.
- Treat company, product, legal, privacy, and trademark statements as production data.
- Do not claim planned integrations, pricing, customers, certifications, partnerships, or availability as current facts unless they are verified.
- Keep `src/productCatalog.ts` and `docs/content/PRODUCT_CATALOG.md` synchronized when product positioning changes.
- Public product/pricing links must come from deployment configuration; do not hard-code development destinations into public production content.
- Do not add secrets, customer data, internal endpoints, or internal-only documents.
- Do not create database/API scaffolding for symmetry; this repository has no operational database or backend.

## Local validation

Use Node.js 22.13.0 or newer in the Node 22 line.

```bash
npm ci
npm run check
npm run dev
```

For production preview:

```bash
npm run build
npm run preview
```

For cross-browser review, install the pinned Playwright tooling without changing the lockfile and run `npm run check:browser`.

## Environment configuration

Development defaults are documented in `.env.example` and generated into `.env.development.local`. Production/public links are optional `VITE_*` values supplied by the deployment environment.

Never put secrets in a `VITE_*` variable: frontend variables are public by design.

## Engineering expectations

- Production checks must pass before a change is merged into `main`.
- Keyboard navigation, focus states, reduced-motion behavior, mobile layouts, and light/dark themes must remain usable.
- Meaningful images need useful alternative-text decisions; decorative theme variants should not duplicate meaningful alternative text.
- Review metadata, canonical assumptions, sitemap/robots, social previews, and legal text when publication URLs or business facts change.
- Keep GitHub Pages deployment reproducible and separate from product infrastructure.
- Update relevant Markdown whenever architecture, scripts, hosting behavior, public claims, or legal/data practices change.

See `docs/engineering/ENGINEERING_STANDARD.md`, `docs/operations/PRODUCTION.md`, and `ROADMAP.md` for the maintained website standards.
