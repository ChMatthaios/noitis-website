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
GitHub Pages
```

The site has four HTML entry points: `index.html`, `privacy.html`, `terms.html`, and `trademark.html`.

The website intentionally has **no API, operational database, warehouse, authentication service, payment processor, CMS, or form backend**.

## Public product authority

`src/productCatalog.ts` is the website-owned public summary of the Noitis product family. Product repositories remain authoritative for implementation details. Public product/pricing URLs are environment configuration and are omitted when no real public destination exists.

Local product destinations are generated into ignored `.env.development.local`, which Vite loads only in development mode. `npm run check` rejects production output containing local development destinations.

## Publication metadata

`vite.config.ts` injects the configured publication base URL into canonical/Open Graph/Twitter metadata. `scripts/generate-publication-files.mjs` creates `sitemap.xml` and `robots.txt` for the same publication address.

The current production address is `https://noitis-mc.github.io/noitis-website/`. A future custom domain can replace it after DNS, TLS, canonical-host, redirect, and live acceptance checks are completed.

## Deployment flow

```text
reviewed change
      ↓
GitHub Actions CI
      ↓
npm ci → npm run check
      ↓
merge to main
      ↓
GitHub Pages workflow
      ↓
Pages artifact → public deployment
```

## Evolution rule

Keep this repository static-first. Add server-side capability only when a real website feature requires it. Do not introduce backend/database/CMS/analytics/authentication infrastructure merely to make the repository appear more complex.
