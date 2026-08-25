# Contributing to the Noitis website

This repository contains the public-facing Noitis company website. Changes should keep it clear, factual, accessible, fast, and straightforward to maintain.

## Phase workflow

Milestone branches are historical snapshots:

```text
phase-1 = accepted Phase 1
phase-2 = Phase 1 + accepted Phase 2
phase-3 = Phases 1-3
...
main    = latest accepted phase
```

Work only on the active phase branch. After acceptance and merge, keep that phase branch fixed and create/synchronize the next phase branch from the new `main`.

## Public-content rules

- Preserve the approved Noitis identity unless the change explicitly updates the brand.
- Treat company/product/legal/privacy/trademark statements as production data.
- Do not claim roadmap items, future integrations, planned pricing, customers, certifications, partnerships, or availability as current facts.
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

`npm run check` builds the production site, generates sitemap/robots output, validates required publication metadata, and fails if development-only local destinations leak into production output.

For production preview:

```bash
npm run build
npm run preview
```

## Environment configuration

`npm run dev` creates `.env.local` with the permanent Noitis local ports if no local env file exists. Production/public links are optional `VITE_*` values documented in `.env.example`.

Never commit secrets to a `VITE_*` variable: Vite frontend variables are public by design.

## Engineering expectations

- Production checks must pass before a phase is proposed for merge into `main`.
- Keyboard navigation, focus states, reduced-motion behavior, mobile layouts, and light/dark themes must remain usable.
- Meaningful images need useful alt decisions; decorative theme variants should not duplicate meaningful alt text.
- Review public metadata, canonical assumptions, sitemap/robots, social previews, and legal text when publication URLs or business facts change.
- Keep GitHub Pages deployment reproducible and separate from product infrastructure.
- Pages activation and the final custom domain are Phase 4 operations; do not fake them in source.
- Update relevant Markdown whenever architecture, scripts, phase status, hosting behavior, public claims, or legal/data practices change.

See `docs/engineering/ENGINEERING_STANDARD.md` and `ROADMAP.md` for the full standards and phase gates.
