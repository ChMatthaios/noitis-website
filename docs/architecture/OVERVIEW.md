# Noitis Website Architecture

## Purpose

This repository contains the public Noitis company website. It is a marketing, product-discovery, brand, contact, and public-information surface—not an operational Noitis application backend.

## Current architecture

```text
Reviewed public content + build configuration
                 ↓
React / TypeScript / static HTML / CSS / media
                 ↓
Vite production build
                 ↓
publication generator + content-safety verification
                 ↓
static dist/ artifact
                 ↓
GitHub Pages when hosting is enabled
```

The site has four HTML entry points: `index.html`, `privacy.html`, `terms.html`, and `trademark.html`.

## Repository boundaries

```text
noitis-website/
├── src/
│   ├── App.tsx
│   ├── productCatalog.ts
│   ├── legal page components
│   └── styles/
├── media/
├── public/                   # favicon, manifest, share image, sitemap, robots
├── scripts/                  # development env, publication generation, verification
├── docs/
│   ├── architecture/
│   ├── content/
│   ├── decisions/
│   └── engineering/
├── .github/workflows/
└── four HTML entry points
```

The website intentionally has **no API, operational database, warehouse, authentication service, payment processor, CMS, or form backend**.

## Public product authority

`src/productCatalog.ts` is the website-owned public summary of the Noitis product family. It must be reviewed against accepted product repositories. Public product/pricing URLs are environment configuration and are omitted when no real public destination exists.

Local product destinations are generated into ignored `.env.development.local`, which Vite loads only in development mode. `npm run check` rejects production output containing `localhost:` or `127.0.0.1`.

## Publication metadata

`vite.config.ts` injects the configured publication base URL into canonical/Open Graph/Twitter metadata. `scripts/generate-publication-files.mjs` creates `sitemap.xml` and `robots.txt` for the same publication address.

The fallback publication address is the GitHub Pages project URL. The final custom domain remains a Phase 4 deployment decision.

## Deployment flow

```text
phase branch / PR
      ↓
GitHub Actions CI
      ↓
npm ci → npm run check
      ↓
accepted merge to main
      ↓
Pages workflow (only when NOITIS_PAGES_ENABLED=true)
      ↓
Pages artifact → deployment
```

Pages activation itself is an administrative repository/hosting operation tracked with Phase 4 domain/operations work.

## Evolution rule

Keep this repository static-first. Add server-side capability only when a real website feature requires it. Do not introduce backend/database/CMS/analytics/authentication infrastructure merely to make the repository appear more corporate.
